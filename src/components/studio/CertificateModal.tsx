"use client";

import React, { useRef, useEffect } from "react";
import { useStudio } from "@/context/StudioContext";
import { useLanguage } from "@/context/LanguageContext";
import { getZodiacName } from "@/lib/i18n";
import { CHAKRA_METADATA } from "@/lib/energyCalculator";
import { getMaterialById } from "@/lib/materialsData";
import { drawRealisticBead, ensureBeadImagesLoaded } from "@/lib/beadTextureRenderer";
import { X, Download, Share2, Award, CheckCircle } from "lucide-react";

export function CertificateModal() {
  const { isCertificateOpen, setIsCertificateOpen, customerName, energyResult, beads, patinaLevel } =
    useStudio();
  const { lang, t } = useLanguage();
  const certCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isCertificateOpen) return;

    const renderPoster = () => {
      const canvas = certCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // High Resolution for Download (960 x 1280 at 2x)
      const dpr = 2;
      const width = 480;
      const height = 640;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // 1. Dark Parchment & Gold Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#090a0f");
      bgGrad.addColorStop(0.5, "#131826");
      bgGrad.addColorStop(1, "#090a0f");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Gold Border & Ornaments
      ctx.strokeStyle = "rgba(217, 119, 6, 0.4)";
      ctx.lineWidth = 2;
      ctx.strokeRect(16, 16, width - 32, height - 32);

      ctx.strokeStyle = "rgba(217, 119, 6, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(22, 22, width - 44, height - 44);

      // Corner Ornaments
      const drawCorner = (cx: number, cy: number) => {
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(cx - 3, cy - 3, 6, 6);
      };
      drawCorner(22, 22);
      drawCorner(width - 22, 22);
      drawCorner(22, height - 22);
      drawCorner(width - 22, height - 22);

      // 3. Header Text
      ctx.textAlign = "center";
      ctx.fillStyle = "#f59e0b";
      ctx.font = lang === "zh" ? "bold 13px 'Noto Serif SC', serif" : "bold 13px serif";
      ctx.letterSpacing = "3px";
      ctx.fillText(
        lang === "zh" ? "✦ 大城宫廷木作 · 东方能量认证文疏 ✦" : "✦ ZEN CRAFT ATELIER ✦",
        width / 2,
        55
      );

      ctx.fillStyle = "#ffffff";
      ctx.font = lang === "zh" ? "bold 16px 'Noto Serif SC', serif" : "bold 18px serif";
      ctx.letterSpacing = "1px";
      ctx.fillText(
        lang === "zh" ? "天然正统老料与手作保真证书" : "CERTIFICATE OF AUTHENTICITY",
        width / 2,
        82
      );

      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px sans-serif";
      ctx.letterSpacing = "0px";
      ctx.fillText(
        lang === "zh" ? "& 专属身心能量加持" : "& ENERGY BLESSING",
        width / 2,
        98
      );

      // Serial & Date
      ctx.textAlign = "left";
      ctx.fillStyle = "#64748b";
      ctx.font = "10px monospace";
      ctx.fillText("SERIAL: ZC-2026-8891", 40, 125);

      ctx.textAlign = "right";
      ctx.fillText(`DATE: ${new Date().toLocaleDateString()}`, width - 40, 125);

      // Divider
      ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
      ctx.beginPath();
      ctx.moveTo(40, 135);
      ctx.lineTo(width - 40, 135);
      ctx.stroke();

      // 4. Personalized Dedication
      ctx.textAlign = "center";
      ctx.fillStyle = "#94a3b8";
      ctx.font = "italic 11px serif";
      ctx.fillText(
        lang === "zh" ? "专属手作恭造题名持有人" : "Specially Handcrafted For",
        width / 2,
        158
      );

      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 17px serif";
      ctx.fillText(customerName || (lang === "zh" ? "有缘善信" : "Mindful Seeker"), width / 2, 180);

      // 5. Authentic Realistic 3D Beaded Bracelet
      const circleCenterX = width / 2;
      const circleCenterY = 264;
      const circleR = 68;
      const count = beads.length;

      if (count > 0) {
        // Luxury Ambient Silk Tray Halo
        ctx.save();
        const glowGrad = ctx.createRadialGradient(
          circleCenterX,
          circleCenterY,
          10,
          circleCenterX,
          circleCenterY,
          circleR + 35
        );
        glowGrad.addColorStop(0, "rgba(245, 158, 11, 0.14)");
        glowGrad.addColorStop(0.5, "rgba(217, 119, 6, 0.05)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(circleCenterX, circleCenterY, circleR + 35, 0, Math.PI * 2);
        ctx.fill();

        // Sacred concentric gold ring
        ctx.strokeStyle = "rgba(245, 158, 11, 0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(circleCenterX, circleCenterY, circleR + 24, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Braided silk string underneath beads
        ctx.save();
        ctx.strokeStyle = "rgba(180, 83, 9, 0.8)";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        beads.forEach((_, i) => {
          const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
          const bx = circleCenterX + Math.cos(angle) * circleR;
          const by = circleCenterY + Math.sin(angle) * circleR;
          if (i === 0) ctx.moveTo(bx, by);
          else ctx.lineTo(bx, by);
        });
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        // Draw Guru Tassel hanging down from bead index 0 inside the mala ring
        const guruX = circleCenterX;
        const guruY = circleCenterY - circleR;
        drawCertificateTassel(ctx, guruX, guruY);

        // Draw each 100% photorealistic bead with texture, depth, shadow & patina
        beads.forEach((bead, i) => {
          const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
          const bx = circleCenterX + Math.cos(angle) * circleR;
          const by = circleCenterY + Math.sin(angle) * circleR;
          
          // Realistic diameter (~21px diameter / 10.8px radius for 10mm)
          const baseRadius = ((bead.sizeMm || 10) / 10) * 10.8;

          drawRealisticBead(
            ctx,
            bead,
            bx,
            by,
            baseRadius,
            patinaLevel,
            1.0,
            false,
            -Math.PI / 4
          );
        });
      }

      // 6. Energy Profile Details Box
      ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
      ctx.fillRect(40, 360, width - 80, 130);
      ctx.strokeStyle = "rgba(245, 158, 11, 0.2)";
      ctx.strokeRect(40, 360, width - 80, 130);

      const elementNamesZh: Record<string, string> = {
        wood: "木 (滋养生发)",
        fire: "火 (热情洞见)",
        earth: "土 (稳重厚德)",
        metal: "金 (果决清明)",
        water: "水 (灵动通达)",
      };

      ctx.textAlign = "left";
      ctx.fillStyle = "#f59e0b";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText(
        lang === "zh" ? "✦ 五行与七脉轮共振能量测评" : "✦ METAPHYSICAL ENERGY ALIGNMENT",
        55,
        382
      );

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "11px sans-serif";
      ctx.fillText(
        lang === "zh"
          ? `• 主导五行能量: ${elementNamesZh[energyResult.dominantElement] || energyResult.dominantElement}`
          : `• Dominant Element: ${energyResult.dominantElement.toUpperCase()}`,
        55,
        404
      );
      ctx.fillText(
        lang === "zh"
          ? `• 核心共振脉轮: ${CHAKRA_METADATA[energyResult.topChakra].nameZh}`
          : `• Top Chakra: ${CHAKRA_METADATA[energyResult.topChakra].name}`,
        55,
        424
      );
      ctx.fillText(
        lang === "zh"
          ? `• 生肖星座共振: ${energyResult.topZodiacs.map((z) => getZodiacName(z, lang)).join("、")}`
          : `• Zodiac Synergy: ${energyResult.topZodiacs.map((z) => getZodiacName(z, lang)).join(", ")}`,
        55,
        444
      );
      ctx.fillText(
        lang === "zh"
          ? `• 手串总珠数: ${energyResult.totalBeads} 颗 (${energyResult.totalLengthCm}cm)`
          : `• Total Beads: ${energyResult.totalBeads} (${energyResult.totalLengthCm}cm)`,
        55,
        464
      );

      // 7. Master Blessing & Oriental Seal
      ctx.textAlign = "center";
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "italic 11px serif";
      ctx.fillText(
        lang === "zh"
          ? "“愿此方寸灵珠，为您拂拭尘劳，带来内心澄明笃定与安宁喜乐。”"
          : '"May these sacred beads bring clarity, grounding, and inner peace."',
        width / 2,
        525
      );

      // Oriental Red Seal Stamp
      ctx.save();
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(width / 2 - 25, 545, 50, 50);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(width / 2 - 22, 548, 44, 44);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px serif";
      ctx.fillText("禅印", width / 2, 575);
      ctx.restore();

      ctx.fillStyle = "#64748b";
      ctx.font = "9px sans-serif";
      ctx.fillText(
        lang === "zh"
          ? "中国河北大城红木工坊 • 100% 天然野生老料保真"
          : "DACHENG TIMBER ATELIER • 100% BOTANICAL VERIFIED",
        width / 2,
        615
      );
    };

    // Ensure all bead texture images are loaded in cache before drawing
    const beadIds = beads.map((b) => b.materialId);
    ensureBeadImagesLoaded(beadIds, () => {
      renderPoster();
    });

    renderPoster();
  }, [isCertificateOpen, customerName, energyResult, beads, patinaLevel]);

  const handleDownload = () => {
    const canvas = certCanvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `ZenCraft-Certificate-${(customerName || "Seeker").replace(/\s+/g, "_")}.png`;
    a.click();
  };

  if (!isCertificateOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative bg-slate-950 border border-amber-500/30 rounded-3xl p-4 sm:p-6 max-w-lg w-full shadow-2xl flex flex-col items-center space-y-4 my-8">
        {/* Close Button */}
        <button
          onClick={() => setIsCertificateOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === "zh" ? "官方专属能量证书" : "Official Energy Blessing Certificate"}</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            {lang === "zh" ? "您的专属手作认证海报已生成" : "Your Custom Energy Certificate is Ready"}
          </h3>
        </div>

        {/* Canvas Display */}
        <div className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black">
          <canvas ref={certCanvasRef} className="max-w-full h-auto shadow-inner" />
        </div>

        {/* Download & Share Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
          <button
            onClick={handleDownload}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 text-xs sm:text-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{lang === "zh" ? "下载高清证书海报 (PNG)" : "Download HD Certificate (PNG)"}</span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "My Custom ZenCraft Energy Mala",
                  text: `Check out my custom handcrafted energy bracelet for ${customerName}!`,
                  url: window.location.href,
                });
              } else {
                handleDownload();
              }
            }}
            className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 text-xs transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] text-slate-500 text-center">
          📜 {lang === "zh" ? "此证书随每个实物订单一并烫金打印并加盖工坊朱砂印章寄出。" : "This certificate is physically gold-foil printed and hand-stamped with red vermilion in every parcel."}
        </p>
      </div>
    </div>
  );
}

/**
 * Draw authentic Tibetan Buddhist Guru Bead Tassel inside the certificate mandala
 */
function drawCertificateTassel(
  ctx: CanvasRenderingContext2D,
  gx: number,
  gy: number
) {
  ctx.save();
  const startX = gx;
  const startY = gy + 8;
  const cordLen = 26;

  // Braided silk cord (双股朱砂红绳)
  ctx.strokeStyle = "rgba(185, 28, 28, 0.9)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(startX - 1.5, startY);
  ctx.lineTo(startX - 3, startY + cordLen * 0.6);
  ctx.lineTo(startX - 2, startY + cordLen);
  ctx.moveTo(startX + 1.5, startY);
  ctx.lineTo(startX + 3, startY + cordLen * 0.6);
  ctx.lineTo(startX + 2, startY + cordLen);
  ctx.stroke();

  // Disciple spacer beads (纯银小珠)
  const beadY = startY + cordLen * 0.55;
  [-3, 3].forEach((offsetX) => {
    ctx.beginPath();
    ctx.arc(startX + offsetX, beadY, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "#e2e8f0";
    ctx.fill();
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  });

  // Tassel frills (真丝流苏穗)
  const tasselTopY = startY + cordLen;
  const tasselBottomY = tasselTopY + 18;
  const tasselGrad = ctx.createLinearGradient(startX, tasselTopY, startX, tasselBottomY);
  tasselGrad.addColorStop(0, "rgba(185, 28, 28, 0.95)");
  tasselGrad.addColorStop(1, "rgba(127, 29, 29, 0.4)");
  ctx.fillStyle = tasselGrad;
  ctx.beginPath();
  ctx.moveTo(startX - 4, tasselTopY);
  ctx.lineTo(startX + 4, tasselTopY);
  ctx.lineTo(startX + 7, tasselBottomY);
  ctx.lineTo(startX - 7, tasselBottomY);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
