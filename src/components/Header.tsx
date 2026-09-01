"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES, Language } from "@/lib/i18n";
import { Sparkles, Globe, TreePine, Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-950/50 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-amber-400 font-serif font-black text-lg group-hover:scale-110 transition-transform">
                禅
              </span>
            </div>
          </div>
          <div>
            <span className="text-lg font-black text-white tracking-tight flex items-center gap-1">
              ZenCraft
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Atelier
              </span>
            </span>
            <p className="text-[10px] text-slate-400 font-serif line-clamp-1 hidden sm:block">
              {t("siteTagline")}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-2xl border border-slate-800">
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            {t("navHome")}
          </Link>
          <Link
            href="/studio"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/studio"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            ✨ {t("navStudio")}
          </Link>
          <Link
            href="/about"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/about"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🪵 {t("navHeritage")}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <span>{currentLangObj.flag}</span>
              <span className="hidden sm:inline font-medium">{currentLangObj.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl py-1 z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 transition-colors ${
                      lang === l.code
                        ? "bg-amber-500/10 text-amber-300 font-bold"
                        : "text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-950/40 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("startDesigning")}</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 space-y-2">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-900"
          >
            {t("navHome")}
          </Link>
          <Link
            href="/studio"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20"
          >
            ✨ {t("navStudio")}
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-900"
          >
            🪵 {t("navHeritage")}
          </Link>
        </div>
      )}
    </header>
  );
}
