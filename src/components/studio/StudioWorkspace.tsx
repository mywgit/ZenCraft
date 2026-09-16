"use client";

import React, { useState } from "react";
import { BeadCanvas } from "./BeadCanvas";
import { PatinaSlider } from "./PatinaSlider";
import { MaterialPicker } from "./MaterialPicker";
import { EnergyReport } from "./EnergyReport";
import { CertificateModal } from "./CertificateModal";
import { useStudio } from "@/context/StudioContext";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Gem, ArrowRight, ArrowLeft, Disc3 } from "lucide-react";

const elementNamesZh: Record<string, string> = {
  wood: "木",
  fire: "火",
  earth: "土",
  metal: "金",
  water: "水",
};

export function StudioWorkspace() {
  const { lang, t } = useLanguage();
  const { energyResult } = useStudio();

  // Desktop active console tab: "materials" (default) or "energy"
  const [rightTab, setRightTab] = useState<"materials" | "energy">("materials");

  // Mobile active tab: "canvas" | "materials" | "energy"
  const [mobileTab, setMobileTab] = useState<"canvas" | "materials" | "energy">("canvas");

  return (
    <div className="w-full max-w-[1440px] mx-auto space-y-5 px-2 sm:px-4">
      {/* Mobile 3-Segment Switcher (Visible on mobile/tablet) */}
      <div className="lg:hidden flex p-1 bg-[#120a06] rounded-2xl border border-amber-900/50 shadow-lg">
        <button
          type="button"
          onClick={() => setMobileTab("canvas")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === "canvas"
              ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-md border border-amber-400/40"
              : "text-amber-200/60 hover:text-amber-100"
          }`}
        >
          <Disc3 className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "手串画布" : "Canvas"}</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("materials")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === "materials"
              ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-md border border-amber-400/40"
              : "text-amber-200/60 hover:text-amber-100"
          }`}
        >
          <Gem className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "挑选材质" : "Materials"}</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("energy")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === "energy"
              ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-md border border-amber-400/40"
              : "text-amber-200/60 hover:text-amber-100"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "测评与结账" : "Energy & Pay"}</span>
        </button>
      </div>

      {/* Main Responsive Grid: Canvas on Left, Interactive Console on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3D Bracelet Canvas & Patina Slider (Sticky at Eye Level on Desktop) */}
        <div
          className={`lg:col-span-5 xl:col-span-5 space-y-4 lg:sticky lg:top-24 ${
            mobileTab === "canvas" ? "block" : "hidden lg:block"
          }`}
        >
          {/* 360 Bead Canvas */}
          <BeadCanvas />

          {/* Patina Time Slider */}
          <PatinaSlider />
        </div>

        {/* Right Column: Interactive Console (Materials vs Energy Report) */}
        <div
          className={`lg:col-span-7 xl:col-span-7 space-y-4 ${
            mobileTab === "materials" || mobileTab === "energy" ? "block" : "hidden lg:block"
          }`}
        >
          {/* Desktop Tab Switcher (灵珠材质工坊 vs 专属能量测评与结账) */}
          <div className="hidden lg:flex items-center justify-between p-1.5 rounded-2xl bg-[#120a06] border border-amber-900/50 shadow-xl">
            <div className="flex items-center gap-1.5 flex-1">
              <button
                type="button"
                onClick={() => setRightTab("materials")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-serif font-bold transition-all ${
                  rightTab === "materials"
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-lg border border-amber-400/40"
                    : "text-amber-200/60 hover:text-amber-100 hover:bg-amber-950/40"
                }`}
              >
                <Gem className="w-4 h-4 text-amber-300" />
                <span>{lang === "zh" ? "灵珠选材与定制工坊" : "Beads & Material Atelier"}</span>
              </button>

              <button
                type="button"
                onClick={() => setRightTab("energy")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-serif font-bold transition-all ${
                  rightTab === "energy"
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-lg border border-amber-400/40"
                    : "text-amber-200/60 hover:text-amber-100 hover:bg-amber-950/40"
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{lang === "zh" ? "专属身心能量测评与结账" : "Energy Profile & Order"}</span>
                <span className="font-mono text-amber-300 ml-1 px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/30 text-[11px]">
                  ${energyResult.totalPriceUsd}
                </span>
              </button>
            </div>
          </div>

          {/* Panel 1: Material & Spacer Picker */}
          <div className={`${rightTab === "materials" ? "lg:block" : "lg:hidden"} ${mobileTab === "materials" ? "block" : "hidden lg:block"}`}>
            <div className="space-y-4 animate-fadeIn">
              <MaterialPicker />

              {/* Bottom Quick Status & Checkout Jump Strip */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-amber-950/90 via-[#180e07] to-amber-950/90 border border-amber-500/40 shadow-2xl">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div>
                    <span className="text-[10px] text-amber-400/80 font-serif block">
                      {lang === "zh" ? "当前手串定制价" : "Custom Mala Price"}
                    </span>
                    <span className="text-xl font-black font-mono text-amber-300">
                      ${energyResult.totalPriceUsd}
                    </span>
                  </div>

                  <div className="h-8 w-px bg-amber-900/60 hidden sm:block" />

                  <div className="text-xs font-serif text-amber-200/80 text-right sm:text-left">
                    <p className="font-bold text-amber-100">
                      {energyResult.totalBeads} {lang === "zh" ? "颗天然圣木原矿" : "Sacred Beads"}
                    </p>
                    <p className="text-[11px] text-amber-400/90">
                      {lang === "zh"
                        ? `共振气场 · 五行属【${elementNamesZh[energyResult.dominantElement] || "木"}】· ${energyResult.blessingTitleZh}`
                        : `Resonance: ${energyResult.dominantElement} • ${energyResult.blessingTitle}`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setRightTab("energy");
                    setMobileTab("energy");
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 group"
                >
                  <span>{lang === "zh" ? "查看能量测评与结账" : "View Energy Report & Order"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Panel 2: Metaphysical Energy Report & Order */}
          <div className={`${rightTab === "energy" ? "lg:block" : "lg:hidden"} ${mobileTab === "energy" ? "block" : "hidden"}`}>
            <div className="space-y-3 animate-fadeIn">
              <button
                type="button"
                onClick={() => {
                  setRightTab("materials");
                  setMobileTab("materials");
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#140b06] hover:bg-amber-950/80 border border-amber-900/50 hover:border-amber-500/40 text-amber-300 hover:text-amber-100 text-xs font-serif transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === "zh" ? "← 返回继续挑选灵珠材质" : "← Back to Material Picker"}</span>
              </button>

              <EnergyReport />
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal Popup */}
      <CertificateModal />
    </div>
  );
}

