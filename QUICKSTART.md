# 🚀 快速启动指南

## 本地运行

### 1. 启动前端
```bash
cd my-web
npm install
npm run dev
```
**访问：** http://localhost:5173

### 2. 启动后端  
```bash
cd chat-server
npm install
# 添加你的OpenAI API密钥到 .env 文件
echo "OPENAI_API_KEY=your_key_here" > .env
npm run dev
```
**API地址：** http://localhost:8787

## 🌐 一键部署

### Windows用户：
```cmd
deploy.bat
```

### Linux/Mac用户：
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📋 部署清单

- [ ] 获取 OpenAI API 密钥
- [ ] 注册 Vercel 账号（前端）
- [ ] 注册 Railway 账号（后端）
- [ ] 运行部署脚本
- [ ] 配置环境变量
- [ ] 测试生产环境

## 💡 重要提示

1. **API密钥安全**：永远不要将API密钥提交到代码仓库
2. **CORS配置**：部署后记得更新CORS白名单
3. **环境变量**：确保生产环境变量正确配置
4. **域名配置**：部署后更新ChatWidget中的API地址

## 🆘 常见问题

**Q: ChatWidget无法聊天？**  
A: 检查后端是否运行，API密钥是否正确

**Q: 部署失败？**  
A: 检查环境变量配置，查看详细错误日志

**Q: 样式不正常？**  
A: 确保Tailwind CSS正确构建

---

详细部署说明请查看：[DEPLOYMENT.md](DEPLOYMENT.md)