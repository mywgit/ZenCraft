"use client";

import React, { useRef, useEffect } from "react";
import { useStudio } from "@/context/StudioContext";
import { getMaterialById } from "@/lib/materialsData";
import { drawRealisticBead } from "@/lib/beadTextureRenderer";
import { Trash2, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function BeadCanvas() {
  const {
    beads,
    activeBeadIndex,
    patinaLevel,
    setActiveBeadIndex,
    removeBead,
    clearBeads,
    energyResult,
  } = useStudio();
  const { lang, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Render Bracelet on 360 degree circle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI retina display
    const dpr = window.devicePixelRatio || 2;
    const width = 450;
    const height = 450;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const count = beads.length;

    // 1. Draw Traditional Silk Tray Watermark (莲花暗纹)
    ctx.save();
    ctx.strokeStyle = "rgba(217, 119, 6, 0.08)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(217, 119, 6, 0.04)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 160, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    if (count === 0) {
      // Empty state dashed guide
      ctx.strokeStyle = "rgba(217, 119, 6, 0.25)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      return;
    }

    // Radius of circular string (dynamic based on bead count)
    const baseRadius = Math.max(115, Math.min(155, 90 + count * 3.4));

    // 2. Draw braided silk string connecting beads (天然丝线)
    ctx.save();
    ctx.strokeStyle = "rgba(180, 83, 9, 0.5)";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3. Draw each bead along circle with realistic textures
    beads.forEach((bead, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * baseRadius;
      const y = centerY + Math.sin(angle) * baseRadius;

      // Bead radius on canvas
      const beadRadius = Math.max(11, Math.min(25, bead.sizeMm * 1.45));
      const isSelected = activeBeadIndex === i;

      drawRealisticBead(ctx, bead, x, y, beadRadius, patinaLevel, angle, isSelected);
    });
  }, [beads, activeBeadIndex, patinaLevel]);

  // Click on Canvas to Select Bead
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = 450;
    const height = 450;
    const centerX = width / 2;
    const centerY = height / 2;
    const count = beads.length;
    const baseRadius = Math.max(115, Math.min(155, 90 + count * 3.4));

    let closestIndex = -1;
    let minDistance = 9999;

    beads.forEach((bead, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * baseRadius;
      const y = centerY + Math.sin(angle) * baseRadius;
      const dist = Math.hypot(clickX - x, clickY - y);

      if (dist < bead.sizeMm * 1.8 && dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    });

    if (closestIndex !== -1) {
      setActiveBeadIndex(closestIndex);
    }
  };

  const activeBead = activeBeadIndex !== null ? beads[activeBeadIndex] : null;
  const activeMaterial = activeBead ? getMaterialById(activeBead.materialId) : null;

  return (
    <div className="zen-silk-tray zen-corner-brass rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top Toolbar */}
      <div className="w-full flex items-center justify-between z-10 mb-2 px-2">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold font-serif">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{energyResult.totalBeads} {t("totalBeads")}</span>
          </span>
          <span className="text-xs text-amber-200/70 font-serif">
            {energyResult.totalLengthCm}cm ({energyResult.recommendedWristCm}cm {t("wristSize")})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {activeBeadIndex !== null && (
            <button
              onClick={() => removeBead(activeBeadIndex)}
              className="p-2 rounded-xl bg-red-950/80 hover:bg-red-900/90 text-red-300 border border-red-500/40 text-xs font-semibold transition-all shadow-md"
              title="Remove selected bead"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={clearBeads}
            className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 text-amber-300/80 hover:text-amber-200 border border-amber-900/60 text-xs font-serif transition-all"
          >
            {lang === "zh" ? "重置" : "Clear"}
          </button>
        </div>
      </div>

      {/* Interactive 360 Canvas */}
      <div className="relative cursor-pointer select-none">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="rounded-full transition-transform duration-300 hover:scale-[1.01]"
        />

        {/* Center Canvas Hub Status (东方印章宣纸风格) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          {activeMaterial ? (
            <div className="space-y-1.5 bg-[#1a110a]/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-amber-500/40 shadow-2xl max-w-[220px]">
              <p className="text-xs font-bold text-amber-300 font-serif truncate">
                {lang === "zh" ? activeMaterial.nameZh : activeMaterial.name}
              </p>
              <p className="text-[11px] text-amber-100/70 font-mono">
                {activeBead?.sizeMm}mm • ${activeMaterial.basePrice}
              </p>
              {activeMaterial.aromaNote && (
                <p className="text-[10px] text-amber-200/90 italic font-serif line-clamp-1">
                  🌿 {lang === "zh" ? activeMaterial.aromaNoteZh : activeMaterial.aromaNote}
                </p>
              )}
            </div>
          ) : (
            <div className="text-amber-300/40 text-xs font-serif">
              {lang === "zh" ? "点击串珠即可选中搭配" : "Click beads to select & customize"}
            </div>
          )}
        </div>
      </div>

      {/* Canvas Bottom Quick Tip */}
      <p className="text-[11px] text-amber-200/60 mt-3 text-center font-serif">
        🪵 {lang === "zh" ? "点击任意珠子即可选中替换；拖动下方滑块预览十年包浆温润蜕变。" : "Click any bead to replace; slide below to preview 10-year patina evolution."}
      </p>
    </div>
  );
}
