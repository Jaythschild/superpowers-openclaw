param(
    [string]$MicName = "麦克风 (NVIDIA Broadcast)",
    [int]$RecordSeconds = 6,
    [string]$SessionId = "voice-chat",
    [string]$Model = "",
    [switch]$NoSpeak,
    [switch]$SelfTest,
    [switch]$Once,
    [switch]$ListDevices,
    [switch]$UseModelRun,
    [switch]$UseGateway,
    [string]$LmStudioUrl = "http://127.0.0.1:1234/v1/chat/completions",
    [string]$LmStudioModel = "qwen/qwen3.6-27b"
)

$ErrorActionPreference = "Stop"
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
$env:PYTHONIOENCODING = "utf-8"

$Workspace = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$OpenClaw = "D:\openclaw-stack\npm\openclaw.cmd"
$Python = Join-Path $Workspace ".venv-sensevoice\Scripts\python.exe"
$Transcribe = Join-Path $Workspace "tools\transcribe_sensevoice.py"
$RunDir = Join-Path $Workspace "tmp\voice-chat"

New-Item -ItemType Directory -Force -Path $RunDir | Out-Null

function Require-Command($Name, $Hint) {
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "$Name not found. $Hint"
    }
}

function Get-AudioDevices {
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        $output = & ffmpeg -hide_banner -list_devices true -f dshow -i dummy 2>&1
    } finally {
        $ErrorActionPreference = $oldPreference
    }

    $output |
        Select-String -Pattern "\(audio\)|audio" |
        ForEach-Object { $_.Line }
}

function Speak-Text([string]$Text) {
    if ($NoSpeak -or [string]::IsNullOrWhiteSpace($Text)) {
        return
    }

    $ttsFile = Join-Path $RunDir ("reply-{0}.mp3" -f ([DateTimeOffset]::Now.ToUnixTimeMilliseconds()))
    try {
        & $OpenClaw infer tts convert --text $Text --output $ttsFile --json | Out-Null
        if (Test-Path -LiteralPath $ttsFile) {
            Add-Type -AssemblyName presentationCore
            $player = New-Object System.Windows.Media.MediaPlayer
            $player.Open([Uri]::new($ttsFile))
            $player.Play()
            Start-Sleep -Milliseconds 500
            while ($player.NaturalDuration.HasTimeSpan -and $player.Position -lt $player.NaturalDuration.TimeSpan) {
                Start-Sleep -Milliseconds 200
            }
            $player.Close()
            return
        }
    } catch {
        Write-Host "[voice] OpenClaw TTS failed, falling back to Windows system voice." -ForegroundColor Yellow
    }

    Add-Type -AssemblyName System.Speech
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.Rate = 1
    $synth.Volume = 100
    $synth.Speak($Text)
}

function Get-LmStudioReply([string]$Prompt) {
    $body = @{
        model = $LmStudioModel
        messages = @(
            @{ role = "system"; content = "你是纳斯，用中文自然简洁地和杰斯语音对话。回答要适合被朗读，不要输出 Markdown 表格。" },
            @{ role = "user"; content = $Prompt }
        )
        temperature = 0.7
        max_tokens = 800
    } | ConvertTo-Json -Depth 8

    $reply = Invoke-RestMethod -Uri $LmStudioUrl -Method Post -ContentType "application/json; charset=utf-8" -Body $body -TimeoutSec 120
    return [string]$reply.choices[0].message.content
}

function Get-AgentReply([string]$Prompt) {
    if (-not $UseGateway) {
        return (Get-LmStudioReply $Prompt).Trim()
    }

    if ($UseModelRun) {
        $args = @("infer", "model", "run", "--gateway", "--prompt", $Prompt)
        if ($Model) {
            $args += @("--model", $Model)
        }
        return ((& $OpenClaw @args) -join [Environment]::NewLine).Trim()
    }

    $args = @("agent", "--session-id", $SessionId, "--message", $Prompt)
    if ($Model) {
        $args += @("--model", $Model)
    }
    $raw = ((& $OpenClaw @args) -join [Environment]::NewLine).Trim()
    if (-not $raw) {
        return ""
    }

    try {
        $json = $raw | ConvertFrom-Json
        foreach ($key in @("reply", "message", "text", "output", "content")) {
            if ($json.PSObject.Properties.Name -contains $key -and $json.$key) {
                return [string]$json.$key
            }
        }
    } catch {
        # Plain text output is expected for non-JSON OpenClaw CLI runs.
    }

    return $raw
}

function Invoke-SelfTest {
    Write-Host ""
    Write-Host "OpenClaw voice chat self-test" -ForegroundColor Cyan

    Write-Host "[test] ffmpeg audio devices" -ForegroundColor DarkCyan
    $devices = @(Get-AudioDevices)
    if (-not $devices) {
        throw "No DirectShow audio devices found."
    }
    $devices | ForEach-Object { Write-Host "  $_" }

    Write-Host "[test] microphone record: $MicName" -ForegroundColor DarkCyan
    $wav = Join-Path $RunDir ("selftest-record-{0}.wav" -f ([DateTimeOffset]::Now.ToUnixTimeMilliseconds()))
    & ffmpeg -hide_banner -loglevel error -y -f dshow -i "audio=$MicName" -t 1 -ac 1 -ar 16000 $wav
    if (-not (Test-Path -LiteralPath $wav)) {
        throw "Microphone recording did not produce a wav file."
    }
    Write-Host ("  ok: {0} bytes" -f (Get-Item -LiteralPath $wav).Length)

    Write-Host "[test] SenseVoice transcription" -ForegroundColor DarkCyan
    $heard = ((& $Python $Transcribe $wav --language auto) -join [Environment]::NewLine).Trim()
    if ($heard) {
        Write-Host ("  ok: {0}" -f $heard)
    } else {
        Write-Host "  ok: <empty/silence>"
    }

    Write-Host "[test] model route" -ForegroundColor DarkCyan
    $reply = Get-AgentReply "只回复：语音模型测试通过"
    if ([string]::IsNullOrWhiteSpace($reply)) {
        throw "Model returned an empty reply."
    }
    Write-Host ("  ok: {0}" -f $reply)

    Write-Host "[test] TTS file generation" -ForegroundColor DarkCyan
    $ttsFile = Join-Path $RunDir ("selftest-tts-{0}.mp3" -f ([DateTimeOffset]::Now.ToUnixTimeMilliseconds()))
    & $OpenClaw infer tts convert --text "语音合成测试通过" --output $ttsFile --json | Out-Null
    if (-not (Test-Path -LiteralPath $ttsFile)) {
        throw "TTS did not produce an audio file."
    }
    Write-Host ("  ok: {0} bytes -> {1}" -f (Get-Item -LiteralPath $ttsFile).Length, $ttsFile)

    Write-Host ""
    Write-Host "SELFTEST_OK" -ForegroundColor Green
}

Require-Command "ffmpeg" "Install ffmpeg or add it to PATH."
if (-not (Test-Path -LiteralPath $OpenClaw)) {
    throw "OpenClaw CLI not found at $OpenClaw"
}
if (-not (Test-Path -LiteralPath $Python)) {
    throw "SenseVoice Python environment not found at $Python"
}
if (-not (Test-Path -LiteralPath $Transcribe)) {
    throw "SenseVoice transcribe script not found at $Transcribe"
}

if ($ListDevices) {
    Get-AudioDevices
    exit 0
}

if ($SelfTest) {
    Invoke-SelfTest
    exit 0
}

Write-Host ""
Write-Host "OpenClaw voice chat bridge" -ForegroundColor Cyan
Write-Host "Mic: $MicName"
Write-Host "Record seconds: $RecordSeconds"
Write-Host "Session: $SessionId"
if ($UseGateway) {
    Write-Host "Model route: OpenClaw Gateway"
} else {
    Write-Host "Model route: LM Studio direct ($LmStudioModel)"
}
Write-Host "Press Enter to record. Type q then Enter to quit."
if ($Once) {
    Write-Host "Once mode: records one turn, replies once, then exits."
}
Write-Host ""

while ($true) {
    if (-not $Once) {
        $cmd = Read-Host "[voice]"
        if ($cmd -match "^(q|quit|exit)$") {
            break
        }
    }

    $stamp = [DateTimeOffset]::Now.ToUnixTimeMilliseconds()
    $wav = Join-Path $RunDir ("utterance-$stamp.wav")

    Write-Host "[voice] Recording..." -ForegroundColor DarkCyan
    try {
        & ffmpeg -hide_banner -loglevel error -y -f dshow -i "audio=$MicName" -t $RecordSeconds -ac 1 -ar 16000 $wav
    } catch {
        Write-Host "[voice] Recording failed. Available DirectShow audio devices:" -ForegroundColor Red
        Get-AudioDevices
        throw
    }

    if (-not (Test-Path -LiteralPath $wav)) {
        Write-Host "[voice] No audio file produced." -ForegroundColor Yellow
        if ($Once) {
            break
        }
        continue
    }

    Write-Host "[voice] Transcribing..." -ForegroundColor DarkCyan
    $heard = ((& $Python $Transcribe $wav --language auto) -join [Environment]::NewLine).Trim()
    if ([string]::IsNullOrWhiteSpace($heard)) {
        Write-Host "[you] <empty>"
        if ($Once) {
            break
        }
        continue
    }

    Write-Host "[you] $heard" -ForegroundColor Green
    Write-Host "[voice] Asking model..." -ForegroundColor DarkCyan
    $reply = Get-AgentReply $heard
    if ([string]::IsNullOrWhiteSpace($reply)) {
        Write-Host "[nas] <empty reply>" -ForegroundColor Yellow
        if ($Once) {
            break
        }
        continue
    }

    Write-Host "[nas] $reply" -ForegroundColor Magenta
    Speak-Text $reply

    if ($Once) {
        break
    }
}