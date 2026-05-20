param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string] $ScriptPath,

    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $ScriptArguments
)

$ErrorActionPreference = 'Stop'

$null = chcp 65001
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
$env:PYTHONIOENCODING = 'utf-8'

$resolvedScript = Resolve-Path -LiteralPath $ScriptPath -ErrorAction Stop

if ($ScriptArguments.Count -gt 0 -and $ScriptArguments[0] -eq '--') {
    if ($ScriptArguments.Count -eq 1) {
        $ScriptArguments = @()
    } else {
        $ScriptArguments = $ScriptArguments[1..($ScriptArguments.Count - 1)]
    }
}

if ($ScriptArguments.Count -gt 0) {
    & $resolvedScript @ScriptArguments
} else {
    & $resolvedScript
}
exit $LASTEXITCODE
