# Dify 集成说明

## 当前架构

AMZ Auto AI 和 Dify 各自使用独立的数据库和 Redis，通过 Docker 网络连接实现通信。

### 服务端口
- AMZ Auto AI 前端: http://localhost:3000
- AMZ Auto AI 后端: http://localhost:8000
- Dify 界面: http://localhost:3001
- Dify API: http://localhost:5001

### 数据库配置
- AMZ Auto AI: 
  - PostgreSQL: localhost:5433 (amz_auto_ai)
  - Redis: localhost:6379
- Dify:
  - PostgreSQL: Docker 内部容器 (db_postgres)
  - Redis: Docker 内部容器 (redis)

## 使用方式

### 启动所有服务
运行 \start.bat\，会：
1. 启动 AMZ Auto AI 数据库 (PostgreSQL + Redis)
2. 启动 Dify 服务 (包括自己的数据库)
3. 启动 AMZ Auto AI 后端
4. 启动 AMZ Auto AI 前端
5. 连接 Dify 容器到 amz-network 网络

### 停止所有服务
运行 \stop.bat\，会：
1. 停止前端和后端服务
2. 断开 Dify 网络连接
3. 停止 Dify 服务
4. 停止 AMZ Auto AI 数据库

## Dify 配置

### 获取 API Key
1. 打开 http://localhost:3001
2. 注册/登录账号
3. 创建应用
4. 获取 API Key

### 配置后端
更新 \ackend\.env\:
- DIFY_API_KEY=你的-dify-api-key
- DIFY_API_URL=http://localhost:5001/v1
- DIFY_FRONTEND_URL=http://localhost:3001
