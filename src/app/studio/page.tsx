"use client";

import React from "react";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";
import { useLanguage } from "@/context/LanguageContext";

export default function StudioPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {lang === "zh" ? "ZenCraft 360° 交互式串珠定制工作台" : "ZenCraft DIY Customizer Studio"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-serif">
          {lang === "zh"
            ? "在 360° 环形画布上自由排列圣木与晶石，观察十年包浆温润蜕变，实时推演您的专属身心能量测评。"
            : "Arrange beads in real-time 360° canvas, observe living patina evolution, and generate your custom energy profile."}
        </p>
      </div>

      <StudioWorkspace />
    </div>
  );
}
