import fs from "fs";
import path from "path";

const targetDir = path.join(process.cwd(), "public", "products");

// 7. Gold Phoebe Lotus Incense Burner (金丝楠禅意并蒂莲线香插)
const lotusIncenseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgIncense" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1f1812" />
      <stop offset="70%" stop-color="#100b07" />
      <stop offset="100%" stop-color="#050302" />
    </radialGradient>
    <radialGradient id="lotusWood" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="35%" stop-color="#b4843b" />
      <stop offset="75%" stop-color="#784b16" />
      <stop offset="100%" stop-color="#3d2305" />
    </radialGradient>
    <radialGradient id="brassHole" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#ca8a04" />
      <stop offset="100%" stop-color="#713f12" />
    </radialGradient>
  </defs>

  <rect width="400" height="400" fill="url(#bgIncense)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#d97706" stroke-opacity="0.2" stroke-width="2" />

  <!-- Shadow on Tea Mat -->
  <ellipse cx="200" cy="285" rx="140" ry="35" fill="#000000" opacity="0.85" filter="blur(12px)" />

  <g transform="translate(200, 200)">
    <!-- Carved Lotus Dish Petals (金丝楠雕花莲瓣) -->
    <path d="M -130 50 C -140 10 -80 -60 0 -70 C 80 -60 140 10 130 50 C 100 85 0 95 -130 50 Z" fill="url(#lotusWood)" stroke="#784b16" stroke-width="2" />
    
    <!-- Inner Petal Layers -->
    <path d="M -90 40 C -100 0 -50 -40 0 -50 C 50 -40 100 0 90 40 C 70 65 0 75 -90 40 Z" fill="#9a6c28" opacity="0.8" />
    <path d="M -50 30 C -60 10 -30 -20 0 -25 C 30 -20 60 10 50 30 C 40 45 0 50 -50 30 Z" fill="#b4843b" />

    <!-- Central Brass Incense Hole (纯铜线香插孔) -->
    <circle cx="0" cy="15" r="14" fill="url(#brassHole)" stroke="#fef08a" stroke-width="1.5" />
    <circle cx="0" cy="15" r="3.5" fill="#050302" />

    <!-- Burning Incense Stick & Smoke -->
    <line x1="0" y1="15" x2="65" y2="-120" stroke="#78350f" stroke-width="2.5" />
    <circle cx="65" cy="-120" r="2.5" fill="#ef4444" />
    <!-- Rising Zen Smoke Ribbons (缕缕青烟) -->
    <path d="M 65 -120 Q 80 -150 70 -180 T 90 -240" stroke="#cbd5e1" stroke-width="2" fill="none" opacity="0.6" />
    <path d="M 65 -120 Q 50 -160 65 -200 T 55 -250" stroke="#cbd5e1" stroke-width="1.2" fill="none" opacity="0.4" />
  </g>
</svg>`;

// 8. Taihang Cliff Cypress Worry Roller (太行崖柏雀眼解压手捻把件)
const cypressRollerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgFidget" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1f1812" />
      <stop offset="70%" stop-color="#100b07" />
      <stop offset="100%" stop-color="#050302" />
    </radialGradient>
    <linearGradient id="cypressWood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fed7aa" />
      <stop offset="25%" stop-color="#d97706" />
      <stop offset="60%" stop-color="#9a3412" />
      <stop offset="100%" stop-color="#451a03" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" fill="url(#bgFidget)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#d97706" stroke-opacity="0.2" stroke-width="2" />

  <ellipse cx="200" cy="285" rx="120" ry="35" fill="#000000" opacity="0.85" filter="blur(12px)" />

  <!-- Ergonomic Handheld Roller Shape (随身手捻把件) -->
  <g transform="translate(200, 190) rotate(-25)">
    <path d="M -80 -35 C -90 -10 -90 10 -80 35 C -40 50 40 50 80 35 C 90 10 90 -10 80 -35 C 40 -50 -40 -50 -80 -35 Z" fill="url(#cypressWood)" stroke="#451a03" stroke-width="2.5" />
    
    <!-- Bird-Eye Knots (满雀眼) -->
    <circle cx="-50" cy="-10" r="5" fill="#290d02" stroke="#b45309" stroke-width="2.5" />
    <circle cx="-20" cy="15" r="4.5" fill="#290d02" stroke="#b45309" stroke-width="2.2" />
    <circle cx="15" cy="-15" r="5.5" fill="#290d02" stroke="#b45309" stroke-width="2.5" />
    <circle cx="45" cy="10" r="4" fill="#290d02" stroke="#b45309" stroke-width="2" />
    <circle cx="65" cy="-10" r="4.5" fill="#290d02" stroke="#b45309" stroke-width="2" />
    <circle cx="-30" cy="-25" r="3.5" fill="#290d02" stroke="#b45309" stroke-width="1.8" />
    <circle cx="0" cy="20" r="4" fill="#290d02" stroke="#b45309" stroke-width="2" />

    <!-- Gloss Specular Highlight -->
    <ellipse cx="-20" cy="-25" rx="45" ry="10" fill="#ffffff" opacity="0.5" />
  </g>
</svg>`;

// 9. Mount Tai Lightning Peach Wood Amulet (泰山雷击桃木乾坤护身牌)
const peachAmuletSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgAmulet" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1f1812" />
      <stop offset="70%" stop-color="#100b07" />
      <stop offset="100%" stop-color="#050302" />
    </radialGradient>
    <radialGradient id="peachWood" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fde68a" />
      <stop offset="30%" stop-color="#d97706" />
      <stop offset="70%" stop-color="#92400e" />
      <stop offset="100%" stop-color="#451a03" />
    </radialGradient>
  </defs>

  <rect width="400" height="400" fill="url(#bgAmulet)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#d97706" stroke-opacity="0.2" stroke-width="2" />

  <ellipse cx="200" cy="290" rx="100" ry="30" fill="#000000" opacity="0.8" filter="blur(10px)" />

  <g transform="translate(200, 195)">
    <!-- Red Silk Hanging Cord (手工朱砂红绳) -->
    <path d="M 0 -130 L 0 -85" stroke="#dc2626" stroke-width="4" stroke-linecap="round" />
    <circle cx="0" cy="-85" r="5" fill="#f59e0b" />

    <!-- Rectangular Wooden Plaque with Rounded Corners (护身方牌) -->
    <rect x="-65" y="-80" width="130" height="170" rx="16" fill="url(#peachWood)" stroke="#78350f" stroke-width="3" />

    <!-- Daoist Bagua Yin-Yang Center (乾坤八卦微雕) -->
    <circle cx="0" cy="-5" r="38" fill="none" stroke="#451a03" stroke-width="3" />
    <path d="M 0 -43 L 0 33" stroke="#451a03" stroke-width="2" />
    <text x="0" y="5" font-family="serif" font-size="28" font-weight="bold" text-anchor="middle" fill="#451a03">道</text>
    
    <!-- Blessings Carved Inscriptions (平安吉庆) -->
    <text x="0" y="55" font-family="serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#78350f">出入平安 · 诸邪回避</text>

    <!-- Bottom Red Silk Tassel -->
    <path d="M 0 90 L 0 135" stroke="#dc2626" stroke-width="4" stroke-linecap="round" />
    <circle cx="0" cy="135" r="5" fill="#f59e0b" />
    <path d="M 0 140 Q -8 165 -10 185" stroke="#dc2626" stroke-width="2.5" fill="none" />
    <path d="M 0 140 Q 0 165 0 185" stroke="#dc2626" stroke-width="2.5" fill="none" />
    <path d="M 0 140 Q 8 165 10 185" stroke="#dc2626" stroke-width="2.5" fill="none" />
  </g>
</svg>`;

fs.writeFileSync(path.join(targetDir, "lotus-incense.svg"), lotusIncenseSvg);
fs.writeFileSync(path.join(targetDir, "cypress-roller.svg"), cypressRollerSvg);
fs.writeFileSync(path.join(targetDir, "peach-amulet.svg"), peachAmuletSvg);

console.log("All 9 finished product assets generated successfully!");
