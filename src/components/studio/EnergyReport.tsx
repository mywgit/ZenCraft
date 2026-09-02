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
} from "lucide-react";

import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { OrderItem } from "@/types/order";

export function EnergyReport() {
  const { energyResult, setIsCertificateOpen, customerName, setCustomerName } = useStudio();
  const { lang, t } = useLanguage();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const chakrasList: ChakraType[] = [
    "crown",
    "thirdEye",
    "throat",
    "heart",
    "solar",
    "sacral",
    "root",
  ];

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
      materialsSummary: energyResult.blessingTitle,
      materialsSummaryZh: energyResult.blessingTitleZh,
    },
  };

  const handleDirectOrder = () => {
    setIsCheckoutOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Master! I designed a custom ZenCraft Mala with ${energyResult.totalBeads} beads (Dominant: ${energyResult.dominantElement}, Top Chakra: ${CHAKRA_METADATA[energyResult.topChakra].name}). I would like a personalized VIP birth-chart blessing & consultation!`
  );

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

        {/* WhatsApp VIP Reading High-Ticket Channel */}
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-serif font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "预约大师生辰八字高定 ($199 VIP)" : "Book VIP Master Astrological Reading ($199)"}</span>
        </a>
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
    </div>
  );
}
