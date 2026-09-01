import React from "react";
import { Metadata } from "next";
import { TreePine, ShieldCheck, Award, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dacheng Imperial Timber Heritage & Authenticity Promise",
  description:
    "Discover the ancient woodworking provenance of Dacheng, ethical sourcing of wild green sandalwood and gold phoebe, and our chemical-free guarantee.",
  alternates: {
    canonical: "https://zen.puretoolhub.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <TreePine className="w-3.5 h-3.5" />
          <span>The Ancient Sourcing Heritage</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Crafted from Dacheng&apos;s Sacred Timber Ateliers
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-serif max-w-2xl mx-auto leading-relaxed">
          Where centuries of imperial woodworking tradition meet contemporary mindfulness and energetic alignment.
        </p>
      </div>

      {/* Main Story Narrative */}
      <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm sm:text-base font-serif leading-relaxed">
        <div className="zen-wood-card p-6 sm:p-8 rounded-3xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>The Capital of Imperial Woodcraft: Dacheng (大城)</span>
          </h2>
          <p>
            For centuries dating back to the Ming and Qing Dynasties, the artisans of <strong>Dacheng</strong> served as master furniture-makers and carvers for royal courts. Located in northern China, Dacheng remains the undisputed global capital of precious timber curation, seasoned raw stock preservation, and precision woodturning.
          </p>
          <p>
            Unlike mass-market factories that speed-grow wood or submerge beads in chemical dyes and synthetic waxes, our atelier works directly with historic timber masters. We inspect every log for density, organic water-sinking qualities, natural oil content, and authentic botanical aroma.
          </p>
        </div>

        {/* 4 Pillars of Guarantee */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-white font-sans">
            Our Four Pillars of Authenticity & Ethics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-sans text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Botanical Purity</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Zero chemical staining, artificial perfume injections, or plastic resin fillers. Every bead is 100% natural wild timber.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-sans text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Living Patina (包浆)</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Natural wood breathes and absorbs your hand oils, developing an organic glass-like mirror sheen over months and years.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold font-sans text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Certified Energy Profile</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Every parcel includes a personalized, hand-stamped Certificate of Authenticity with wearer name and 7-Chakras scores.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold font-sans text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ethical Sustainable Sourcing</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                We strictly use certified sustainable species (Green Sandalwood, Gold Phoebe, Ebony, Cypress) with 0 CITES violation risks.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="text-center pt-8">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-950/50 transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            <span>Launch the DIY Customizer Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
