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
# AMZ Auto AI - 鐢靛晢浼樺寲宸ュ叿

涓€涓熀浜?Next.js銆丗astAPI銆丏ify 鍜?PostgreSQL 鏋勫缓鐨勬櫤鑳界數鍟嗕紭鍖栧伐鍏峰钩鍙般€?

## 馃彈锔?鎶€鏈爤

### 鍓嶇
- **Next.js 14** - React 妗嗘灦
- **TypeScript** - 绫诲瀷瀹夊叏
- **Tailwind CSS** - 鏍峰紡妗嗘灦
- **shadcn/ui** - 鐜颁唬鍖?UI 缁勪欢搴擄紙鍩轰簬 Radix UI锛?
- **Magic UI** - 楂樼骇鍔ㄧ敾鍜屼氦浜掔粍浠?
- **Framer Motion** - 娴佺晠鐨勫姩鐢绘晥鏋?
- **Radix UI** - 搴曞眰鏃犲ご缁勪欢
- **Axios** - HTTP 瀹㈡埛绔?
- **Zustand** - 鐘舵€佺鐞?
- **Lucide React** - 鍥炬爣搴?

### 鍚庣
- **FastAPI** - 楂樻€ц兘 Python Web 妗嗘灦
- **SQLAlchemy** - ORM
- **PostgreSQL** - 鍏崇郴鍨嬫暟鎹簱
- **Redis** - 缂撳瓨鍜屼細璇濈鐞?
- **Dify** - AI 宸ヤ綔娴侀泦鎴?

### UI 缁勪欢搴?
- **shadcn/ui** - 鎻愪緵鍙鐢ㄣ€佸彲瀹氬埗鐨?UI 缁勪欢
  - Button銆丆ard銆両nput銆丩abel銆乀abs銆乀extarea銆丼heet銆丏ialog 绛?
- **Magic UI** - 楂樼骇浜や簰缁勪欢
  - 鍔ㄧ敾鏁堟灉銆佸井浜や簰銆佽瑙夊寮虹粍浠?
- **class-variance-authority (CVA)** - 缁勪欢鍙樹綋绠＄悊
- **clsx & tailwind-merge** - 鏍峰紡宸ュ叿鍑芥暟

## 馃殌 蹇€熷紑濮?

### 鍓嶇疆瑕佹眰

- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- Git
- Dify 瀹炰緥锛堟湰鍦伴儴缃叉垨浜戠瀹炰緥锛?

### 1. 鍏嬮殕椤圭洰

```bash
cd d:\Desktop\amz-auto-ai
```

### 2. 閰嶇疆 Dify

#### 鍓嶇閰嶇疆

鍒涘缓 `frontend/.env` 鏂囦欢锛?

```env
NEXT_PUBLIC_DIFY_URL=http://localhost:3000
```

#### 鍚庣閰嶇疆

鍦?`backend/app/config.py` 涓厤缃?Dify API 淇℃伅锛?

```python
# Dify 閰嶇疆
dify_api_key: str = "your-dify-api-key"  # Dify API 瀵嗛挜
dify_api_url: str = "http://localhost:3000/v1"  # Dify API 鍦板潃
dify_frontend_url: str = "http://localhost:3000"  # Dify 鍓嶇鍦板潃
```

**Dify 閮ㄧ讲鏂瑰紡锛?*

1. **鏈湴閮ㄧ讲 Docker 鐗?*锛堟帹鑽愮敤浜庡紑鍙戯級
   ```bash
   # 璁块棶 https://docs.dify.ai/guides/workflow
   # 鎸夌収瀹樻柟鏂囨。浣跨敤 Docker 閮ㄧ讲 Dify
   ```

2. **浣跨敤 Dify Cloud**
   - 娉ㄥ唽璐﹀彿锛歨ttps://cloud.dify.ai/
   - 鍦ㄨ缃腑鑾峰彇 API Key
   - 灏?`NEXT_PUBLIC_DIFY_URL` 璁剧疆涓?`https://cloud.dify.ai`

3. **浣跨敤 Dify 瀹樻柟 Demo**
   - Dify 鎻愪緵鍦ㄧ嚎婕旂ず鐜
   - 閫傚悎蹇€熶綋楠屽姛鑳?

### 3. 鍚姩鏁版嵁搴撴湇鍔?

```bash
docker-compose up -d
```

杩欏皢鍚姩锛?
- PostgreSQL (绔彛 5433)
- Redis (绔彛 6379)

### 3. 閰嶇疆鍚庣鐜

缂栬緫 `backend/.env` 鏂囦欢锛岃缃繀瑕佺殑鐜鍙橀噺锛?

```env
DATABASE_URL=postgresql://amz_user:amz_password@localhost:5433/amz_auto_ai
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REDIS_URL=redis://localhost:6379/0
DIFY_API_KEY=your-dify-api-key
DIFY_API_URL=https://api.dify.ai/v1
```

### 4. 瀹夎 Python 渚濊禆骞跺惎鍔ㄥ悗绔?

```bash
cd backend

# 鍒涘缓铏氭嫙鐜
python -m venv venv

# 婵€娲昏櫄鎷熺幆澧?(Windows)
venv\Scripts\activate

# 婵€娲昏櫄鎷熺幆澧?(Linux/Mac)
source venv/bin/activate

# 瀹夎渚濊禆
pip install -r requirements.txt

# 鍚姩鍚庣鏈嶅姟
python run.py
```

鍚庣鏈嶅姟灏嗗湪 `http://localhost:8000` 鍚姩

API 鏂囨。锛歚http://localhost:8000/docs`

### 5. 瀹夎 Node 渚濊禆骞跺惎鍔ㄥ墠绔?

```bash
cd frontend

# 瀹夎渚濊禆
npm install

# 鍚姩寮€鍙戞湇鍔″櫒
npm run dev
```

鍓嶇鏈嶅姟灏嗗湪 `http://localhost:3000` 鍚姩

## 馃搧 椤圭洰缁撴瀯

```
amz-auto-ai/
鈹溾攢鈹€ frontend/                 # Next.js 鍓嶇搴旂敤
鈹?  鈹溾攢鈹€ app/                # App Router 椤甸潰
鈹?  鈹?  鈹溾攢鈹€ auth/          # 璁よ瘉椤甸潰
鈹?  鈹?  鈹?  鈹溾攢鈹€ login/     # 鐧诲綍椤?
鈹?  鈹?  鈹?  鈹斺攢鈹€ register/  # 娉ㄥ唽椤?
鈹?  鈹?  鈹溾攢鈹€ dashboard/     # 浠〃鐩?
鈹?  鈹?  鈹?  鈹斺攢鈹€ workflow/  # 宸ヤ綔娴侀〉闈?
鈹?  鈹?  鈹溾攢鈹€ globals.css    # 鍏ㄥ眬鏍峰紡
鈹?  鈹?  鈹溾攢鈹€ layout.tsx     # 鏍瑰竷灞€
鈹?  鈹?  鈹斺攢鈹€ page.tsx       # 棣栭〉
鈹?  鈹溾攢鈹€ components/        # React 缁勪欢
鈹?  鈹?  鈹溾攢鈹€ ui/           # UI 缁勪欢搴?
鈹?  鈹?  鈹斺攢鈹€ Sidebar.tsx   # 渚ц竟鏍?
鈹?  鈹溾攢鈹€ lib/              # 宸ュ叿鍑芥暟
鈹?  鈹溾攢鈹€ package.json
鈹?  鈹溾攢鈹€ tsconfig.json
鈹?  鈹溾攢鈹€ tailwind.config.ts
鈹?  鈹斺攢鈹€ next.config.js
鈹?
鈹溾攢鈹€ backend/               # FastAPI 鍚庣搴旂敤
鈹?  鈹溾攢鈹€ app/
鈹?  鈹?  鈹溾攢鈹€ api/         # API 璺敱
鈹?  鈹?  鈹?  鈹溾攢鈹€ auth.py  # 璁よ瘉鎺ュ彛
鈹?  鈹?  鈹?  鈹斺攢鈹€ workflows.py # 宸ヤ綔娴佹帴鍙?
鈹?  鈹?  鈹溾攢鈹€ schemas/     # Pydantic 妯″瀷
鈹?  鈹?  鈹溾攢鈹€ models.py    # SQLAlchemy 妯″瀷
鈹?  鈹?  鈹溾攢鈹€ database.py  # 鏁版嵁搴撻厤缃?
鈹?  鈹?  鈹溾攢鈹€ config.py    # 閰嶇疆绠＄悊
鈹?  鈹?  鈹斺攢鈹€ main.py      # FastAPI 搴旂敤鍏ュ彛
鈹?  鈹溾攢鈹€ requirements.txt
鈹?  鈹溾攢鈹€ .env
鈹?  鈹斺攢鈹€ run.py
鈹?
鈹溾攢鈹€ docker-compose.yml    # Docker 缂栨帓閰嶇疆
鈹溾攢鈹€ .gitignore
鈹斺攢鈹€ README.md
```

## 馃攼 鍔熻兘鐗规€?

### 宸插疄鐜?

- 鉁?鐢ㄦ埛娉ㄥ唽鍜岀櫥褰?
- 鉁?JWT 璁よ瘉
- 鉁?宸ヤ綔娴佹墽琛岀晫闈?
- 鉁?宸ヤ綔娴佸巻鍙茶褰?
- 鉁?鍝嶅簲寮忚璁?
- 鉁?Magic UI 椋庢牸鍔ㄧ敾
- 鉁?PostgreSQL 鏁版嵁鎸佷箙鍖?
- 鉁?Redis 缂撳瓨鏀寔
- 鉁?Dify API 闆嗘垚

### 璁″垝涓?

- 馃攧 鏇村宸ヤ綔娴佹ā鏉?
- 馃攧 鏁版嵁鍙鍖?
- 馃攧 鎶ュ憡瀵煎嚭
- 馃攧 鐢ㄦ埛鏉冮檺绠＄悊
- 馃攧 澶氳瑷€鏀寔

## 馃帹 鐣岄潰棰勮

### 鐧诲綍/娉ㄥ唽椤甸潰
- 娓愬彉鑳屾櫙璁捐
- 琛ㄥ崟楠岃瘉
- 骞虫粦鍔ㄧ敾杩囨浮

### 宸ヤ綔娴侀〉闈?
- 宸﹀彸鍒嗘爮甯冨眬
- 瀹炴椂杈撳嚭鏄剧ず
- 鍘嗗彶璁板綍绠＄悊
- 渚ц竟鏍忓鑸?

## 馃敡 寮€鍙戞寚鍗?

### 娣诲姞鏂扮殑 API 绔偣

1. 鍦?`backend/app/api/` 鍒涘缓鏂扮殑璺敱鏂囦欢
2. 鍦?`backend/app/schemas/` 瀹氫箟璇锋眰/鍝嶅簲妯″瀷
3. 鍦?`backend/app/main.py` 娉ㄥ唽璺敱

### 娣诲姞鏂扮殑鍓嶇椤甸潰

1. 鍦?`frontend/app/` 鍒涘缓鏂伴〉闈㈢洰褰?
2. 娣诲姞 `page.tsx` 鏂囦欢
3. 濡傞渶甯冨眬锛屾坊鍔?`layout.tsx` 鏂囦欢

### 鏁版嵁搴撹縼绉?

```bash
cd backend
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## 馃悰 甯歌闂

### 绔彛鍐茬獊

濡傛灉绔彛琚崰鐢紝淇敼浠ヤ笅閰嶇疆锛?

- 鍓嶇绔彛锛氫慨鏀?`frontend/package.json` 涓殑 dev 鑴氭湰
- 鍚庣绔彛锛氫慨鏀?`backend/run.py` 涓殑绔彛閰嶇疆
- 鏁版嵁搴撶鍙ｏ細淇敼 `docker-compose.yml`

### 鏁版嵁搴撹繛鎺ュけ璐?

纭繚 Docker 瀹瑰櫒姝ｅ湪杩愯锛?

```bash
docker ps
```

妫€鏌?PostgreSQL 瀹瑰櫒鐘舵€侊細

```bash
docker logs amz-auto-ai-postgres
```

### Dify API 璋冪敤澶辫触

1. 妫€鏌?`DIFY_API_KEY` 鏄惁姝ｇ‘
2. 纭 `DIFY_API_URL` 鏍煎紡姝ｇ‘
3. 楠岃瘉缃戠粶杩炴帴鍜?API 鍙敤鎬?

## 馃摑 鐜鍙橀噺璇存槑

### 鍚庣 (.env)

| 鍙橀噺鍚?| 璇存槑 | 榛樿鍊?|
|--------|------|--------|
| DATABASE_URL | PostgreSQL 杩炴帴瀛楃涓?| - |
| SECRET_KEY | JWT 瀵嗛挜 | - |
| ALGORITHM | 鍔犲瘑绠楁硶 | HS256 |
| ACCESS_TOKEN_EXPIRE_MINUTES | Token 杩囨湡鏃堕棿 | 30 |
| REDIS_URL | Redis 杩炴帴瀛楃涓?| redis://localhost:6379/0 |
| DIFY_API_KEY | Dify API 瀵嗛挜 | - |
| DIFY_API_URL | Dify API 鍦板潃 | https://api.dify.ai/v1 |

## 馃殺 閮ㄧ讲

### 浣跨敤 Docker

```bash
# 鏋勫缓骞跺惎鍔ㄦ墍鏈夋湇鍔?
docker-compose up -d

# 鏌ョ湅鏃ュ織
docker-compose logs -f

# 鍋滄鏈嶅姟
docker-compose down
```

### 鐢熶骇鐜閰嶇疆

1. 鏇存敼榛樿鐨?`SECRET_KEY`
2. 浣跨敤鐜鍙橀噺绠＄悊鏁忔劅淇℃伅
3. 閰嶇疆鍙嶅悜浠ｇ悊锛圢ginx锛?
4. 鍚敤 HTTPS
5. 閰嶇疆鏃ュ織鏀堕泦
6. 璁剧疆鑷姩澶囦唤

## 馃 璐＄尞

娆㈣繋鎻愪氦 Issue 鍜?Pull Request锛?

## 馃搫 璁稿彲璇?

MIT License

## 馃摓 鑱旂郴鏂瑰紡

濡傛湁闂锛岃鎻愪氦 Issue 鎴栬仈绯婚」鐩淮鎶よ€呫€?
# AMZ Auto AI - 鐢靛晢浼樺寲宸ュ叿

AI椹卞姩鐨勪簹椹€婄數鍟嗕紭鍖栧伐鍏凤紝鍩轰簬鐢ㄦ埛璇勪环銆佸浘鐗囧拰甯傚満鏁版嵁鑷姩浼樺寲浜у搧鍒楄〃銆?
## 馃専 鐗规€?
- 馃 **Dify AI 闆嗘垚** - 闆嗘垚 Dify AI 骞冲彴锛屼娇鐢ㄥ師鐢熷伐浣滄祦缂栬緫鍣?  - 鍦?Dify 鍘熺敓鐣岄潰涓彲瑙嗗寲缂栨帓 AI 宸ヤ綔娴?  - 鏀寔澶嶆潅鐨?AI 鑺傜偣杩炴帴鍜岄厤缃?  - 瀹炴椂棰勮鍜岃皟璇曞伐浣滄祦
  - 鏃犵紳闆嗘垚 AI 妯″瀷锛圙PT-4銆丆laude 绛夛級
- 馃搳 **搴旂敤绠＄悊** - 闆嗕腑绠＄悊鎵€鏈?Dify AI 搴旂敤
  - 鏌ョ湅宸ヤ綔娴併€佽亰澶╂満鍣ㄤ汉绛夊簲鐢ㄧ被鍨?  - 缁熻搴旂敤鏁伴噺鍜岀被鍨嬪垎甯?  - 涓€閿烦杞埌 Dify 鍘熺敓缂栬緫鍣?- 馃攼 **瀹夊叏璁よ瘉** - JWT 鐢ㄦ埛璁よ瘉绯荤粺
- 馃帹 **鐜颁唬 UI** - Magic UI 椋庢牸鍔ㄧ敾锛屾祦鐣呯殑鐢ㄦ埛浣撻獙
- 馃摫 **鍝嶅簲寮忚璁?* - 鏀寔妗岄潰鍜岀Щ鍔ㄨ澶?- 鈿?**楂樻€ц兘** - Redis 缂撳瓨 + PostgreSQL 鎸佷箙鍖?- 馃敆 **API 闆嗘垚** - 鍚庣鎻愪緵 Dify API 浠ｇ悊锛屽畨鍏ㄨ繛鎺?Dify

## 馃殌 蹇€熷紑濮?
### Windows 鐢ㄦ埛

鍙屽嚮杩愯 `start.bat` 鍗冲彲鍚姩鎵€鏈夋湇鍔★細

```bash
start.bat
```

杩欏皢鑷姩锛?1. 鍚姩 PostgreSQL 鍜?Redis (Docker)
2. 鍚姩 FastAPI 鍚庣鏈嶅姟
3. 鍚姩 Next.js 鍓嶇鏈嶅姟

鍋滄鎵€鏈夋湇鍔★細

```bash
stop.bat
```

### 鎵嬪姩鍚姩

璇︾粏璇存槑璇锋煡鐪?[PROJECT_SETUP.md](./PROJECT_SETUP.md)

## 馃摉 浣跨敤璇存槑

### Dify 宸ヤ綔娴佺鐞?
1. **閰嶇疆 Dify**
   - 鍦?`frontend/.env` 涓缃?Dify URL锛堥粯璁わ細`http://localhost:3000`锛?   - 鍦?`backend/app/config.py` 涓厤缃?Dify API 瀵嗛挜
   - 纭繚 Dify 鏈嶅姟宸插惎鍔ㄥ苟鍙闂?
2. **娉ㄥ唽璐︽埛** - 璁块棶 http://localhost:3000/auth/register

3. **鐧诲綍绯荤粺** - 浣跨敤娉ㄥ唽鐨勯偖绠卞拰瀵嗙爜鐧诲綍

4. **绠＄悊 Dify 搴旂敤**
   - 杩涘叆宸ヤ綔娴侀〉闈紝鑷姩鍚屾鎵€鏈?Dify 搴旂敤
   - 鏌ョ湅搴旂敤缁熻锛堟€绘暟銆佸伐浣滄祦銆佽亰澶╁簲鐢級
   - 鐐瑰嚮搴旂敤鍗＄墖锛屽湪鏂版爣绛鹃〉鎵撳紑 Dify 鍘熺敓缂栬緫鍣?   - 鍦?Dify 涓紪杈戝伐浣滄祦锛屼娇鐢ㄥ彲瑙嗗寲鑺傜偣缂栬緫鍣?   - 鐐瑰嚮"鎵撳紑 Dify"鎸夐挳璁块棶瀹屾暣鐨?Dify 鐣岄潰

5. **鍒涘缓鏂板伐浣滄祦**
   - 鐐瑰嚮"鍦?Dify 涓垱寤?鎸夐挳
   - 璺宠浆鍒?Dify 搴旂敤鍒涘缓椤甸潰
   - 浣跨敤 Dify 鍘熺敓宸ュ叿鍒涘缓 AI 宸ヤ綔娴?
6. **宸ヤ綔娴佸紑鍙?*
   - 鍦?Dify 鍘熺敓缂栬緫鍣ㄤ腑浣跨敤鑺傜偣鎷栨嫿缂栨帓
   - 閰嶇疆 AI 妯″瀷锛圙PT-4銆丆laude 绛夛級
   - 娣诲姞鏁版嵁澶勭悊銆佹潯浠跺垽鏂€佸惊鐜妭鐐?   - 瀹炴椂娴嬭瘯鍜岃皟璇曞伐浣滄祦
   - 淇濆瓨鍚庤嚜鍔ㄥ悓姝ュ埌鏈郴缁?
## 馃彈锔?鎶€鏈灦鏋?
```
鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?     鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?     鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹? Next.js    鈹傗梽鈹€鈹€鈹€鈹€鈻衡攤  FastAPI    鈹傗梽鈹€鈹€鈹€鈹€鈻衡攤  PostgreSQL 鈹?鈹? (Frontend) 鈹?     鈹?(Backend)   鈹?     鈹? Database   鈹?鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?     鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?     鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?                            鈹?                    鈹?                            鈻?                    鈻?                     鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?        鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?                     鈹? Redis   鈹?        鈹?  Dify   鈹?                     鈹?(Cache)  鈹?        鈹?  API    鈹?                     鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?        鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?```

### 鎶€鏈爤

- **鍓嶇**: Next.js 14, TypeScript, Tailwind CSS, Radix UI, Framer Motion
- **鍚庣**: FastAPI, SQLAlchemy, PostgreSQL, Redis
- **AI**: Dify Platform
- **瀹瑰櫒**: Docker, Docker Compose

## 馃搨 椤圭洰缁撴瀯

```
amz-auto-ai/
鈹溾攢鈹€ frontend/          # Next.js 鍓嶇搴旂敤
鈹?  鈹溾攢鈹€ app/          # 椤甸潰鍜岃矾鐢?鈹?  鈹溾攢鈹€ components/   # React 缁勪欢
鈹?  鈹斺攢鈹€ lib/          # 宸ュ叿鍑芥暟
鈹溾攢鈹€ backend/          # FastAPI 鍚庣搴旂敤
鈹?  鈹斺攢鈹€ app/          # API 鍜岄厤缃?鈹溾攢鈹€ docker-compose.yml # 鏁版嵁搴撶紪鎺?鈹溾攢鈹€ start.bat         # Windows 鍚姩鑴氭湰
鈹斺攢鈹€ stop.bat          # Windows 鍋滄鑴氭湰
```

## 馃敡 閰嶇疆璇存槑

### 鐜鍙橀噺

鍚庣閰嶇疆鏂囦欢 `backend/.env`:

```env
DATABASE_URL=postgresql://amz_user:amz_password@localhost:5433/amz_auto_ai
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REDIS_URL=redis://localhost:6379/0
DIFY_API_KEY=your-dify-api-key
DIFY_API_URL=https://api.dify.ai/v1
```

## 馃搳 鏁版嵁搴撹璁?
### 鐢ㄦ埛琛?(users)
- id, email, username, hashed_password, created_at

### 宸ヤ綔娴佸巻鍙茶〃 (workflow_history)
- id, user_id, name, input_data, output_data, status, created_at

## 馃攼 瀹夊叏鎬?
- 瀵嗙爜浣跨敤 bcrypt 鍔犲瘑瀛樺偍
- JWT Token 璁よ瘉
- CORS 閰嶇疆
- SQL 娉ㄥ叆闃叉姢 (ORM)
- XSS 闃叉姢 (React)

## 馃殺 閮ㄧ讲

璇︾粏閮ㄧ讲鎸囧崡璇峰弬鑰?[PROJECT_SETUP.md](./PROJECT_SETUP.md)

## 馃摑 寮€鍙戣鍒?
- [x] 鐢ㄦ埛璁よ瘉绯荤粺
- [x] 宸ヤ綔娴佹墽琛?- [x] 鍘嗗彶璁板綍绠＄悊
- [ ] 鏁版嵁鍙鍖?- [ ] 鎶ュ憡瀵煎嚭
- [ ] 澶氳瑷€鏀寔
- [ ] 鍥㈤槦鍗忎綔鍔熻兘

## 馃 璐＄尞

娆㈣繋鎻愪氦 Issue 鍜?Pull Request锛?
## 馃搫 璁稿彲璇?
MIT License

## 馃摓 鑱旂郴

濡傛湁闂鎴栧缓璁紝璇锋彁浜?Issue銆?
