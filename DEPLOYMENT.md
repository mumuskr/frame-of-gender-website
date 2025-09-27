# Frame of Gender - 部署指南

## 🚀 项目部署

### 前端部署（Vercel）

1. **准备前端代码**
   ```bash
   cd my-web
   npm run build
   ```

2. **部署到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 连接你的 GitHub 账号
   - 导入项目或直接拖拽 `dist` 文件夹
   - 自动部署完成

### 后端部署（Railway）

1. **准备后端代码**
   - 确保 `chat-server` 文件夹包含所有文件
   - 检查 `package.json` 配置正确

2. **部署到 Railway**
   - 访问 [railway.app](https://railway.app)
   - 连接 GitHub 并导入项目
   - 选择 `chat-server` 目录
   - 添加环境变量 `OPENAI_API_KEY`

### 环境变量配置

**Railway 环境变量：**
- `OPENAI_API_KEY`: 你的 OpenAI API 密钥
- `PORT`: 自动配置

**前端 API 地址更新：**
- 将聊天 API 地址从 `localhost:8787` 改为 Railway 提供的域名

## 🌐 域名配置

### 自定义域名
- Vercel: 在项目设置中添加自定义域名
- Railway: 在服务设置中配置域名

## 📱 生产环境优化

### 前端优化
- 开启 Gzip 压缩
- 配置 CDN 加速
- 优化图片资源

### 后端优化
- 添加 CORS 白名单
- 配置请求限制
- 添加错误监控

## 💰 成本估算

- **Vercel**: 免费版足够个人项目使用
- **Railway**: 免费额度 $5/月，付费版 $10/月起
- **OpenAI API**: 按使用量付费，GPT-5 nano 成本很低

## 🔒 安全配置

- API 密钥安全存储
- HTTPS 强制启用
- CORS 策略配置