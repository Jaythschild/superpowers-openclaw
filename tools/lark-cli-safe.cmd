@echo off
setlocal
set "OPENCLAW_STATE_DIR=D:\openclaw-stack\state"
set "PATH=D:\openclaw-stack\npm;%PATH%"
"D:\openclaw-stack\npm\lark-cli.cmd" %*
exit /b %ERRORLEVEL%
