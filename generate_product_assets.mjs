import fs from "fs";
import path from "path";

const targetDir = path.join(process.cwd(), "public", "products");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Finished 108-Bead Zitan Mala (爆满金星小叶紫檀老料 108 念珠)
const zitan108Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgSilk" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#24140b" />
      <stop offset="60%" stop-color="#140b06" />
      <stop offset="100%" stop-color="#0a0503" />
    </radialGradient>
    <radialGradient id="zitanBead" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#831843" />
      <stop offset="30%" stop-color="#500724" />
      <stop offset="75%" stop-color="#260311" />
      <stop offset="100%" stop-color="#0a0104" />
    </radialGradient>
    <radialGradient id="silverGuru" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="40%" stop-color="#cbd5e1" />
      <stop offset="85%" stop-color="#475569" />
      <stop offset="100%" stop-color="#0f172a" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="30%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background Silk Tray -->
  <rect width="400" height="400" fill="url(#bgSilk)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#d97706" stroke-opacity="0.2" stroke-width="2" />
  <circle cx="200" cy="200" r="180" fill="none" stroke="#d97706" stroke-opacity="0.1" stroke-width="1" />

  <!-- Multi-loop 108 Beaded Bracelet -->
  <!-- Outer Loop -->
  <g transform="translate(200, 190)">
    <!-- Shadow -->
    <ellipse cx="0" cy="10" rx="140" ry="110" fill="#000000" opacity="0.6" filter="blur(8px)" />

    <!-- Outer Beaded Circle -->
    <circle cx="0" cy="0" r="130" fill="none" stroke="#78350f" stroke-width="3" opacity="0.4" />
    <!-- 28 beads around outer loop -->
    <script>/* Beads loop */</script>
    <g>
      <!-- Draw repeating beads in loop -->
      <circle cx="0" cy="-130" r="14" fill="url(#zitanBead)" stroke="#831843" stroke-width="1" />
      <ellipse cx="-4" cy="-134" rx="5" ry="3" fill="url(#specularGlow)" />
      
      <circle cx="34" cy="-125" r="13" fill="url(#zitanBead)" />
      <circle cx="67" cy="-111" r="13" fill="url(#zitanBead)" />
      <circle cx="95" cy="-88" r="13" fill="url(#zitanBead)" />
      <circle cx="116" cy="-58" r="13" fill="url(#zitanBead)" />
      <circle cx="128" cy="-24" r="13" fill="url(#zitanBead)" />
      <circle cx="130" cy="12" r="13" fill="url(#zitanBead)" />
      <circle cx="121" cy="47" r="13" fill="url(#zitanBead)" />
      <circle cx="103" cy="79" r="13" fill="url(#zitanBead)" />
      <circle cx="77" cy="104" r="13" fill="url(#zitanBead)" />
      <circle cx="45" cy="122" r="13" fill="url(#zitanBead)" />
      <circle cx="10" cy="130" r="13" fill="url(#zitanBead)" />
      
      <circle cx="-25" cy="127" r="13" fill="url(#zitanBead)" />
      <circle cx="-58" cy="116" r="13" fill="url(#zitanBead)" />
      <circle cx="-88" cy="95" r="13" fill="url(#zitanBead)" />
      <circle cx="-111" cy="67" r="13" fill="url(#zitanBead)" />
      <circle cx="-125" cy="34" r="13" fill="url(#zitanBead)" />
      <circle cx="-129" cy="-2" r="13" fill="url(#zitanBead)" />
      <circle cx="-122" cy="-38" r="13" fill="url(#zitanBead)" />
      <circle cx="-105" cy="-71" r="13" fill="url(#zitanBead)" />
      <circle cx="-79" cy="-99" r="13" fill="url(#zitanBead)" />
      <circle cx="-47" cy="-119" r="13" fill="url(#zitanBead)" />
    </g>

    <!-- Inner Second Loop -->
    <g transform="scale(0.75)">
      <circle cx="0" cy="-130" r="14" fill="url(#zitanBead)" />
      <circle cx="34" cy="-125" r="13" fill="url(#zitanBead)" />
      <circle cx="67" cy="-111" r="13" fill="url(#zitanBead)" />
      <circle cx="95" cy="-88" r="13" fill="url(#zitanBead)" />
      <circle cx="116" cy="-58" r="13" fill="url(#zitanBead)" />
      <circle cx="128" cy="-24" r="13" fill="url(#zitanBead)" />
      <circle cx="130" cy="12" r="13" fill="url(#zitanBead)" />
      <circle cx="121" cy="47" r="13" fill="url(#zitanBead)" />
      <circle cx="103" cy="79" r="13" fill="url(#zitanBead)" />
      <circle cx="77" cy="104" r="13" fill="url(#zitanBead)" />
      <circle cx="45" cy="122" r="13" fill="url(#zitanBead)" />
      <circle cx="10" cy="130" r="13" fill="url(#zitanBead)" />
      <circle cx="-25" cy="127" r="13" fill="url(#zitanBead)" />
      <circle cx="-58" cy="116" r="13" fill="url(#zitanBead)" />
      <circle cx="-88" cy="95" r="13" fill="url(#zitanBead)" />
      <circle cx="-111" cy="67" r="13" fill="url(#zitanBead)" />
      <circle cx="-125" cy="34" r="13" fill="url(#zitanBead)" />
      <circle cx="-129" cy="-2" r="13" fill="url(#zitanBead)" />
      <circle cx="-122" cy="-38" r="13" fill="url(#zitanBead)" />
      <circle cx="-105" cy="-71" r="13" fill="url(#zitanBead)" />
      <circle cx="-79" cy="-99" r="13" fill="url(#zitanBead)" />
      <circle cx="-47" cy="-119" r="13" fill="url(#zitanBead)" />
    </g>

    <!-- Top Guru Centerpiece & Silk Tassel (银莲花佛头与流苏) -->
    <circle cx="0" cy="-130" r="18" fill="url(#silverGuru)" stroke="#f8fafc" stroke-width="2" />
    <path d="M 0 -112 L 0 -80" stroke="#dc2626" stroke-width="4" stroke-linecap="round" />
    <circle cx="0" cy="-80" r="6" fill="#f59e0b" />
    <!-- Tassel Ribbons -->
    <path d="M 0 -74 Q -10 -40 -12 -10" stroke="#dc2626" stroke-width="2.5" fill="none" />
    <path d="M 0 -74 Q 0 -40 0 -10" stroke="#dc2626" stroke-width="2.5" fill="none" />
    <path d="M 0 -74 Q 10 -40 12 -10" stroke="#dc2626" stroke-width="2.5" fill="none" />
  </g>

  <!-- Golden Stars & Highlights Overlay -->
  <g fill="#fef08a" opacity="0.75">
    <circle cx="150" cy="120" r="1.2" />
    <circle cx="280" cy="140" r="1.2" />
    <circle cx="320" cy="220" r="1.5" />
    <circle cx="110" cy="260" r="1.3" />
    <circle cx="250" cy="300" r="1.4" />
  </g>
</svg>`;

// 2. Finished Baoshan Persimmon Red Agate (保山南红玛瑙手串成品)
const nanhongSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgCloth" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#2b1a11" />
      <stop offset="70%" stop-color="#180e08" />
      <stop offset="100%" stop-color="#0a0503" />
    </radialGradient>
    <radialGradient id="nanhongBead" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fca5a5" />
      <stop offset="25%" stop-color="#dc2626" />
      <stop offset="65%" stop-color="#991b1b" />
      <stop offset="100%" stop-color="#450a0a" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="30%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="400" height="400" fill="url(#bgCloth)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#d97706" stroke-opacity="0.2" stroke-width="2" />

  <!-- Single Strand 18-Bead Persimmon Red Bracelet -->
  <g transform="translate(200, 200)">
    <ellipse cx="0" cy="15" rx="130" ry="120" fill="#000000" opacity="0.65" filter="blur(10px)" />
    <circle cx="0" cy="0" r="115" fill="none" stroke="#991b1b" stroke-width="3" opacity="0.5" />

    <!-- 18 Large 10mm Beads along circle -->
    <g>
      <!-- Generated 18 beads around 360 deg -->
      <circle cx="0" cy="-115" r="22" fill="url(#nanhongBead)" stroke="#ef4444" stroke-width="0.5" />
      <ellipse cx="-6" cy="-122" rx="8" ry="5" fill="url(#specularGlow)" />
      
      <circle cx="39" cy="-108" r="21" fill="url(#nanhongBead)" />
      <ellipse cx="33" cy="-115" rx="7" ry="4" fill="url(#specularGlow)" />
      
      <circle cx="74" cy="-88" r="21" fill="url(#nanhongBead)" />
      <circle cx="100" cy="-57" r="21" fill="url(#nanhongBead)" />
      <circle cx="113" cy="-20" r="21" fill="url(#nanhongBead)" />
      <circle cx="113" cy="20" r="21" fill="url(#nanhongBead)" />
      <circle cx="100" cy="57" r="21" fill="url(#nanhongBead)" />
      <circle cx="74" cy="88" r="21" fill="url(#nanhongBead)" />
      <circle cx="39" cy="108" r="21" fill="url(#nanhongBead)" />
      <circle cx="0" cy="115" r="21" fill="url(#nanhongBead)" />
      <circle cx="-39" cy="108" r="21" fill="url(#nanhongBead)" />
      <circle cx="-74" cy="88" r="21" fill="url(#nanhongBead)" />
      <circle cx="-100" cy="57" r="21" fill="url(#nanhongBead)" />
      <circle cx="-113" cy="20" r="21" fill="url(#nanhongBead)" />
      <circle cx="-113" cy="-20" r="21" fill="url(#nanhongBead)" />
      <circle cx="-100" cy="-57" r="21" fill="url(#nanhongBead)" />
      <circle cx="-74" cy="-88" r="21" fill="url(#nanhongBead)" />
      <circle cx="-39" cy="-108" r="21" fill="url(#nanhongBead)" />
    </g>
  </g>
</svg>`;

// 3. Finished Wild Agarwood Chenxiang Mala (野生加里曼丹沉水沉香手串成品)
const chenxiangSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgChenxiang" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1a110a" />
      <stop offset="70%" stop-color="#0f0905" />
      <stop offset="100%" stop-color="#050302" />
    </radialGradient>
    <radialGradient id="chenxiangBead" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#543729" />
      <stop offset="30%" stop-color="#2c1a11" />
      <stop offset="75%" stop-color="#170c07" />
      <stop offset="100%" stop-color="#080302" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="30%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="400" height="400" fill="url(#bgChenxiang)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#d97706" stroke-opacity="0.2" stroke-width="2" />

  <g transform="translate(200, 200)">
    <ellipse cx="0" cy="15" rx="130" ry="120" fill="#000000" opacity="0.75" filter="blur(10px)" />
    
    <!-- 16 Large 12mm Sinking Agarwood Beads -->
    <g>
      <circle cx="0" cy="-115" r="24" fill="url(#chenxiangBead)" />
      <ellipse cx="-7" cy="-122" rx="9" ry="5" fill="url(#specularGlow)" />
      
      <circle cx="44" cy="-106" r="23" fill="url(#chenxiangBead)" />
      <circle cx="81" cy="-81" r="23" fill="url(#chenxiangBead)" />
      <circle cx="106" cy="-44" r="23" fill="url(#chenxiangBead)" />
      <circle cx="115" cy="0" r="23" fill="url(#chenxiangBead)" />
      <circle cx="106" cy="44" r="23" fill="url(#chenxiangBead)" />
      <circle cx="81" cy="81" r="23" fill="url(#chenxiangBead)" />
      <circle cx="44" cy="106" r="23" fill="url(#chenxiangBead)" />
      <circle cx="0" cy="115" r="23" fill="url(#chenxiangBead)" />
      <circle cx="-44" cy="106" r="23" fill="url(#chenxiangBead)" />
      <circle cx="-81" cy="81" r="23" fill="url(#chenxiangBead)" />
      <circle cx="-106" cy="44" r="23" fill="url(#chenxiangBead)" />
      <circle cx="-115" cy="0" r="23" fill="url(#chenxiangBead)" />
      <circle cx="-106" cy="-44" r="23" fill="url(#chenxiangBead)" />
      <circle cx="-81" cy="-81" r="23" fill="url(#chenxiangBead)" />
      <circle cx="-44" cy="-106" r="23" fill="url(#chenxiangBead)" />
    </g>

    <!-- Natural Resin Lines in Beads -->
    <path d="M -10 -115 Q 0 -110 10 -115" stroke="#120603" stroke-width="2" fill="none" />
    <path d="M 35 -106 Q 44 -100 53 -106" stroke="#120603" stroke-width="2" fill="none" />
  </g>
</svg>`;

// 4. Finished Turquoise & Gold Phoebe Bracelet (原矿高瓷蓝绿松石配金丝楠手串)
const turquoisePhoebeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgTurq" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1f1812" />
      <stop offset="70%" stop-color="#100b07" />
      <stop offset="100%" stop-color="#050302" />
    </radialGradient>
    <radialGradient id="phoebeBead" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="35%" stop-color="#b4843b" />
      <stop offset="75%" stop-color="#784b16" />
      <stop offset="100%" stop-color="#3d2305" />
    </radialGradient>
    <radialGradient id="turqBead" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#a5f3fc" />
      <stop offset="30%" stop-color="#06b6d4" />
      <stop offset="75%" stop-color="#0e7490" />
      <stop offset="100%" stop-color="#164e63" />
    </radialGradient>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="30%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="400" height="400" fill="url(#bgTurq)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#d97706" stroke-opacity="0.2" stroke-width="2" />

  <g transform="translate(200, 200)">
    <ellipse cx="0" cy="15" rx="130" ry="120" fill="#000000" opacity="0.65" filter="blur(10px)" />
    
    <!-- Top & Side Turquoise Accent Beads + Gold Phoebe Body -->
    <!-- Top Turquoise Centerpiece -->
    <circle cx="0" cy="-115" r="23" fill="url(#turqBead)" />
    <path d="M -10 -115 L 5 -120 L 12 -110" stroke="#381d11" stroke-width="1.8" fill="none" opacity="0.8" />
    <ellipse cx="-6" cy="-122" rx="8" ry="4" fill="url(#specularGlow)" />

    <!-- 17 Gold Phoebe Beads -->
    <circle cx="39" cy="-108" r="20" fill="url(#phoebeBead)" />
    <circle cx="74" cy="-88" r="20" fill="url(#phoebeBead)" />
    
    <!-- East Turquoise Accent -->
    <circle cx="100" cy="-57" r="21" fill="url(#turqBead)" />
    <path d="M 92 -60 L 105 -55" stroke="#381d11" stroke-width="1.5" fill="none" />

    <circle cx="113" cy="-20" r="20" fill="url(#phoebeBead)" />
    <circle cx="113" cy="20" r="20" fill="url(#phoebeBead)" />
    <circle cx="100" cy="57" r="20" fill="url(#phoebeBead)" />
    <circle cx="74" cy="88" r="20" fill="url(#phoebeBead)" />
    <circle cx="39" cy="108" r="20" fill="url(#phoebeBead)" />
    
    <!-- South Turquoise Accent -->
    <circle cx="0" cy="115" r="21" fill="url(#turqBead)" />

    <circle cx="-39" cy="108" r="20" fill="url(#phoebeBead)" />
    <circle cx="-74" cy="88" r="20" fill="url(#phoebeBead)" />
    <circle cx="-100" cy="57" r="20" fill="url(#phoebeBead)" />
    <circle cx="-113" cy="20" r="20" fill="url(#phoebeBead)" />
    <circle cx="-113" cy="-20" r="20" fill="url(#phoebeBead)" />
    
    <!-- West Turquoise Accent -->
    <circle cx="-100" cy="-57" r="21" fill="url(#turqBead)" />

    <circle cx="-74" cy="-88" r="20" fill="url(#phoebeBead)" />
    <circle cx="-39" cy="-108" r="20" fill="url(#phoebeBead)" />
  </g>
</svg>`;

// 5. Hand-Carved Green Sandalwood Dragon Tea Pet (野生绿檀祥龙戏珠茶宠摆件)
const dragonTeapetSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgTray" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1f1812" />
      <stop offset="70%" stop-color="#110c08" />
      <stop offset="100%" stop-color="#050302" />
    </radialGradient>
    <linearGradient id="dragonWood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a9b388" />
      <stop offset="30%" stop-color="#5f6f52" />
      <stop offset="70%" stop-color="#314426" />
      <stop offset="100%" stop-color="#1a2514" />
    </linearGradient>
    <radialGradient id="flamePearl" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </radialGradient>
  </defs>

  <rect width="400" height="400" fill="url(#bgTray)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#d97706" stroke-opacity="0.2" stroke-width="2" />

  <!-- Gongfu Tea Table Base Shadow -->
  <ellipse cx="200" cy="285" rx="140" ry="40" fill="#000000" opacity="0.8" filter="blur(12px)" />

  <!-- Carved Dragon Body & Horns (绿檀精雕祥龙) -->
  <g transform="translate(190, 180)">
    <!-- Dragon Coiled Body -->
    <path d="M -110 50 C -120 -40 -30 -90 40 -80 C 110 -70 120 10 70 60 C 20 100 -60 100 -110 50 Z" fill="url(#dragonWood)" stroke="#1a2514" stroke-width="3" />
    
    <!-- Dragon Head -->
    <path d="M 40 -80 C 70 -130 130 -110 140 -60 C 150 -30 120 0 80 -20 Z" fill="url(#dragonWood)" stroke="#1a2514" stroke-width="3" />
    
    <!-- Dragon Antlers / Horns (鹿角) -->
    <path d="M 90 -105 Q 110 -145 135 -140" stroke="#fef08a" stroke-width="4" stroke-linecap="round" fill="none" />
    <path d="M 110 -125 Q 130 -135 140 -120" stroke="#fef08a" stroke-width="3" stroke-linecap="round" fill="none" />

    <!-- Dragon Whiskers & Claws (龙须与龙爪) -->
    <path d="M 130 -50 Q 170 -40 180 -10" stroke="#fef08a" stroke-width="2.5" fill="none" />
    <path d="M 125 -40 Q 160 -20 165 15" stroke="#fef08a" stroke-width="2.5" fill="none" />

    <!-- Dragon Scale Texture (龙鳞雕刻暗纹) -->
    <path d="M -60 20 Q -45 5 -30 20" stroke="#a9b388" stroke-width="2" fill="none" opacity="0.6" />
    <path d="M -30 30 Q -15 15 0 30" stroke="#a9b388" stroke-width="2" fill="none" opacity="0.6" />
    <path d="M 0 40 Q 15 25 30 40" stroke="#a9b388" stroke-width="2" fill="none" opacity="0.6" />
    <path d="M -70 -10 Q -55 -25 -40 -10" stroke="#a9b388" stroke-width="2" fill="none" opacity="0.6" />
    <path d="M -30 -20 Q -15 -35 0 -20" stroke="#a9b388" stroke-width="2" fill="none" opacity="0.6" />

    <!-- Flaming Dragon Pearl (龙珠) -->
    <circle cx="135" cy="40" r="24" fill="url(#flamePearl)" stroke="#fef08a" stroke-width="2" />
    <ellipse cx="128" cy="32" rx="8" ry="5" fill="#ffffff" opacity="0.8" />
  </g>
</svg>`;

// 6. Solid Black Ebony Pixiu Wealth Guardian (高密沉水黑檀霸王貔貅摆件)
const ebonyPixiuSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgDesk" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1f1812" />
      <stop offset="70%" stop-color="#100b07" />
      <stop offset="100%" stop-color="#050302" />
    </radialGradient>
    <radialGradient id="ebonyBody" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#52525b" />
      <stop offset="25%" stop-color="#27272a" />
      <stop offset="70%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#000000" />
    </radialGradient>
    <radialGradient id="goldCoin" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#ca8a04" />
      <stop offset="100%" stop-color="#713f12" />
    </radialGradient>
  </defs>

  <rect width="400" height="400" fill="url(#bgDesk)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#d97706" stroke-opacity="0.2" stroke-width="2" />

  <ellipse cx="200" cy="285" rx="140" ry="40" fill="#000000" opacity="0.85" filter="blur(12px)" />

  <!-- Carved Ebony Pixiu Figurine (黑檀霸王貔貅) -->
  <g transform="translate(190, 185)">
    <!-- Powerful Muscular Body -->
    <path d="M -100 40 C -120 -30 -50 -80 30 -70 C 100 -60 120 10 80 65 C 30 100 -50 95 -100 40 Z" fill="url(#ebonyBody)" stroke="#09090b" stroke-width="3" />
    
    <!-- Pixiu Head & Wide Mouth (口衔金钱) -->
    <path d="M 30 -70 C 60 -110 120 -95 130 -50 C 140 -20 110 10 70 -10 Z" fill="url(#ebonyBody)" stroke="#09090b" stroke-width="3" />
    
    <!-- Horn & Fierce Eyes -->
    <path d="M 80 -85 Q 100 -120 120 -115" stroke="#71717a" stroke-width="5" stroke-linecap="round" fill="none" />
    <circle cx="95" cy="-60" r="6" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />

    <!-- Gold Coin in Mouth -->
    <circle cx="125" cy="-25" r="18" fill="url(#goldCoin)" stroke="#fef08a" stroke-width="1.5" />
    <rect x="120" y="-30" width="10" height="10" fill="#291404" />

    <!-- High Gloss Mirror Reflection across Ebony Back -->
    <path d="M -60 -10 C -20 -40 40 -35 70 -5" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55" />
  </g>
</svg>`;

// Write product images
fs.writeFileSync(path.join(targetDir, "zitan-108.svg"), zitan108Svg);
fs.writeFileSync(path.join(targetDir, "nanhong-bracelet.svg"), nanhongSvg);
fs.writeFileSync(path.join(targetDir, "chenxiang-mala.svg"), chenxiangSvg);
fs.writeFileSync(path.join(targetDir, "turquoise-phoebe.svg"), turquoisePhoebeSvg);
fs.writeFileSync(path.join(targetDir, "dragon-teapet.svg"), dragonTeapetSvg);
fs.writeFileSync(path.join(targetDir, "ebony-pixiu.svg"), ebonyPixiuSvg);

console.log("All finished products and carvings SVG visual assets generated successfully!");
