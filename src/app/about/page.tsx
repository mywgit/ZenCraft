"use client";

import React from "react";
import { TreePine, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <TreePine className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "大城红木 · 古法非遗溯源" : "The Ancient Sourcing Heritage"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {lang === "zh"
            ? "源自中国红木之乡 · 大城宫廷木作工坊"
            : "Crafted from Dacheng's Sacred Timber Ateliers"}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-serif max-w-2xl mx-auto leading-relaxed">
          {lang === "zh"
            ? "传承数百年明清宫廷造办木作传统，融合当代身心正念与七脉轮五行能量平衡。"
            : "Where centuries of imperial woodworking tradition meet contemporary mindfulness and energetic alignment."}
        </p>
      </div>

      {/* Main Story Narrative */}
      <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm sm:text-base font-serif leading-relaxed">
        <div className="zen-wood-card p-6 sm:p-8 rounded-3xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>
              {lang === "zh"
                ? "中国宫廷木艺发源圣地：河北大城 (Dacheng)"
                : "The Capital of Imperial Woodcraft: Dacheng (大城)"}
            </span>
          </h2>
          <p>
            {lang === "zh"
              ? "数百年来，自明清宫廷造办处起，河北大城的木作匠人便代代为皇家精雕细琢御用硬木家具与案头文房雅件。大城地处华北腹地，至今仍是中国乃至全球名贵木材交易、数十年自然陈化老料仓储与高精密手工车旋打磨无可撼动的核心之都。"
              : "For centuries dating back to the Ming and Qing Dynasties, the artisans of Dacheng served as master furniture-makers and carvers for royal courts. Located in northern China, Dacheng remains the undisputed global capital of precious timber curation, seasoned raw stock preservation, and precision woodturning."}
          </p>
          <p>
            {lang === "zh"
              ? "与市场上速生木材、化学染色、注入工业香精或浸泡工业蜂蜡的批量代工厂截然不同，ZenCraft 工坊直接与大城世代相传的老木匠人深入合作。每一根老料开料前均经过严格密度测试、入水沉水检验、天然油脂醇厚度勘测与纯正草本自然原香鉴定。"
              : "Unlike mass-market factories that speed-grow wood or submerge beads in chemical dyes and synthetic waxes, our atelier works directly with historic timber masters. We inspect every log for density, organic water-sinking qualities, natural oil content, and authentic botanical aroma."}
          </p>
        </div>

        {/* 4 Pillars of Guarantee */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-white font-sans">
            {lang === "zh"
              ? "四大工坊保真与品质立约"
              : "Our Four Pillars of Authenticity & Ethics"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-sans text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === "zh" ? "100% 天然草本原木保真" : "100% Botanical Purity"}</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                {lang === "zh"
                  ? "拒绝化学浸色、拒绝人工香精注入、拒绝塑料树脂胶水填充。每一颗珠体均取自纯天然野生老木，纹理独一无二。"
                  : "Zero chemical staining, artificial perfume injections, or plastic resin fillers. Every bead is 100% natural wild timber."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-sans text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === "zh" ? "岁月包浆蜕变 (Living Patina)" : "Living Patina (包浆)"}</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                {lang === "zh"
                  ? "天然老木蕴含活性油脂，随佩戴者手温与体脂持续呼吸吸收，在数月至数年间逐渐形成如琥珀琉璃般的温润镜面玻璃底包浆。"
                  : "Natural wood breathes and absorbs your hand oils, developing an organic glass-like mirror sheen over months and years."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold font-sans text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === "zh" ? "专属能量证书与题名印鉴" : "Certified Energy Profile"}</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                {lang === "zh"
                  ? "每个包裹均附赠专属手作能量认证证书，题写佩戴者姓名与七脉轮五行测算得分，并加盖工坊朱砂印章与编号。"
                  : "Every parcel includes a personalized, hand-stamped Certificate of Authenticity with wearer name and 7-Chakras scores."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold font-sans text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === "zh" ? "合规合法与可持续采伐" : "Ethical Sustainable Sourcing"}</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                {lang === "zh"
                  ? "工坊严格选用野生绿檀、四川百年老料金丝楠、高密东非黑檀等国际海关免检的合规木种，零濒危违规风险，安心直邮全球。"
                  : "We strictly use certified sustainable species (Green Sandalwood, Gold Phoebe, Ebony, Cypress) with 0 CITES violation risks."}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="text-center pt-8">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-950/50 transition-all hover:scale-105 font-sans"
          >
            <Sparkles className="w-5 h-5" />
            <span>{lang === "zh" ? "立即进入 360° DIY 串珠定制台" : "Launch the DIY Customizer Studio"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
