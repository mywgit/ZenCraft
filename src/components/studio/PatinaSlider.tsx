"use client";

import React from "react";
import { useStudio } from "@/context/StudioContext";
import { useLanguage } from "@/context/LanguageContext";
import { Clock, Sparkles } from "lucide-react";

export function PatinaSlider() {
  const { patinaLevel, setPatinaLevel } = useStudio();
  const { lang, t } = useLanguage();

  const stages = [
    {
      level: 0,
      label: t("patinaRaw"),
      subtitle: lang === "zh" ? "原木初香 · 哑光天然木纹" : "Pure herbal aroma & natural matte grain",
    },
    {
      level: 1,
      label: t("patina1y"),
      subtitle: lang === "zh" ? "微汗滋养 · 丝滑初润" : "Silky satin sheen with daily wear",
    },
    {
      level: 2,
      label: t("patina5y"),
      subtitle: lang === "zh" ? "岁月沉淀 · 玻璃底深邃包浆" : "Deep glassy luster & rich patina",
    },
    {
      level: 3,
      label: t("patina10y"),
      subtitle: lang === "zh" ? "温润如玉 · 琥珀半透老料" : "Translucent jade-like ancient timber",
    },
  ];

  const currentStage = stages[patinaLevel] || stages[1];

  return (
    <div className="w-full zen-wood-card rounded-2xl p-5 space-y-4 relative">
      {/* Title & Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold text-amber-100 font-serif tracking-wide">
            {t("patinaSliderTitle")}
          </span>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-serif font-bold">
          {currentStage.label}
        </span>
      </div>

      {/* Slider Control */}
      <div className="space-y-2.5 px-1">
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={patinaLevel}
          onChange={(e) => setPatinaLevel(Number(e.target.value))}
          className="w-full h-2.5 bg-amber-950/80 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none border border-amber-900/40"
        />

        {/* 4 Stage Labels */}
        <div className="flex justify-between text-xs font-serif pt-1">
          {stages.map((stage) => (
            <button
              key={stage.level}
              onClick={() => setPatinaLevel(stage.level)}
              className={`transition-colors text-center ${
                patinaLevel === stage.level
                  ? "text-amber-300 font-bold scale-105"
                  : "text-amber-200/50 hover:text-amber-200"
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Box */}
      <div className="bg-[#120a06]/90 rounded-xl p-3.5 border border-amber-900/40 text-center space-y-1">
        <p className="text-xs text-amber-200 font-serif italic">
          &ldquo;{currentStage.subtitle}&rdquo;
        </p>
        <p className="text-[11px] text-amber-100/50 font-serif leading-relaxed">
          {t("patinaDesc")}
        </p>
      </div>
    </div>
  );
}
