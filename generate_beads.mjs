// Script to generate ultra-realistic SVG bead assets for all materials
import fs from "fs";
import path from "path";

const targetDir = path.join(process.cwd(), "public", "beads");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Red Rosewood (大红酸枝 - 正统深红褐沉水黑筋老料)
const rosewoodSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="rosewoodGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#85222c" />
      <stop offset="35%" stop-color="#4a1017" />
      <stop offset="70%" stop-color="#28070b" />
      <stop offset="100%" stop-color="#120204" />
    </radialGradient>
    <linearGradient id="blackOilStreak" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#100305" stop-opacity="0.85" />
      <stop offset="50%" stop-color="#28070b" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#0a0102" stop-opacity="0.9" />
    </linearGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7" />
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="bounceAmber" cx="75%" cy="75%" r="45%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>

  <!-- Deep Contact Drop Shadow -->
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />

  <g clip-path="url(#circleClip)">
    <!-- Base 3D Sphere -->
    <rect width="200" height="200" fill="url(#rosewoodGrad)" />

    <!-- Dark Chocolate & Black Oil Grain Ribbons (黑筋老料纹理) -->
    <path d="M 20 50 Q 80 80 160 30 Q 190 70 180 120 Q 120 160 40 140 Z" fill="url(#blackOilStreak)" />
    <path d="M 10 110 Q 70 130 150 100 Q 180 140 130 180 Q 60 180 20 150 Z" fill="url(#blackOilStreak)" opacity="0.8" />
    
    <!-- End-Grain Wood Fibers -->
    <path d="M 30 70 Q 100 95 170 65" stroke="#1c0407" stroke-width="3" fill="none" opacity="0.75" />
    <path d="M 25 100 Q 95 125 175 95" stroke="#1c0407" stroke-width="4.5" fill="none" opacity="0.8" />
    <path d="M 35 130 Q 105 155 165 125" stroke="#1c0407" stroke-width="3" fill="none" opacity="0.75" />
    <path d="M 50 155 Q 110 175 150 150" stroke="#1c0407" stroke-width="2" fill="none" opacity="0.6" />

    <!-- Fine Golden Wood Pores (棕眼) -->
    <circle cx="65" cy="85" r="1" fill="#f59e0b" opacity="0.4" />
    <circle cx="120" cy="110" r="1.2" fill="#f59e0b" opacity="0.3" />
    <circle cx="90" cy="140" r="1" fill="#f59e0b" opacity="0.4" />

    <!-- Bottom-right Amber Environmental Bounce Light -->
    <rect width="200" height="200" fill="url(#bounceAmber)" />

    <!-- Top-left Mirror Softbox Specular Highlight -->
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>

  <!-- Drill Hole Bevel (顶部打孔倒角) -->
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#050102" stroke="#28070b" stroke-width="1.5" />
</svg>`;

// 2. Taihang Cliff Cypress (太行崖柏雀眼舍利料)
const cypressSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="cypressGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fed7aa" />
      <stop offset="25%" stop-color="#d97706" />
      <stop offset="60%" stop-color="#9a3412" />
      <stop offset="100%" stop-color="#451a03" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#cypressGrad)" />
    <!-- Swirling Tiger Flame Lines (虎皮纹) -->
    <path d="M 20 60 Q 90 120 170 50 Q 150 140 60 160 Z" fill="#78350f" opacity="0.5" />
    <!-- Dark Bird-Eye Flame Knots (雀眼) -->
    <circle cx="70" cy="80" r="4.5" fill="#290d02" stroke="#b45309" stroke-width="2.5" />
    <circle cx="130" cy="65" r="3.5" fill="#290d02" stroke="#b45309" stroke-width="2" />
    <circle cx="140" cy="125" r="5" fill="#290d02" stroke="#b45309" stroke-width="3" />
    <circle cx="60" cy="135" r="4" fill="#290d02" stroke="#b45309" stroke-width="2" />
    <circle cx="105" cy="110" r="4" fill="#290d02" stroke="#b45309" stroke-width="2.2" />
    <!-- Specular Highlight -->
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#1c0701" />
</svg>`;

// 3. Sacred Peach Wood (泰山雷击桃木)
const peachSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="peachGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef3c7" />
      <stop offset="25%" stop-color="#f59e0b" />
      <stop offset="65%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#713f12" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#peachGrad)" />
    <!-- Fine Fruitwood Grains -->
    <path d="M 20 80 Q 100 100 180 75" stroke="#78350f" stroke-width="2.5" fill="none" opacity="0.6" />
    <path d="M 25 110 Q 105 130 175 105" stroke="#78350f" stroke-width="3.5" fill="none" opacity="0.65" />
    <path d="M 30 140 Q 100 160 160 135" stroke="#78350f" stroke-width="2" fill="none" opacity="0.5" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#2e1403" />
</svg>`;

// 4. Natural Turquoise (原矿高瓷绿松石带天然铁线)
const turquoiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="turquoiseGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#a5f3fc" />
      <stop offset="25%" stop-color="#06b6d4" />
      <stop offset="65%" stop-color="#0891b2" />
      <stop offset="100%" stop-color="#164e63" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#turquoiseGrad)" />
    <!-- Spiderweb Matrix Veins (天然金褐色铁线) -->
    <path d="M 30 70 L 75 110 L 140 85 L 175 125" stroke="#3b1d11" stroke-width="3" fill="none" opacity="0.85" />
    <path d="M 75 110 L 95 160 L 130 175" stroke="#3b1d11" stroke-width="2.2" fill="none" opacity="0.8" />
    <path d="M 140 85 L 160 45" stroke="#3b1d11" stroke-width="2" fill="none" opacity="0.75" />
    <path d="M 50 130 L 75 110 L 90 90" stroke="#251109" stroke-width="1.8" fill="none" opacity="0.7" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#082f49" />
</svg>`;

// 5. Royal Lapis Lazuli (帝王青金石带金星)
const lapisSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="lapisGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#93c5fd" />
      <stop offset="25%" stop-color="#1d4ed8" />
      <stop offset="65%" stop-color="#1e3a8a" />
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
    <rect width="200" height="200" fill="url(#lapisGrad)" />
    <!-- Sparkling Pyrite Gold Specks (天然黄铁矿金星) -->
    <circle cx="60" cy="90" r="2" fill="#fde047" />
    <circle cx="85" cy="130" r="1.5" fill="#fef08a" />
    <circle cx="130" cy="115" r="2.2" fill="#fde047" />
    <circle cx="145" cy="75" r="1.8" fill="#fef08a" />
    <circle cx="105" cy="65" r="2.5" fill="#fde047" />
    <circle cx="45" cy="140" r="1.2" fill="#fef08a" />
    <circle cx="160" cy="130" r="1.5" fill="#fde047" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#080e1a" />
</svg>`;

// 6. Baoshan Red Agate (保山南红玛瑙满肉柿子红)
const redAgateSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="agateGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fca5a5" />
      <stop offset="25%" stop-color="#dc2626" />
      <stop offset="65%" stop-color="#991b1b" />
      <stop offset="100%" stop-color="#450a0a" />
    </radialGradient>
    <radialGradient id="innerJellyFlame" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f87171" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#agateGrad)" />
    <!-- Translucent Jelly Glow -->
    <circle cx="90" cy="90" r="60" fill="url(#innerJellyFlame)" />
    <path d="M 40 70 Q 110 85 160 55" stroke="#7f1d1d" stroke-width="2.5" fill="none" opacity="0.5" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#2d0505" />
</svg>`;

// 7. Golden Tiger's Eye (金虎眼石流动猫眼光带)
const tigersEyeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="tigerGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="30%" stop-color="#ca8a04" />
      <stop offset="70%" stop-color="#713f12" />
      <stop offset="100%" stop-color="#291404" />
    </radialGradient>
    <linearGradient id="catEyeBand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#713f12" stop-opacity="0" />
      <stop offset="42%" stop-color="#ca8a04" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#fef9c3" stop-opacity="0.95" />
      <stop offset="58%" stop-color="#ca8a04" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#713f12" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="100" cy="100" r="95" />
    </clipPath>
  </defs>
  <circle cx="104" cy="105" r="93" fill="#000000" opacity="0.6" />
  <g clip-path="url(#circleClip)">
    <rect width="200" height="200" fill="url(#tigerGrad)" />
    <!-- Dynamic Cat Eye Light Band -->
    <rect width="200" height="200" fill="url(#catEyeBand)" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#1c0b02" />
</svg>`;

// 8. 925 Sterling Silver Lotus Guru (纯银莲花三通佛头)
const silverLotusSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
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
    <!-- 3D Carved Lotus Petals Relief (浮雕莲花) -->
    <circle cx="100" cy="100" r="60" fill="none" stroke="#334155" stroke-width="4" opacity="0.6" />
    <path d="M 100 45 C 80 75 80 115 100 135 C 120 115 120 75 100 45 Z" fill="#cbd5e1" stroke="#475569" stroke-width="2.5" />
    <path d="M 45 100 C 75 80 115 80 135 100 C 115 120 75 120 45 100 Z" fill="#cbd5e1" stroke="#475569" stroke-width="2.5" opacity="0.9" />
    <circle cx="100" cy="100" r="14" fill="#f8fafc" stroke="#334155" stroke-width="3" />
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>
  <ellipse cx="100" cy="12" rx="10" ry="5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1" />
</svg>`;

// Write all files
fs.writeFileSync(path.join(targetDir, "rosewood.svg"), rosewoodSvg);
fs.writeFileSync(path.join(targetDir, "thuja-cypress.svg"), cypressSvg);
fs.writeFileSync(path.join(targetDir, "peach-wood.svg"), peachSvg);
fs.writeFileSync(path.join(targetDir, "natural-turquoise.svg"), turquoiseSvg);
fs.writeFileSync(path.join(targetDir, "lapis-lazuli.svg"), lapisSvg);
fs.writeFileSync(path.join(targetDir, "red-agate.svg"), redAgateSvg);
fs.writeFileSync(path.join(targetDir, "tigers-eye.svg"), tigersEyeSvg);
fs.writeFileSync(path.join(targetDir, "silver-lotus.svg"), silverLotusSvg);

console.log("Successfully generated ultra-realistic SVG bead assets!");
