"use client";

import React from "react";
import { useStudio } from "@/context/StudioContext";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Clock, Compass } from "lucide-react";

export function PatinaSlider() {
  const { patinaLevel, setPatinaLevel } = useStudio();
  const { lang, t } = useLanguage();

  const stages = [
    {
      level: 0,
      label: t("patinaRaw"),
      subtitle: lang === "zh" ? "纯净木香 · 哑光天然木纹" : "Pure herbal aroma & natural matte grain",
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
    <div className="w-full bg-slate-900/60 backdrop-blur-md rounded-2xl border border-amber-500/20 p-4 sm:p-5 space-y-4">
      {/* Title & Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold text-white tracking-wide">
            {t("patinaSliderTitle")}
          </span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
          {currentStage.label}
        </span>
      </div>

      {/* Slider Control */}
      <div className="space-y-2 px-1">
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={patinaLevel}
          onChange={(e) => setPatinaLevel(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
        />

        {/* 4 Stage Labels */}
        <div className="flex justify-between text-[11px] text-slate-400 font-medium pt-1">
          {stages.map((stage) => (
            <button
              key={stage.level}
              onClick={() => setPatinaLevel(stage.level)}
              className={`transition-colors text-center ${
                patinaLevel === stage.level
                  ? "text-amber-400 font-bold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Box */}
      <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 text-center">
        <p className="text-xs text-amber-200/90 font-serif italic">
          &ldquo;{currentStage.subtitle}&rdquo;
        </p>
        <p className="text-[10px] text-slate-500 mt-1">
          {t("patinaDesc")}
        </p>
      </div>
    </div>
  );
}
