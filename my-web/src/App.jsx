import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Zap, Sparkles, Shield, Mail, ArrowRight, Menu, X, Github, Linkedin, Twitter, ShoppingCart, CreditCard, Lock, Star, QrCode, Smartphone } from "lucide-react";
import ChatWidget from '@/components/ui/ChatWidget';
// 简易组件：容器与区块标题
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// 购买模态框组件
const PurchaseModal = ({ isOpen, onClose, product }) => {
  const [step, setStep] = useState(1); // 1: 产品详情, 2: 微信支付, 3: 完成
  const [paymentInfo, setPaymentInfo] = useState({
    email: '',
    phone: '',
    agreeToTerms: false
  });
  const [processing, setProcessing] = useState(false);
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

  const generateWeChatQR = async () => {
    if (!paymentInfo.agreeToTerms) {
      alert('请先同意服务条款');
      return;
    }
    
    setProcessing(true);
    // 模拟生成微信支付二维码
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    setQrCodeGenerated(true);
    
    // 自动模拟用户在10秒后扫码支付（可选）
    // setTimeout(() => {
    //   setStep(3);
    // }, 10000);
  };

  const simulatePaymentSuccess = async () => {
    setProcessing(true);
    // 模拟支付确认中
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    setStep(3);
  };

  const resetModal = () => {
    setStep(1);
    setQrCodeGenerated(false);
    setPaymentInfo({
      email: '',
      phone: '',
      agreeToTerms: false
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* 背景遮罩 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* 模态框内容 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl border border-white/20 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* 关闭按钮 */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-8">
            {/* 步骤指示器 */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                    step >= num 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {step > num ? <Check className="h-4 w-4" /> : num}
                  </div>
                  {num < 3 && (
                    <div className={`w-16 h-0.5 mx-2 transition-colors ${
                      step > num ? 'bg-blue-500' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* 步骤 1: 产品详情确认 */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">确认购买</h2>
                  <p className="text-gray-400">请确认您的订单详情</p>
                </div>

                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{product?.name}</h3>
                        <div className="space-y-1">
                          {product?.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                              <Check className="h-4 w-4 text-green-400" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">(4.9/5 - 128 评价)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-300">{product?.price}</div>
                        <div className="text-sm text-gray-400 line-through">¥299</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-2">
                    <Sparkles className="h-4 w-4" />
                    限时优惠
                  </div>
                  <p className="text-sm text-gray-300">
                    新用户专享价！原价 ¥299，现在只需 {product?.price}，节省 ¥100
                  </p>
                </div>

                <Button 
                  onClick={() => setStep(2)} 
                  className="w-full py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                >
                  继续购买 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* 步骤 2: 微信支付 */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Smartphone className="h-6 w-6 text-green-500" />
                    <h2 className="text-2xl font-bold">微信支付</h2>
                  </div>
                  <p className="text-gray-400">使用微信扫码支付，安全便捷</p>
                </div>

                {!qrCodeGenerated ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">邮箱地址 *</label>
                        <Input
                          type="email"
                          value={paymentInfo.email}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your@email.com"
                          required
                          className="bg-white/5 border-white/10"
                        />
                        <p className="text-xs text-gray-400 mt-1">用于接收订单确认和服务详情</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">手机号码（可选）</label>
                        <Input
                          type="tel"
                          value={paymentInfo.phone}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                          placeholder="13800138000"
                          maxLength="11"
                          className="bg-white/5 border-white/10"
                        />
                        <p className="text-xs text-gray-400 mt-1">方便我们提供更好的服务</p>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={paymentInfo.agreeToTerms}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                          className="mt-0.5"
                          required
                        />
                        <label htmlFor="terms" className="text-sm text-gray-300">
                          我已阅读并同意 <a href="#" className="text-green-400 hover:underline">服务条款</a> 和 <a href="#" className="text-green-400 hover:underline">隐私政策</a>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <Lock className="h-4 w-4" />
                      <span>微信支付采用银行级安全加密</span>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        返回
                      </Button>
                      <Button 
                        onClick={generateWeChatQR}
                        disabled={processing || !paymentInfo.email}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      >
                        {processing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            生成中...
                          </div>
                        ) : (
                          <>
                            <QrCode className="mr-2 h-4 w-4" />
                            生成付款码
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* 真实微信收款码 */}
                    <div className="text-center space-y-6">
                      <div className="bg-white rounded-2xl p-6 mx-auto max-w-sm shadow-2xl">
                        <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                          <img 
                            src="/qr-code.jpg" 
                            alt="微信收款码" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // 如果图片加载失败，显示备用内容
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          {/* 备用显示（如果图片加载失败） */}
                          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center" style={{display: 'none'}}>
                            <div className="text-center text-white">
                              <QrCode className="h-16 w-16 mx-auto mb-2" />
                              <p className="text-lg font-bold">微信收款码</p>
                              <p className="text-sm opacity-90">请联系客服获取</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <Smartphone className="h-5 w-5 text-green-500" />
                            <p className="text-gray-800 font-semibold">微信扫码支付</p>
                          </div>
                          <p className="text-gray-600 text-lg font-bold">¥{product?.price?.replace('¥', '')}</p>
                          <p className="text-gray-500 text-sm">{product?.name}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-green-400">请使用微信扫码支付</h3>
                        <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <Smartphone className="h-4 w-4" />
                            <span>打开微信</span>
                          </div>
                          <span>→</span>
                          <div className="flex items-center gap-1">
                            <QrCode className="h-4 w-4" />
                            <span>扫一扫</span>
                          </div>
                          <span>→</span>
                          <div className="flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            <span>完成支付</span>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-green-300 text-sm font-medium mb-3">
                            <Sparkles className="h-4 w-4" />
                            支付说明
                          </div>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">①</span>
                              <span>扫描上方二维码，支付 <strong className="text-green-300">¥{product?.price?.replace('¥', '')}</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">②</span>
                              <span>支付成功后，请点击下方"已完成支付"按钮</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">③</span>
                              <span>我们会在 5 分钟内为您开通服务</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">⚠</span>
                              <span className="text-yellow-200">如遇问题，请通过页面右下角的 Cici 助手联系我们</span>
                            </li>
                          </ul>
                        </div>

                        {/* 模拟支付检测 */}
                        <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm">
                          <div className="w-4 h-4 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
                          <span>等待支付中...</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* 主要支付按钮 */}
                        <Button 
                          onClick={simulatePaymentSuccess}
                          disabled={processing}
                          className="w-full py-4 text-base font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                        >
                          {processing ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              确认支付中...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <Check className="h-5 w-5" />
                              我已完成微信支付
                            </div>
                          )}
                        </Button>
                        
                        {/* 辅助按钮 */}
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setQrCodeGenerated(false);
                              setStep(1);
                            }}
                            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                            disabled={processing}
                          >
                            返回修改
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              // 复制收款信息到剪贴板
                              navigator.clipboard?.writeText(`Cici工作室 - ${product?.name} - ¥${product?.price?.replace('¥', '')}`);
                              alert('已复制支付信息到剪贴板');
                            }}
                            className="flex-1 border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                            disabled={processing}
                          >
                            复制订单信息
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 步骤 3: 完成 */}
            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Check className="h-8 w-8 text-white" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-green-400">微信支付成功！</h2>
                  <p className="text-gray-400">感谢您选择 Cici 的工作室</p>
                </div>

                <Card className="border-green-500/20 bg-green-500/5 text-left">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">订单号:</span>
                      <span className="font-mono text-green-300">#CW{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">产品:</span>
                      <span>{product?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">支付方式:</span>
                      <div className="flex items-center gap-1">
                        <Smartphone className="h-4 w-4 text-green-400" />
                        <span className="text-green-400">微信支付</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">金额:</span>
                      <span className="font-semibold text-green-400">{product?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">邮箱:</span>
                      <span className="text-green-300">{paymentInfo.email}</span>
                    </div>
                    {paymentInfo.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">手机:</span>
                        <span className="text-green-300">{paymentInfo.phone}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-300 text-sm font-medium mb-3">
                    <Sparkles className="h-4 w-4" />
                    购买成功，您将获得：
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-400 flex-shrink-0" />
                      服务详情和使用指南（已发送至邮箱）
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-400 flex-shrink-0" />
                      Cici 专属训练课程访问权限
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-400 flex-shrink-0" />
                      7×24小时在线客服支持
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-400 flex-shrink-0" />
                      7天无理由退款保障
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      // 可以添加查看订单详情的功能
                      alert('订单详情页面开发中...');
                    }}
                    className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                  >
                    查看订单
                  </Button>
                  <Button 
                    onClick={resetModal} 
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    完成购买
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// 按钮功能函数 - 现在接收 setPurchaseModal 参数
const createButtonActions = (setPurchaseModal) => ({
  // 立即体验 - 滚动到联系表单
  startExperience: () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  },
  
  // 立即开始 - 可以跳转到注册页面或显示弹窗
  getStarted: () => {
    // 方法1: 弹出提示
    alert('🚀 欢迎开始！请填写下方联系表单，我们会尽快与您联系。');
    // 然后滚动到表单
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 1000);
    
    // 方法2: 跳转到外部链接（如果有的话）
    // window.open('https://your-signup-page.com', '_blank');
  },
  
  // 查看功能 - 滚动到功能区域
  viewFeatures: () => {
    document.getElementById('features')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  },
  
  // 价格方案按钮
  freeStart: () => {
    alert('🎉 免费方案已选择！请填写下方表单获取免费模板。');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 1000);
  },
  
  buyPro: (product) => {
    // 打开购买模态框
    setPurchaseModal({ isOpen: true, product });
  },
  
  getQuote: () => {
    alert('📋 企业定制服务！请填写详细需求，我们会为您定制报价方案。');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 1000);
  }
});

const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="text-center mb-10">
    {eyebrow && (
      <span className="inline-block rounded-full border px-3 py-1 text-xs tracking-wide uppercase opacity-70">
        {eyebrow}
      </span>
    )}
    <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">{title}</h2>
    {description && (
      <p className="mt-3 text-gray-300 max-w-2xl mx-auto">{description}</p>
    )}
  </div>
);

// 顶部导航
const Navbar = ({ buttonActions }) => {
  const [open, setOpen] = useState(false);
  const navItems = [
    { label: "功能", href: "#features" },
    { label: "案例", href: "#gallery" },
    { label: "价格", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "联系", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/70 border-b border-white/10">
      <Container className="flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5" />
          <span>Frame of Gender</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} className="text-sm hover:opacity-80">
              {n.label}
            </a>
          ))}
          <Button size="sm" className="rounded-2xl" onClick={buttonActions.startExperience}>立即体验</Button>
        </nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>
      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-lg">
          <Container className="py-4 flex flex-col gap-4">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2">
                {n.label}
              </a>
            ))}
            <Button className="rounded-2xl" onClick={() => { setOpen(false); buttonActions.startExperience(); }}>立即体验</Button>
          </Container>
        </div>
      )}
    </header>
  );
};

// 首屏 Hero
const Hero = ({ buttonActions }) => (
  <section className="relative overflow-hidden">
    <Container className="grid lg:grid-cols-2 gap-10 py-16 sm:py-24 items-center">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight"
        >
          CiCi的工作室
        </motion.h1>
        <p className="mt-4 text-lg text-muted-foreground">
          早上不吃饭的狗子不是好助手。这里是Cici的工作室，解决你家狗狗的各种问题
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button className="rounded-2xl inline-flex items-center gap-2" onClick={buttonActions.getStarted}>
            立即开始 <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="rounded-2xl text-black hover:text-black" asChild>
            <a href="#features">查看功能</a>
          </Button>
        </div>
        <div className="mt-6 flex items-center gap-6 opacity-80 text-sm">
          <div className="flex items-center gap-2"><Shield className="h-4 w-4" />内置可访问性</div>
          <div className="flex items-center gap-2"><Zap className="h-4 w-4" />快速加载</div>
          <div className="flex items-center gap-2"><Check className="h-4 w-4" />响应式布局</div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-30 -z-10" style={{background: "radial-gradient(600px 200px at 50% 20%, hsl(var(--primary)/.2), transparent)"}}/>
          <Card className="rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle>一键配置 · 极速上线</CardTitle>
              <CardDescription>预置样式 + 组件，让你专注内容与发布。</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {[
                  "首屏 Hero 与行动按钮",
                  "功能模块与案例画廊",
                  "价格卡片与 FAQ",
                  "联系表单（仅前端）",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> {t}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Container>
  </section>
);

// 功能区块
const Features = () => (
  <section id="features" className="py-16 sm:py-24 border-t border-white/10">
    <Container>
      <SectionTitle eyebrow="Features" title="核心功能" description="即插即用的组件模块，帮助你快速搭建品牌主页或个人站点。" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: Sparkles,
            title: "吃饭不上厕所",
            desc: "cici工作室让你的狗狗养成良好的习惯。",
          },
          {
            icon: Zap,
            title: "吃饭不喝水",
            desc: "cici工作室让你的狗狗养成良好的习惯。",
          },
          {
            icon: Shield,
            title: "不会吃饭",
            desc: "cici工作室让你的狗狗养成良好的习惯。",
          },
          {
            icon: Mail,
            title: "联系表单",
            desc: "cici工作室让你的狗狗养成良好的习惯。",
          },
          {
            icon: Check,
            title: "组件化",
            desc: "基于 shadcn/ui 的卡片、按钮、手风琴等常用组件。",
          },
          {
            icon: ArrowRight,
            title: "可扩展",
            desc: "新增章节、博客、文档或国际化都非常容易。",
          },
        ].map((f, i) => (
          <Card key={i} className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-gray-800/20 hover:from-white/10 hover:to-primary/10 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-2 backdrop-blur-lg">
            <CardHeader className="space-y-6 p-8">
              <div className="flex items-center justify-center h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-purple-500/10 border border-blue-400/30 shadow-xl shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <f.icon className="h-8 w-8 text-blue-400 group-hover:text-cyan-300 transition-colors duration-300" />
              </div>
              <div className="space-y-3">
                <CardTitle className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">{f.title}</CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed">{f.desc}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Container>
  </section>
);

// 画廊示例
const Gallery = () => (
  <section id="gallery" className="py-16 sm:py-24 border-t border-white/10">
    <Container>
      <SectionTitle eyebrow="Showcase" title="案例画廊" description="Cici 工作室的真实训练效果展示。" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 第一个位置：狗狗扫地视频 */}
        <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 group relative">
          <video 
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onError={(e) => {
              // 如果视频加载失败，显示备用内容
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          >
            <source src="/dog-cleaning-video.mp4" type="video/mp4" />
            您的浏览器不支持视频播放
          </video>
          {/* 备用显示（如果视频加载失败） */}
          <div className="w-full h-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center text-gray-300" style={{display: 'none'}}>
            <div className="text-center">
              <span className="text-4xl mb-2 block">🐕‍🦺</span>
              <span className="text-sm font-medium">狗狗扫地训练</span>
            </div>
          </div>
          {/* 悬停时显示的标题 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <h3 className="font-semibold text-sm">Cici 扫地训练</h3>
              <p className="text-xs opacity-90 mt-1">专业家务技能培训</p>
            </div>
          </div>
        </div>
        
        {/* 其余5个示例图 */}
        {[...Array(5)].map((_, i) => (
          <div key={i + 1} className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm grid place-items-center text-gray-300 hover:bg-white/10 transition-colors duration-300">
            <span className="text-sm">示意图 {i + 2}</span>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// 价格方案
const Pricing = ({ buttonActions }) => {
  const pricingTiers = [
    {
      name: "一天不吃饭版",
      price: "¥1",
      features: ["不吃饭", "发脾气", "乱咬人"],
      cta: "立即购买",
      highlighted: false,
    },
    {
      name: "2天不吃饭版",
      price: "¥199",
      features: ["脾气倔", "爱乱叫", "不老实"],
      cta: "立即购买",
      highlighted: true,
    },
    {
      name: "一周不吃饭版",
      price: "定制",
      features: ["会用马桶", "会做家务", "听懂人话"],
      cta: "获取报价",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 border-t border-white/10">
      <Container>
        <SectionTitle eyebrow="Pricing" title="价格方案" description="简单透明，随项目阶段灵活选择。" />
        <div className="grid lg:grid-cols-3 gap-6">
          {pricingTiers.map((tier, i) => (
            <Card key={i} className={`group relative rounded-3xl border-0 p-1 transition-all duration-300 hover:-translate-y-3 ${
              tier.highlighted 
                ? "bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-purple-500/20 shadow-2xl shadow-blue-500/25 border border-blue-400/30" 
                : "bg-gradient-to-br from-white/5 to-gray-800/20 shadow-2xl shadow-black/50 border border-white/10"
            }`}>
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    推荐方案
                  </span>
                </div>
              )}
              <div className={`rounded-3xl p-8 h-full backdrop-blur-lg ${tier.highlighted ? "bg-white/10" : "bg-white/5"}`}>
                <CardHeader className="p-0 space-y-4">
                  <CardTitle className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold">{tier.name}</span>
                    <span className={`text-4xl font-extrabold ${tier.highlighted ? "text-blue-300" : "text-white"}`}>
                      {tier.price}
                    </span>
                  </CardTitle>
                  <CardDescription className="text-base text-gray-300">适合{tier.name}的典型场景</CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6">
                  <ul className="space-y-4 text-sm mb-8">
                    {tier.features.map((ft) => (
                      <li key={ft} className="flex items-center gap-3">
                        <Check className={`h-5 w-5 ${tier.highlighted ? "text-blue-300" : "text-green-400"} flex-shrink-0`} />
                        <span className="text-gray-200">{ft}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => {
                      if (tier.cta === "立即购买") {
                        buttonActions.buyPro(tier);
                      } else if (tier.cta === "获取报价") {
                        buttonActions.getQuote();
                      }
                    }}
                    className={`w-full rounded-2xl py-6 text-base font-semibold transition-all duration-300 ${
                      tier.highlighted 
                        ? "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 group-hover:scale-105" 
                        : "hover:scale-105"
                    }`}
                  >
                    {tier.cta === "立即购买" && (
                      <ShoppingCart className="mr-2 h-4 w-4" />
                    )}
                    {tier.cta}
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

// FAQ
const FAQ = () => (
  <section id="faq" className="py-16 sm:py-24 border-t border-white/10">
    <Container>
      <SectionTitle eyebrow="FAQ" title="常见问题" />
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger>这个模板如何部署？</AccordionTrigger>
          <AccordionContent>你可以将代码导出到任意框架（如 Vite/Next.js），再部署到 Vercel、Netlify 或你自己的服务器。</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>能否接入后端服务？</AccordionTrigger>
          <AccordionContent>可以。联系表单提供 onSubmit 回调，方便对接自建 API、Serverless 函数或第三方表单服务。</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>是否支持多语言？</AccordionTrigger>
          <AccordionContent>支持。你可以为文案增加字典与切换按钮，或接入 i18n 方案。</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Container>
  </section>
);

// 联系表单（仅前端示例）
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // 这里可以改为真实的 API 调用
    await new Promise((r) => setTimeout(r, 800));
    alert(`已提交：\n姓名：${values.name}\n邮箱：${values.email}\n留言：${values.message}`);
    setLoading(false);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-white/10">
      <Container>
        <SectionTitle eyebrow="Contact" title="联系我/我们" description="有需求就说出来：合作、外包、设计、开发、部署，一站式实现。" />
        <Card className="rounded-3xl max-w-2xl mx-auto border border-white/20 bg-gradient-to-br from-white/10 to-gray-800/20 shadow-2xl shadow-black/50 hover:shadow-blue-500/25 transition-all duration-300 backdrop-blur-lg">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-200 font-medium">姓名</label>
                  <Input value={values.name} onChange={(e) => setValues(v => ({...v, name: e.target.value}))} placeholder="你的名字" required />
                </div>
                <div>
                  <label className="text-sm text-gray-200 font-medium">邮箱</label>
                  <Input type="email" value={values.email} onChange={(e) => setValues(v => ({...v, email: e.target.value}))} placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-200 font-medium">留言</label>
                <Textarea value={values.message} onChange={(e) => setValues(v => ({...v, message: e.target.value}))} placeholder="说说你的想法..." rows={5} required />
              </div>
              <Button type="submit" className="rounded-2xl" disabled={loading}>
                {loading ? "提交中..." : "发送消息"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-white/10 py-10">
    <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
      <p className="opacity-70 text-gray-300">© 2025 Your Brand. All rights reserved.</p>
      <div className="flex items-center gap-3 opacity-80">
        <a href="#" aria-label="GitHub" className="hover:opacity-75"><Github className="h-5 w-5"/></a>
        <a href="#" aria-label="LinkedIn" className="hover:opacity-75"><Linkedin className="h-5 w-5"/></a>
        <a href="#" aria-label="Twitter" className="hover:opacity-75"><Twitter className="h-5 w-5"/></a>
      </div>
    </Container>
  </footer>
);

export default function App() {
  // 购买模态框状态
  const [purchaseModal, setPurchaseModal] = useState({
    isOpen: false,
    product: null
  });

  // 创建按钮功能对象
  const buttonActions = createButtonActions(setPurchaseModal);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <div className="relative">
        {/* 深色科技背景效果 */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900/90 via-gray-900/95 to-black/98 pointer-events-none"></div>
        <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* 内容层 */}
        <div className="relative z-10">
          <Navbar buttonActions={buttonActions} />
          <Hero buttonActions={buttonActions} />
          <Features />
          <Gallery />
          <Pricing buttonActions={buttonActions} />
          <FAQ />
          <Contact />
          <Footer />
          <ChatWidget />
        </div>

        {/* 购买模态框 */}
        <PurchaseModal
          isOpen={purchaseModal.isOpen}
          onClose={() => setPurchaseModal({ isOpen: false, product: null })}
          product={purchaseModal.product}
        />
      </div>
    </main>
  );
}
