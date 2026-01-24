@echo off
chcp 65001 >nul
echo ========================================
echo AMZ Auto AI - Quick Start
echo ========================================
echo.

set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

echo [1/3] Ensuring Docker services are running...
docker-compose -f docker-compose-unified.yml up -d
echo [OK] Docker services checked

echo [2/3] Starting Backend...
start "Backend Server" cmd /k "cd /d "%SCRIPT_DIR%backend" && venv\Scripts\activate && python run.py"

echo [3/3] Starting Frontend...
start "Frontend Server" cmd /k "cd /d "%SCRIPT_DIR%frontend" && npm run dev"

echo.
echo ========================================
echo Services started!
echo ========================================
echo Frontend: http://localhost:4070
echo Backend:  http://localhost:8800
echo Dify UI:  http://localhost:4080
echo Dify API: http://localhost:5001
echo.
pause