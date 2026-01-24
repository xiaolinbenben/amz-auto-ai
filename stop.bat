@echo off
chcp 65001 >nul
echo ========================================
echo Stopping AMZ Auto AI Services
echo ========================================
echo.

echo [1/3] Killing application processes...
REM Kill Node.js (Frontend)
taskkill /f /im node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Stopped Node.js processes
) else (
    echo [INFO] No Node.js processes found
)

REM Kill Python (Backend)
taskkill /f /im python.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Stopped Python processes
) else (
    echo [INFO] No Python processes found
)

echo.
echo [2/3] Checking and freeing ports...

REM Port list: 4070 8800 5001 4080 5433 5434 6900 6901
for %%p in (4070 8800 5001 4080 5433 5434 6900 6901) do (
    for /f "tokens=5" %%a in ('netstat -aon ^| find ":%%p" ^| find "LISTENING"') do (
        taskkill /f /pid %%a >nul 2>&1
        echo [OK] Freed port %%p [PID: %%a]
    )
)

echo.
echo [3/3] Stopping Docker services...
docker compose -f docker-compose-unified.yml stop
echo [OK] Docker services stopped

echo.
echo ========================================
echo All services stopped and ports freed
echo ========================================
pause