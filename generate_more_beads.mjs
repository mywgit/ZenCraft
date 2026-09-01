import fs from "fs";
import path from "path";

const targetDir = path.join(process.cwd(), "public", "beads");

// 9. Black Obsidian (彩虹眼黑曜石)
const obsidianSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="obsidianGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#3f3f46" />
      <stop offset="35%" stop-color="#18181b" />
      <stop offset="75%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#000000" />
    </radialGradient>
    <radialGradient id="rainbowEye" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.35" />
      <stop offset="45%" stop-color="#a855f7" stop-opacity="0.25" />
      <stop offset="75%" stop-color="#09090b" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#obsidianGrad)" />
    <!-- Iridescent Rainbow Eye Ring -->
    <circle cx="95" cy="95" r="60" fill="url(#rainbowEye)" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#000000" />
</svg>`;

// 10. Deep Purple Amethyst (深紫水晶)
const amethystSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="amethystGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ddd6fe" />
      <stop offset="30%" stop-color="#7c3aed" />
      <stop offset="70%" stop-color="#4c1d95" />
      <stop offset="100%" stop-color="#2e1065" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#amethystGrad)" />
    <!-- Crystal Facet Refractions -->
    <path d="M 40 60 L 100 30 L 160 80 L 100 150 Z" stroke="#c4b5fd" stroke-width="1.2" fill="none" opacity="0.45" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#1e0840" />
</svg>`;

// 11. Hetian Nephrite Jade (和田羊脂白玉)
const jadeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="jadeGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#f1f5f9" />
      <stop offset="70%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#94a3b8" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.4" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#jadeGrad)" />
    <!-- Mutton-fat Soft Cloud Texture -->
    <circle cx="85" cy="85" r="50" fill="#ffffff" opacity="0.35" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#64748b" />
</svg>`;

// 12. Silver Pixiu Charm (纯银貔貅)
const pixiuSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="silverGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#e2e8f0" />
      <stop offset="70%" stop-color="#64748b" />
      <stop offset="100%" stop-color="#1e293b" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#silverGrad)" />
    <circle cx="100" cy="100" r="55" fill="none" stroke="#334155" stroke-width="3" opacity="0.5" />
    <text x="100" y="118" font-family="serif" font-size="62" font-weight="bold" text-anchor="middle" fill="#0f172a">🦁</text>
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#0f172a" />
</svg>`;

// 13. Om Mantra Bead (藏银六字真言)
const omSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="omGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#cbd5e1" />
      <stop offset="40%" stop-color="#64748b" />
      <stop offset="80%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#omGrad)" />
    <circle cx="100" cy="100" r="55" fill="none" stroke="#1e293b" stroke-width="3.5" />
    <text x="100" y="118" font-family="serif" font-size="60" font-weight="bold" text-anchor="middle" fill="#f8fafc">ॐ</text>
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#020617" />
</svg>`;

// 14. Vintage Brass Spacer Ring (手工黄铜隔片)
const brassSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="brassGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="35%" stop-color="#ca8a04" />
      <stop offset="70%" stop-color="#854d0e" />
      <stop offset="100%" stop-color="#422006" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="ringClip">
      <path d="M 100 10 A 90 90 0 1 0 100 190 A 90 90 0 1 0 100 10 Z M 100 55 A 45 45 0 1 1 100 145 A 45 45 0 1 1 100 55 Z" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="88" fill="#000000" opacity="0.6" />
  <g clip-path="url(#ringClip)">
    <rect width="200" height="200" fill="url(#brassGrad)" />
    <!-- Antique Hammered Indentations -->
    <circle cx="50" cy="80" r="8" fill="#713f12" opacity="0.5" />
    <circle cx="140" cy="70" r="10" fill="#713f12" opacity="0.5" />
    <circle cx="80" cy="150" r="9" fill="#713f12" opacity="0.5" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <circle cx="100" cy="100" r="45" fill="#120a06" stroke="#422006" stroke-width="3" />
</svg>`;

fs.writeFileSync(path.join(targetDir, "black-obsidian.svg"), obsidianSvg);
fs.writeFileSync(path.join(targetDir, "amethyst.svg"), amethystSvg);
fs.writeFileSync(path.join(targetDir, "hetian-jade.svg"), jadeSvg);
fs.writeFileSync(path.join(targetDir, "pixiu-charm.svg"), pixiuSvg);
fs.writeFileSync(path.join(targetDir, "om-mantra.svg"), omSvg);
fs.writeFileSync(path.join(targetDir, "brass-ring.svg"), brassSvg);

console.log("All 17 material assets generated successfully!");
