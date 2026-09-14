import React from "react";

interface ZenCraftLogoProps {
  size?: number;
  className?: string;
}

export function ZenCraftLogo({ size = 44, className = "" }: ZenCraftLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Luxury Gold Linear Gradients */}
        <linearGradient id="pureGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="30%" stopColor="#E5B25D" />
          <stop offset="70%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6508" />
        </linearGradient>

        <linearGradient id="glowRing" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#FFF8DC" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>

        {/* Jade / Red Amber Center Accent */}
        <radialGradient id="centerGem" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF5252" />
          <stop offset="70%" stopColor="#B71C1C" />
          <stop offset="100%" stopColor="#4A0000" />
        </radialGradient>

        {/* Soft Shadow Filter for Ultra Crisp Edges */}
        <filter id="goldDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Dark Circular Background with Subtle Edge */}
      <circle cx="50" cy="50" r="48" fill="#120A05" stroke="url(#pureGoldGrad)" strokeWidth="1.5" />

      {/* Inner Sacred Mala Ring - Clean Thick Lines */}
      <g filter="url(#goldDropShadow)">
        {/* Outer Circular Flow */}
        <circle cx="50" cy="52" r="28" stroke="url(#pureGoldGrad)" strokeWidth="3" strokeLinecap="round" />

        {/* Infinity / Energy Knot at the Top Crown */}
        <path
          d="M44 26 C44 21, 56 21, 56 26 C56 31, 44 33, 44 38 C44 43, 56 43, 56 38 C56 33, 44 31, 44 26 Z"
          stroke="url(#glowRing)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Prominent Golden Mala Beads on the Circumference */}
        <circle cx="50" cy="24" r="5" fill="url(#centerGem)" stroke="#FFE082" strokeWidth="1.2" />
        <circle cx="75" cy="40" r="4" fill="url(#pureGoldGrad)" stroke="#FFF" strokeWidth="0.8" />
        <circle cx="78" cy="58" r="4" fill="url(#pureGoldGrad)" stroke="#FFF" strokeWidth="0.8" />
        <circle cx="68" cy="74" r="4" fill="url(#pureGoldGrad)" stroke="#FFF" strokeWidth="0.8" />
        <circle cx="50" cy="80" r="4.5" fill="url(#pureGoldGrad)" stroke="#FFE082" strokeWidth="1" />
        <circle cx="32" cy="74" r="4" fill="url(#pureGoldGrad)" stroke="#FFF" strokeWidth="0.8" />
        <circle cx="22" cy="58" r="4" fill="url(#pureGoldGrad)" stroke="#FFF" strokeWidth="0.8" />
        <circle cx="25" cy="40" r="4" fill="url(#pureGoldGrad)" stroke="#FFF" strokeWidth="0.8" />

        {/* Dynamic Curved Inner Thread */}
        <path
          d="M36 42 Q 50 62 64 42"
          stroke="url(#pureGoldGrad)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      </g>
    </svg>
  );
}
