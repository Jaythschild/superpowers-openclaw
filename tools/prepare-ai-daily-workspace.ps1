param(
    [string] $Date = (Get-Date -Format 'yyyy-MM-dd'),
    [ValidateSet('morning', 'afternoon', 'auto', 'test')]
    [string] $Edition = 'auto'
)

$ErrorActionPreference = 'Stop'

$workspaceRoot = 'D:\openclaw-stack\workspace'
$resolvedRoot = (Resolve-Path -LiteralPath $workspaceRoot).Path

if ($Date -notmatch '^\d{4}-\d{2}-\d{2}$') {
    throw "Date must use yyyy-MM-dd, got: $Date"
}

if ($Edition -eq 'auto') {
    $Edition = if ((Get-Date).Hour -lt 12) { 'morning' } else { 'afternoon' }
}

$editionLabel = switch ($Edition) {
    'morning' { '上午版' }
    'afternoon' { '下午版' }
    'test' { '测试版' }
}

$reportDirRel = "reports\ai-daily\$Date"
$imageDirRel = "images\ai-daily\$Date"
$tmpDirRel = "tmp\ai-daily\$Date"

$reportDir = Join-Path $resolvedRoot $reportDirRel
$imageDir = Join-Path $resolvedRoot $imageDirRel
$tmpDir = Join-Path $resolvedRoot $tmpDirRel

foreach ($dir in @($reportDir, $imageDir, $tmpDir)) {
    $resolvedParent = (Resolve-Path -LiteralPath (Split-Path -Parent $dir) -ErrorAction SilentlyContinue)
    if ($null -ne $resolvedParent -and -not $resolvedParent.Path.StartsWith($resolvedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to create outside workspace: $dir"
    }
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

$reportFileName = "ai-daily-$Date-$Edition.md"
$manifestFileName = "ai-daily-$Date-$Edition.json"
$reportPath = Join-Path $reportDir $reportFileName
$manifestPath = Join-Path $tmpDir $manifestFileName

if (-not (Test-Path -LiteralPath $reportPath)) {
    $title = "# AI 重大新闻日报｜$Date｜$editionLabel"
    Set-Content -LiteralPath $reportPath -Encoding UTF8 -Value @(
        $title,
        '',
        '> Draft prepared by tools\prepare-ai-daily-workspace.ps1. Replace this file with the final report before Feishu upload.',
        ''
    )
}

$result = [ordered]@{
    ok = $true
    date = $Date
    edition = $Edition
    editionLabel = $editionLabel
    workspaceRoot = $resolvedRoot
    reportDir = $reportDir
    reportDirRel = $reportDirRel
    imageDir = $imageDir
    imageDirRel = $imageDirRel
    tmpDir = $tmpDir
    tmpDirRel = $tmpDirRel
    reportMarkdown = $reportPath
    reportMarkdownRel = "$reportDirRel\$reportFileName"
    manifest = $manifestPath
    manifestRel = "$tmpDirRel\$manifestFileName"
    larkCli = '.\tools\lark-cli-safe.cmd'
    pwshWrapper = '.\tools\openclaw-pwsh.cmd'
}

$result | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $manifestPath -Encoding UTF8
$result | ConvertTo-Json -Depth 4
