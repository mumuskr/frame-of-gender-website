import { useState, useRef, useEffect } from 'react'
import { X, Send, Heart } from 'lucide-react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', content: '喵~ 🐱 您好！我是可爱的AI猫猫助手，有什么可以帮您的吗？喵~ 💕' }
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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
      
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message: text,
        }),
      })

      if (!response.ok) {
        throw new Error('网络请求失败')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // 添加AI回复
      setMessages((m) => [...m, { role: 'ai', content: data.reply }])
      
    } catch (error) {
      console.error('Chat API 错误:', error)
      
      // 显示错误信息
      const errorMessage = error.message === '网络请求失败' 
        ? '无法连接到服务器，请确保后端服务正在运行。' 
        : `抱歉，出现了错误: ${error.message}`
      
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
      {/* 可拖拽的猫猫按钮 */}
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
        className={`fixed z-50 rounded-full p-4 shadow-2xl border border-pink-400/40 bg-gradient-to-r from-pink-500/90 to-purple-600/90 backdrop-blur-lg transition-all duration-300 text-white hover:shadow-pink-500/30 select-none ${
          isDragging 
            ? 'scale-110 shadow-pink-500/50 ring-2 ring-pink-400/50' 
            : 'hover:scale-110'
        } ${isLongPress ? 'animate-pulse' : ''}`}
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            <span className={`text-2xl ${isDragging ? 'animate-spin' : 'animate-bounce'}`}>
              {isDragging ? '�' : '�🐱'}
            </span>
            <Heart className="h-3 w-3 text-pink-300 absolute -top-1 -right-1 animate-pulse" />
            {/* 拖拽提示 */}
            {(showDragTip || (isLongPress && !isDragging)) && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in">
                {isLongPress ? '拖拽移动喵~ 🐾' : '长按可拖拽喵~ 🐱'}
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
              <span className="text-lg">🐱</span>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">AI 猫猫助手</span>
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
            
            {/* 可爱猫猫加载状态 */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-pink-100/10 to-purple-100/10 text-gray-200 border border-pink-300/20 rounded-2xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <span className="animate-bounce text-lg">🐾</span>
                      <span className="animate-bounce text-lg" style={{animationDelay: '0.2s'}}>🐱</span>
                      <span className="animate-bounce text-lg" style={{animationDelay: '0.4s'}}>💭</span>
                    </div>
                    <span className="text-xs text-pink-300">猫猫正在思考喵~</span>
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
              placeholder={isLoading ? "猫猫正在回复喔~" : "告诉猫猫您的问题喔~ 🐱"}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-xl border border-pink-500/30 bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-white hover:scale-105 transition-all duration-200 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-pink-500/25"
            >
              {isLoading ? (
                <span className="animate-spin">🐱</span>
              ) : (
                <span className="text-sm">😺</span>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
