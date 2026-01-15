@echo off
chcp 65001 >nul
echo ========================================
echo Stopping AMZ Auto AI Services
echo ========================================
echo.

echo Stopping frontend and backend services...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1
echo [OK] Application services stopped

echo.
echo Disconnecting Dify network connections...
docker network disconnect amz-auto-ai-amz-network amz-auto-ai-api 2>nul
docker network disconnect amz-auto-ai-amz-network amz-auto-ai-worker 2>nul
docker network disconnect amz-auto-ai-amz-network amz-auto-ai-worker-beat 2>nul
docker network disconnect amz-auto-ai-amz-network amz-auto-ai-web 2>nul
docker network disconnect amz-auto-ai-amz-network amz-auto-ai-nginx 2>nul
docker network disconnect amz-auto-ai-amz-network amz-auto-ai-redis 2>nul
echo [OK] Dify network disconnected

echo.
echo Stopping Dify services...
cd dify\docker
docker compose -p amz-auto-ai down
cd ..
echo [OK] Dify services stopped

echo.
echo Stopping database services...
docker-compose down
echo [OK] Database services stopped

echo.
echo ========================================
echo All services stopped
echo ========================================
pause
