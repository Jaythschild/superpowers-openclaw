param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $LarkArguments
)

$ErrorActionPreference = 'Stop'

$null = chcp 65001
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
$env:PYTHONIOENCODING = 'utf-8'
$env:OPENCLAW_STATE_DIR = 'D:\openclaw-stack\state'
$env:PATH = "D:\openclaw-stack\npm;$env:PATH"

$larkCli = 'D:\openclaw-stack\npm\lark-cli.cmd'
if (-not (Test-Path -LiteralPath $larkCli -PathType Leaf)) {
    throw "lark-cli not found: $larkCli"
}

$workspace = 'D:\openclaw-stack\workspace'
$resolvedWorkspace = (Resolve-Path -LiteralPath $workspace -ErrorAction Stop).Path.TrimEnd('\')
$cwd = (Get-Location).Path

function Convert-WorkspacePathArgument {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Value
    )

    $prefix = ''
    $pathValue = $Value
    if ($Value.StartsWith('@')) {
        $prefix = '@'
        $pathValue = $Value.Substring(1)
    }

    if (-not [System.IO.Path]::IsPathRooted($pathValue)) {
        return $Value
    }

    $fullPath = [System.IO.Path]::GetFullPath($pathValue)
    if (-not $fullPath.StartsWith($resolvedWorkspace, [System.StringComparison]::OrdinalIgnoreCase)) {
        return $Value
    }

    $relativePath = [System.IO.Path]::GetRelativePath($cwd, $fullPath)
    return "$prefix$relativePath"
}

$normalizedArguments = [System.Collections.Generic.List[string]]::new()
for ($i = 0; $i -lt $LarkArguments.Count; $i++) {
    $arg = $LarkArguments[$i]

    if (($arg -eq '--file' -or $arg -eq '--markdown' -or $arg -eq '-o' -or $arg -eq '--output') -and ($i + 1 -lt $LarkArguments.Count)) {
        $normalizedArguments.Add($arg)
        $i++
        $normalizedArguments.Add((Convert-WorkspacePathArgument -Value $LarkArguments[$i]))
        continue
    }

    if ($arg -like '--file=*' -or $arg -like '--markdown=*' -or $arg -like '--output=*') {
        $name, $value = $arg -split '=', 2
        $normalizedArguments.Add("$name=$(Convert-WorkspacePathArgument -Value $value)")
        continue
    }

    $normalizedArguments.Add($arg)
}

& $larkCli @normalizedArguments
exit $LASTEXITCODE
