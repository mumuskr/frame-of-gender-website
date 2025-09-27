# Frame of Gender 🐱✨

一个现代化的深色主题网站，配备可爱的猫猫AI聊天助手，支持GPT-5 nano驱动的智能对话。

## 🌟 功能特点

### 🎨 前端功能
- **响应式深色主题设计** - 现代科技感界面
- **交互式导航** - 平滑滚动和动画效果
- **功能展示区域** - 产品特性介绍
- **定价方案** - 多层级定价展示
- **FAQ问答** - 常见问题解答
- **联系表单** - 完整的用户反馈系统

### 🐱 AI聊天助手
- **可爱猫猫主题** - 粉色渐变UI设计
- **可拖拽按钮** - 随意移动聊天按钮位置
- **GPT-5 nano驱动** - 最新最快的AI模型
- **会话记忆** - 智能上下文理解
- **实时对话** - 流畅的聊天体验

## 🚀 快速开始

### 本地开发

1. **克隆项目**
   ```bash
   git clone <your-repo>
   cd accounting
   ```

2. **启动前端**
   ```bash
   cd my-web
   npm install
   npm run dev
   # 访问 http://localhost:5173
   ```

3. **配置后端**
   ```bash
   cd ../chat-server
   npm install
   # 在 .env 文件中添加你的 OpenAI API 密钥
   echo "OPENAI_API_KEY=your_api_key_here" > .env
   ```

4. **启动后端**
   ```bash
   npm run dev
   # 后端运行在 http://localhost:8787
   ```

### 🌐 部署上线

#### 方法一：一键部署（推荐）

1. **运行部署脚本**
   ```bash
   # Windows
   deploy.bat
   
   # Linux/Mac
   chmod +x deploy.sh
   ./deploy.sh
   ```

#### 方法二：手动部署

**前端部署（Vercel）：**
1. 访问 [vercel.com](https://vercel.com)
2. 连接GitHub导入项目
3. 选择 `my-web` 目录
4. 设置环境变量：
   - `VITE_API_URL`: 你的后端API地址

**后端部署（Railway）：**
1. 访问 [railway.app](https://railway.app)
2. 连接GitHub导入项目  
3. 选择 `chat-server` 目录
4. 设置环境变量：
   - `OPENAI_API_KEY`: 你的OpenAI API密钥
   - `PORT`: 自动配置

## 📁 项目结构

```
accounting/
├── my-web/                 # 前端项目 (React + Vite)
│   ├── src/
│   │   ├── components/ui/  # UI组件
│   │   │   ├── ChatWidget.jsx    # 猫猫聊天组件
│   │   │   ├── button.tsx        # 按钮组件
│   │   │   └── ...
│   │   ├── App.jsx        # 主应用组件
│   │   └── main.jsx       # 入口文件
│   ├── package.json
│   └── vercel.json        # Vercel部署配置
│
├── chat-server/           # 后端API服务
│   ├── openai-server.js   # GPT-5 nano API服务
│   ├── package.json
│   ├── Procfile          # Railway部署配置
│   └── .env              # 环境变量配置
│
├── deploy.bat            # Windows部署脚本
├── deploy.sh             # Linux/Mac部署脚本
└── DEPLOYMENT.md         # 详细部署指南
```

## 🛠 技术栈

### 前端
- **React 18** - 现代化React框架
- **Vite** - 快速构建工具
- **Tailwind CSS** - 原子化CSS框架
- **shadcn/ui** - 高质量组件库
- **Framer Motion** - 动画效果库
- **Lucide React** - 现代图标库

### 后端  
- **Node.js** - JavaScript运行时
- **Express** - Web框架
- **OpenAI API** - GPT-5 nano AI模型
- **CORS** - 跨域资源共享
- **dotenv** - 环境变量管理

## 🎨 设计特色

- **深色科技主题** - 现代化视觉体验
- **响应式设计** - 完美适配各种设备
- **玻璃材质效果** - 现代UI设计趋势
- **流畅动画** - 提升用户交互体验
- **可爱猫猫元素** - 独特的品牌特色

## 💰 成本估算

- **Vercel前端托管**: 免费
- **Railway后端托管**: $10/月
- **OpenAI GPT-5 nano**: 按使用量付费
  - Input: $0.050/1M tokens
  - Output: $0.400/1M tokens

## 📝 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系我们

- 网站: [your-website.com](https://your-website.com)
- 邮箱: your-email@example.com
- GitHub: [your-github](https://github.com/your-username)

---

**Made with 💕 by Frame of Gender Team**

*让AI聊天变得更可爱！🐱*