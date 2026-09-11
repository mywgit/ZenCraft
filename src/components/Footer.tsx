"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, TreePine, Sparkles, Heart, FileText, Calculator, Layers, Mail, MessageCircle, X } from "lucide-react";

export function Footer() {
  const { lang, t } = useLanguage();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <footer className="w-full bg-slate-950 border-t border-amber-500/20 text-slate-400 text-xs mt-16">
      {/* Matrix Ecosystem Banner */}
      <div className="border-b border-slate-900 bg-gradient-to-b from-slate-950 to-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>{t("matrixBadge")}</span>
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                {t("matrixTitle")}
              </h4>
              <p className="text-xs text-slate-400">
                {lang === "zh"
                  ? "从纯前端隐私 PDF 办公工具、亚马逊跨境利润计算器，到 Notion 风格创作者微官网。"
                  : "Explore our sister utilities for privacy PDF tools, Amazon FBA fee solvers, and creator bio studios."}
              </p>
            </div>

            {/* Sister Links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://pdf.puretoolhub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-red-400" />
                <span>DocuPure (PDF)</span>
              </a>
              <a
                href="https://calc.puretoolhub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>CalcHub (FBA)</span>
              </a>
              <a
                href="https://bio.puretoolhub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>SnapBio (Bio)</span>
              </a>
              <a
                href="https://tool.puretoolhub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <TreePine className="w-3.5 h-3.5 text-amber-400" />
                <span>ToolHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-serif font-black text-xl">禅</span>
            <span className="text-base font-bold text-white">ZenCraft Atelier</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed font-serif">
            {t("footerText")}
          </p>
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === "zh" ? "100% 宫廷京作野生老料保真认证" : "100% Genuine Imperial Court Wild Timber Certified"}</span>
          </div>
        </div>

        <div>
          <h5 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
            {lang === "zh" ? "探索工坊" : "Atelier Studio"}
          </h5>
          <ul className="space-y-2">
            <li>
              <Link href="/studio" className="hover:text-amber-300 transition-colors">
                ✨ {t("navStudio")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-300 transition-colors">
                🪵 {t("navHeritage")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
            {lang === "zh" ? "品质与保障" : "Guarantee & Ethics"}
          </h5>
          <ul className="space-y-2 text-slate-400">
            <li>• {lang === "zh" ? "零化学浸色与保真承诺" : "Zero Chemical Dyeing Guarantee"}</li>
            <li>• {lang === "zh" ? "京作百年老料合规溯源" : "Ethical Sustainable Timber Sourcing"}</li>
            <li>• {lang === "zh" ? "赠实木礼盒与专属手作证书" : "Free Worldwide Express with Silk Pouch"}</li>
            <li>• {lang === "zh" ? "终身包浆养护指导支持" : "Lifetime Patina Craft Support"}</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h5 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
            {lang === "zh" ? "产品咨询与意见反馈" : "Product Inquiries & Feedback"}
          </h5>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === "zh"
              ? "需要产品咨询、选料建议或意见反馈，欢迎随时联系我们："
              : "For product inquiries, custom sourcing, or feedback, feel free to contact us:"}
          </p>
          <div>
            <a
              href="mailto:support@puretoolhub.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-amber-300 text-xs font-semibold transition-all group"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>support@puretoolhub.com</span>
            </a>
          </div>

          {/* 微信二维码卡片 */}
          <div className="pt-1">
            <div 
              onClick={() => setIsQrModalOpen(true)}
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-amber-500/40 cursor-pointer transition-all group"
            >
              <div className="relative shrink-0">
                <img
                  src="/wechat-qr.jpg"
                  alt="微信顾问二维码"
                  className="w-16 h-16 rounded-xl object-contain bg-white p-1 border border-slate-700 shadow group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{lang === "zh" ? "微信客服 / 顾问" : "WeChat Concierge"}</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  {lang === "zh" ? "扫码添加好友" : "Scan to Add"}
                </p>
                <p className="text-[10px] text-amber-400/80">
                  {lang === "zh" ? "点击查看大图 🔍" : "Click to enlarge 🔍"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 微信二维码放大弹窗 */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="relative bg-[#120a06] border border-amber-500/40 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{lang === "zh" ? "微信顾问 · 一对一专属服务" : "WeChat Concierge Service"}</span>
              </div>
              <h3 className="text-base font-serif font-bold text-amber-100">
                {lang === "zh" ? "扫一扫添加微信" : "Scan QR Code"}
              </h3>
              <p className="text-xs text-slate-400 font-serif">
                {lang === "zh" ? "产品咨询 · 选料建议 · 意见反馈" : "Product inquiries, material advice & feedback"}
              </p>
            </div>

            <div className="flex justify-center p-2">
              <div className="p-2 bg-white rounded-2xl shadow-xl border border-amber-400/30">
                <img
                  src="/wechat-qr.jpg"
                  alt="微信二维码大图"
                  className="w-56 h-auto rounded-xl object-contain"
                />
              </div>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <p>{lang === "zh" ? "支持专属定制搭配方案、选料咨询与售后保障" : "Personalized sizing, timber guidance & aftercare support"}</p>
              <p className="text-amber-300/80 font-mono text-[10px]">
                Email: support@puretoolhub.com
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <p>© 2026 ZenCraft. Built with Eastern Woodworking Heritage & Modern Mindfulness.</p>
        <p>A PureToolHub Matrix Product</p>
      </div>
    </footer>
  );
}
