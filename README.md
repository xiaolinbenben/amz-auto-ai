# AMZ Auto AI - 电商优化工具

AI驱动的亚马逊电商优化工具，基于用户评价、图片和市场数据自动优化产品列表。

## 🌟 特性

- 🤖 **Dify AI 集成** - 集成 Dify AI 平台，使用原生工作流编辑器
- ✨ **一键创建工作流** - 直接在前端创建 Dify 工作流，无需跳转
- 📊 **应用管理** - 集中管理所有 Dify AI 应用
- 🔐 **安全认证** - JWT 用户认证系统
- 🎨 **现代 UI** - Magic UI 风格动画，流畅的用户体验
- 📱 **响应式设计** - 支持桌面和移动设备
- ⚡ **高性能** - Redis 缓存 + PostgreSQL 持久化
- 🛡️ **管理员后台** - 系统管理与监控

## 🏗️ 技术栈

### 前端
- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **shadcn/ui** - 现代化 UI 组件库（基于 Radix UI）
- **Magic UI** - 高级动画和交互组件
- **Framer Motion** - 流畅的动画效果
- **Zustand** - 状态管理
- **Axios** - HTTP 客户端

### 后端
- **FastAPI** - 高性能 Python Web 框架
- **SQLAlchemy** - ORM
- **PostgreSQL** - 关系型数据库
- **Redis** - 缓存和会话管理
- **Dify** - AI 工作流集成

## 🚀 快速开始

### 前置要求

- Docker & Docker Compose
- Node.js 18+
- Python 3.10+

### 一键启动（推荐）

**启动所有服务：**

```bash
start.bat
```

这将自动启动：
- AMZ Auto AI 数据库（PostgreSQL + Redis）
- Dify 服务（API、Web UI、数据库、Redis等）
- AMZ Auto AI 后端
- AMZ Auto AI 前端

**停止所有服务：**

```bash
stop.bat
```

### 手动启动

#### 1. 启动数据库和 Dify

```bash
docker-compose -f docker-compose-unified.yml up -d
```

#### 2. 配置后端环境

编辑 `backend/.env` 文件：

```env
DATABASE_URL=postgresql://amz_user:amz_password@localhost:5433/amz_auto_ai
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REDIS_URL=redis://localhost:6380/0
DIFY_API_KEY=your-dify-api-key
DIFY_API_URL=http://localhost:5001/v1
DIFY_FRONTEND_URL=http://localhost:3001
```

#### 3. 启动后端

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

后端服务将在 `http://localhost:8000` 启动，API 文档：`http://localhost:8000/docs`

#### 4. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端服务将在 `http://localhost:3000` 启动

## � Dify 配置

### 获取 API Key

1. 运行 `start.bat` 启动所有服务
2. 打开 http://localhost:3001
3. 注册/登录账号（首次访问需要设置管理员账号）
4. 创建应用
5. 在应用设置中获取 API Key
6. 将 API Key 配置到 `backend/.env` 中的 `DIFY_API_KEY`

### Dify 部署选项

**1. 使用集成的 Dify（推荐）**
- Dify 已集成在 `docker-compose-unified.yml` 中
- 所有服务在同一个网络中，可以直接互通

**2. 使用 Dify Cloud**
- 注册账号：https://cloud.dify.ai/
- 在设置中获取 API Key
- 将 `DIFY_API_URL` 设置为 `https://api.dify.ai/v1`
- 将 `DIFY_FRONTEND_URL` 设置为 `https://cloud.dify.ai`

## 📖 使用说明

### 初次使用流程

1. **启动服务** - 运行 `start.bat`
2. **初始化 Dify** - 访问 http://localhost:3001 完成设置
3. **注册账户** - 访问 http://localhost:3000/auth/register
4. **登录系统** - 使用注册的邮箱和密码登录

### 工作流管理

1. **创建工作流**
   - 进入"工作流管理"页面
   - 点击"创建"按钮
   - 填写应用名称、描述和类型
   - 系统会自动在 Dify 中创建应用并打开编辑器

2. **管理应用**
   - 查看所有 Dify 应用列表
   - 点击应用卡片打开编辑器
   - 使用下拉菜单访问更多选项

## � 服务架构

### 服务端口

| 服务 | 地址 | 说明 |
|------|------|------|
| AMZ Auto AI 前端 | http://localhost:3000 | Next.js 应用 |
| AMZ Auto AI 后端 | http://localhost:8000 | FastAPI 服务 |
| Dify 界面 | http://localhost:3001 | Dify Web UI |
| Dify API | http://localhost:5001 | Dify API 服务 |
| AMZ PostgreSQL | localhost:5433 | 应用数据库 |
| AMZ Redis | localhost:6380 | 缓存服务 |
| Dify PostgreSQL | localhost:5434 | Dify 数据库 |
| Dify Redis | localhost:6381 | Dify 缓存服务 |

### 网络配置

- 所有容器都在 `amz-network` 桥接网络中
- 容器之间可以通过服务名互相访问
- AMZ 后端可以通过 `dify-api:5001` 访问 Dify API
- 前端通过 `http://localhost:5001` 访问 Dify API

## �📂 项目结构

```
amz-auto-ai/
├── frontend/                    # Next.js 前端应用
│   ├── app/                    # App Router 页面
│   │   ├── auth/              # 认证页面
│   │   ├── dashboard/         # 仪表盘
│   │   │   └── workflow/      # 工作流页面
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # React 组件
│   │   ├── ui/               # UI 组件库
│   │   └── Sidebar.tsx       # 侧边栏
│   └── lib/                  # 工具函数
├── backend/                   # FastAPI 后端应用
│   ├── app/
│   │   ├── api/             # API 路由
│   │   │   ├── auth.py     # 认证接口
│   │   │   ├── dify.py      # Dify 集成
│   │   │   └── workflows.py # 工作流接口
│   │   ├── schemas/         # Pydantic 模型
│   │   ├── models.py        # SQLAlchemy 模型
│   │   ├── database.py      # 数据库配置
│   │   ├── config.py        # 配置管理
│   │   └── main.py          # FastAPI 应用入口
│   ├── requirements.txt
│   └── .env
├── docker-compose-unified.yml # 统一的 Docker 配置
├── start.bat                  # 一键启动脚本
└── stop.bat                   # 一键停止脚本
```

## 🔧 开发指南

### 添加新的 API 端点

1. 在 `backend/app/api/` 创建新的路由文件
2. 在 `backend/app/schemas/` 定义请求/响应模型
3. 在 `backend/app/main.py` 注册路由

### 添加新的前端页面

1. 在 `frontend/app/` 创建新页面目录
2. 添加 `page.tsx` 文件
3. 如需布局，添加 `layout.tsx` 文件

### 数据库迁移

```bash
cd backend
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## � 常见问题

### 端口冲突

修改以下配置：
- 前端端口：`frontend/package.json`
- 后端端口：`backend/run.py`
- 数据库端口：`docker-compose-unified.yml`

### 数据库连接失败

```bash
docker ps
docker logs amz-auto-ai-dify-postgres
```

### Dify API 调用失败

1. 检查 `DIFY_API_KEY` 是否正确
2. 确认 `DIFY_API_URL` 格式正确
3. 验证网络连接

### 创建工作流失败

1. 确保 Dify 服务正在运行
2. 访问 http://localhost:3001 完成初始化
3. 在 Dify 中至少创建一个账户
4. 检查 `backend/.env` 中的配置

## 📝 功能列表

### 已实现

- ✅ 用户注册和登录
- ✅ JWT 认证系统
- ✅ 工作流管理界面
- ✅ Dify 完整集成
- ✅ 一键创建工作流
- ✅ 应用列表自动同步
- ✅ 管理员后台
- ✅ 响应式设计
- ✅ 深色模式支持

### 计划中

- 🔄 工作流模板库
- 🔄 批量操作功能
- 🔄 应用搜索和过滤
- 🔄 使用统计和分析
- 🔄 数据可视化
- 🔄 报告导出
- 🔄 用户权限管理
- 🔄 多语言支持

## � 安全性

- 密码使用 bcrypt 加密存储
- JWT Token 认证
- CORS 配置
- SQL 注入防护 (ORM)
- XSS 防护 (React)

## � 部署

### 使用 Docker

```bash
docker-compose -f docker-compose-unified.yml up -d
docker-compose -f docker-compose-unified.yml logs -f
docker-compose -f docker-compose-unified.yml down
```

### 生产环境配置

1. 更改默认的 `SECRET_KEY`
2. 使用环境变量管理敏感信息
3. 配置反向代理（Nginx）
4. 启用 HTTPS
5. 配置日志收集
6. 设置自动备份

## 📄 许可证

MIT License

## 📞 联系

如有问题或建议，请提交 Issue。
