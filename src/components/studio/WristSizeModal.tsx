"use client";

import React, { useState, useEffect } from "react";
import { useStudio } from "@/context/StudioContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Ruler, Check, Sparkles, HelpCircle } from "lucide-react";

interface WristSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WristOption {
  cm: number;
  labelZh: string;
  labelEn: string;
  descZh?: string;
  descEn?: string;
}

export function WristSizeModal({ isOpen, onClose }: WristSizeModalProps) {
  const { wristSizeCm, setWristSizeAndBeads } = useStudio();
  const { lang, t } = useLanguage();

  const [selectedCm, setSelectedCm] = useState<number>(wristSizeCm);
  const [autoAdjustBeads, setAutoAdjustBeads] = useState<boolean>(true);

  // Sync selected size with context whenever opened or wristSizeCm changes
  useEffect(() => {
    setSelectedCm(wristSizeCm);
  }, [wristSizeCm, isOpen]);

  if (!isOpen) return null;

  // Single loop everyday common sizes (13cm - 20cm)
  const singleLoopSizes: WristOption[] = [
    { cm: 13, labelZh: "13cm", labelEn: "13cm", descZh: "极细手腕", descEn: "Extra Slender" },
    { cm: 14, labelZh: "14cm", labelEn: "14cm", descZh: "偏细手腕", descEn: "Slender" },
    { cm: 15, labelZh: "15cm", labelEn: "15cm", descZh: "纤细手腕", descEn: "Petite Female" },
    { cm: 16, labelZh: "16cm", labelEn: "16cm", descZh: "常规佩戴", descEn: "Standard Fit" },
    { cm: 17, labelZh: "17cm", labelEn: "17cm", descZh: "手腕较粗", descEn: "Standard Male" },
    { cm: 18, labelZh: "18cm", labelEn: "18cm", descZh: "骨架偏大", descEn: "Large Frame" },
    { cm: 19, labelZh: "19cm", labelEn: "19cm", descZh: "宽松舒适", descEn: "Relaxed Fit" },
    { cm: 20, labelZh: "20cm", labelEn: "20cm", descZh: "大手围", descEn: "Extra Large" },
  ];

  // Multi loop meditation mala specs (15cm - 60cm)
  const multiLoopSizes: WristOption[] = [
    { cm: 15, labelZh: "15cm", labelEn: "15cm", descZh: "单圈", descEn: "Single Loop" },
    { cm: 30, labelZh: "30cm", labelEn: "30cm", descZh: "双圈", descEn: "Double Loop" },
    { cm: 45, labelZh: "45cm", labelEn: "45cm", descZh: "三圈", descEn: "Triple Loop" },
    { cm: 60, labelZh: "60cm", labelEn: "60cm", descZh: "四圈 (108颗)", descEn: "Quad (108 Mala)" },
  ];

  const handleSelectSize = (cm: number) => {
    setSelectedCm(cm);
    // Live update bracelet beads & circle immediately
    setWristSizeAndBeads(cm, autoAdjustBeads);
  };

  const handleToggleAutoAdjust = (checked: boolean) => {
    setAutoAdjustBeads(checked);
    if (checked) {
      setWristSizeAndBeads(selectedCm, true);
    }
  };

  const handleConfirm = () => {
    setWristSizeAndBeads(selectedCm, autoAdjustBeads);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-[#140b06] border border-amber-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 relative text-amber-100 font-serif">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-900/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <Ruler className="w-4 h-4 text-amber-400" />
            <span>{lang === "zh" ? "手腕常用尺寸选择" : "Wrist Size Selection"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
            {lang === "zh" ? "常用手围与佩戴规格" : "Common Wrist Sizes & Loop Styles"}
          </h2>
          <p className="text-xs text-amber-200/60 leading-relaxed">
            {lang === "zh"
              ? "点击下方卡片自动填入，京作工坊将依据您的净手围预留 0.8cm 舒适内径穿制。"
              : "Tap any card to auto-apply. Our atelier will tailor a 0.8cm inner comfort clearance based on your net wrist size."}
          </p>
        </div>

        {/* 1. Single Loop Common Sizes Grid */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-amber-300">
            {lang === "zh" ? "单圈手围（适合日常单串）：" : "Single Loop Everyday Wrist Fit:"}
          </span>
          <div className="grid grid-cols-4 gap-2.5">
            {singleLoopSizes.map((opt) => {
              const isSelected = selectedCm === opt.cm;
              return (
                <button
                  key={opt.cm}
                  onClick={() => handleSelectSize(opt.cm)}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-gradient-to-b from-amber-600 to-amber-700 text-slate-950 border-amber-300 shadow-lg scale-[1.02] font-black"
                      : "bg-[#1d1009] hover:bg-amber-950/70 text-amber-100 border-amber-900/50"
                  }`}
                >
                  <span className="text-sm font-bold font-mono">{opt.cm}cm</span>
                  <span
                    className={`text-[10px] ${
                      isSelected ? "text-slate-900 font-bold" : "text-amber-200/60"
                    }`}
                  >
                    {lang === "zh" ? opt.descZh : opt.descEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Multi Loop Malas Grid */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-amber-300">
            {lang === "zh" ? "多圈绕手款式（适合长念珠 / 108颗）：" : "Multi-Loop Mala Styles:"}
          </span>
          <div className="grid grid-cols-4 gap-2.5">
            {multiLoopSizes.map((opt) => {
              const isSelected = selectedCm === opt.cm;
              return (
                <button
                  key={opt.cm}
                  onClick={() => handleSelectSize(opt.cm)}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-gradient-to-b from-amber-600 to-amber-700 text-slate-950 border-amber-300 shadow-lg scale-[1.02] font-black"
                      : "bg-[#1d1009] hover:bg-amber-950/70 text-amber-100 border-amber-900/50"
                  }`}
                >
                  <span className="text-sm font-bold font-mono">{opt.cm}cm</span>
                  <span
                    className={`text-[10px] ${
                      isSelected ? "text-slate-900 font-bold" : "text-amber-200/60"
                    }`}
                  >
                    {lang === "zh" ? opt.descZh : opt.descEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Auto-Fit Toggle Checkbox */}
        <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0d0603] border border-amber-900/40 cursor-pointer text-xs text-amber-200/80">
          <input
            type="checkbox"
            checked={autoAdjustBeads}
            onChange={(e) => handleToggleAutoAdjust(e.target.checked)}
            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-amber-950 border-amber-800"
          />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-300">
              {lang === "zh" ? "自动根据选定手围补齐/调整最佳珠数" : "Auto-adjust bead count to fit this wrist size"}
            </span>
            <p className="text-[10px] text-amber-200/50">
              {lang === "zh" ? "智能计算手串佩戴舒适度，避免过紧或过松。" : "Calculates comfortable wearing tension automatically."}
            </p>
          </div>
        </label>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-serif font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{lang === "zh" ? `确认设置手围 (${selectedCm}cm)` : `Confirm Wrist Size (${selectedCm}cm)`}</span>
        </button>
      </div>
    </div>
  );
}
