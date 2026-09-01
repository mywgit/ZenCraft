"use client";

import React from "react";
import { useStudio } from "@/context/StudioContext";
import {
  SACRED_WOODS,
  HEALING_CRYSTALS,
  SACRED_SPACERS,
  BEAD_SIZES,
  BeadMaterial,
} from "@/lib/materialsData";
import { useLanguage } from "@/context/LanguageContext";
import { TreePine, Sparkles, Gem, Plus, Wand2 } from "lucide-react";

export function MaterialPicker() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSizeMm,
    setSelectedSizeMm,
    activeBeadIndex,
    addBead,
    loadPreset,
  } = useStudio();
  const { lang, t } = useLanguage();

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

  const photoThumbnails: Record<string, string> = {
    "green-sandalwood": "/beads/green-sandalwood.jpg",
    "gold-phoebe": "/beads/gold-phoebe.jpg",
    "ebony-wood": "/beads/ebony-wood.jpg",
  };

  return (
    <div className="w-full bg-slate-900/70 backdrop-blur-md rounded-2xl border border-amber-500/20 p-4 sm:p-5 space-y-5">
      {/* Top Presets Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
          <Wand2 className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "经典开运配方模版" : "Sacred Formula Presets"}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => loadPreset("grounding")}
            className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-medium transition-all"
          >
            🌿 {lang === "zh" ? "绿檀静心" : "Grounding Calm"}
          </button>
          <button
            onClick={() => loadPreset("wealth")}
            className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-medium transition-all"
          >
            🪙 {lang === "zh" ? "金丝楠招财" : "Imperial Wealth"}
          </button>
          <button
            onClick={() => loadPreset("shield")}
            className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-medium transition-all"
          >
            🛡️ {lang === "zh" ? "黑檀避煞" : "Psychic Shield"}
          </button>
          <button
            onClick={() => loadPreset("wisdom")}
            className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-medium transition-all"
          >
            🔮 {lang === "zh" ? "崖柏开智" : "Spiritual Wisdom"}
          </button>
        </div>
      </div>

      {/* Category Tabs & Size Selector Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1">
          <button
            onClick={() => setSelectedCategory("wood")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === "wood"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <TreePine className="w-3.5 h-3.5" />
            <span>{t("materialsTabWood")}</span>
          </button>
          <button
            onClick={() => setSelectedCategory("gem")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === "gem"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Gem className="w-3.5 h-3.5" />
            <span>{t("materialsTabGem")}</span>
          </button>
          <button
            onClick={() => setSelectedCategory("spacer")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === "spacer"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("materialsTabSpacer")}</span>
          </button>
        </div>

        {/* Size Pill Picker */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] text-slate-400 mr-1 whitespace-nowrap">
            {t("beadSize")}:
          </span>
          {BEAD_SIZES.map((s) => (
            <button
              key={s.mm}
              onClick={() => setSelectedSizeMm(s.mm)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedSizeMm === s.mm
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {s.mm}mm
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
        {currentList.map((item) => {
          const itemPrice = (item.basePrice * currentSizeObj.multiplier).toFixed(2);
          const hasPhoto = photoThumbnails[item.id];

          return (
            <div
              key={item.id}
              onClick={() => handleMaterialClick(item.id)}
              className="group relative p-3 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all duration-200 flex flex-col justify-between"
            >
              {/* Top Bead Preview & Origin Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                {hasPhoto ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform bg-black">
                    <img
                      src={hasPhoto}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full shadow-lg border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform relative overflow-hidden"
                    style={{
                      background: `radial-gradient(circle at 32% 32%, ${item.colors.highlight} 0%, ${item.colors.base} 60%, ${item.colors.shadow} 100%)`,
                    }}
                  >
                    {/* Gloss Reflection Flare */}
                    <div className="absolute top-1 left-1.5 w-3.5 h-2 rounded-full bg-white/40 rotate-[-30deg]" />
                  </div>
                )}
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 line-clamp-1">
                  {item.origin}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {lang === "zh" ? item.nameZh : item.name}
                </p>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                  {lang === "zh" ? item.descriptionZh : item.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-900">
                <span className="text-xs font-bold text-amber-400 font-mono">
                  ${itemPrice}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400/90 group-hover:text-amber-300 font-bold">
                  <Plus className="w-3 h-3" />
                  {lang === "zh" ? "添加" : "Add"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
