---
name: session-logs
description: Search and analyze your own session logs (older/parent conversations) using PowerShell, Node.js, and ripgrep on Windows.
metadata: { "openclaw": { "emoji": "📜", "always": true, "skillKey": "session-logs-win" } }
---

# session-logs

Search your complete conversation history stored in session JSONL files. Use this when a user references older/parent conversations or asks what was said before.

## Trigger

Use this skill when the user asks about prior chats, parent conversations, or historical context that is not already in memory files.

## Location

Session logs live under the active state directory:

`$env:OPENCLAW_STATE_DIR\agents\<agentId>\sessions\`

Default on this OpenClaw Windows stack is usually:

`D:\openclaw-stack\state\agents\<agentId>\sessions\`

Use the `agent=<id>` value from the Runtime line; for the main assistant it is usually `main`.

Files:

- `sessions.json` — index mapping session keys to session IDs
- `<session-id>.jsonl` — full conversation transcript per session

## Structure

Each `.jsonl` file contains records with:

- `type`: `session` metadata or `message`
- `timestamp`: ISO timestamp
- `message.role`: `user`, `assistant`, or `toolResult`
- `message.content[]`: includes text, thinking, or tool calls; filter `type == "text"` for human-readable content
- `message.usage.cost.total`: cost per response when present

## Windows / PowerShell Queries

Always initialize UTF-8 before reading or printing Chinese text on Windows:

```powershell
chcp 65001 > $null
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
$env:PYTHONIOENCODING = 'utf-8'
```

Set paths:

```powershell
$AgentId = 'main'
$StateDir = if ($env:OPENCLAW_STATE_DIR) { $env:OPENCLAW_STATE_DIR } else { 'D:\openclaw-stack\state' }
$SessionDir = Join-Path $StateDir "agents\$AgentId\sessions"
```

### List all sessions by date and size

```powershell
Get-ChildItem $SessionDir -Filter *.jsonl | ForEach-Object {
  $first = Get-Content -LiteralPath $_.FullName -TotalCount 1 -Encoding UTF8 | ConvertFrom-Json
  [pscustomobject]@{
    Date = ([datetime]$first.timestamp).ToString('yyyy-MM-dd HH:mm:ss')
    SizeKB = [math]::Round($_.Length / 1KB, 1)
    File = $_.Name
  }
} | Sort-Object Date -Descending
```

### Find sessions from a specific day

```powershell
$Day = '2026-05-12'
Get-ChildItem $SessionDir -Filter *.jsonl | Where-Object {
  $first = Get-Content -LiteralPath $_.FullName -TotalCount 1 -Encoding UTF8 | ConvertFrom-Json
  $first.timestamp -like "$Day*"
} | Select-Object -ExpandProperty FullName
```

### Extract user messages from a session

```powershell
$Session = Join-Path $SessionDir '<session-id>.jsonl'
Get-Content -LiteralPath $Session -Encoding UTF8 | ForEach-Object {
  $row = $_ | ConvertFrom-Json
  if ($row.message.role -eq 'user') {
    $row.message.content | Where-Object type -eq 'text' | ForEach-Object text
  }
}
```

### Search across all sessions for a phrase

Prefer ripgrep for speed:

```powershell
rg --encoding utf-8 -i "phrase" $SessionDir -g "*.jsonl"
```

Then inspect matching sessions with the extraction snippets above.

### Text-only dump for a session

```powershell
$Session = Join-Path $SessionDir '<session-id>.jsonl'
Get-Content -LiteralPath $Session -Encoding UTF8 | ForEach-Object {
  $row = $_ | ConvertFrom-Json
  if ($row.type -eq 'message') {
    $role = $row.message.role
    $row.message.content | Where-Object type -eq 'text' | ForEach-Object { "[$role] $($_.text)" }
  }
}
```

### Count messages in a session

```powershell
$Session = Join-Path $SessionDir '<session-id>.jsonl'
$rows = Get-Content -LiteralPath $Session -Encoding UTF8 | ForEach-Object { $_ | ConvertFrom-Json }
[pscustomobject]@{
  Messages = ($rows | Where-Object type -eq 'message').Count
  User = ($rows | Where-Object { $_.message.role -eq 'user' }).Count
  Assistant = ($rows | Where-Object { $_.message.role -eq 'assistant' }).Count
  First = $rows[0].timestamp
  Last = $rows[-1].timestamp
}
```

### Total cost for a session

```powershell
$Session = Join-Path $SessionDir '<session-id>.jsonl'
$sum = 0
Get-Content -LiteralPath $Session -Encoding UTF8 | ForEach-Object {
  $row = $_ | ConvertFrom-Json
  if ($row.message.usage.cost.total) { $sum += [double]$row.message.usage.cost.total }
}
$sum
```

## Tips

- Sessions are append-only JSONL: one JSON object per line.
- Large sessions can be several MB; use `Get-Content -Encoding UTF8 -TotalCount`, `Get-Content -Encoding UTF8 -Tail`, and `rg --encoding utf-8` before full parsing.
- Always use `-Encoding UTF8` when reading `.md`, `.json`, or `.jsonl` files that may contain Chinese.
- Avoid exposing private session contents unless the user asks and the current chat context is trusted.
- Prefer memory files first for stable personal facts; use session logs for exact historical context.

