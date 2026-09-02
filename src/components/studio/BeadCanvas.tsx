"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useStudio } from "@/context/StudioContext";
import { getMaterialById } from "@/lib/materialsData";
import { drawRealisticBead } from "@/lib/beadTextureRenderer";
import { Trash2, RotateCw, Eye, Sparkles, RefreshCw, Compass } from "lucide-react";
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

  // 3D Orbit & Perspective States
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 2PI in radians
  const [tiltAngle, setTiltAngle] = useState(25); // Pitch in degrees (0 = top-down, 45 = deep 3D perspective)
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; startRot: number; startTilt: number }>({
    x: 0,
    y: 0,
    startRot: 0,
    startTilt: 25,
  });

  // Auto spin animation loop
  useEffect(() => {
    if (!isAutoSpin) return;
    let animId: number;
    const spin = () => {
      setRotationAngle((prev) => (prev + 0.006) % (Math.PI * 2));
      animId = requestAnimationFrame(spin);
    };
    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin]);

  // Main 3D Rendering Function
  const render3DBracelet = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 2;
    const width = 480;
    const height = 480;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 - 10;
    const count = beads.length;

    // 1. Draw Luxurious Atelier Silk Tray Base & Gold Lotus Geometry
    ctx.save();
    // Ambient radial lighting gradient on tray
    const trayLight = ctx.createRadialGradient(centerX, centerY - 20, 20, centerX, centerY, 230);
    trayLight.addColorStop(0, "rgba(217, 119, 6, 0.07)");
    trayLight.addColorStop(0.5, "rgba(20, 11, 6, 0.6)");
    trayLight.addColorStop(1, "rgba(10, 5, 2, 0.95)");
    ctx.fillStyle = trayLight;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 10, 215, 0, Math.PI * 2);
    ctx.fill();

    // Concentric sacred gold mandalas (禅意经纬同心金圈)
    ctx.strokeStyle = "rgba(245, 158, 11, 0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 10, 75, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(245, 158, 11, 0.05)";
    ctx.beginPath();
    ctx.arc(centerX, centerY + 10, 160, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    if (count === 0) {
      ctx.save();
      ctx.strokeStyle = "rgba(217, 119, 6, 0.35)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      return;
    }

    // 2. Natural Physical Bead Sizing & Even Distribution
    const loopRadius = 135;

    // Calculate 3D coordinates for all beads
    const pitchRad = (tiltAngle * Math.PI) / 180;
    const cosPitch = Math.cos(pitchRad);
    const sinPitch = Math.sin(pitchRad);

    interface ProjectedBead {
      index: number;
      bead: (typeof beads)[0];
      angle: number;
      x2d: number;
      y2d: number;
      z3d: number;
      drawRadius: number;
      depthScale: number;
      isSelected: boolean;
    }

    const projectedBeads: ProjectedBead[] = [];

    beads.forEach((bead, i) => {
      // Authentic mm-based radius on canvas (10mm = 14.5px radius / 29px diameter)
      const baseRadius = ((bead.sizeMm || 10) / 10) * 14.5;
      
      // Evenly distributed angle along the wire loop
      const beadCenterAngle = -Math.PI / 2 + rotationAngle + (i / count) * (Math.PI * 2);

      // 3D flat circle coordinates (before tilt)
      const x3d = Math.cos(beadCenterAngle) * loopRadius;
      const y3d = Math.sin(beadCenterAngle) * loopRadius;
      const z3d_flat = 0;

      // Apply 3D pitch/tilt around X-axis
      const rotatedY = y3d * cosPitch - z3d_flat * sinPitch;
      const rotatedZ = y3d * sinPitch + z3d_flat * cosPitch; // Z depth for sorting

      // 3D Perspective focal projection
      const cameraDistance = 450;
      const perspectiveScale = cameraDistance / (cameraDistance - rotatedZ);

      const x2d = centerX + x3d * perspectiveScale;
      const y2d = centerY + rotatedY * perspectiveScale;
      const drawRadius = baseRadius * perspectiveScale;

      projectedBeads.push({
        index: i,
        bead,
        angle: beadCenterAngle,
        x2d,
        y2d,
        z3d: rotatedZ,
        drawRadius,
        depthScale: perspectiveScale,
        isSelected: activeBeadIndex === i,
      });
    });

    // 3. Draw Braided Silk String under beads (真丝串线)
    ctx.save();
    ctx.strokeStyle = "rgba(180, 83, 9, 0.7)";
    ctx.lineWidth = 4 * cosPitch;
    ctx.beginPath();
    projectedBeads.forEach((pb, idx) => {
      if (idx === 0) ctx.moveTo(pb.x2d, pb.y2d);
      else ctx.lineTo(pb.x2d, pb.y2d);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // 4. Sort Beads by Z-depth (Draw back beads first, front beads last)
    const sortedBeads = [...projectedBeads].sort((a, b) => a.z3d - b.z3d);

    // 5. Render Guru Bead Tassel if at bottom (若佛头在下方或顶部，绘制古典真丝流苏)
    const guruBeadProj = projectedBeads[0]; // Guru is index 0
    if (guruBeadProj) {
      drawGuruTassel(ctx, guruBeadProj.x2d, guruBeadProj.y2d, guruBeadProj.drawRadius, guruBeadProj.depthScale, cosPitch);
    }

    // 6. Draw each bead with 3D Depth, Contact Shadows & Patina
    sortedBeads.forEach((pb) => {
      drawRealisticBead(
        ctx,
        pb.bead,
        pb.x2d,
        pb.y2d,
        pb.drawRadius,
        patinaLevel,
        pb.depthScale,
        pb.isSelected,
        -Math.PI / 4 // Consistent top-left studio keylight
      );
    });
  }, [beads, activeBeadIndex, patinaLevel, rotationAngle, tiltAngle]);

  useEffect(() => {
    render3DBracelet();
  }, [render3DBracelet]);

  // Mouse & Touch Drag 3D Orbit Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setIsAutoSpin(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRot: rotationAngle,
      startTilt: tiltAngle,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Drag horizontally to rotate 360°
    const newRot = dragStartRef.current.startRot + deltaX * 0.012;
    setRotationAngle(newRot);

    // Drag vertically to tilt 3D angle (0° to 50°)
    const newTilt = Math.max(0, Math.min(50, dragStartRef.current.startTilt - deltaY * 0.15));
    setTiltAngle(newTilt);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Click on Canvas to Select Bead
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = 480;
    const height = 480;
    const centerX = width / 2;
    const centerY = height / 2 - 10;
    const count = beads.length;
    if (count === 0) return;

    const loopRadius = 135;

    const pitchRad = (tiltAngle * Math.PI) / 180;
    const cosPitch = Math.cos(pitchRad);
    const sinPitch = Math.sin(pitchRad);

    let closestIndex = -1;
    let minDistance = 9999;

    beads.forEach((bead, i) => {
      const baseRadius = ((bead.sizeMm || 10) / 10) * 14.5;
      const beadCenterAngle = -Math.PI / 2 + rotationAngle + (i / count) * (Math.PI * 2);

      const x3d = Math.cos(beadCenterAngle) * loopRadius;
      const y3d = Math.sin(beadCenterAngle) * loopRadius;
      const rotatedY = y3d * cosPitch;
      const rotatedZ = y3d * sinPitch;

      const cameraDistance = 450;
      const perspectiveScale = cameraDistance / (cameraDistance - rotatedZ);

      const x2d = centerX + x3d * perspectiveScale;
      const y2d = centerY + rotatedY * perspectiveScale;
      const dist = Math.hypot(clickX - x2d, clickY - y2d);

      if (dist < baseRadius * 1.5 * perspectiveScale && dist < minDistance) {
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
    <div className="zen-silk-tray zen-corner-brass rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden border border-amber-500/30 shadow-2xl">
      {/* Top Toolbar */}
      <div className="w-full flex items-center justify-between z-10 mb-2 px-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold font-serif shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{energyResult.totalBeads} {t("totalBeads")}</span>
          </span>
          <span className="text-xs text-amber-200/80 font-serif">
            {energyResult.totalLengthCm}cm ({energyResult.recommendedWristCm}cm {t("wristSize")})
          </span>
        </div>

        {/* 3D View Controls Toolbar */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-serif font-bold flex items-center gap-1 transition-all ${
              isAutoSpin
                ? "bg-amber-600 text-slate-950 border-amber-400 shadow-lg"
                : "bg-amber-950/70 text-amber-300/80 border-amber-900/60 hover:text-amber-100"
            }`}
            title="Toggle 360° Auto-Spin"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoSpin ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{lang === "zh" ? "360° 旋转" : "360° Spin"}</span>
          </button>

          <button
            onClick={() => setTiltAngle(tiltAngle === 0 ? 30 : 0)}
            className="px-2.5 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 text-amber-300/80 hover:text-amber-100 border border-amber-900/60 text-xs font-serif flex items-center gap-1 transition-all"
            title="Toggle 3D Depth View Angle"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{tiltAngle === 0 ? (lang === "zh" ? "3D 视角" : "3D View") : (lang === "zh" ? "平视正顶" : "Top View")}</span>
          </button>

          {activeBeadIndex !== null && (
            <button
              onClick={() => removeBead(activeBeadIndex)}
              className="p-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 text-xs transition-all shadow"
              title="Remove selected bead"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={clearBeads}
            className="px-2.5 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 text-amber-300/70 hover:text-amber-200 border border-amber-900/60 text-xs font-serif transition-all"
          >
            {lang === "zh" ? "重置" : "Clear"}
          </button>
        </div>
      </div>

      {/* Interactive 3D Orbit Canvas */}
      <div className="relative cursor-grab active:cursor-grabbing select-none">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="rounded-full shadow-2xl transition-transform"
        />

        {/* Center Canvas Hub Status (东方金石印章宣纸风格) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          {activeMaterial ? (
            <div className="space-y-1.5 bg-[#140b06]/95 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-amber-500/50 shadow-2xl max-w-[230px] animate-fadeIn">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-400 font-serif">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{lang === "zh" ? "当前选中灵珠" : "Selected Bead"}</span>
              </div>
              <p className="text-sm font-bold text-amber-100 font-serif truncate">
                {lang === "zh" ? activeMaterial.nameZh : activeMaterial.name}
              </p>
              <p className="text-xs text-amber-300/90 font-mono">
                {activeBead?.sizeMm}mm • ${activeMaterial.basePrice}
              </p>
              {activeMaterial.aromaNote && (
                <p className="text-[10px] text-amber-200/80 italic font-serif line-clamp-1">
                  🌿 {lang === "zh" ? activeMaterial.aromaNoteZh : activeMaterial.aromaNote}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-1 bg-[#140b06]/80 px-4 py-2 rounded-xl border border-amber-500/20">
              <p className="text-amber-300/60 text-xs font-serif">
                {lang === "zh" ? "🖱️ 鼠标拖拽可 360° 旋转手串" : "🖱️ Drag to rotate 360° in 3D"}
              </p>
              <p className="text-[10px] text-amber-400/40 font-serif">
                {lang === "zh" ? "点击任意珠子即可替换材质" : "Click any bead to replace"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Canvas Bottom Quick Tip */}
      <p className="text-[11px] text-amber-200/60 mt-2 text-center font-serif">
        🪵 {lang === "zh" ? "紧密贴合无缝成串 · 支持 360° 自由旋转与 3D 景深俯仰 · 拖动下方滑块预览十年包浆" : "Seamless Mala Strung Contact • 360° 3D Orbit & Tilt • Slide below for 10-Yr Patina Transformation"}
      </p>
    </div>
  );
}

/**
 * Draw authentic Tibetan Buddhist Guru Bead Tassel (真丝流苏与弟子珠)
 */
function drawGuruTassel(
  ctx: CanvasRenderingContext2D,
  gx: number,
  gy: number,
  gr: number,
  depthScale: number,
  cosPitch: number
) {
  ctx.save();
  // Cord attachment point at bottom of guru bead
  const startX = gx;
  const startY = gy + gr * 0.85;
  const cordLen = 55 * depthScale;

  // 1. Two strands of braided silk cord (双股红绳)
  ctx.strokeStyle = "rgba(185, 28, 28, 0.9)";
  ctx.lineWidth = 2.5 * depthScale;
  ctx.beginPath();
  ctx.moveTo(startX - 2, startY);
  ctx.lineTo(startX - 5, startY + cordLen * 0.6);
  ctx.lineTo(startX - 3, startY + cordLen);

  ctx.moveTo(startX + 2, startY);
  ctx.lineTo(startX + 5, startY + cordLen * 0.6);
  ctx.lineTo(startX + 3, startY + cordLen);
  ctx.stroke();

  // 2. Disciple Spacer Beads (2 颗纯银弟子珠)
  const beadY = startY + cordLen * 0.55;
  [-5, 5].forEach((offsetX) => {
    ctx.beginPath();
    ctx.arc(startX + offsetX, beadY, 3.5 * depthScale, 0, Math.PI * 2);
    ctx.fillStyle = "#e2e8f0";
    ctx.fill();
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // 3. Flowing Silk Tassel Frills (真丝朱砂红流苏穗)
  const tasselTopY = startY + cordLen;
  const tasselBottomY = tasselTopY + 30 * depthScale;

  const tasselGrad = ctx.createLinearGradient(startX, tasselTopY, startX, tasselBottomY);
  tasselGrad.addColorStop(0, "rgba(185, 28, 28, 0.95)");
  tasselGrad.addColorStop(1, "rgba(127, 29, 29, 0.4)");

  ctx.fillStyle = tasselGrad;
  ctx.beginPath();
  ctx.moveTo(startX - 6, tasselTopY);
  ctx.lineTo(startX + 6, tasselTopY);
  ctx.lineTo(startX + 12, tasselBottomY);
  ctx.lineTo(startX - 12, tasselBottomY);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
