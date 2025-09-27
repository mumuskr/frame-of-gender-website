import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Zap, Sparkles, Shield, Mail, ArrowRight, Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import ChatWidget from '@/components/ui/ChatWidget';
// 简易组件：容器与区块标题
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// 按钮功能函数
const buttonActions = {
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
  
  buyPro: () => {
    // 这里可以接入支付系统
    alert('💰 专业版购买功能开发中... 请先通过联系表单咨询！');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 1000);
    
    // 真实项目中可以这样：
    // window.open('https://your-payment-page.com/pro', '_blank');
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
};

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
const Navbar = () => {
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
const Hero = () => (
  <section className="relative overflow-hidden">
    <Container className="grid lg:grid-cols-2 gap-10 py-16 sm:py-24 items-center">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight"
        >
          打造你的小而美网站，从这里开始
        </motion.h1>
        <p className="mt-4 text-lg text-muted-foreground">
          一页式现代落地页模板，含功能展示、案例画廊、价格方案和联系表单。基于 React + Tailwind + shadcn/ui，开箱即用、易于二次开发。
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
            title: "即刻上手",
            desc: "清爽的代码结构与风格指南，快速定制你的品牌语气。",
          },
          {
            icon: Zap,
            title: "性能优先",
            desc: "按需渲染与轻量依赖，移动端同样流畅。",
          },
          {
            icon: Shield,
            title: "可访问性",
            desc: "语义化标记与对比度考虑，默认支持键盘导航。",
          },
          {
            icon: Mail,
            title: "联系表单",
            desc: "内置基础表单，可无缝对接任意后端/无服务函数。",
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
      <SectionTitle eyebrow="Showcase" title="案例画廊" description="示意图块位，可替换为你的项目截图、作品集或客户案例。" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm grid place-items-center text-gray-300 hover:bg-white/10 transition-colors duration-300">
            <span className="text-sm">示意图 {i + 1}</span>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// 价格方案
const Pricing = () => (
  <section id="pricing" className="py-16 sm:py-24 border-t border-white/10">
    <Container>
      <SectionTitle eyebrow="Pricing" title="价格方案" description="简单透明，随项目阶段灵活选择。" />
      <div className="grid lg:grid-cols-3 gap-6">
        {[
          {
            name: "入门版",
            price: "¥0",
            features: ["开源模板", "基础组件", "社区支持"],
            cta: "免费使用",
            highlighted: false,
          },
          {
            name: "专业版",
            price: "¥199",
            features: ["扩展组件", "样式主题包", "优先支持"],
            cta: "立即购买",
            highlighted: true,
          },
          {
            name: "企业版",
            price: "定制",
            features: ["按需模块", "品牌定制", "部署支持"],
            cta: "获取报价",
            highlighted: false,
          },
        ].map((tier, i) => (
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
                    if (tier.cta === "免费使用") buttonActions.freeStart();
                    else if (tier.cta === "立即购买") buttonActions.buyPro();
                    else if (tier.cta === "获取报价") buttonActions.getQuote();
                  }}
                  className={`w-full rounded-2xl py-6 text-base font-semibold transition-all duration-300 ${
                    tier.highlighted 
                      ? "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25" 
                      : "hover:scale-105"
                  }`}
                >
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
          <Navbar />
          <Hero />
          <Features />
          <Gallery />
          <Pricing />
          <FAQ />
          <Contact />
          <Footer />
          <ChatWidget />
        </div>
      </div>
    </main>
  );
}
