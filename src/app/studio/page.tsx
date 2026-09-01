import React from "react";
import { Metadata } from "next";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";

export const metadata: Metadata = {
  title: "DIY 360° Customizer Studio | Design Your Sacred Mala",
  description:
    "Interactive 360° bead design studio. Choose sacred woods, healing crystals, simulate patina aging, and balance 7 Chakras in real-time.",
  alternates: {
    canonical: "https://zen.puretoolhub.com/studio",
  },
};

export default function StudioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          ZenCraft DIY Customizer Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-serif">
          Arrange beads in real-time 360° canvas, observe living patina evolution, and generate your custom energy profile.
        </p>
      </div>

      <StudioWorkspace />
    </div>
  );
}
