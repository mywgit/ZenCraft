"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { CHAKRA_METADATA, ChakraType } from "@/lib/energyCalculator";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  ShieldCheck,
  Award,
  Flame,
  Heart,
  Eye,
  Crown,
  Compass,
  MessageCircle,
  Truck,
  ArrowRight,
} from "lucide-react";

export function EnergyReport() {
  const { energyResult, setIsCertificateOpen, customerName, setCustomerName } = useStudio();
  const { lang, t } = useLanguage();
  const [isOrdering, setIsOrdering] = useState(false);

  const chakrasList: ChakraType[] = [
    "crown",
    "thirdEye",
    "throat",
    "heart",
    "solar",
    "sacral",
    "root",
  ];

  const handleDirectOrder = () => {
    setIsOrdering(true);
    // Simulate Stripe Checkout redirect or checkout modal
    setTimeout(() => {
      alert(
        lang === "zh"
          ? `【模拟支付成功】已生成专属制作工单！\n客户姓名: ${customerName}\n珠数: ${energyResult.totalBeads} 颗\n实付金额: $${energyResult.totalPriceUsd} USD\n手串设计图纸与收件信息已同步发送至工坊！`
          : `[Stripe Checkout Simulated]\nCustom Order Created!\nCustomer: ${customerName}\nTotal Beads: ${energyResult.totalBeads}\nAmount: $${energyResult.totalPriceUsd} USD\nCrafting worksheet sent to Dacheng Atelier!`
      );
      setIsOrdering(false);
    }, 800);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Master! I designed a custom ZenCraft Mala with ${energyResult.totalBeads} beads (Dominant: ${energyResult.dominantElement}, Top Chakra: ${CHAKRA_METADATA[energyResult.topChakra].name}). I would like a personalized VIP birth-chart blessing & consultation!`
  );

  return (
    <div className="w-full bg-slate-900/70 backdrop-blur-md rounded-2xl border border-amber-500/20 p-4 sm:p-6 space-y-6">
      {/* Header with Zen Flame */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              {t("energyReportTitle")}
            </h3>
            <p className="text-[11px] text-amber-200/80 font-serif">
              {lang === "zh" ? energyResult.blessingTitleZh : energyResult.blessingTitle}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
            ${energyResult.totalPriceUsd}
          </span>
          <p className="text-[10px] text-slate-400">{t("totalPrice")}</p>
        </div>
      </div>

      {/* Dominant Blessing Quote */}
      <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 text-center">
        <p className="text-xs text-amber-200 font-serif leading-relaxed italic">
          &ldquo;{lang === "zh" ? energyResult.blessingQuoteZh : energyResult.blessingQuote}&rdquo;
        </p>
      </div>

      {/* 7 Chakras Distribution */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">{t("chakraBalance")}</span>
          <span className="text-[11px] text-amber-400">
            Top: {lang === "zh" ? CHAKRA_METADATA[energyResult.topChakra].nameZh : CHAKRA_METADATA[energyResult.topChakra].name}
          </span>
        </div>

        <div className="space-y-1.5">
          {chakrasList.map((chakraKey) => {
            const chakra = CHAKRA_METADATA[chakraKey];
            const score = energyResult.chakraScores[chakraKey];
            return (
              <div key={chakraKey} className="space-y-0.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="truncate pr-2">
                    {lang === "zh" ? chakra.nameZh : chakra.name}
                  </span>
                  <span className="font-mono text-slate-300 font-bold">{score}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${score}%`,
                      backgroundColor: chakra.color,
                      boxShadow: `0 0 8px ${chakra.color}66`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zodiac & Aromatherapy Pill Grid */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        {/* Zodiac */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{t("zodiacAffinity")}</span>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            {energyResult.topZodiacs.map((z) => (
              <span
                key={z}
                className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium"
              >
                {z}
              </span>
            ))}
          </div>
        </div>

        {/* Aromatherapy */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>{t("aromaRating")}</span>
          </div>
          <div className="flex items-center gap-1 pt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < energyResult.aromaScore ? "text-amber-400" : "text-slate-700"
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
        <label className="text-[11px] font-medium text-slate-400">
          {lang === "zh" ? "定制持有人姓名 (用于专属证书题名):" : "Custom Wearer Name (for Energy Certificate):"}
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="e.g. Sarah Jenkins"
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500/50"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        {/* Direct Order Button */}
        <button
          onClick={handleDirectOrder}
          disabled={energyResult.totalBeads === 0 || isOrdering}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>
            {isOrdering
              ? lang === "zh"
                ? "正在连接工坊..."
                : "Securing Order..."
              : `${t("orderCustomCraft")} ($${energyResult.totalPriceUsd})`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Generate Certificate Button */}
        <button
          onClick={() => setIsCertificateOpen(true)}
          disabled={energyResult.totalBeads === 0}
          className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          <Award className="w-4 h-4" />
          <span>{t("generateCertificate")}</span>
        </button>

        {/* WhatsApp VIP Reading High-Ticket Channel */}
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-medium rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "预约大师生辰八字高定 ($199 VIP)" : "Book VIP Master Astrological Reading ($199)"}</span>
        </a>
      </div>

      {/* Trust Badges */}
      <div className="pt-2 border-t border-slate-900 space-y-1.5 text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Truck className="w-3.5 h-3.5 text-amber-400/80 flex-shrink-0" />
          <span>{t("freeShippingBadge")}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>{t("authenticityGuarantee")}</span>
        </div>
      </div>
    </div>
  );
}
