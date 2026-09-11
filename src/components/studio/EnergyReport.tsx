"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { CHAKRA_METADATA, ChakraType } from "@/lib/energyCalculator";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  ShieldCheck,
  Award,
  Heart,
  Compass,
  MessageCircle,
  Truck,
  ArrowRight,
  Mail,
  X,
  CheckCircle2,
} from "lucide-react";

import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { OrderItem } from "@/types/order";
import { getMaterialById } from "@/lib/materialsData";

export function EnergyReport() {
  const { beads, energyResult, setIsCertificateOpen, customerName, setCustomerName } = useStudio();
  const { lang, t } = useLanguage();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);

  const chakrasList: ChakraType[] = [
    "crown",
    "thirdEye",
    "throat",
    "heart",
    "solar",
    "sacral",
    "root",
  ];

  // Compute exact bead sequence and material count breakdown for workshop fulfillment
  const beadsSequence = beads.map((b, i) => {
    const mat = getMaterialById(b.materialId);
    return {
      index: i + 1,
      materialId: b.materialId,
      nameZh: mat?.nameZh || "圣木",
      nameEn: mat?.name || "Sacred Bead",
      sizeMm: b.sizeMm,
      color: mat?.colors.base || "#caa472",
      image: mat?.image || "/beads/green-sandalwood.png",
    };
  });

  const countMap: Record<string, { materialId: string; nameZh: string; nameEn: string; count: number; sizeMm: number; image: string }> = {};
  beads.forEach((b) => {
    const mat = getMaterialById(b.materialId);
    const key = `${b.materialId}-${b.sizeMm}`;
    if (!countMap[key]) {
      countMap[key] = {
        materialId: b.materialId,
        nameZh: mat?.nameZh || "圣木",
        nameEn: mat?.name || "Sacred Bead",
        count: 0,
        sizeMm: b.sizeMm,
        image: mat?.image || "/beads/green-sandalwood.png",
      };
    }
    countMap[key].count += 1;
  });
  const materialCounts = Object.values(countMap);
  const materialsSummaryZh = materialCounts.map((m) => `${m.nameZh} ${m.sizeMm}mm (${m.count}颗)`).join(" + ");
  const materialsSummaryEn = materialCounts.map((m) => `${m.nameEn} ${m.sizeMm}mm (${m.count} pcs)`).join(" + ");

  const customOrderItem: OrderItem = {
    id: `custom-mala-${Date.now()}`,
    title: `Bespoke Dacheng Zen Mala (${energyResult.totalBeads} Beads)`,
    titleZh: `大城正统老料高定手串 (${energyResult.totalBeads} 颗精选)`,
    category: "custom-mala",
    image: "/products/master-zitan.jpg",
    priceUsd: energyResult.totalPriceUsd,
    quantity: 1,
    details: {
      wearerName: customerName || (lang === "zh" ? "有缘善信" : "Mindful Seeker"),
      beadCount: energyResult.totalBeads,
      dominantElement: energyResult.dominantElement,
      materialsSummary: materialsSummaryEn || energyResult.blessingTitle,
      materialsSummaryZh: materialsSummaryZh || energyResult.blessingTitleZh,
      beadsSequence,
      materialCounts,
    },
  };

  const handleDirectOrder = () => {
    setIsCheckoutOpen(true);
  };


  return (
    <div className="w-full zen-wood-card rounded-2xl p-5 sm:p-6 space-y-6 relative">
      {/* Header with Cinnabar Accent */}
      <div className="flex items-center justify-between border-b border-amber-900/40 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-amber-700 p-0.5 shadow-md flex items-center justify-center">
            <span className="text-white font-serif font-black text-sm">道</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-100 font-serif tracking-wide">
              {t("energyReportTitle")}
            </h3>
            <p className="text-[11px] text-amber-300/80 font-serif">
              {lang === "zh" ? energyResult.blessingTitleZh : energyResult.blessingTitle}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-amber-400 font-mono">
            ${energyResult.totalPriceUsd}
          </span>
          <p className="text-[10px] text-amber-200/50 font-serif">{t("totalPrice")}</p>
        </div>
      </div>

      {/* Dominant Blessing Quote Scroll */}
      <div className="bg-[#120a06]/90 p-4 rounded-xl border border-amber-900/50 text-center relative overflow-hidden">
        <p className="text-xs text-amber-200 font-serif leading-relaxed italic">
          &ldquo;{lang === "zh" ? energyResult.blessingQuoteZh : energyResult.blessingQuote}&rdquo;
        </p>
      </div>

      {/* 7 Chakras Distribution */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-serif">
          <span className="font-bold text-amber-100">{t("chakraBalance")}</span>
          <span className="text-[11px] text-amber-400 font-bold">
            主修: {lang === "zh" ? CHAKRA_METADATA[energyResult.topChakra].nameZh : CHAKRA_METADATA[energyResult.topChakra].name}
          </span>
        </div>

        <div className="space-y-2">
          {chakrasList.map((chakraKey) => {
            const chakra = CHAKRA_METADATA[chakraKey];
            const score = energyResult.chakraScores[chakraKey];
            return (
              <div key={chakraKey} className="space-y-1">
                <div className="flex justify-between text-[11px] font-serif text-amber-200/70">
                  <span className="truncate pr-2">
                    {lang === "zh" ? chakra.nameZh : chakra.name}
                  </span>
                  <span className="font-mono text-amber-300 font-bold">{score}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#100905] rounded-full overflow-hidden border border-amber-950">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${score}%`,
                      backgroundColor: chakra.color,
                      boxShadow: `0 0 8px ${chakra.color}88`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zodiac & Aromatherapy Pill Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* Zodiac */}
        <div className="p-3 rounded-xl bg-[#120a06]/90 border border-amber-900/40 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold font-serif text-amber-100">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{t("zodiacAffinity")}</span>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            {energyResult.topZodiacs.map((z) => (
              <span
                key={z}
                className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-900/60 font-serif font-medium"
              >
                {z}
              </span>
            ))}
          </div>
        </div>

        {/* Aromatherapy */}
        <div className="p-3 rounded-xl bg-[#120a06]/90 border border-amber-900/40 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold font-serif text-amber-100">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>{t("aromaRating")}</span>
          </div>
          <div className="flex items-center gap-1 pt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < energyResult.aromaScore ? "text-amber-400" : "text-amber-950"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Name Input (For Certificate & Order) */}
      <div className="space-y-1.5 pt-1">
        <label className="text-[11px] font-serif font-bold text-amber-200/80">
          {lang === "zh" ? "定制持有人姓名 (用于专属证书题名):" : "Custom Wearer Name (for Energy Certificate):"}
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="e.g. Sarah Jenkins"
          className="w-full px-3.5 py-2.5 bg-[#120a06] border border-amber-900/50 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-500/60"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        {/* Direct Order Button */}
        <button
          onClick={handleDirectOrder}
          disabled={energyResult.totalBeads === 0}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-serif font-black rounded-xl shadow-xl shadow-amber-950/60 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border border-amber-400/40"
        >
          <span>{`${t("orderCustomCraft")} ($${energyResult.totalPriceUsd})`}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Generate Certificate Button */}
        <button
          onClick={() => setIsCertificateOpen(true)}
          disabled={energyResult.totalBeads === 0}
          className="w-full py-2.5 px-4 bg-[#120a06] hover:bg-amber-950/80 border border-amber-500/40 text-amber-300 font-serif font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-md"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>{t("generateCertificate")}</span>
        </button>

        {/* VIP Master Bespoke & WeChat Consultation Channel */}
        <button
          onClick={() => setIsVipModalOpen(true)}
          className="w-full py-2 px-3 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-serif font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm hover:scale-[1.01]"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lang === "zh" ? "预约大师生辰八字高定 ($199 VIP)" : "Book VIP Master Astrological Reading ($199)"}</span>
        </button>
      </div>

      {/* Trust Badges */}
      <div className="pt-2 border-t border-amber-950/60 space-y-1.5 text-[11px] font-serif text-amber-200/60">
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-400/80 flex-shrink-0" />
          <span>{t("freeShippingBadge")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>{t("authenticityGuarantee")}</span>
        </div>
      </div>

      {/* Real Full-Featured Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        orderItem={customOrderItem}
      />

      {/* VIP 八字高定与微信/邮箱咨询弹窗 */}
      {isVipModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsVipModalOpen(false)}
        >
          <div 
            className="relative bg-[#120a06] border border-amber-500/40 rounded-3xl p-6 sm:p-7 max-w-md w-full text-center space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVipModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === "zh" ? "大城大师生辰八字高定 · 微信/邮件预约" : "VIP Master Sourcing & Reading"}</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-amber-100">
                {lang === "zh" ? "扫码添加大师/顾问微信" : "Scan to Connect on WeChat"}
              </h3>
              <p className="text-xs text-amber-200/70 font-serif leading-relaxed">
                {lang === "zh" 
                  ? "发送您的生辰八字与定制诉求，由大城老工艺师亲自推演五行喜忌、视频选木配珠"
                  : "Send your birth date & time. Our master artisan analyzes your elemental balance & recommends sacred beads."}
              </p>
            </div>

            {/* 微信二维码卡片 */}
            <div className="flex justify-center py-1">
              <div className="p-3 bg-white rounded-2xl shadow-xl border border-amber-400/40">
                <img
                  src="/wechat-qr.jpg"
                  alt="微信顾问二维码"
                  className="w-52 h-auto rounded-xl object-contain mx-auto"
                />
                <p className="text-[11px] text-slate-800 font-bold mt-1.5">
                  {lang === "zh" ? "扫二维码，添加我为朋友" : "Scan QR code to add friend"}
                </p>
              </div>
            </div>

            {/* 专属高定服务权益 */}
            <div className="text-left bg-amber-950/40 border border-amber-900/50 rounded-xl p-3 space-y-1.5 text-[11px] font-serif text-amber-200/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{lang === "zh" ? "深度生辰八字五行测算与喜用神平衡方案" : "In-depth Five Elements & Chakra resonance analysis"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{lang === "zh" ? "大城源头野生老料（紫檀/金丝楠/沉香）一对一视频挑珠" : "1-on-1 video inspection of genuine aged wild timbers"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{lang === "zh" ? "附赠朱砂烫金大师加持文疏与专属实木礼盒" : "Certified Cinnabar blessing talisman & luxury gift box"}</span>
              </div>
            </div>

            {/* 官方邮箱备选 */}
            <div className="pt-1 text-xs text-slate-400 border-t border-amber-950/60">
              <span>{lang === "zh" ? "亦可通过官方邮箱联系咨询：" : "Or reach us directly via email: "}</span>
              <a 
                href="mailto:support@puretoolhub.com"
                className="text-amber-400 hover:text-amber-300 font-mono font-medium underline underline-offset-2 ml-1"
              >
                support@puretoolhub.com
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
