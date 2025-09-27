import { useState, useRef, useEffect } from 'react'
import { X, Send, Heart } from 'lucide-react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', content: '汪汪！🐾 您好！我是 Cici，您专属的AI狗狗助手！有什么可以帮您的吗？🐾 让我陪您一起探索吧！' }
  ]) // {role:'user'|'ai', content:string}[]

  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => Math.random().toString(36).substring(2))

  // 拖拽相关状态
  const [position, setPosition] = useState({ x: 24, y: 24 }) // 距离右边和下边的像素
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isLongPress, setIsLongPress] = useState(false)
  const [showDragTip, setShowDragTip] = useState(true)
  const buttonRef = useRef(null)

  // 隐藏拖拽提示
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDragTip(false)
    }, 3000) // 3秒后隐藏提示
    
    return () => clearTimeout(timer)
  }, [])

  // 立即开始拖拽准备
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsLongPress(true)
    setDragStart({
      x: e.clientX,
      y: e.clientY
    })
    // 不要立即设置 isDragging，等到真正移动时再设置
  }

  // 触摸开始（移动端支持）
  const handleTouchStart = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    setIsLongPress(true)
    setDragStart({
      x: touch.clientX,
      y: touch.clientY
    })
    // 不要立即设置 isDragging，等到真正移动时再设置
  }

  // 鼠标移动
  const handleMouseMove = (e) => {
    if (!isLongPress) return
    
    // 如果还没开始拖拽，现在开始
    if (!isDragging) {
      setIsDragging(true)
    }
    
    const deltaX = dragStart.x - e.clientX
    const deltaY = dragStart.y - e.clientY
    
    const newX = Math.max(10, Math.min(window.innerWidth - 80, position.x + deltaX))
    const newY = Math.max(10, Math.min(window.innerHeight - 80, position.y + deltaY))
    
    setPosition({ x: newX, y: newY })
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  // 触摸移动
  const handleTouchMove = (e) => {
    if (!isLongPress) return
    
    // 如果还没开始拖拽，现在开始
    if (!isDragging) {
      setIsDragging(true)
    }
    
    const touch = e.touches[0]
    const deltaX = dragStart.x - touch.clientX
    const deltaY = dragStart.y - touch.clientY
    
    const newX = Math.max(10, Math.min(window.innerWidth - 80, position.x + deltaX))
    const newY = Math.max(10, Math.min(window.innerHeight - 80, position.y + deltaY))
    
    setPosition({ x: newX, y: newY })
    setDragStart({ x: touch.clientX, y: touch.clientY })
  }

  // 结束拖拽
  const handleEnd = () => {
    // 如果没有发生拖拽，则打开/关闭聊天
    if (!isDragging) {
      setOpen(v => !v)
    }
    
    setIsDragging(false)
    setIsLongPress(false)
  }

  // 监听全局鼠标和触摸事件
  useEffect(() => {
    if (isLongPress) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleEnd)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleEnd)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleEnd)
      }
    }
  }, [isLongPress, isDragging, dragStart, position])

  const send = async (e) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    // 添加用户消息
    setMessages((m) => [...m, { role: 'user', content: text }])
    setInput('')
    setIsLoading(true)

    try {
      // 调用真实的 OpenAI API - 支持生产环境
      const apiUrl = import.meta.env.VITE_API_URL || 'https://frame-of-gender-website-production.up.railway.app';
      console.log('🔍 API URL:', apiUrl);
      console.log('🔍 环境变量 VITE_API_URL:', import.meta.env.VITE_API_URL);

      // 重试机制 - 最多重试3次
      let response;
      let lastError;
      
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`🔄 尝试第 ${attempt} 次请求...`);
          
          // 30秒超时控制
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000);
          
          response = await fetch(`${apiUrl}/api/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId,
              message: text,
            }),
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          
          break; // 成功了就跳出重试循环
          
        } catch (err) {
          lastError = err;
          console.log(`❌ 第 ${attempt} 次尝试失败:`, err.message);
          
          if (attempt < 3) {
            console.log(`⏳ ${attempt * 2} 秒后重试...`);
            await new Promise(resolve => setTimeout(resolve, attempt * 2000));
          }
        }
      }
      
      if (!response) {
        throw lastError || new Error('所有重试都失败了');
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // 添加AI回复
      setMessages((m) => [...m, { role: 'ai', content: data.reply }])
      
    } catch (error) {
      console.error('Chat API 错误:', error)
      
      // 更友好的错误信息
      let errorMessage = '网络不稳定，请稍后重试 🔄';
      if (error.name === 'AbortError') {
        errorMessage = '请求超时，请稍后重试 ⏰';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = '网络连接失败，请检查网络 🌐';
      } else if (error.message.includes('HTTP 5')) {
        errorMessage = '服务器正在唤醒中，请稍后重试 🚀';
      }
      
      setMessages((m) => [...m, { 
        role: 'ai', 
        content: errorMessage 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* 可拖拽的 Cici 狗狗按钮 */}
      <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
        style={{
          right: `${position.x}px`,
          bottom: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        className={`fixed z-50 rounded-full p-1 shadow-2xl border-2 border-white/30 bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-lg transition-all duration-300 hover:shadow-lg select-none ${
          isDragging 
            ? 'scale-110 shadow-lg ring-2 ring-blue-400/50' 
            : 'hover:scale-110'
        } ${isLongPress ? 'animate-pulse' : ''}`}
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Cici 狗狗头像 - 真实照片 */}
            <img 
              src="/cici.png" 
              alt="Cici狗狗" 
              className={`w-16 h-16 rounded-full object-cover ${isDragging ? 'animate-spin' : 'animate-gentle-bounce'}`}
            />
            <Heart className="h-4 w-4 text-pink-400 absolute -top-2 -right-2 animate-pulse" />
            {/* 拖拽提示 */}
            {(showDragTip || (isLongPress && !isDragging)) && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in">
                {isLongPress ? '拖拽移动汪~ 🐾' : '长按可拖拽汪~ 🐕'}
              </div>
            )}
          </div>
        )}
      </button>

      {/* 智能定位的聊天窗口 */}
      {open && (
        <div 
          style={{
            right: `${Math.min(position.x, window.innerWidth - 320 - 10)}px`,
            bottom: `${Math.max(10, position.y + 80)}px`,
          }}
          className="fixed w-80 h-96 rounded-2xl border border-white/20 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg shadow-2xl shadow-black/50 flex flex-col z-40"
        >
          {/* 头部 */}
          <div className="p-4 border-b border-white/10">
            <h3 className="font-medium text-white flex items-center gap-2">
              <img src="/cici.png" alt="Cici" className="w-8 h-8 rounded-full object-cover" />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Cici AI助手</span>
              <span className="text-sm">💕</span>
            </h3>
          </div>

          {/* 消息区域 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }
              >
                <div
                  className={
                    'max-w-[80%] rounded-2xl px-4 py-2 ' +
                    (m.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-gradient-to-r from-white/10 to-gray-800/30 text-gray-200 border border-white/10')
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            
            {/* 可爱 Cici 加载状态 */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-amber-100/10 to-orange-100/10 text-gray-200 border border-amber-300/20 rounded-2xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <span className="animate-gentle-bounce text-lg">🐾</span>
                      <img src="/cici.png" alt="Cici" className="w-6 h-6 rounded-full animate-gentle-bounce object-cover" style={{animationDelay: '0.2s'}} />
                      <span className="animate-gentle-bounce text-lg" style={{animationDelay: '0.4s'}}>💭</span>
                    </div>
                    <span className="text-xs text-pink-300">cici正在思考~</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 输入区域 */}
          <form onSubmit={send} className="p-4 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50"
              placeholder={isLoading ? "cici正在回复喔~" : "告诉cici您的问题喔~ 🐕"}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-xl border border-pink-500/30 bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-white hover:scale-105 transition-all duration-200 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-pink-500/25"
            >
              {isLoading ? (
                <img src="/cici.png" alt="Cici" className="w-5 h-5 rounded-full animate-spin object-cover" />
              ) : (
                <img src="/cici.png" alt="Cici" className="w-5 h-5 rounded-full object-cover" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  )
}