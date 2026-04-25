@echo off
chcp 65001 >nul
title Raizes do Nordeste - servidor local
cd /d "%~dp0"

where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo.
  echo [ERRO] Node.js nao encontrado. Instale em https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where npm.cmd >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo.
  echo [ERRO] npm.cmd nao encontrado. Reinstale o Node.js.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Instalando dependencias ^(primeira vez^)...
  call npm.cmd install
  if %ERRORLEVEL% neq 0 (
    echo Falha no npm install.
    pause
    exit /b 1
  )
)

echo.
echo Abrindo o site em http://localhost:5173  ^(Ctrl+C para parar^)
echo.
call npm.cmd run dev
pause
