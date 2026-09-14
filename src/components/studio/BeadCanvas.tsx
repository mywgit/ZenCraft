"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useStudio } from "@/context/StudioContext";
import { drawRealisticBead } from "@/lib/beadTextureRenderer";
import { Trash2, RotateCw, Sparkles, Compass, Ruler } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { WristSizeModal } from "./WristSizeModal";

export function BeadCanvas() {
  const {
    beads,
    activeBeadIndex,
    patinaLevel,
    wristSizeCm,
    setActiveBeadIndex,
    removeBead,
    reorderBeads,
    clearBeads,
    energyResult,
  } = useStudio();
  const { lang, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Wrist Size Modal State
  const [isWristModalOpen, setIsWristModalOpen] = useState(false);

  // 3D Orbit & Perspective States
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 2PI in radians
  const [tiltAngle, setTiltAngle] = useState(0); // Pitch in degrees (0 = flat/top-down, 45 = deep 3D perspective)
  const [isAutoSpin, setIsAutoSpin] = useState(true);

  // Drag Gesture States (Bead Drag-and-Drop vs Canvas Orbit)
  type DragState =
    | {
        type: "bead";
        beadIndex: number;
        canvasX: number;
        canvasY: number;
        hasMoved: boolean;
        hoverIndex: number | null;
        willRemove: boolean;
      }
    | {
        type: "orbit";
        startX: number;
        startY: number;
        startRot: number;
        startTilt: number;
      }
    | null;

  const [dragState, setDragState] = useState<DragState>(null);
  const dragStartRef = useRef<{ x: number; y: number; rawX: number; rawY: number }>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });

  // Cache latest projected beads for hit testing
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
  const projectedBeadsRef = useRef<ProjectedBead[]>([]);

  // Auto spin animation loop (paused during dragging)
  useEffect(() => {
    if (!isAutoSpin || dragState !== null) return;
    let animId: number;
    const spin = () => {
      setRotationAngle((prev) => (prev + 0.006) % (Math.PI * 2));
      animId = requestAnimationFrame(spin);
    };
    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin, dragState]);

  // Main 3D Rendering Function
  const render3DBracelet = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 2;
    const width = 500;
    const height = 500;
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
    const trayLight = ctx.createRadialGradient(centerX, centerY - 20, 20, centerX, centerY, 240);
    trayLight.addColorStop(0, "rgba(217, 119, 6, 0.08)");
    trayLight.addColorStop(0.5, "rgba(20, 11, 6, 0.6)");
    trayLight.addColorStop(1, "rgba(10, 5, 2, 0.95)");
    ctx.fillStyle = trayLight;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 10, 230, 0, Math.PI * 2);
    ctx.fill();

    // Concentric sacred gold mandalas (禅意经纬同心金圈)
    ctx.strokeStyle = "rgba(245, 158, 11, 0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 10, 75, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(245, 158, 11, 0.05)";
    ctx.beginPath();
    ctx.arc(centerX, centerY + 10, 175, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    if (count === 0) {
      projectedBeadsRef.current = [];
      ctx.save();
      ctx.strokeStyle = "rgba(217, 119, 6, 0.35)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 145, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      return;
    }

    // 2. Physical Wrist Loop Scale & Dynamic Spacing
    const wristCm = wristSizeCm || 16;
    const loopRadius = wristCm <= 24 ? Math.round(145 * (wristCm / 16)) : 180;
    const countScale = count > 36 ? Math.min(1, 28 / count) : 1;

    // Calculate 3D coordinates for all beads
    const pitchRad = (tiltAngle * Math.PI) / 180;
    const cosPitch = Math.cos(pitchRad);
    const sinPitch = Math.sin(pitchRad);

    const projectedBeads: ProjectedBead[] = [];

    beads.forEach((bead, i) => {
      // Large macro-detailed radius on canvas (10mm = 21px radius / 42px diameter)
      const baseRadius = ((bead.sizeMm || 10) / 10) * 21.0 * countScale;
      
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

    projectedBeadsRef.current = projectedBeads;

    // 3. Draw Braided Silk String under beads (真丝编织串线)
    ctx.save();
    ctx.strokeStyle = "rgba(78, 35, 12, 0.85)";
    ctx.lineWidth = Math.max(3, 4.5 * (cosPitch || 1));
    ctx.beginPath();
    projectedBeads.forEach((pb, idx) => {
      if (idx === 0) ctx.moveTo(pb.x2d, pb.y2d);
      else ctx.lineTo(pb.x2d, pb.y2d);
    });
    ctx.closePath();
    ctx.stroke();

    // Braided gold-amber twist texture
    ctx.strokeStyle = "rgba(245, 158, 11, 0.85)";
    ctx.lineWidth = Math.max(1.5, 2.2 * (cosPitch || 1));
    ctx.setLineDash([4, 2]);
    ctx.stroke();
    ctx.restore();

    // 4. Sort Beads by Z-depth (Draw back beads first, front beads last)
    const sortedBeads = [...projectedBeads].sort((a, b) => a.z3d - b.z3d);

    // 5. Render Guru Bead Tassel if at bottom
    const guruBeadProj = projectedBeads[0]; // Guru is index 0
    if (guruBeadProj) {
      drawGuruTassel(ctx, guruBeadProj.x2d, guruBeadProj.y2d, guruBeadProj.drawRadius, guruBeadProj.depthScale, cosPitch);
    }

    // 6. Draw each bead with 3D Depth, Contact Shadows & Patina
    const isBeadDragging = dragState?.type === "bead";
    const draggedIndex = isBeadDragging ? dragState.beadIndex : -1;
    const hoverIndex = isBeadDragging ? dragState.hoverIndex : -1;
    const willRemove = isBeadDragging && dragState.willRemove;

    sortedBeads.forEach((pb) => {
      // If this bead is currently being dragged, draw a subtle ghost/placeholder at its slot
      if (pb.index === draggedIndex) {
        ctx.save();
        ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(pb.x2d, pb.y2d, pb.drawRadius * 0.95, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        return;
      }

      // If this bead's slot is the hover insertion target, draw a golden target ring
      if (isBeadDragging && !willRemove && pb.index === hoverIndex && hoverIndex !== draggedIndex) {
        ctx.save();
        ctx.strokeStyle = "rgba(245, 158, 11, 0.95)";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "rgba(245, 158, 11, 0.8)";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pb.x2d, pb.y2d, pb.drawRadius * 1.35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

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

    // 7. Render Dragged Floating Bead on TOP of everything
    if (isBeadDragging && dragState.hasMoved) {
      const draggedBeadItem = beads[dragState.beadIndex];
      if (draggedBeadItem) {
        const baseRadius = ((draggedBeadItem.sizeMm || 10) / 10) * 21.0 * countScale;
        const floatRadius = baseRadius * 1.15; // Slightly enlarged to feel elevated

        // Drop shadow on the tray below
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.65)";
        ctx.shadowBlur = 22;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 16;

        drawRealisticBead(
          ctx,
          draggedBeadItem,
          dragState.canvasX,
          dragState.canvasY,
          floatRadius,
          patinaLevel,
          1.15,
          !willRemove, // glow when valid slot
          -Math.PI / 4
        );
        ctx.restore();

        // Visual cues for removal or reorder
        if (willRemove) {
          // Crimson warning aura
          ctx.save();
          ctx.strokeStyle = "rgba(239, 68, 68, 0.9)";
          ctx.lineWidth = 2.5;
          ctx.setLineDash([5, 3]);
          ctx.shadowColor = "rgba(239, 68, 68, 0.8)";
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(dragState.canvasX, dragState.canvasY, floatRadius + 9, 0, Math.PI * 2);
          ctx.stroke();

          // Release to remove badge
          const badgeText = lang === "zh" ? "松手移除 ✕" : "Release to Remove ✕";
          ctx.font = "bold 11px sans-serif";
          const textWidth = ctx.measureText(badgeText).width;
          const badgeX = dragState.canvasX - textWidth / 2 - 8;
          const badgeY = dragState.canvasY - floatRadius - 26;

          ctx.fillStyle = "rgba(127, 29, 29, 0.95)";
          ctx.strokeStyle = "rgba(239, 68, 68, 0.85)";
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, textWidth + 16, 22, 11);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#fecaca";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(badgeText, dragState.canvasX, badgeY + 11);
          ctx.restore();
        } else if (hoverIndex !== null && hoverIndex !== draggedIndex) {
          // Reorder target indicator badge
          ctx.save();
          const badgeText = lang === "zh" ? `换至第 ${hoverIndex + 1} 位` : `Move to #${hoverIndex + 1}`;
          ctx.font = "bold 11px sans-serif";
          const textWidth = ctx.measureText(badgeText).width;
          const badgeX = dragState.canvasX - textWidth / 2 - 8;
          const badgeY = dragState.canvasY - floatRadius - 26;

          ctx.fillStyle = "rgba(20, 11, 6, 0.95)";
          ctx.strokeStyle = "rgba(245, 158, 11, 0.85)";
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, textWidth + 16, 22, 11);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#fde68a";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(badgeText, dragState.canvasX, badgeY + 11);
          ctx.restore();
        }
      }
    }
  }, [beads, activeBeadIndex, patinaLevel, rotationAngle, tiltAngle, wristSizeCm, dragState, lang]);

  useEffect(() => {
    render3DBracelet();
  }, [render3DBracelet]);

  // Helper to get normalized 500x500 canvas coordinates from PointerEvent
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 250, y: 250 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = 500 / rect.width;
    const scaleY = 500 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // Pointer Down (Mouse & Touch) - Hit testing beads vs background orbit
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    e.currentTarget.setPointerCapture(e.pointerId);

    // Hit test beads from front to back (highest z3d first)
    const sortedForHit = [...projectedBeadsRef.current].sort((a, b) => b.z3d - a.z3d);
    let hitIndex = -1;

    for (const pb of sortedForHit) {
      const dist = Math.hypot(x - pb.x2d, y - pb.y2d);
      if (dist <= pb.drawRadius * 1.35) {
        hitIndex = pb.index;
        break;
      }
    }

    if (hitIndex !== -1) {
      // Pressed on a bead -> Bead Drag-and-Drop Mode
      setIsAutoSpin(false);
      setActiveBeadIndex(hitIndex);
      dragStartRef.current = { x, y, rawX: e.clientX, rawY: e.clientY };
      setDragState({
        type: "bead",
        beadIndex: hitIndex,
        canvasX: x,
        canvasY: y,
        hasMoved: false,
        hoverIndex: hitIndex,
        willRemove: false,
      });
    } else {
      // Pressed on empty canvas -> 3D Orbit Rotate & Tilt Mode
      setIsAutoSpin(false);
      dragStartRef.current = { x, y, rawX: e.clientX, rawY: e.clientY };
      setDragState({
        type: "orbit",
        startX: e.clientX,
        startY: e.clientY,
        startRot: rotationAngle,
        startTilt: tiltAngle,
      });
    }
  };

  // Pointer Move (Mouse & Touch) - Real-time Drag updates
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragState) return;

    if (dragState.type === "orbit") {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      // Drag horizontally to rotate 360°
      const newRot = dragState.startRot + deltaX * 0.012;
      setRotationAngle(newRot);

      // Drag vertically to tilt 3D angle (0° to 50°)
      const newTilt = Math.max(0, Math.min(50, dragState.startTilt - deltaY * 0.15));
      setTiltAngle(newTilt);
      return;
    }

    if (dragState.type === "bead") {
      const { x, y } = getCanvasCoords(e);
      const moveDist = Math.hypot(e.clientX - dragStartRef.current.rawX, e.clientY - dragStartRef.current.rawY);
      const hasMoved = dragState.hasMoved || moveDist > 6;

      const centerX = 250;
      const centerY = 240;
      const distFromCenter = Math.hypot(x - centerX, y - centerY);

      const wristCm = wristSizeCm || 16;
      const loopRadius = wristCm <= 24 ? Math.round(145 * (wristCm / 16)) : 180;

      // Find closest bead slot in projected list
      let closestSlotIndex = dragState.beadIndex;
      let minSlotDist = Infinity;

      projectedBeadsRef.current.forEach((pb) => {
        const d = Math.hypot(x - pb.x2d, y - pb.y2d);
        if (d < minSlotDist) {
          minSlotDist = d;
          closestSlotIndex = pb.index;
        }
      });

      // Drag away to remove condition:
      // 1. Dragged outward beyond bracelet loop (distFromCenter > loopRadius + 60)
      // 2. Dragged into the center void hub (distFromCenter < 65)
      // 3. Or distance to nearest bead slot is greater than 80px
      const willRemove = distFromCenter > (loopRadius + 55) || distFromCenter < 65 || minSlotDist > 80;

      setDragState({
        ...dragState,
        canvasX: x,
        canvasY: y,
        hasMoved,
        hoverIndex: closestSlotIndex,
        willRemove,
      });
    }
  };

  // Pointer Up (Mouse & Touch) - Drop to Reorder or Remove
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragState) return;

    if (dragState.type === "bead") {
      if (dragState.hasMoved) {
        if (dragState.willRemove) {
          // Dragged away -> Remove Bead!
          removeBead(dragState.beadIndex);
          setActiveBeadIndex(null);
        } else if (dragState.hoverIndex !== null && dragState.hoverIndex !== dragState.beadIndex) {
          // Dropped on another slot -> Reorder Beads!
          reorderBeads(dragState.beadIndex, dragState.hoverIndex);
          setActiveBeadIndex(dragState.hoverIndex);
        }
      } else {
        // Tap / Click on bead without dragging -> Select bead
        setActiveBeadIndex(dragState.beadIndex);
      }
    } else if (dragState.type === "orbit") {
      const moveDist = Math.hypot(e.clientX - dragStartRef.current.rawX, e.clientY - dragStartRef.current.rawY);
      if (moveDist < 4) {
        // Tapped empty background -> deselect bead
        setActiveBeadIndex(null);
      }
    }

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setDragState(null);
  };

  return (
    <div className="zen-silk-tray zen-corner-brass rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden border border-amber-500/30 shadow-2xl">
      {/* Top Toolbar */}
      <div className="w-full flex items-center justify-between z-10 mb-2 px-1">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold font-serif shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{energyResult.totalBeads} {t("totalBeads")}</span>
          </span>

          {/* Interactive Wrist Size Trigger */}
          <button
            onClick={() => setIsWristModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/60 hover:bg-amber-900/80 border border-amber-900/60 hover:border-amber-500/50 text-amber-200/90 text-xs font-serif transition-all shadow-sm group"
            title="Click to customize wrist size"
          >
            <Ruler className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{lang === "zh" ? `手腕 ${wristSizeCm}cm` : `Wrist ${wristSizeCm}cm`}</span>
            <span className="text-[10px] text-amber-400/80 font-bold">▾</span>
          </button>
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

      {/* Interactive 3D Orbit & Bead Drag Canvas */}
      <div className={`relative select-none ${dragState?.type === "bead" ? "cursor-grabbing" : "cursor-grab"}`}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: "none" }}
          className="rounded-full shadow-2xl transition-transform"
        />

        {/* Center Canvas Dynamic Drag Feedback (Only shown while actively dragging beads) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          {dragState?.type === "bead" && dragState.hasMoved ? (
            dragState.willRemove ? (
              <div className="space-y-1 bg-red-950/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-red-500/70 shadow-2xl animate-pulse text-center">
                <p className="text-red-200 text-xs font-bold font-serif flex items-center justify-center gap-1.5">
                  <Trash2 className="w-4 h-4 text-red-400" />
                  <span>{lang === "zh" ? "松开鼠标 / 手指即可移除此珠" : "Release to remove this bead"}</span>
                </p>
                <p className="text-[10px] text-red-300/70 font-serif">
                  {lang === "zh" ? "拖回圆环手串可取消移除" : "Drag back to bracelet to cancel"}
                </p>
              </div>
            ) : dragState.hoverIndex !== null && dragState.hoverIndex !== dragState.beadIndex ? (
              <div className="space-y-1 bg-amber-950/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-amber-500/60 shadow-2xl text-center">
                <p className="text-amber-200 text-xs font-bold font-serif flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{lang === "zh" ? `换位至第 ${dragState.hoverIndex + 1} 颗位置` : `Drop to swap with #${dragState.hoverIndex + 1}`}</span>
                </p>
                <p className="text-[10px] text-amber-300/70 font-serif">
                  {lang === "zh" ? "松开手指/鼠标即可完成换位" : "Release to complete reorder"}
                </p>
              </div>
            ) : null
          ) : null}
        </div>
      </div>

      {/* Canvas Bottom Quick Tip */}
      <p className="text-[11px] text-amber-200/60 mt-2 text-center font-serif">
        🪵 {lang === "zh" ? "按住珠子即可直接拖拽换位与拖离手串移除 · 拖拽空白处 360° 旋转 · 滑块预览十年包浆" : "Direct Drag to Reorder & Remove • Drag canvas to orbit 360° • Slide below for 10-Yr Patina"}
      </p>

      {/* Wrist Circumference Customizer Modal */}
      <WristSizeModal
        isOpen={isWristModalOpen}
        onClose={() => setIsWristModalOpen(false)}
      />
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
