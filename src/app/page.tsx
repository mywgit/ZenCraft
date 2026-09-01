"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  TreePine,
  ShieldCheck,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
  Flame,
  CheckCircle,
  Truck,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const { lang, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
  ];

  // Schema.org WebApplication + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "ZenCraft Custom Handcrafted Energy Mala Bracelet",
        image: "https://zen.puretoolhub.com/icon.svg",
        description:
          "Customizable Zen mala prayer beads and energy bracelets made from authentic wild timber and healing crystals.",
        brand: {
          "@type": "Brand",
          name: "ZenCraft Atelier",
        },
        offers: {
          "@type": "Offer",
          price: "88.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.95",
          reviewCount: "842",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="space-y-16 py-8">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("heroBadge")}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {t("heroTitle1")}
          <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
            {t("heroTitleHighlight")}
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto font-serif leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>360° Real-Time Bead Canvas</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            <span>Patina Aging Simulator</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>7 Chakras & Zodiac Analysis</span>
          </span>
        </div>
      </section>

      {/* Main Interactive Studio Canvas Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <StudioWorkspace />
      </section>

      {/* Sourcing & Heritage 3 Pillars Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            {lang === "zh" ? "东方匠心 · 大城老料" : "Sacred Provenance & Craft"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {lang === "zh" ? "为什么选择 ZenCraft 大城源头工坊？" : "Why Choose ZenCraft Sacred Ateliers?"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="zen-wood-card p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              {lang === "zh" ? "100% 大城源头野生老料" : "100% Wild Sourced Old Stock"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif">
              {lang === "zh"
                ? "直采自中国红木之乡大城，严选陈化百年老木。高油密、高光泽、入水秒沉，绝不采用廉价速生木或化学药泡。"
                : "Sourced directly from Dacheng's ancient imperial timber hub. Hand-selected century-aged timber with high oil density and zero chemical dyes."}
            </p>
          </div>

          <div className="zen-wood-card p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              {lang === "zh" ? "包浆蜕变与天然木香" : "The Living Patina & Aroma"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif">
              {lang === "zh"
                ? "野生绿檀与崖柏天然散发纯净檀香，随每日把玩吸收油脂，在手中逐渐氧化为如羊脂白玉或琥珀般的温润镜面包浆。"
                : "Verawood and cypress breathe natural aromatic essential oils. Daily meditation and wear deepens its color into a silky, jade-like heirloom."}
            </p>
          </div>

          <div className="zen-wood-card p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              {lang === "zh" ? "专属能量证书与礼盒" : "Certified Metaphysical Blessing"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif">
              {lang === "zh"
                ? "每条手串均附赠烫金能量证书，题写持有人姓名与七脉轮五行得分，盖上朱砂印鉴，装入实木礼盒直邮全球。"
                : "Every custom mala arrives in a solid wooden gift box with a personalized, hand-stamped Certificate of Authenticity & Energy Blessing."}
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Unboxing Wall */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            {lang === "zh" ? "全球修行者与文玩藏家的真实好评" : "Loved by Mindful Seekers Worldwide"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xs font-bold text-slate-950">
                  EW
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Emily Watson</p>
                  <p className="text-[10px] text-slate-400">Yoga Instructor, California 🇺🇸</p>
                </div>
              </div>
              <span className="text-xs text-amber-400">★★★★★</span>
            </div>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              &ldquo;The customizer studio is hypnotic! I mixed Green Sandalwood with Turquoise for my Heart Chakra. When the box arrived, the natural sweet sandalwood scent filled the entire room. The printed certificate with my name made it feel like a sacred gift.&rdquo;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-xs font-bold text-slate-950">
                  MK
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Marcus Klein</p>
                  <p className="text-[10px] text-slate-400">Sound Healer, Berlin 🇩🇪</p>
                </div>
              </div>
              <span className="text-xs text-amber-400">★★★★★</span>
            </div>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              &ldquo;The Patina slider was so accurate. After 2 months of daily mantra counting, my Ebony beads have developed a rich mirror shine just like the 1-year simulation. Unmatched density and authentic wild timber.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white text-center mb-6">
          {lang === "zh" ? "常见问题答疑 (FAQ)" : "Frequently Asked Questions"}
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-200">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed font-serif border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
