console.log('开始启动服务器...');

import express from 'express';
import cors from 'cors';

console.log('导入模块成功');

const app = express();
const port = 8787;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: '服务器正常运行！' });
});

app.post('/api/chat', (req, res) => {
  console.log('收到聊天请求:', req.body);
  res.json({ reply: '这是一个测试回复，OpenAI 集成正在配置中...' });
});

app.listen(port, () => {
  console.log(`🚀 测试服务器启动成功！`);
  console.log(`📍 地址: http://localhost:${port}`);
  console.log(`🧪 测试地址: http://localhost:${port}/test`);
});

console.log('服务器配置完成，正在监听端口...');