@echo off
REM Windows 部署脚本 - Frame of Gender 项目

echo 🚀 开始部署 Frame of Gender 项目...

REM 1. 构建前端
echo 📦 构建前端项目...
cd my-web
call npm install
call npm run build
echo ✅ 前端构建完成

REM 2. 准备后端
echo 🔧 准备后端项目...
cd ..\chat-server
call npm install
echo ✅ 后端依赖安装完成

echo.
echo 🎉 项目准备完成！
echo.
echo 📋 下一步部署指南:
echo.
echo 1. 前端部署到 Vercel:
echo    - 访问 https://vercel.com
echo    - 连接 GitHub 并导入项目
echo    - 选择 my-web 目录
echo    - 设置环境变量: VITE_API_URL=https://your-backend.railway.app
echo.
echo 2. 后端部署到 Railway:
echo    - 访问 https://railway.app
echo    - 连接 GitHub 并导入项目
echo    - 选择 chat-server 目录
echo    - 设置环境变量: OPENAI_API_KEY=你的密钥
echo.
echo 3. 更新 CORS 配置:
echo    - 在 openai-server.js 中更新域名白名单
echo    - 添加你的 Vercel 域名
echo.
echo 💡 提示: 
echo    - Vercel 域名格式: https://项目名.vercel.app
echo    - Railway 域名格式: https://项目名.railway.app
echo    - 记得在前端环境变量中设置正确的后端 API 地址

pause