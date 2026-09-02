"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/lib/i18n";
import { Sparkles, ChevronDown, Menu, X } from "lucide-react";

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#100a06]/85 border-b border-amber-900/40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo with Cinnabar Seal */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-amber-800 p-0.5 shadow-lg shadow-red-950/60 flex items-center justify-center border border-red-500/40">
            <span className="text-white font-serif font-black text-lg group-hover:scale-110 transition-transform">
              禅
            </span>
          </div>
          <div>
            <span className="text-lg font-bold font-serif text-amber-100 tracking-wide flex items-center gap-1.5">
              ZenCraft
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30">
                {lang === "zh" ? "造物坊" : "Atelier"}
              </span>
            </span>
            <p className="text-[10px] text-amber-200/60 font-serif line-clamp-1 hidden sm:block">
              {t("siteTagline")}
            </p>
          </div>
        </Link>

        {/* Desktop Nav (新中式流线) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#160d08]/80 p-1.5 rounded-2xl border border-amber-900/50">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
              pathname === "/"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-950/50"
            }`}
          >
            {t("navHome")}
          </Link>
          <Link
            href="/studio"
            className={`px-4 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
              pathname === "/studio"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-950/50"
            }`}
          >
            ✨ {t("navStudio")}
          </Link>
          <Link
            href="/market"
            className={`px-4 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
              pathname === "/market"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-950/50"
            }`}
          >
            🏛️ {lang === "zh" ? "现成集市" : "Market"}
          </Link>
          <Link
            href="/about"
            className={`px-4 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
              pathname === "/about"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-950/50"
            }`}
          >
            🪵 {t("navHeritage")}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#160d08] hover:bg-[#20140c] border border-amber-900/50 text-xs font-serif text-amber-200 hover:text-amber-100 transition-colors"
            >
              <span>{currentLangObj.flag}</span>
              <span className="hidden sm:inline font-bold">{currentLangObj.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#160d08] border border-amber-900/60 rounded-2xl shadow-2xl py-1.5 z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs font-serif flex items-center gap-2 transition-colors ${
                      lang === l.code
                        ? "bg-amber-500/15 text-amber-300 font-bold"
                        : "text-amber-200/70 hover:bg-amber-950/50"
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
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-100 font-serif font-bold text-xs rounded-xl shadow-lg shadow-amber-950/60 border border-amber-400/30 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t("startDesigning")}</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#160d08] border border-amber-900/50 text-amber-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#120a06] border-b border-amber-900/50 px-4 py-3 space-y-2">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-serif font-bold text-amber-200 hover:bg-amber-950/60"
          >
            {t("navHome")}
          </Link>
          <Link
            href="/studio"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-serif font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30"
          >
            ✨ {t("navStudio")}
          </Link>
          <Link
            href="/market"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-serif font-bold text-amber-200 hover:bg-amber-950/60"
          >
            🏛️ {lang === "zh" ? "现成集市" : "Market"}
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-serif font-bold text-amber-200 hover:bg-amber-950/60"
          >
            🪵 {t("navHeritage")}
          </Link>
        </div>
      )}
    </header>
  );
}
