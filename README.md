# AMZ Auto AI - 电商优化工具

AI驱动的亚马逊电商优化工具，基于用户评价、图片和市场数据自动优化产品列表。

## 🌟 特性

- 🤖 **Dify AI 集成** - 集成 Dify AI 平台，使用原生工作流编辑器
- 📊 **应用管理** - 集中管理所有 Dify AI 应用
- 🔐 **安全认证** - JWT 用户认证系统
- 🎨 **现代 UI** - Magic UI 风格动画，流畅的用户体验
- 📱 **响应式设计** - 支持桌面和移动设备
- ⚡ **高性能** - Redis 缓存 + PostgreSQL 持久化
- 🛡️ **管理员后台** - 系统管理与监控

## 🚀 快速开始

### Windows 用户

双击运行 `start.bat` 即可启动所有服务：

```bash
start.bat
```

停止所有服务：

```bash
stop.bat
```

### 手动启动

#### 1. 启动数据库

```bash
docker-compose up -d
```

#### 2. 配置后端

编辑 `backend/.env` 文件：

```env
DATABASE_URL=postgresql://amz_user:amz_password@localhost:5433/amz_auto_ai
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REDIS_URL=redis://localhost:6379/0
DIFY_API_KEY=your-dify-api-key
DIFY_API_URL=http://localhost:5001/v1
DIFY_FRONTEND_URL=http://localhost:3001
```

#### 3. 启动后端

```bash
cd backend
pip install -r requirements.txt
python run.py
```

后端服务将在 `http://localhost:8000` 启动

#### 4. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端服务将在 `http://localhost:3000` 启动

## 📖 使用说明

### Dify 工作流管理

1. **配置 Dify**
   - 在 `frontend/.env` 中设置 `NEXT_PUBLIC_DIFY_URL=http://localhost:3000`
   - 在 `backend/.env` 中配置 Dify API 密钥
   - 确保 Dify 服务已启动并可访问

2. **注册账户** - 访问 http://localhost:3000/auth/register

3. **登录系统** - 使用注册的邮箱和密码登录

4. **管理 Dify 应用**
   - 进入工作流页面，自动同步所有 Dify 应用
   - 点击"创建"按钮创建新应用
   - 点击应用卡片，在新标签页打开 Dify 原生编辑器

## � 项目结构

```
amz-auto-ai/
├── frontend/          # Next.js 前端应用
│   ├── app/          # 页面和路由
│   │   ├── auth/     # 认证页面
│   │   ├── dashboard/ # 仪表盘、工作流、设置、管理员
│   │   └── ...
│   ├── components/   # React 组件
│   │   ├── ui/       # UI 组件库
│   │   ├── magic/    # Magic UI 组件
│   │   └── TopNav.tsx
│   └── lib/          # 工具函数
├── backend/          # FastAPI 后端应用
│   ├── app/          # API 和配置
│   │   ├── api/      # 路由
│   │   │   ├── auth.py
│   │   │   ├── dify.py
│   │   │   ├── admin.py
│   │   │   └── ...
│   │   └── ...
│   └── .env
├── dify/            # Dify 集成
├── docker-compose.yml
├── start.bat
└── stop.bat
```

## 🔧 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| DATABASE_URL | PostgreSQL 连接字符串 | - |
| SECRET_KEY | JWT 密钥 | - |
| DIFY_API_KEY | Dify API 密钥 | - |
| DIFY_API_URL | Dify API 地址 | http://localhost:5001/v1 |
| DIFY_FRONTEND_URL | Dify 前端地址 | http://localhost:3001 |

## 📊 服务端口

- AMZ Auto AI 前端: http://localhost:3000
- AMZ Auto AI 后端: http://localhost:8000
- Dify 界面: http://localhost:3001
- Dify API: http://localhost:5001
- PostgreSQL: localhost:5433
- Redis: localhost:6379

## 🔐 安全性

- 密码使用 bcrypt 加密存储
- JWT Token 认证
- CORS 配置
- SQL 注入防护 (ORM)
- XSS 防护 (React)

## 📝 功能列表

### 已实现
- ✅ 用户注册和登录
- ✅ JWT 认证
- ✅ 工作流管理
- ✅ Dify API 集成
- ✅ 响应式设计
- ✅ Magic UI 动画
- ✅ PostgreSQL 数据持久化
- ✅ Redis 缓存支持
- ✅ 管理员后台

### 计划中
- 🔄 更多工作流模板
- 🔄 数据可视化
- 🔄 报告导出
- 🔄 用户权限管理
- 🔄 多语言支持

## 🐛 常见问题

### 端口冲突

修改以下配置：
- 前端端口：`frontend/package.json`
- 后端端口：`backend/run.py`
- 数据库端口：`docker-compose.yml`

### 数据库连接失败

```bash
docker ps
docker logs amz-auto-ai-postgres
```

### Dify API 调用失败

1. 检查 `DIFY_API_KEY` 是否正确
2. 确认 `DIFY_API_URL` 格式正确
3. 验证网络连接

## 📄 许可证

MIT License

## 📞 联系

如有问题或建议，请提交 Issue。
