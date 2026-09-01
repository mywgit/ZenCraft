"use client";

import React, { useState } from "react";
import { READY_PRODUCTS, ProductCategory, ReadyProduct } from "@/lib/readyProductsData";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ShieldCheck, TreePine, Star, Truck, ArrowRight, MessageCircle, Heart, Tag } from "lucide-react";
import Link from "next/link";

export default function MarketPage() {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProductCategory>("all");

  const filteredProducts =
    selectedCategory === "all"
      ? READY_PRODUCTS
      : READY_PRODUCTS.filter((p) => p.category === selectedCategory);

  const categories: { id: "all" | ProductCategory; labelEn: string; labelZh: string; icon: string }[] = [
    { id: "all", labelEn: "All Artifacts", labelZh: "全部佳品", icon: "🏮" },
    { id: "mala", labelEn: "Masterpiece Malas", labelZh: "现货手串", icon: "📿" },
    { id: "teapet", labelEn: "Tea Pets & Figurines", labelZh: "案头茶宠", icon: "🐉" },
    { id: "carving", labelEn: "Worry & Hand Carvings", labelZh: "红木把件", icon: "🪵" },
    { id: "incense", labelEn: "Incense Vessels", labelZh: "香道雅器", icon: "🕯️" },
    { id: "amulet", labelEn: "Protective Amulets", labelZh: "护身挂件", icon: "🍑" },
  ];

  const handleOrder = (product: ReadyProduct) => {
    alert(
      lang === "zh"
        ? `【模拟结账】已锁定现货【${product.nameZh}】！\n结缘金额: $${product.priceUsd} USD\n大城工坊将随单附赠实木礼盒与手作证书直邮发货！`
        : `[Simulated Checkout] Secured order for: ${product.name}!\nTotal: $${product.priceUsd} USD\nSolid wooden gift box & certificate included!`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Hero Banner (集市 · 现货雅赏与大城红木小件) */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold tracking-wide shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "市 · 觅宝集市 · 现货雅器" : "Curated Ready-to-Ship Artifacts & Wood Carvings"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100 tracking-tight">
          {lang === "zh" ? "大城红木现货 · 孤品手串与茶宠雅件" : "Ready-to-Ship Heirloom Malas & Woodcraft"}
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/70 font-serif leading-relaxed">
          {lang === "zh"
            ? "精选大城百年老料金丝楠、高密小叶紫檀、原矿南红与纯手工立体雕刻茶宠把件。一物一图，孤品结缘，24小时内实木礼盒发货。"
            : "Hand-selected heirloom malas, dragon tea pets, and solid wood desk guardians crafted from authentic Dacheng aged timber. Ready to ship in 24 hours."}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        <div className="flex bg-[#120a06] p-1.5 rounded-2xl border border-amber-900/50 gap-1.5 shadow-lg">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-md border border-amber-400/40"
                  : "text-amber-200/60 hover:text-amber-100 hover:bg-amber-950/40"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{lang === "zh" ? cat.labelZh : cat.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="zen-wood-card rounded-3xl p-5 space-y-4 flex flex-col justify-between group transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl"
          >
            {/* Top Visual Container */}
            <div className="space-y-3">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-amber-900/40 bg-black/60 shadow-inner flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badge */}
                {product.accentBadge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-950/90 border border-red-500/50 text-red-200 text-[10px] font-serif font-bold shadow-lg">
                    ✦ {lang === "zh" ? product.accentBadgeZh : product.accentBadge}
                  </div>
                )}

                {/* Stock Tag */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-mono">
                  {lang === "zh" ? `仅余 ${product.stock} 件` : `Only ${product.stock} in Stock`}
                </div>
              </div>

              {/* Title & Origin */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-amber-200/60 font-serif">
                  <span className="truncate">{lang === "zh" ? product.woodMaterialZh : product.woodMaterial}</span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold flex-shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold font-serif text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {lang === "zh" ? product.nameZh : product.name}
                </h3>

                <p className="text-xs text-amber-200/70 font-serif line-clamp-2 leading-relaxed">
                  {lang === "zh" ? product.descriptionZh : product.description}
                </p>
              </div>

              {/* Specs Pill */}
              <div className="p-2.5 rounded-xl bg-[#120a06]/90 border border-amber-900/40 text-[11px] font-serif text-amber-200/70 space-y-1">
                <p>📏 规格: {lang === "zh" ? product.beadSizeOrDimensionsZh : product.beadSizeOrDimensions}</p>
                <p>🏛️ 产地: {lang === "zh" ? product.originZh : product.origin}</p>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="pt-3 border-t border-amber-950/60 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                    ${product.priceUsd}
                  </span>
                  {product.originalPriceUsd && (
                    <span className="text-xs text-amber-200/40 font-mono line-through">
                      ${product.originalPriceUsd}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-amber-200/50 font-serif">
                  {lang === "zh" ? "免邮 · 附赠实木礼盒" : "Free Express & Gift Box"}
                </p>
              </div>

              <button
                onClick={() => handleOrder(product)}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-100 font-serif font-bold text-xs rounded-xl shadow-lg border border-amber-400/30 transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <span>{lang === "zh" ? "结缘下单" : "Order Ready Piece"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom DIY Customizer CTA */}
      <div className="p-8 rounded-3xl zen-wood-card text-center space-y-4 relative overflow-hidden">
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
          {lang === "zh" ? "想要独一无二的专属搭配？" : "Prefer a 100% Bespoke Energy Combination?"}
        </h3>
        <p className="text-xs sm:text-sm text-amber-200/70 font-serif max-w-xl mx-auto">
          {lang === "zh"
            ? "进入 360° 环形可视化造物台，亲自挑选大城圣木与脉轮水晶，实时生成您的七脉轮专属能量报告。"
            : "Launch our 360° bead customizer to hand-pick beads and generate your personalized energy profile."}
        </p>
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 font-serif font-bold text-xs rounded-xl shadow-lg border border-amber-400/40 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{lang === "zh" ? "前往 DIY 串珠设计台" : "Launch Customizer Studio"}</span>
        </Link>
      </div>
    </div>
  );
}
