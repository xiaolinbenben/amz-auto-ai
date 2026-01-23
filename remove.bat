@echo off
chcp 65001 >nul
echo ========================================
echo Removing AMZ Auto AI Services
echo ========================================
echo.

echo Stopping frontend and backend services...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1
echo [OK] Application services stopped

echo.
echo Removing all Docker services...
docker compose -f docker-compose-unified.yml down -v
echo [OK] All Docker services removed

echo.
echo Cleaning up any remaining manual volumes...
docker volume rm amz-auto-ai_postgres_data amz-auto-ai_redis_data amz-auto-ai_dify_postgres_data amz-auto-ai_dify_redis_data amz-auto-ai_dify_app_storage amz-auto-ai_dify_web_app amz-auto-ai_dify_sandbox_dependencies amz-auto-ai_dify_plugin_daemon 2>nul
echo [OK] Cleanup complete

echo.
echo ========================================
echo All services and data removed
echo ========================================
pause
