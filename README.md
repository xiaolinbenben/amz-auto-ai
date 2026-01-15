# AMZ Auto AI - 电商优化工具

AI驱动的亚马逊电商优化工具，基于用户评价、图片和市场数据自动优化产品列表。

## 🌟 特性

- 🤖 **Dify AI 集成** - 集成 Dify AI 平台，使用原生工作流编辑器
  - 在 Dify 原生界面中可视化编排 AI 工作流
  - 支持复杂的 AI 节点连接和配置
  - 实时预览和调试工作流
  - 无缝集成 AI 模型（GPT-4、Claude 等）
- 📊 **应用管理** - 集中管理所有 Dify AI 应用
  - 查看工作流、聊天机器人等应用类型
  - 统计应用数量和类型分布
  - 一键跳转到 Dify 原生编辑器
- 🔐 **安全认证** - JWT 用户认证系统
- 🎨 **现代 UI** - Magic UI 风格动画，流畅的用户体验
- 📱 **响应式设计** - 支持桌面和移动设备
- ⚡ **高性能** - Redis 缓存 + PostgreSQL 持久化
- 🔗 **API 集成** - 后端提供 Dify API 代理，安全连接 Dify

## 🚀 快速开始

### Windows 用户

双击运行 `start.bat` 即可启动所有服务：

```bash
start.bat
```

这将自动：
1. 启动 PostgreSQL 和 Redis (Docker)
2. 启动 FastAPI 后端服务
3. 启动 Next.js 前端服务

停止所有服务：

```bash
stop.bat
```

### 手动启动

详细说明请查看 [PROJECT_SETUP.md](./PROJECT_SETUP.md)

## 📖 使用说明

### Dify 工作流管理

1. **配置 Dify**
   - 在 `frontend/.env` 中设置 Dify URL（默认：`http://localhost:3000`）
   - 在 `backend/app/config.py` 中配置 Dify API 密钥
   - 确保 Dify 服务已启动并可访问

2. **注册账户** - 访问 http://localhost:3000/auth/register

3. **登录系统** - 使用注册的邮箱和密码登录

4. **管理 Dify 应用**
   - 进入工作流页面，自动同步所有 Dify 应用
   - 查看应用统计（总数、工作流、聊天应用）
   - 点击应用卡片，在新标签页打开 Dify 原生编辑器
   - 在 Dify 中编辑工作流，使用可视化节点编辑器
   - 点击"打开 Dify"按钮访问完整的 Dify 界面

5. **创建新工作流**
   - 点击"在 Dify 中创建"按钮
   - 跳转到 Dify 应用创建页面
   - 使用 Dify 原生工具创建 AI 工作流

6. **工作流开发**
   - 在 Dify 原生编辑器中使用节点拖拽编排
   - 配置 AI 模型（GPT-4、Claude 等）
   - 添加数据处理、条件判断、循环节点
   - 实时测试和调试工作流
   - 保存后自动同步到本系统

## 🏗️ 技术架构

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Next.js    │◄────►│  FastAPI    │◄────►│  PostgreSQL │
│  (Frontend) │      │ (Backend)   │      │  Database   │
└─────────────┘      └─────────────┘      └─────────────┘
                            │                     │
                            ▼                     ▼
                     ┌──────────┐         ┌──────────┐
                     │  Redis   │         │   Dify   │
                     │ (Cache)  │         │   API    │
                     └──────────┘         └──────────┘
```

### 技术栈

- **前端**: Next.js 14, TypeScript, Tailwind CSS, Radix UI, Framer Motion
- **后端**: FastAPI, SQLAlchemy, PostgreSQL, Redis
- **AI**: Dify Platform
- **容器**: Docker, Docker Compose

## 📂 项目结构

```
amz-auto-ai/
├── frontend/          # Next.js 前端应用
│   ├── app/          # 页面和路由
│   ├── components/   # React 组件
│   └── lib/          # 工具函数
├── backend/          # FastAPI 后端应用
│   └── app/          # API 和配置
├── docker-compose.yml # 数据库编排
├── start.bat         # Windows 启动脚本
└── stop.bat          # Windows 停止脚本
```

## 🔧 配置说明

### 环境变量

后端配置文件 `backend/.env`:

```env
DATABASE_URL=postgresql://amz_user:amz_password@localhost:5433/amz_auto_ai
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REDIS_URL=redis://localhost:6379/0
DIFY_API_KEY=your-dify-api-key
DIFY_API_URL=https://api.dify.ai/v1
```

## 📊 数据库设计

### 用户表 (users)
- id, email, username, hashed_password, created_at

### 工作流历史表 (workflow_history)
- id, user_id, name, input_data, output_data, status, created_at

## 🔐 安全性

- 密码使用 bcrypt 加密存储
- JWT Token 认证
- CORS 配置
- SQL 注入防护 (ORM)
- XSS 防护 (React)

## 🚢 部署

详细部署指南请参考 [PROJECT_SETUP.md](./PROJECT_SETUP.md)

## 📝 开发计划

- [x] 用户认证系统
- [x] 工作流执行
- [x] 历史记录管理
- [ ] 数据可视化
- [ ] 报告导出
- [ ] 多语言支持
- [ ] 团队协作功能

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系

如有问题或建议，请提交 Issue。
