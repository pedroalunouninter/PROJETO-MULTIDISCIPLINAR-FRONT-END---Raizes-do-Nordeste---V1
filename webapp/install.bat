@echo off
cd /d "%~dp0"
where npm.cmd >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo Node.js nao encontrado. Instale em https://nodejs.org/
  pause
  exit /b 1
)
call npm.cmd install
pause
