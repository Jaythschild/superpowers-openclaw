param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string] $Manifest,

    [Parameter(Mandatory = $true, Position = 1)]
    [string] $ImageDir,

    [Parameter(Mandatory = $true, Position = 2)]
    [string] $PromptInput,

    [Parameter(Position = 3)]
    [string] $Slug = "cover",

    [Parameter(Position = 4)]
    [int] $MaxAttempts = 3,

    [Parameter(Position = 5)]
    [int] $RetryDelaySeconds = 45,

    [Parameter(Position = 6)]
    [ValidateSet("run", "dry-run", "simulate-failure")]
    [string] $Mode = "run",

    [string] $Model = "openai/gpt-image-2",
    [string] $FallbackModels = "openai/gpt-image-1-mini,openai/gpt-image-1.5,openai/gpt-image-1",
    [string] $Size = "1536x1024",
    [string] $AspectRatio = "16:9",
    [string] $OutputFormat = "png",
    [int] $TimeoutMs = 180000,
    [switch] $FailOnImageFailure
)

$ErrorActionPreference = "Stop"
$Workspace = Split-Path -Parent $PSScriptRoot
$OpenClawCmd = "D:\openclaw-stack\npm\openclaw.cmd"

function Resolve-WorkspacePath {
    param([string] $Path)
    if ([string]::IsNullOrWhiteSpace($Path)) {
        throw "Path cannot be empty."
    }
    if ([System.IO.Path]::IsPathRooted($Path)) {
        return [System.IO.Path]::GetFullPath($Path)
    }
    return [System.IO.Path]::GetFullPath((Join-Path $Workspace $Path))
}

function Assert-InWorkspace {
    param([string] $Path, [string] $Name)
    $workspaceFull = [System.IO.Path]::GetFullPath($Workspace).TrimEnd("\") + "\"
    $pathFull = [System.IO.Path]::GetFullPath($Path)
    if (-not $pathFull.StartsWith($workspaceFull, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "$Name must stay inside workspace. path=$pathFull workspace=$Workspace"
    }
}

function ConvertTo-WorkspaceRelative {
    param([string] $Path)
    $workspaceFull = [System.IO.Path]::GetFullPath($Workspace).TrimEnd("\") + "\"
    $pathFull = [System.IO.Path]::GetFullPath($Path)
    if (-not $pathFull.StartsWith($workspaceFull, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Cannot make path relative outside workspace: $pathFull"
    }
    return $pathFull.Substring($workspaceFull.Length)
}

function Get-TextTail {
    param([string] $Text, [int] $MaxChars = 1800)
    if ([string]::IsNullOrEmpty($Text)) { return "" }
    if ($Text.Length -le $MaxChars) { return $Text }
    return $Text.Substring($Text.Length - $MaxChars)
}

function Get-FailureCategory {
    param([string] $Text)
    if ([string]::IsNullOrWhiteSpace($Text)) { return "unknown" }
    if ($Text -match "other side closed|fetch failed") { return "openai-oauth-transport-closed" }
    if ($Text -match "ETIMEDOUT|ENOTFOUND|ECONNRESET|157\.240\.") { return "network-or-dns-route" }
    if ($Text -match "401|403|authentication|auth") { return "auth-or-permission" }
    if ($Text -match "timeout|timed out") { return "generation-timeout" }
    return "unknown"
}

function Get-ModelSequence {
    param([string] $PrimaryModel, [string] $FallbackModelList, [int] $Attempts)
    $fallbacks = @()
    if (-not [string]::IsNullOrWhiteSpace($FallbackModelList)) {
        $fallbacks = $FallbackModelList -split "," |
            ForEach-Object { $_.Trim() } |
            Where-Object { -not [string]::IsNullOrWhiteSpace($_) -and $_ -ne $PrimaryModel }
    }

    $sequence = New-Object System.Collections.Generic.List[string]
    $sequence.Add($PrimaryModel) | Out-Null
    if ($Attempts -ge 2) {
        $sequence.Add($PrimaryModel) | Out-Null
    }
    foreach ($fallback in $fallbacks) {
        $sequence.Add($fallback) | Out-Null
    }

    while ($sequence.Count -lt $Attempts) {
        $sequence.Add($PrimaryModel) | Out-Null
    }

    return $sequence.ToArray() | Select-Object -First $Attempts
}

function Save-Manifest {
    param($ManifestObject, [string] $ManifestPath)
    $json = $ManifestObject | ConvertTo-Json -Depth 12
    [System.IO.File]::WriteAllText($ManifestPath, $json, [System.Text.UTF8Encoding]::new($false))
}

if ($MaxAttempts -lt 1) { $MaxAttempts = 1 }
if ($RetryDelaySeconds -lt 0) { $RetryDelaySeconds = 0 }

$manifestFull = Resolve-WorkspacePath $Manifest
$imageDirFull = Resolve-WorkspacePath $ImageDir
Assert-InWorkspace -Path $manifestFull -Name "Manifest"
Assert-InWorkspace -Path $imageDirFull -Name "ImageDir"

if (-not (Test-Path -LiteralPath $manifestFull -PathType Leaf)) {
    throw "Manifest not found: $manifestFull"
}
if (-not (Test-Path -LiteralPath $imageDirFull -PathType Container)) {
    New-Item -ItemType Directory -Force -Path $imageDirFull | Out-Null
}

$DryRun = $Mode -eq "dry-run"
$SimulateFailure = $Mode -eq "simulate-failure"
$Prompt = $PromptInput
$promptInputFull = $null
try {
    $promptInputFull = Resolve-WorkspacePath $PromptInput
} catch {
    $promptInputFull = $null
}
if ($promptInputFull -and (Test-Path -LiteralPath $promptInputFull -PathType Leaf)) {
    Assert-InWorkspace -Path $promptInputFull -Name "PromptInput"
    $Prompt = Get-Content -LiteralPath $promptInputFull -Raw -Encoding UTF8
} elseif ($PromptInput -match "\.(md|txt|json)$") {
    if ($promptInputFull) {
        throw "PromptInput file not found: $promptInputFull"
    }
}
if ([string]::IsNullOrWhiteSpace($Prompt)) {
    throw "PromptInput is empty."
}
$Prompt = $Prompt.Trim()

$manifestJson = Get-Content -LiteralPath $manifestFull -Raw -Encoding UTF8 | ConvertFrom-Json
$startedAt = (Get-Date).ToString("o")
$attempts = New-Object System.Collections.Generic.List[object]
$success = $false
$selectedImageRel = $null
$failureReason = $null
$failureCategory = $null
$modelSequence = @(Get-ModelSequence -PrimaryModel $Model -FallbackModelList $FallbackModels -Attempts $MaxAttempts)

for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
    $attemptStartedAt = (Get-Date).ToString("o")
    $currentModel = $modelSequence[$attempt - 1]
    $safeSlug = ($Slug -replace "[^A-Za-z0-9._-]", "-").Trim("-")
    if ([string]::IsNullOrWhiteSpace($safeSlug)) { $safeSlug = "cover" }
    $safeModel = ($currentModel -replace "[^A-Za-z0-9._-]", "-").Trim("-")
    if ([string]::IsNullOrWhiteSpace($safeModel)) { $safeModel = "image-model" }
    $outputName = "{0}-{1}-attempt-{2}.{3}" -f $safeSlug, $safeModel, $attempt, $OutputFormat
    $outputFull = Join-Path $imageDirFull $outputName
    $outputRel = ConvertTo-WorkspaceRelative $outputFull
    $stdoutText = ""
    $exitCode = 0
    $errorText = $null

    try {
        if ($DryRun) {
            $stdoutText = "{""dryRun"":true,""output"":""$outputRel""}"
        } elseif ($SimulateFailure) {
            throw "simulated image generation failure"
        } else {
            $args = @(
                "infer", "image", "generate",
                "--model", $currentModel,
                "--prompt", $Prompt,
                "--count", "1",
                "--size", $Size,
                "--aspect-ratio", $AspectRatio,
                "--output-format", $OutputFormat,
                "--output", $outputRel,
                "--timeout-ms", ([string] $TimeoutMs),
                "--json"
            )
            $output = & $OpenClawCmd @args 2>&1
            $exitCode = $LASTEXITCODE
            $stdoutText = ($output | Out-String).Trim()
            if ($exitCode -ne 0) {
                $tail = Get-TextTail -Text $stdoutText -MaxChars 900
                throw "openclaw infer image generate exited with code $exitCode`: $tail"
            }
            if (-not (Test-Path -LiteralPath $outputFull -PathType Leaf)) {
                throw "image command completed but output file was not found: $outputRel"
            }
            $item = Get-Item -LiteralPath $outputFull
            if ($item.Length -le 0) {
                throw "image command produced an empty file: $outputRel"
            }
            $selectedImageRel = $outputRel
            $success = $true
        }

        $attempts.Add([pscustomobject]@{
            attempt = $attempt
            model = $currentModel
            startedAt = $attemptStartedAt
            endedAt = (Get-Date).ToString("o")
            exitCode = $exitCode
            outputRel = $outputRel
            ok = $true
            dryRun = [bool] $DryRun
            stdoutTail = Get-TextTail -Text $stdoutText
        }) | Out-Null
        if ($DryRun) { $success = $true; $selectedImageRel = $outputRel }
        break
    } catch {
        $failureReason = $_.Exception.Message
        $failureCategory = Get-FailureCategory -Text (($stdoutText + "`n" + $failureReason).Trim())
        $errorText = $failureReason
        $attempts.Add([pscustomobject]@{
            attempt = $attempt
            model = $currentModel
            startedAt = $attemptStartedAt
            endedAt = (Get-Date).ToString("o")
            exitCode = $exitCode
            outputRel = $outputRel
            ok = $false
            dryRun = [bool] $DryRun
            failureCategory = $failureCategory
            error = $errorText
            stdoutTail = Get-TextTail -Text $stdoutText
        }) | Out-Null

        if ($attempt -lt $MaxAttempts -and $RetryDelaySeconds -gt 0) {
            Start-Sleep -Seconds $RetryDelaySeconds
        }
    }
}

$status = if ($success) { if ($DryRun) { "dry-run" } else { "success" } } else { "failed" }
$finalFailureReason = $null
if (-not $success) {
    $finalFailureReason = $failureReason
    if ([string]::IsNullOrWhiteSpace($failureCategory)) {
        $failureCategory = Get-FailureCategory -Text $finalFailureReason
    }
}
$attemptArray = $attempts.ToArray()
$degraded = [bool](-not $success)
$imageGeneration = [pscustomobject]@{
    status = [string] $status
    degraded = $degraded
    model = [string] $Model
    fallbackModels = @($FallbackModels -split "," | ForEach-Object { $_.Trim() } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
    attemptedModels = @($attemptArray | ForEach-Object { $_.model } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -Unique)
    prompt = [string] $Prompt
    size = [string] $Size
    aspectRatio = [string] $AspectRatio
    outputFormat = [string] $OutputFormat
    maxAttempts = [int] $MaxAttempts
    retryDelaySeconds = [int] $RetryDelaySeconds
    startedAt = $startedAt
    endedAt = (Get-Date).ToString("o")
    selectedImageRel = $selectedImageRel
    failureReason = $finalFailureReason
    failureCategory = $failureCategory
    attempts = $attemptArray
}

if ($manifestJson.PSObject.Properties.Name -contains "imageGeneration") {
    $manifestJson.imageGeneration = $imageGeneration
} else {
    $manifestJson | Add-Member -MemberType NoteProperty -Name "imageGeneration" -Value $imageGeneration
}

Save-Manifest -ManifestObject $manifestJson -ManifestPath $manifestFull

$result = [pscustomobject]@{
    ok = [bool] $success
    status = [string] $status
    degraded = $degraded
    selectedImageRel = $selectedImageRel
    failureReason = $finalFailureReason
    failureCategory = $failureCategory
    manifestRel = ConvertTo-WorkspaceRelative $manifestFull
    attempts = $attemptArray
}

$result | ConvertTo-Json -Depth 12

if (-not $success -and $FailOnImageFailure) {
    exit 2
}
exit 0
