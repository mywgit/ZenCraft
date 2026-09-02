"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import {
  SACRED_WOODS,
  HEALING_CRYSTALS,
  SACRED_SPACERS,
  BEAD_SIZES,
  BeadMaterial,
} from "@/lib/materialsData";
import { useLanguage } from "@/context/LanguageContext";
import { TreePine, Sparkles, Gem, Plus, Wand2, Ruler } from "lucide-react";
import { WristSizeModal } from "./WristSizeModal";

export function MaterialPicker() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSizeMm,
    setSelectedSizeMm,
    wristSizeCm,
    activeBeadIndex,
    addBead,
    loadPreset,
  } = useStudio();
  const { lang, t } = useLanguage();
  const [isWristModalOpen, setIsWristModalOpen] = useState(false);

  const currentList: BeadMaterial[] =
    selectedCategory === "wood"
      ? SACRED_WOODS
      : selectedCategory === "gem"
      ? HEALING_CRYSTALS
      : SACRED_SPACERS;

  const currentSizeObj = BEAD_SIZES.find((s) => s.mm === selectedSizeMm) || BEAD_SIZES[1];

  const handleMaterialClick = (materialId: string) => {
    addBead(materialId, selectedSizeMm);
  };

  return (
    <div className="w-full zen-wood-card rounded-2xl p-5 space-y-5">
      {/* Top Presets Row (经典开运配方) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-amber-900/40">
        <div className="flex items-center gap-2 text-xs text-amber-300 font-serif font-bold">
          <Wand2 className="w-4 h-4 text-amber-400" />
          <span>{lang === "zh" ? "东方经典开运配方" : "Sacred Formula Presets"}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => loadPreset("grounding")}
            className="px-3 py-1 rounded-xl bg-[#140b06] hover:bg-amber-950/80 text-amber-200 hover:text-amber-100 border border-amber-900/50 text-xs font-serif transition-all"
          >
            🌿 {lang === "zh" ? "绿檀静心" : "Grounding Calm"}
          </button>
          <button
            onClick={() => loadPreset("wealth")}
            className="px-3 py-1 rounded-xl bg-[#140b06] hover:bg-amber-950/80 text-amber-200 hover:text-amber-100 border border-amber-900/50 text-xs font-serif transition-all"
          >
            🪙 {lang === "zh" ? "金丝楠招财" : "Imperial Wealth"}
          </button>
          <button
            onClick={() => loadPreset("shield")}
            className="px-3 py-1 rounded-xl bg-[#140b06] hover:bg-amber-950/80 text-amber-200 hover:text-amber-100 border border-amber-900/50 text-xs font-serif transition-all"
          >
            🛡️ {lang === "zh" ? "黑檀避煞" : "Psychic Shield"}
          </button>
          <button
            onClick={() => loadPreset("wisdom")}
            className="px-3 py-1 rounded-xl bg-[#140b06] hover:bg-amber-950/80 text-amber-200 hover:text-amber-100 border border-amber-900/50 text-xs font-serif transition-all"
          >
            🔮 {lang === "zh" ? "崖柏开智" : "Spiritual Wisdom"}
          </button>
        </div>
      </div>

      {/* Category Tabs & Size Selector Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Tabs (多宝阁分类) */}
        <div className="flex bg-[#120a06] p-1.5 rounded-2xl border border-amber-900/50 gap-1">
          <button
            onClick={() => setSelectedCategory("wood")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
              selectedCategory === "wood"
                ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-lg border border-amber-400/40"
                : "text-amber-200/60 hover:text-amber-100"
            }`}
          >
            <TreePine className="w-3.5 h-3.5" />
            <span>{t("materialsTabWood")}</span>
          </button>
          <button
            onClick={() => setSelectedCategory("gem")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
              selectedCategory === "gem"
                ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-lg border border-amber-400/40"
                : "text-amber-200/60 hover:text-amber-100"
            }`}
          >
            <Gem className="w-3.5 h-3.5" />
            <span>{t("materialsTabGem")}</span>
          </button>
          <button
            onClick={() => setSelectedCategory("spacer")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
              selectedCategory === "spacer"
                ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-lg border border-amber-400/40"
                : "text-amber-200/60 hover:text-amber-100"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("materialsTabSpacer")}</span>
          </button>
        </div>

        {/* Size & Wrist Picker Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Size Pill Picker */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-amber-200/60 font-serif mr-1 whitespace-nowrap">
              {t("beadSize")}:
            </span>
            {BEAD_SIZES.map((s) => (
              <button
                key={s.mm}
                onClick={() => setSelectedSizeMm(s.mm)}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  selectedSizeMm === s.mm
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow"
                    : "bg-[#140b06] text-amber-200/60 hover:text-amber-200 border border-amber-900/40"
                }`}
              >
                {s.mm}mm
              </button>
            ))}
          </div>

          {/* Wrist Size Button */}
          <button
            onClick={() => setIsWristModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold shadow-sm transition-all"
            title="Click to customize wrist circumference"
          >
            <Ruler className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "zh" ? `手腕 ${wristSizeCm}cm` : `Wrist ${wristSizeCm}cm`}</span>
            <span className="text-[10px] text-amber-400/80 font-bold">▾</span>
          </button>
        </div>
      </div>

      <WristSizeModal
        isOpen={isWristModalOpen}
        onClose={() => setIsWristModalOpen(false)}
      />

      {/* Materials Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1">
        {currentList.map((item) => {
          const itemPrice = (item.basePrice * currentSizeObj.multiplier).toFixed(2);

          return (
            <div
              key={item.id}
              onClick={() => handleMaterialClick(item.id)}
              className="group relative p-3.5 rounded-2xl bg-[#140b06]/90 hover:bg-[#1f120a] border border-amber-900/40 hover:border-amber-500/50 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-lg"
            >
              {/* Top Bead Preview & Origin Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                {/* 100% Real Macro Bead Photo */}
                <div className="w-11 h-11 rounded-full overflow-hidden shadow-2xl border border-amber-500/30 flex-shrink-0 group-hover:scale-110 transition-transform bg-black flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-900/60 font-serif line-clamp-1">
                  {item.origin}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-100 font-serif group-hover:text-amber-300 transition-colors line-clamp-1">
                  {lang === "zh" ? item.nameZh : item.name}
                </p>
                <p className="text-[10px] text-amber-200/60 font-serif line-clamp-2 leading-relaxed">
                  {lang === "zh" ? item.descriptionZh : item.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-amber-950/60">
                <span className="text-xs font-bold text-amber-400 font-mono">
                  ${itemPrice}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 group-hover:text-amber-300 font-serif font-bold">
                  <Plus className="w-3 h-3" />
                  {lang === "zh" ? "放入串珠" : "Add"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
