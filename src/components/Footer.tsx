"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, TreePine, Sparkles, Heart, FileText, Calculator, Layers } from "lucide-react";

export function Footer() {
  const { lang, t } = useLanguage();

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
                href="https://tool.lehuoliaoyu.com"
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
            <span>100% Genuine Dacheng Wild Timber Certified</span>
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
            <li>• Zero Chemical Dyeing Guarantee</li>
            <li>• Ethical Sustainable Timber Sourcing</li>
            <li>• Free Worldwide Express with Silk Pouch</li>
            <li>• Lifetime Patina Craft Support</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
            {lang === "zh" ? "专属高定支持" : "VIP Concierge"}
          </h5>
          <p className="text-xs text-slate-400 mb-2">
            Questions on your custom formula or birth chart reading?
          </p>
          <a
            href="mailto:support@puretoolhub.com"
            className="inline-block px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 text-xs font-semibold transition-colors"
          >
            support@puretoolhub.com
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <p>© 2026 ZenCraft. Built with Eastern Woodworking Heritage & Modern Mindfulness.</p>
        <p>A PureToolHub Matrix Product</p>
      </div>
    </footer>
  );
}
