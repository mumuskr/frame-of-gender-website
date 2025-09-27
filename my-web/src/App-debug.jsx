import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <div className="relative">
        {/* 深色科技背景效果 */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900/90 via-gray-900/95 to-black/98 pointer-events-none"></div>
        <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
        
        {/* 内容层 */}
        <div className="relative z-10 py-16">
          <Container>
            <h1 className="text-4xl font-bold text-center">调试版本</h1>
            <p className="text-center mt-4 text-xl">基本组件测试</p>
            <div className="text-center mt-8">
              <Button className="rounded-2xl">测试按钮</Button>
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
}