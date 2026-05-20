@echo off
setlocal
set "OPENCLAW_PWSH=C:\Program Files\PowerShell\7\pwsh.exe"
if not exist "%OPENCLAW_PWSH%" set "OPENCLAW_PWSH=pwsh.exe"
"%OPENCLAW_PWSH%" -NoLogo -NoProfile -ExecutionPolicy Bypass -File "D:\openclaw-stack\workspace\tools\invoke-openclaw-pwsh.ps1" %*
exit /b %ERRORLEVEL%
