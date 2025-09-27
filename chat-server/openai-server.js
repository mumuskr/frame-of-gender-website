import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

console.log('🚀 启动 OpenAI 聊天服务器...');

const app = express();

// CORS 配置 - 生产环境安全设置
const corsOptions = {
  origin: [
    'https://frame-of-gender-website.vercel.app',
    'https://frame-of-gender-website-git-main-mumuskrs-projects.vercel.app',
    'https://frame-of-gender-website-639p4x9hg-mumuskrs-projects.vercel.app',
    'http://localhost:5173', 
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// 初始化 OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('✅ OpenAI 客户端初始化完成');

// 存储会话历史
const sessions = new Map();

app.post('/api/chat', async (req, res) => {
  try {
    console.log('📨 收到聊天请求:', req.body);
    
    const { sessionId, message } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: '缺少必要参数' });
    }

    // 获取或创建会话历史
    let conversation = sessions.get(sessionId) || [
      {
        role: 'system',
        content: '你是一个友好的AI助手。请用中文简洁地回答用户的问题。每次回答都要有具体内容，不能回复空白。'
      }
    ];

    // 添加用户消息
    conversation.push({ role: 'user', content: message });

    console.log('🤖 调用 OpenAI API...');
    console.log('📤 发送的消息:', JSON.stringify(conversation, null, 2));

    let completion;
    try {
      // 首先尝试 GPT-5 nano
      completion = await openai.chat.completions.create({
        model: 'gpt-5-nano',
        messages: conversation,
      });
      
      // 检查是否有实际内容
      if (!completion.choices[0].message.content || completion.choices[0].message.content.trim() === '') {
        console.log('⚠️ GPT-5 nano 返回空内容，尝试 GPT-4o-mini...');
        // 备用：使用 GPT-4o-mini
        completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: conversation,
          max_tokens: 2000,
          temperature: 0.7,
        });
      }
    } catch (error) {
      console.log('⚠️ GPT-5 nano 调用失败，使用 GPT-4o-mini 备用:', error.message);
      // 备用：使用 GPT-4o-mini
      completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: conversation,
        max_tokens: 150,
        temperature: 0.7,
      });
    }

    const aiReply = completion.choices[0].message.content;
    console.log('✅ OpenAI 回复:', aiReply);
    console.log('📝 完整响应:', JSON.stringify(completion, null, 2));

    // 检查回复是否为空
    if (!aiReply || aiReply.trim() === '') {
      console.log('⚠️ OpenAI 返回了空回复，使用备用回复');
      const fallbackReply = '抱歉，我现在遇到了一些问题。请稍后再试或者换个问题问我。';
      conversation.push({ role: 'assistant', content: fallbackReply });
      return res.json({ reply: fallbackReply });
    }

    // 添加AI回复到会话历史
    conversation.push({ role: 'assistant', content: aiReply });

    // 保存会话（限制历史长度）
    if (conversation.length > 20) {
      conversation = [conversation[0], ...conversation.slice(-19)];
    }
    sessions.set(sessionId, conversation);

    res.json({ reply: aiReply });

  } catch (error) {
    console.error('❌ OpenAI API 错误:', error);
    
    // 提供友好的错误回复
    let errorMessage = '抱歉，我现在遇到了一些技术问题。请稍后再试。';
    
    if (error.code === 'insufficient_quota') {
      errorMessage = '抱歉，API 配额已用完。请联系管理员。';
    } else if (error.code === 'invalid_api_key') {
      errorMessage = '抱歉，API 配置有误。请联系管理员。';
    } else if (error.message?.includes('billing')) {
      errorMessage = '抱歉，API 账户需要充值。请联系管理员。';
    }

    res.json({ reply: errorMessage });
  }
});

// 健康检查端点
app.get('/test', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OpenAI Chat server is running',
    hasApiKey: !!process.env.OPENAI_API_KEY
  });
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`🚀 OpenAI 聊天服务器启动成功！`);
  console.log(`📍 地址: http://localhost:${port}`);
  console.log(`🧪 测试地址: http://localhost:${port}/test`);
  console.log(`🔑 API Key 状态: ${process.env.OPENAI_API_KEY ? '已配置' : '未配置'}`);
});