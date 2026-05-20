@echo off
setlocal
set "QMD_CLI=D:\openclaw-stack\workspace\node_modules\@tobilu\qmd\dist\cli\qmd.js"
"C:\Program Files\nodejs\node.exe" "%QMD_CLI%" %*
