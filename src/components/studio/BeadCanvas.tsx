"use client";

import React, { useRef, useEffect } from "react";
import { useStudio } from "@/context/StudioContext";
import { getMaterialById } from "@/lib/materialsData";
import { Trash2, RotateCw, Sparkles } from "lucide-react";
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
    const dpr = window.devicePixelRatio || 1;
    const width = 420;
    const height = 420;
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

    if (count === 0) {
      // Empty state
      ctx.strokeStyle = "rgba(245, 158, 11, 0.2)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      return;
    }

    // Radius of circular string (dynamic based on bead count)
    const baseRadius = Math.max(100, Math.min(145, 80 + count * 3.5));

    // 1. Draw elastic string connecting beads
    ctx.strokeStyle = "rgba(217, 119, 6, 0.35)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Draw each bead along circle
    beads.forEach((bead, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * baseRadius;
      const y = centerY + Math.sin(angle) * baseRadius;

      // Bead radius on canvas (proportional to sizeMm)
      const beadRadius = Math.max(9, Math.min(22, bead.sizeMm * 1.3));

      const mat = getMaterialById(bead.materialId);
      if (!mat) return;

      // Pick color stop based on patinaLevel (0: base, 1: patina1y, 2: patina5y, 3: patina10y)
      let beadColor = mat.colors.base;
      if (patinaLevel === 1) beadColor = mat.colors.patina1y;
      else if (patinaLevel === 2) beadColor = mat.colors.patina5y;
      else if (patinaLevel === 3) beadColor = mat.colors.patina10y;

      const isSelected = activeBeadIndex === i;

      // Draw Selected Glow Ring
      if (isSelected) {
        ctx.save();
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 3;
        ctx.shadowColor = "#f59e0b";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(x, y, beadRadius + 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Bead Drop Shadow
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 5;

      // Sphere 3D Radial Gradient
      const grad = ctx.createRadialGradient(
        x - beadRadius * 0.35,
        y - beadRadius * 0.35,
        beadRadius * 0.1,
        x,
        y,
        beadRadius
      );
      grad.addColorStop(0, mat.colors.highlight);
      grad.addColorStop(0.3, beadColor);
      grad.addColorStop(0.85, mat.colors.shadow);
      grad.addColorStop(1, "#09090b");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, beadRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // If wood grain or gold fiber pattern
      if (mat.colors.pattern === "wood-grain" || mat.colors.pattern === "gold-fiber") {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, beadRadius - 1, 0, Math.PI * 2);
        ctx.clip();

        ctx.strokeStyle =
          mat.colors.pattern === "gold-fiber"
            ? "rgba(254, 240, 138, 0.4)"
            : "rgba(0, 0, 0, 0.25)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x - beadRadius, y - beadRadius * 0.5);
        ctx.bezierCurveTo(
          x - beadRadius * 0.2,
          y + beadRadius * 0.2,
          x + beadRadius * 0.2,
          y - beadRadius * 0.2,
          x + beadRadius,
          y + beadRadius * 0.5
        );
        ctx.stroke();
        ctx.restore();
      }

      // Glass / Patina Specular Gloss Highlight
      ctx.save();
      const glossAlpha = patinaLevel >= 2 ? 0.65 : 0.4;
      ctx.fillStyle = `rgba(255, 255, 255, ${glossAlpha})`;
      ctx.beginPath();
      ctx.ellipse(
        x - beadRadius * 0.35,
        y - beadRadius * 0.35,
        beadRadius * 0.35,
        beadRadius * 0.2,
        Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
    });
  }, [beads, activeBeadIndex, patinaLevel]);

  // Click on Canvas to Select Bead
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = 420;
    const height = 420;
    const centerX = width / 2;
    const centerY = height / 2;
    const count = beads.length;
    const baseRadius = Math.max(100, Math.min(145, 80 + count * 3.5));

    let closestIndex = -1;
    let minDistance = 9999;

    beads.forEach((bead, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * baseRadius;
      const y = centerY + Math.sin(angle) * baseRadius;
      const dist = Math.hypot(clickX - x, clickY - y);

      if (dist < bead.sizeMm * 1.6 && dist < minDistance) {
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
    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/80 rounded-3xl border border-amber-500/20 shadow-2xl overflow-hidden">
      {/* Background Zen Glow */}
      <div className="absolute inset-0 zen-radial-glow pointer-events-none" />

      {/* Top Toolbar */}
      <div className="w-full flex items-center justify-between z-10 mb-2 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{energyResult.totalBeads} {t("totalBeads")}</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {energyResult.totalLengthCm}cm ({energyResult.recommendedWristCm}cm {t("wristSize")})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {activeBeadIndex !== null && (
            <button
              onClick={() => removeBead(activeBeadIndex)}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 text-xs font-semibold transition-all"
              title="Remove selected bead"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={clearBeads}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-semibold transition-all"
          >
            Clear
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

        {/* Center Canvas Hub Status */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          {activeMaterial ? (
            <div className="space-y-1 bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-500/30 shadow-xl max-w-[200px]">
              <p className="text-xs font-bold text-amber-300 truncate">
                {lang === "zh" ? activeMaterial.nameZh : activeMaterial.name}
              </p>
              <p className="text-[11px] text-slate-400">
                {activeBead?.sizeMm}mm • ${activeMaterial.basePrice}
              </p>
              {activeMaterial.aromaNote && (
                <p className="text-[10px] text-amber-200/80 italic line-clamp-1">
                  🌿 {lang === "zh" ? activeMaterial.aromaNoteZh : activeMaterial.aromaNote}
                </p>
              )}
            </div>
          ) : (
            <div className="text-slate-500 text-xs">
              Click beads to select & customize
            </div>
          )}
        </div>
      </div>

      {/* Canvas Bottom Quick Tip */}
      <p className="text-[11px] text-slate-500 mt-2 text-center">
        💡 {lang === "zh" ? "点击任意珠子即可选中进行替换或删除，拖拽下方滑块查看包浆光泽蜕变。" : "Click any bead along the ring to select, replace, or customize with raw timber & crystals."}
      </p>
    </div>
  );
}
