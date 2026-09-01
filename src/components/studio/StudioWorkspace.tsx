"use client";

import React, { useState } from "react";
import { BeadCanvas } from "./BeadCanvas";
import { PatinaSlider } from "./PatinaSlider";
import { MaterialPicker } from "./MaterialPicker";
import { EnergyReport } from "./EnergyReport";
import { CertificateModal } from "./CertificateModal";
import { useLanguage } from "@/context/LanguageContext";
import { Compass, Sparkles, Wand2, TreePine, Award } from "lucide-react";

export function StudioWorkspace() {
  const { lang, t } = useLanguage();
  const [mobileTab, setMobileTab] = useState<"design" | "energy">("design");

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Mobile Tab Switcher (Visible on mobile/tablet) */}
      <div className="lg:hidden flex p-1 bg-slate-950 rounded-2xl border border-slate-800">
        <button
          onClick={() => setMobileTab("design")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === "design"
              ? "bg-amber-500 text-slate-950 shadow-lg"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <TreePine className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "① 串珠画布与选材" : "① Bead Canvas & Materials"}</span>
        </button>
        <button
          onClick={() => setMobileTab("energy")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === "energy"
              ? "bg-amber-500 text-slate-950 shadow-lg"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "② 脉轮测评与结账" : "② Energy Profile & Order"}</span>
        </button>
      </div>

      {/* Main Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas & Materials (lg: 7 cols) */}
        <div
          className={`lg:col-span-7 space-y-6 ${
            mobileTab === "design" ? "block" : "hidden lg:block"
          }`}
        >
          {/* 360 Bead Canvas */}
          <BeadCanvas />

          {/* Patina Time Slider */}
          <PatinaSlider />

          {/* Material & Spacer Picker */}
          <MaterialPicker />
        </div>

        {/* Right Column: Metaphysical Energy Report & Order (lg: 5 cols) */}
        <div
          className={`lg:col-span-5 space-y-6 ${
            mobileTab === "energy" ? "block" : "hidden lg:block"
          }`}
        >
          <EnergyReport />
        </div>
      </div>

      {/* Certificate Modal Popup */}
      <CertificateModal />
    </div>
  );
}
