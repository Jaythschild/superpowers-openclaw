param(
    [Parameter(Mandatory = $true)]
    [string]$ImageDir,

    [string]$Manifest,
    [string]$Markdown,
    [string]$PreviousManifest,
    [datetime]$MinLastWriteTime
)

$ErrorActionPreference = "Stop"
$Workspace = Split-Path -Parent $PSScriptRoot
$errors = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]

function Resolve-WorkspacePath {
    param([string]$Path)
    if ([string]::IsNullOrWhiteSpace($Path)) { return $null }
    if ([System.IO.Path]::IsPathRooted($Path)) { return $Path }
    return (Join-Path $Workspace $Path)
}

function Get-JsonProperty {
    param($Object, [string]$Name)
    if ($null -eq $Object) { return $null }
    if ($Object.PSObject.Properties.Name -contains $Name) { return $Object.$Name }
    return $null
}

function Get-ManifestEntries {
    param($Node)
    $items = @()
    if ($null -eq $Node) { return $items }
    if ($Node -is [array]) {
        foreach ($child in $Node) { $items += Get-ManifestEntries -Node $child }
        return $items
    }
    if ($Node -isnot [pscustomobject]) { return $items }

    $file = Get-JsonProperty $Node "file"
    $path = Get-JsonProperty $Node "path"
    $upload = Get-JsonProperty $Node "upload"
    $details = Get-JsonProperty $Node "details"
    if ($file -or $path -or $upload -or $details) {
        $items += $Node
    }

    foreach ($name in @("images", "items", "entries", "manifest", "uploaded", "replacements")) {
        $child = Get-JsonProperty $Node $name
        if ($child) { $items += Get-ManifestEntries -Node $child }
    }
    return $items
}

function Get-EntryPathText {
    param($Entry)
    $path = Get-JsonProperty $Entry "path"
    if ($path) { return [string]$path }
    $file = Get-JsonProperty $Entry "file"
    if ($file) { return [string]$file }
    $upload = Get-JsonProperty $Entry "upload"
    if ($upload) {
        $name = Get-JsonProperty $upload "file_name"
        if ($name) { return [string]$name }
    }
    $details = Get-JsonProperty $Entry "details"
    if ($details) {
        $name = Get-JsonProperty $details "file_name"
        if ($name) { return [string]$name }
    }
    return $null
}

function Resolve-EntryFile {
    param([string]$EntryPath, [string]$ImageDirFull)
    if ([string]::IsNullOrWhiteSpace($EntryPath)) { return $null }
    if ($EntryPath -match "^(https?:|data:)") { return $null }
    if ([System.IO.Path]::IsPathRooted($EntryPath)) { return $EntryPath }
    $normalized = $EntryPath -replace "/", "\"
    if ($normalized -like "images\*") { return (Join-Path $Workspace $normalized) }
    return (Join-Path $ImageDirFull $normalized)
}

function Read-ManifestHashes {
    param([string]$ManifestPath, [string]$ImageDirFull)
    $hashes = New-Object System.Collections.Generic.HashSet[string]
    if ([string]::IsNullOrWhiteSpace($ManifestPath)) { return $hashes }
    if (-not (Test-Path -LiteralPath $ManifestPath)) { return $hashes }
    $json = Get-Content -LiteralPath $ManifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($entry in (Get-ManifestEntries -Node $json)) {
        $entryPath = Get-EntryPathText -Entry $entry
        $candidate = Resolve-EntryFile -EntryPath $entryPath -ImageDirFull $ImageDirFull
        if ($candidate -and (Test-Path -LiteralPath $candidate)) {
            $hashes.Add((Get-FileHash -LiteralPath $candidate -Algorithm SHA256).Hash) | Out-Null
        }
    }
    return $hashes
}

$imageDirCandidate = Resolve-WorkspacePath $ImageDir
if (-not (Test-Path -LiteralPath $imageDirCandidate -PathType Container)) {
    $errors.Add("ImageDir not found: $imageDirCandidate")
} else {
    $imageDirFull = (Resolve-Path -LiteralPath $imageDirCandidate).Path
}

if (-not $Manifest -and $imageDirFull) {
    $Manifest = Join-Path $imageDirFull "manifest.json"
}
$manifestCandidate = Resolve-WorkspacePath $Manifest
if (-not (Test-Path -LiteralPath $manifestCandidate -PathType Leaf)) {
    $errors.Add("Manifest not found: $manifestCandidate")
} else {
    $manifestFull = (Resolve-Path -LiteralPath $manifestCandidate).Path
}

if ($errors.Count -eq 0) {
    $imageDirPrefix = [System.IO.Path]::GetFullPath($imageDirFull).TrimEnd("\") + "\"
    $manifestPrefix = [System.IO.Path]::GetFullPath($manifestFull)
    if (-not $manifestPrefix.StartsWith($imageDirPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        $errors.Add("Manifest must live inside ImageDir. manifest=$manifestFull imageDir=$imageDirFull")
    }

    $manifestJson = Get-Content -LiteralPath $manifestFull -Raw -Encoding UTF8 | ConvertFrom-Json
    $entries = @(Get-ManifestEntries -Node $manifestJson)
    if ($entries.Count -eq 0) {
        $errors.Add("Manifest has no image entries: $manifestFull")
    }

    $files = New-Object System.Collections.Generic.List[object]
    $hashes = New-Object System.Collections.Generic.List[string]
    $seenNames = New-Object System.Collections.Generic.HashSet[string]
    foreach ($entry in $entries) {
        $entryPath = Get-EntryPathText -Entry $entry
        if ([string]::IsNullOrWhiteSpace($entryPath)) {
            $errors.Add("Manifest entry is missing file/path/file_name")
            continue
        }
        $candidate = Resolve-EntryFile -EntryPath $entryPath -ImageDirFull $imageDirFull
        if (-not $candidate) {
            $errors.Add("Manifest entry is not a local file path: $entryPath")
            continue
        }
        if (-not (Test-Path -LiteralPath $candidate -PathType Leaf)) {
            $errors.Add("Image file not found: $candidate")
            continue
        }
        $full = (Resolve-Path -LiteralPath $candidate).Path
        $fullPath = [System.IO.Path]::GetFullPath($full)
        if (-not $fullPath.StartsWith($imageDirPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
            $errors.Add("Image entry points outside ImageDir: $entryPath -> $full")
            continue
        }
        if (-not $seenNames.Add((Split-Path -Leaf $full))) {
            $warnings.Add("Duplicate image file name in manifest: $(Split-Path -Leaf $full)")
        }
        $item = Get-Item -LiteralPath $full
        if ($PSBoundParameters.ContainsKey("MinLastWriteTime") -and $item.LastWriteTime -lt $MinLastWriteTime) {
            $errors.Add("Image is older than MinLastWriteTime: $full lastWrite=$($item.LastWriteTime.ToString('s')) min=$($MinLastWriteTime.ToString('s'))")
        }
        $hash = (Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash
        $hashes.Add($hash) | Out-Null
        $files.Add([pscustomobject]@{
            file = $full
            bytes = $item.Length
            lastWriteTime = $item.LastWriteTime.ToString("s")
            sha256 = $hash
        }) | Out-Null
    }

    if ($hashes.Count -gt 0) {
        $uniqueHashCount = @($hashes | Select-Object -Unique).Count
        if ($uniqueHashCount -lt $hashes.Count) {
            $warnings.Add("Some images share identical SHA256 hashes: unique=$uniqueHashCount total=$($hashes.Count)")
        }
    }

    if ($PreviousManifest) {
        $previousManifestCandidate = Resolve-WorkspacePath $PreviousManifest
        $previousImageDir = Split-Path -Parent $previousManifestCandidate
        $previousHashes = Read-ManifestHashes -ManifestPath $previousManifestCandidate -ImageDirFull $previousImageDir
        if ($previousHashes.Count -gt 0 -and $hashes.Count -gt 0) {
            $unchanged = 0
            foreach ($hash in $hashes) {
                if ($previousHashes.Contains($hash)) { $unchanged++ }
            }
            if ($unchanged -eq $hashes.Count) {
                $errors.Add("Every current image hash already exists in PreviousManifest; this is not a real image refresh.")
            } elseif ($unchanged -gt 0) {
                $warnings.Add("$unchanged current images match PreviousManifest hashes.")
            }
        }
    }

    if ($Markdown) {
        $markdownCandidate = Resolve-WorkspacePath $Markdown
        if (-not (Test-Path -LiteralPath $markdownCandidate -PathType Leaf)) {
            $errors.Add("Markdown not found: $markdownCandidate")
        } else {
            $markdownFull = (Resolve-Path -LiteralPath $markdownCandidate).Path
            $markdownDir = Split-Path -Parent $markdownFull
            $markdownText = Get-Content -LiteralPath $markdownFull -Raw -Encoding UTF8
            $matches = [regex]::Matches($markdownText, '!\[[^\]]*\]\((?<path>[^)]+)\)|<img[^>]+src=["''](?<src>[^"'']+)["'']', 'IgnoreCase')
            foreach ($match in $matches) {
                $ref = $match.Groups["path"].Value
                if ([string]::IsNullOrWhiteSpace($ref)) { $ref = $match.Groups["src"].Value }
                if ([string]::IsNullOrWhiteSpace($ref) -or $ref -match "^(https?:|data:)") { continue }
                $refPath = if ([System.IO.Path]::IsPathRooted($ref)) {
                    $ref
                } elseif (($ref -replace "/", "\") -like "images\*") {
                    Join-Path $Workspace ($ref -replace "/", "\")
                } else {
                    Join-Path $markdownDir ($ref -replace "/", "\")
                }
                if (Test-Path -LiteralPath $refPath -PathType Leaf) {
                    $refFull = [System.IO.Path]::GetFullPath((Resolve-Path -LiteralPath $refPath).Path)
                    if (-not $refFull.StartsWith($imageDirPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
                        $errors.Add("Markdown image reference points outside ImageDir: $ref -> $refFull")
                    }
                } else {
                    $errors.Add("Markdown image reference not found: $ref")
                }
            }
        }
    }
}

$result = [pscustomobject]@{
    ok = ($errors.Count -eq 0)
    imageDir = $imageDirFull
    manifest = $manifestFull
    markdown = if ($Markdown) { (Resolve-WorkspacePath $Markdown) } else { $null }
    checkedAt = (Get-Date).ToString("s")
    errors = @($errors)
    warnings = @($warnings)
    fileCount = if ($files) { $files.Count } else { 0 }
    sampleFiles = if ($files) { @($files | Select-Object -First 5) } else { @() }
}

$result | ConvertTo-Json -Depth 6
if ($errors.Count -gt 0) { exit 1 }
