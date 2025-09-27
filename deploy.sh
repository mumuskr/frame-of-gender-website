#!/bin/bash

# 部署脚本 - Frame of Gender 项目

echo "🚀 开始部署 Frame of Gender 项目..."

# 1. 构建前端
echo "📦 构建前端项目..."
cd my-web
npm install
npm run build
echo "✅ 前端构建完成"

# 2. 准备后端
echo "🔧 准备后端项目..."
cd ../chat-server
npm install
echo "✅ 后端依赖安装完成"

echo "
🎉 项目准备完成！

📋 下一步部署指南:

1. 前端部署到 Vercel:
   - 访问 https://vercel.com
   - 连接 GitHub 并导入项目
   - 选择 my-web 目录
   - 设置环境变量: VITE_API_URL=https://your-backend.railway.app

2. 后端部署到 Railway:
   - 访问 https://railway.app
   - 连接 GitHub 并导入项目
   - 选择 chat-server 目录
   - 设置环境变量: OPENAI_API_KEY=你的密钥

3. 更新 CORS 配置:
   - 在 openai-server.js 中更新域名白名单
   - 添加你的 Vercel 域名

💡 提示: 
   - Vercel 域名格式: https://项目名.vercel.app
   - Railway 域名格式: https://项目名.railway.app
   - 记得在前端环境变量中设置正确的后端 API 地址
"