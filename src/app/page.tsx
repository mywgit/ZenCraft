"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";
import { READY_PRODUCTS } from "@/lib/readyProductsData";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  TreePine,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
  Flame,
  CheckCircle,
  ArrowRight,
  Gem,
  ShoppingBag,
} from "lucide-react";

import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { OrderItem } from "@/types/order";

export default function HomePage() {
  const { lang, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkoutItem, setCheckoutItem] = useState<OrderItem | null>(null);

  const masterpieceProducts = [
    {
      id: "master-gold-nanmu",
      nameZh: "四川百年老料金丝楠",
      nameEn: "Imperial Gold Phoebe Nanmu",
      price: 268,
      origPrice: 350,
      image: "/products/master-zitan.jpg",
      badge: "镇店之宝",
    },
    {
      id: "master-nanhong-persimmon",
      nameZh: "极品保山满肉南红",
      nameEn: "Baoshan Persimmon Red Agate",
      price: 320,
      origPrice: 420,
      image: "/products/master-nanhong.jpg",
      badge: "极品原矿",
    },
    {
      id: "master-green-sandalwood",
      nameZh: "天然野生老料绿檀",
      nameEn: "Wild Green Sandalwood",
      price: 158,
      origPrice: 198,
      image: "/products/master-chenxiang.jpg",
      badge: "天然香圣",
    },
  ];

  const galleryProducts = [
    {
      id: "turquoise-raw-beads",
      nameZh: "原矿高瓷蓝绿松",
      nameEn: "High-Porcelain Turquoise",
      sceneDesc: "置于海边礁石枯木之上 · 澄澈心轮",
      price: 188,
      image: "/products/gallery-turquoise.jpg",
    },
    {
      id: "bodhi-moon-stars",
      nameZh: "夏日清心星月菩提",
      nameEn: "Moon & Star Bodhi Seed",
      sceneDesc: "茶席雅器 · 焚香静气 · 盘玩如玉",
      price: 128,
      image: "/products/gallery-bodhi.jpg",
    },
    {
      id: "master-nanmu-macro",
      nameZh: "水波金丝百年金丝楠",
      nameEn: "Imperial Liquid Gold Phoebe",
      sceneDesc: "白丝衬底 · 浮光跃金古树老料",
      price: 268,
      image: "/products/gallery-zitan.jpg",
    },
    {
      id: "master-nanhong-macro",
      nameZh: "保山满肉转运南红",
      nameEn: "Baoshan Full-Flesh Red Agate",
      sceneDesc: "天然柿子红胶质感 · 补益海底轮",
      price: 320,
      image: "/products/gallery-nanhong.jpg",
    },
  ];

  const faqs = [
    {
      q:
        lang === "zh"
          ? "什么是【包浆时光机 (Patina Time Slider)】？手串真的会变色吗？"
          : "What is the Patina Time Slider, and will the wooden beads really change color?",
      a:
        lang === "zh"
          ? "是的！天然野生绿檀、金丝楠和紫檀等名贵木材富含天然油脂与活性芳香成分。随着佩戴者体温与油脂的滋养，木珠表层会氧化形成一层如琥珀琉璃般的玻璃底保护层（俗称包浆）。我们的时光机滑块让您在定制时就能直观预览 1~10 年后的温润蜕变效果。"
          : "Yes! Authentic wild timbers such as Green Sandalwood and Gold Phoebe are rich in natural essential oils. As you wear and meditate with them, they absorb body warmth and natural oils, developing a lustrous, amber-like protective glass sheen (patina). Our time slider simulates this natural aging transformation from Day 1 to Year 10.",
    },
    {
      q:
        lang === "zh"
          ? "你们的木料来源是哪里？如何保证 100% 天然保真？"
          : "Where are your sacred woods sourced, and how do you guarantee 100% authenticity?",
      a:
        lang === "zh"
          ? "我们的所有圣木均源自中国北方最大的明清宫廷红木集散中心——河北大城红木工坊。由资深工艺师严格甄选天然野生老料，拒绝任何化学浸色、人工香精或塑料压铸，随包裹附带工坊官方英文保真证书。"
          : "All our sacred woods are ethically sourced from historic timber artisans in Dacheng, the world's premier imperial woodworking heritage hub. Every bead is cut from authentic wild old stock with zero chemical dyes, zero artificial fragrances, and verified botanical purity.",
    },
    {
      q:
        lang === "zh"
          ? "七脉轮与生肖星座能量测评是如何计算的？"
          : "How is the 7-Chakras & Zodiac Energy Profile calculated?",
      a:
        lang === "zh"
          ? "我们根据东方五行（木火土金水）与古印度阿育吠陀七脉轮（Chakra）能量学，将绿檀（心轮）、黑檀（海底轮）、青金石（三眼轮）、绿松石（喉轮）等材质的共振频率编码进算法中。您在画布上的每一步搭配，系统都会实时动态计算出最契合您的能量场平衡报告。"
          : "Our energy engine combines Eastern Five Elements and Ayurvedic 7-Chakra crystal resonance principles. Each sacred wood and gemstone emits unique energetic frequencies (e.g. Green Sandalwood for Heart Chakra, Ebony for Root Grounding, Turquoise for Throat Truth). As you arrange your beads, the system dynamically analyzes and scores your balance.",
    },
    {
      q:
        lang === "zh"
          ? "下单后多久可以收到手串？附赠哪些礼盒配件？"
          : "How long does shipping take, and what is included in the parcel?",
      a:
        lang === "zh"
          ? "下单后工坊将在 24 小时内由工艺师亲手穿制完成。我们提供全球专线包邮（直达欧美约 7-10 天）。每个包裹均包含：定制手串实物、高级天然实木礼盒、丝绸储珠袋、专属烫金手作能量证书及备用弹力绳。"
          : "Every bracelet is custom strung by hand in our atelier within 24 hours. We offer Free Worldwide Express (7-10 business days to US/EU/UK). Each parcel includes your custom mala, a wooden presentation gift box, silk preservation pouch, and a gold-foil stamped Certificate of Authenticity.",
    },
    {
      q:
        lang === "zh"
          ? "需要产品咨询、选料建议或提交意见反馈，如何联系？"
          : "How can I inquire about materials, custom crafts, or share feedback?",
      a:
        lang === "zh"
          ? "您可以随时发送邮件至 support@puretoolhub.com，或在页面底部扫描微信二维码添加专属顾问微信，我们支持一对一选料视频验货、搭配设计与售后服务。"
          : "Reach our studio concierge anytime via support@puretoolhub.com or scan the WeChat QR code in the footer for personalized 1-on-1 advice.",
    },
  ];

  return (
    <div className="space-y-14 py-4 sm:py-6">
      {/* 1. Main Interactive Studio Canvas Section (直接置顶：3D 串珠与能量定制工作台) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold tracking-wide shadow-lg">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{lang === "zh" ? "禅 · 盘个手串 · 360° 3D 自由定制" : "✦ The Zen Mala 3D Customizer Atelier ✦"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100 tracking-tight leading-tight">
            {t("heroTitle1")}
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent italic px-2">
              {t("heroTitleHighlight")}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-amber-200/70 max-w-2xl mx-auto font-serif leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </div>

        {/* Real-time 3D Studio Workspace */}
        <StudioWorkspace />
      </section>

      {/* 2. 镇店之宝 & 3. 藏家雅赏 (已根据需求暂时隐藏) */}
      {/*
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-amber-900/40">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-serif text-lg">✦</span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
              {lang === "zh" ? "镇店之宝 · 孤品现货" : "Masterpiece Vault · Curated Heirlooms"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {masterpieceProducts.map((p) => (
            <div
              key={p.id}
              className="zen-wood-card rounded-3xl p-4 sm:p-5 space-y-3 flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-amber-900/40 bg-black/60 shadow-inner">
                  <img
                    src={p.image}
                    alt={p.nameZh}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-red-950/90 border border-red-500/50 text-red-200 text-[10px] font-serif font-bold shadow">
                    ✦ {p.badge}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold font-serif text-amber-100 group-hover:text-amber-300 transition-colors">
                    {lang === "zh" ? p.nameZh : p.nameEn}
                  </h3>
                  <p className="text-[11px] text-amber-200/60 font-serif">
                    结缘直邮 · 附赠专属实木礼盒
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-amber-950/60">
                <div>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    ${p.price}
                  </span>
                  <span className="text-xs text-amber-200/40 font-mono line-through ml-2">
                    ${p.origPrice}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const item: OrderItem = {
                      id: p.id,
                      title: p.nameEn,
                      titleZh: p.nameZh,
                      category: "ready-mala",
                      image: p.image,
                      priceUsd: p.price,
                      quantity: 1,
                      details: {
                        materialsSummary: p.nameEn,
                        materialsSummaryZh: p.nameZh,
                      },
                    };
                    setCheckoutItem(item);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-100 font-serif font-bold text-xs shadow-md border border-amber-400/30 transition-all hover:scale-105"
                >
                  {lang === "zh" ? "结缘下单" : "Order"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-amber-900/40">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-serif text-lg">✦</span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
              {lang === "zh" ? "藏家雅赏 · 东方生活美学" : "Collector's Gallery · Zen Lifestyle"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryProducts.map((p) => (
            <div
              key={p.id}
              className="zen-wood-card rounded-2xl p-3.5 space-y-3 flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="space-y-2.5">
                <div className="aspect-square rounded-xl overflow-hidden border border-amber-900/40 bg-black/60 shadow-inner">
                  <img
                    src={p.image}
                    alt={p.nameZh}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-serif text-amber-100 group-hover:text-amber-300 transition-colors">
                    {lang === "zh" ? p.nameZh : p.nameEn}
                  </h3>
                  <p className="text-[10px] text-amber-200/60 font-serif mt-0.5 line-clamp-1">
                    {p.sceneDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-amber-950/60">
                <span className="text-sm font-black text-amber-400 font-mono">
                  ${p.price}
                </span>
                <Link
                  href="/studio"
                  className="px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-serif font-bold transition-colors"
                >
                  {lang === "zh" ? "求取同款" : "Get Look"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      */}

      {/* 5. Sourcing & Heritage 3 Pillars Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold">
            {lang === "zh" ? "✦ 东方匠心 · 大城老料 ✦" : "✦ Sacred Provenance & Craft ✦"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
            {lang === "zh" ? "为什么选择 ZenCraft 大城源头工坊？" : "Why Choose ZenCraft Sacred Ateliers?"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="zen-wood-card p-5 sm:p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-serif text-amber-100">
              {lang === "zh" ? "100% 大城源头野生老料" : "100% Wild Sourced Old Stock"}
            </h3>
            <p className="text-xs text-amber-200/70 leading-relaxed font-serif">
              {lang === "zh"
                ? "直采自中国红木之乡大城，严选陈化百年老木。高油密、高光泽、入水秒沉，绝不采用廉价速生木或化学药泡。"
                : "Sourced directly from Dacheng's ancient imperial timber hub. Hand-selected century-aged timber with high oil density and zero chemical dyes."}
            </p>
          </div>

          <div className="zen-wood-card p-5 sm:p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-serif text-amber-100">
              {lang === "zh" ? "包浆蜕变与天然木香" : "The Living Patina & Aroma"}
            </h3>
            <p className="text-xs text-amber-200/70 leading-relaxed font-serif">
              {lang === "zh"
                ? "野生绿檀与崖柏天然散发纯净檀香，随每日把玩吸收油脂，在手中逐渐氧化为如羊脂白玉或琥珀般的温润镜面包浆。"
                : "Verawood and cypress breathe natural aromatic essential oils. Daily meditation and wear deepens its color into a silky, jade-like heirloom."}
            </p>
          </div>

          <div className="zen-wood-card p-5 sm:p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-serif text-amber-100">
              {lang === "zh" ? "专属能量证书与礼盒" : "Certified Metaphysical Blessing"}
            </h3>
            <p className="text-xs text-amber-200/70 leading-relaxed font-serif">
              {lang === "zh"
                ? "每条手串均附赠烫金能量证书，题写持有人姓名与七脉轮五行得分，盖上朱砂印鉴，装入实木礼盒直邮全球。"
                : "Every custom mala arrives in a solid wooden gift box with a personalized, hand-stamped Certificate of Authenticity & Energy Blessing."}
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100 text-center mb-6">
          {lang === "zh" ? "常见问题答疑 (FAQ)" : "Frequently Asked Questions"}
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#140b06]/90 border border-amber-900/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-xs sm:text-sm font-bold font-serif text-amber-100">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-amber-200/50 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-amber-200/70 leading-relaxed font-serif border-t border-amber-950/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Real Full-Featured Checkout Modal */}
      {checkoutItem && (
        <CheckoutModal
          isOpen={!!checkoutItem}
          onClose={() => setCheckoutItem(null)}
          orderItem={checkoutItem}
        />
      )}
    </div>
  );
}
