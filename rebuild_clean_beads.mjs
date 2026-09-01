import fs from "fs";
import path from "path";

const targetDir = path.join(process.cwd(), "public", "beads");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Helper to wrap bead contents in a 100% borderless, transparent, perfectly centered circle
function makeBeadSvg(content, holeColor = "#1c1917") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="specularGlow" cx="30%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="bounceGlow" cx="75%" cy="75%" r="45%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <clipPath id="beadClip">
      <circle cx="100" cy="100" r="100" />
    </clipPath>
  </defs>

  <g clip-path="url(#beadClip)">
    ${content}
    <!-- Ambient Silk Reflection -->
    <rect width="200" height="200" fill="url(#bounceGlow)" />
    <!-- 3D Specular Highlight -->
    <ellipse cx="65" cy="65" rx="35" ry="25" transform="rotate(-30 65 65)" fill="url(#specularGlow)" />
  </g>

  <!-- Central Thread Hole & Bevel -->
  <ellipse cx="100" cy="12" rx="12" ry="6" fill="${holeColor}" />
</svg>`;
}

// 1. Green Sandalwood (野生绿檀 - 清幽翡翠年轮纹)
const greenSandalwood = makeBeadSvg(`
  <defs>
    <radialGradient id="greenSandalGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#a9b388" />
      <stop offset="30%" stop-color="#5f6f52" />
      <stop offset="70%" stop-color="#283618" />
      <stop offset="100%" stop-color="#141d0b" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#greenSandalGrad)" />
  <circle cx="100" cy="100" r="30" fill="none" stroke="#283618" stroke-width="2" opacity="0.6" />
  <circle cx="100" cy="100" r="55" fill="none" stroke="#283618" stroke-width="2.5" opacity="0.55" />
  <circle cx="100" cy="100" r="80" fill="none" stroke="#283618" stroke-width="3" opacity="0.5" />
  <path d="M 20 60 Q 100 85 180 55" stroke="#a9b388" stroke-width="2" fill="none" opacity="0.4" />
  <path d="M 30 110 Q 110 135 170 105" stroke="#a9b388" stroke-width="2.5" fill="none" opacity="0.45" />
  <path d="M 40 150 Q 100 170 160 145" stroke="#a9b388" stroke-width="1.8" fill="none" opacity="0.35" />
`, "#141d0b");

// 2. Gold Phoebe (百年金丝楠 - 流动水波金丝)
const goldPhoebe = makeBeadSvg(`
  <defs>
    <radialGradient id="phoebeGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="30%" stop-color="#ca8a04" />
      <stop offset="70%" stop-color="#784b16" />
      <stop offset="100%" stop-color="#3d2305" />
    </radialGradient>
    <linearGradient id="waveFiber" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.1" />
      <stop offset="50%" stop-color="#fde047" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ca8a04" stop-opacity="0.1" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#phoebeGrad)" />
  <path d="M 10 50 Q 70 80 130 40 T 190 60" stroke="url(#waveFiber)" stroke-width="4.5" fill="none" />
  <path d="M 15 85 Q 75 115 135 75 T 185 95" stroke="url(#waveFiber)" stroke-width="5" fill="none" />
  <path d="M 20 120 Q 80 150 140 110 T 180 130" stroke="url(#waveFiber)" stroke-width="4.5" fill="none" />
  <path d="M 35 155 Q 85 180 145 145 T 165 165" stroke="url(#waveFiber)" stroke-width="3.5" fill="none" />
`, "#291502");

// 3. Black Ebony (高密沉水黑檀 - 钢琴烤漆黑亮)
const blackEbony = makeBeadSvg(`
  <defs>
    <radialGradient id="ebonyGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#52525b" />
      <stop offset="25%" stop-color="#27272a" />
      <stop offset="70%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#000000" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#ebonyGrad)" />
  <path d="M 20 70 Q 100 85 180 65" stroke="#18181b" stroke-width="3" fill="none" />
  <path d="M 25 110 Q 105 125 175 105" stroke="#18181b" stroke-width="4" fill="none" />
  <path d="M 30 145 Q 100 160 160 140" stroke="#18181b" stroke-width="2.5" fill="none" />
`, "#000000");

// 4. Red Rosewood (大红酸枝老料 - 正统深红褐沉水黑筋)
const rosewood = makeBeadSvg(`
  <defs>
    <radialGradient id="rosewoodGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#85222c" />
      <stop offset="35%" stop-color="#4a1017" />
      <stop offset="70%" stop-color="#28070b" />
      <stop offset="100%" stop-color="#120204" />
    </radialGradient>
    <linearGradient id="blackOilStreak" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#100305" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#28070b" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#0a0102" stop-opacity="0.95" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#rosewoodGrad)" />
  <path d="M 20 45 Q 90 75 170 35 Q 190 85 175 125 Q 110 165 30 135 Z" fill="url(#blackOilStreak)" />
  <path d="M 25 80 Q 95 105 175 75" stroke="#1c0407" stroke-width="4" fill="none" opacity="0.8" />
  <path d="M 20 115 Q 100 140 180 110" stroke="#1c0407" stroke-width="5" fill="none" opacity="0.85" />
  <path d="M 35 150 Q 105 170 165 145" stroke="#1c0407" stroke-width="3" fill="none" opacity="0.8" />
  <circle cx="65" cy="85" r="1.2" fill="#f59e0b" opacity="0.4" />
  <circle cx="120" cy="115" r="1.5" fill="#f59e0b" opacity="0.35" />
  <circle cx="85" cy="145" r="1.2" fill="#f59e0b" opacity="0.4" />
`, "#120204");

// 5. Thuja Cypress (太行崖柏雀眼舍利料)
const cypress = makeBeadSvg(`
  <defs>
    <radialGradient id="cypressGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fed7aa" />
      <stop offset="25%" stop-color="#d97706" />
      <stop offset="60%" stop-color="#9a3412" />
      <stop offset="100%" stop-color="#451a03" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#cypressGrad)" />
  <path d="M 15 55 Q 85 115 175 45 Q 155 145 55 165 Z" fill="#78350f" opacity="0.45" />
  <circle cx="65" cy="75" r="5" fill="#290d02" stroke="#b45309" stroke-width="2.5" />
  <circle cx="135" cy="60" r="4" fill="#290d02" stroke="#b45309" stroke-width="2" />
  <circle cx="145" cy="125" r="5.5" fill="#290d02" stroke="#b45309" stroke-width="3" />
  <circle cx="55" cy="135" r="4.5" fill="#290d02" stroke="#b45309" stroke-width="2.2" />
  <circle cx="105" cy="105" r="4.5" fill="#290d02" stroke="#b45309" stroke-width="2.2" />
`, "#290d02");

// 6. Sacred Peach Wood (泰山雷击桃木)
const peachWood = makeBeadSvg(`
  <defs>
    <radialGradient id="peachGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef3c7" />
      <stop offset="25%" stop-color="#f59e0b" />
      <stop offset="65%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#713f12" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#peachGrad)" />
  <path d="M 20 75 Q 100 95 180 70" stroke="#78350f" stroke-width="3" fill="none" opacity="0.6" />
  <path d="M 25 110 Q 105 130 175 105" stroke="#78350f" stroke-width="4" fill="none" opacity="0.65" />
  <path d="M 30 145 Q 100 165 160 140" stroke="#78350f" stroke-width="2.5" fill="none" opacity="0.5" />
`, "#2e1403");

// 7. Natural Turquoise (原矿高瓷蓝绿松石)
const turquoise = makeBeadSvg(`
  <defs>
    <radialGradient id="turquoiseGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#a5f3fc" />
      <stop offset="25%" stop-color="#06b6d4" />
      <stop offset="65%" stop-color="#0891b2" />
      <stop offset="100%" stop-color="#164e63" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#turquoiseGrad)" />
  <path d="M 25 65 L 75 110 L 140 85 L 180 125" stroke="#3b1d11" stroke-width="3.5" fill="none" opacity="0.85" />
  <path d="M 75 110 L 95 165 L 135 180" stroke="#3b1d11" stroke-width="2.5" fill="none" opacity="0.8" />
  <path d="M 140 85 L 165 40" stroke="#3b1d11" stroke-width="2.2" fill="none" opacity="0.75" />
  <path d="M 45 130 L 75 110 L 90 85" stroke="#251109" stroke-width="2" fill="none" opacity="0.7" />
`, "#082f49");

// 8. Royal Lapis Lazuli (帝王青金石)
const lapis = makeBeadSvg(`
  <defs>
    <radialGradient id="lapisGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#93c5fd" />
      <stop offset="25%" stop-color="#1d4ed8" />
      <stop offset="65%" stop-color="#1e3a8a" />
      <stop offset="100%" stop-color="#0f172a" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#lapisGrad)" />
  <circle cx="55" cy="85" r="2.2" fill="#fde047" />
  <circle cx="85" cy="130" r="1.8" fill="#fef08a" />
  <circle cx="135" cy="115" r="2.5" fill="#fde047" />
  <circle cx="150" cy="70" r="2" fill="#fef08a" />
  <circle cx="105" cy="60" r="2.8" fill="#fde047" />
  <circle cx="45" cy="140" r="1.5" fill="#fef08a" />
  <circle cx="165" cy="130" r="1.8" fill="#fde047" />
`, "#080e1a");

// 9. Baoshan Red Agate (保山南红玛瑙)
const redAgate = makeBeadSvg(`
  <defs>
    <radialGradient id="agateGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fca5a5" />
      <stop offset="25%" stop-color="#dc2626" />
      <stop offset="65%" stop-color="#991b1b" />
      <stop offset="100%" stop-color="#450a0a" />
    </radialGradient>
    <radialGradient id="innerJelly" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f87171" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#agateGrad)" />
  <circle cx="95" cy="95" r="65" fill="url(#innerJelly)" />
  <path d="M 35 65 Q 110 85 165 50" stroke="#7f1d1d" stroke-width="3" fill="none" opacity="0.5" />
`, "#2d0505");

// 10. Golden Tiger's Eye (金虎眼石)
const tigersEye = makeBeadSvg(`
  <defs>
    <radialGradient id="tigerGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="30%" stop-color="#ca8a04" />
      <stop offset="70%" stop-color="#713f12" />
      <stop offset="100%" stop-color="#291404" />
    </radialGradient>
    <linearGradient id="catEyeBand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#713f12" stop-opacity="0" />
      <stop offset="40%" stop-color="#ca8a04" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#fef9c3" stop-opacity="0.95" />
      <stop offset="60%" stop-color="#ca8a04" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#713f12" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#tigerGrad)" />
  <rect width="200" height="200" fill="url(#catEyeBand)" />
`, "#1c0b02");

// 11. Black Obsidian (彩虹眼黑曜石)
const obsidian = makeBeadSvg(`
  <defs>
    <radialGradient id="obsidianGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#3f3f46" />
      <stop offset="35%" stop-color="#18181b" />
      <stop offset="75%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#000000" />
    </radialGradient>
    <radialGradient id="rainbowEye" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.4" />
      <stop offset="45%" stop-color="#a855f7" stop-opacity="0.3" />
      <stop offset="75%" stop-color="#09090b" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#obsidianGrad)" />
  <circle cx="95" cy="95" r="65" fill="url(#rainbowEye)" />
`, "#000000");

// 12. Amethyst (深紫水晶)
const amethyst = makeBeadSvg(`
  <defs>
    <radialGradient id="amethystGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ddd6fe" />
      <stop offset="30%" stop-color="#7c3aed" />
      <stop offset="70%" stop-color="#4c1d95" />
      <stop offset="100%" stop-color="#2e1065" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#amethystGrad)" />
  <path d="M 35 55 L 100 25 L 165 75 L 100 155 Z" stroke="#c4b5fd" stroke-width="1.5" fill="none" opacity="0.5" />
`, "#1e0840");

// 13. Hetian Jade (和田白玉)
const jade = makeBeadSvg(`
  <defs>
    <radialGradient id="jadeGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#f1f5f9" />
      <stop offset="70%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#94a3b8" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#jadeGrad)" />
  <circle cx="85" cy="85" r="55" fill="#ffffff" opacity="0.4" />
`, "#64748b");

// 14. 925 Silver Lotus Guru (纯银莲花三通)
const silverLotus = makeBeadSvg(`
  <defs>
    <radialGradient id="silverGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#e2e8f0" />
      <stop offset="70%" stop-color="#64748b" />
      <stop offset="100%" stop-color="#1e293b" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#silverGrad)" />
  <circle cx="100" cy="100" r="65" fill="none" stroke="#334155" stroke-width="4" opacity="0.6" />
  <path d="M 100 40 C 75 75 75 125 100 145 C 125 125 125 75 100 40 Z" fill="#cbd5e1" stroke="#475569" stroke-width="2.5" />
  <path d="M 40 100 C 75 75 125 75 145 100 C 125 125 75 125 40 100 Z" fill="#cbd5e1" stroke="#475569" stroke-width="2.5" opacity="0.9" />
  <circle cx="100" cy="100" r="16" fill="#f8fafc" stroke="#334155" stroke-width="3" />
`, "#0f172a");

// 15. Silver Pixiu (纯银貔貅)
const pixiu = makeBeadSvg(`
  <defs>
    <radialGradient id="silverGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#e2e8f0" />
      <stop offset="70%" stop-color="#64748b" />
      <stop offset="100%" stop-color="#1e293b" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#silverGrad)" />
  <text x="100" y="122" font-family="serif" font-size="68" font-weight="bold" text-anchor="middle" fill="#0f172a">🦁</text>
`, "#0f172a");

// 16. Om Mantra (六字真言)
const omMantra = makeBeadSvg(`
  <defs>
    <radialGradient id="omGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#cbd5e1" />
      <stop offset="40%" stop-color="#64748b" />
      <stop offset="80%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#omGrad)" />
  <circle cx="100" cy="100" r="60" fill="none" stroke="#1e293b" stroke-width="3.5" />
  <text x="100" y="122" font-family="serif" font-size="64" font-weight="bold" text-anchor="middle" fill="#f8fafc">ॐ</text>
`, "#020617");

// 17. Brass Ring (黄铜隔片)
const brassRing = makeBeadSvg(`
  <defs>
    <radialGradient id="brassGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="35%" stop-color="#ca8a04" />
      <stop offset="70%" stop-color="#854d0e" />
      <stop offset="100%" stop-color="#422006" />
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#brassGrad)" />
  <circle cx="100" cy="100" r="45" fill="#120a06" stroke="#422006" stroke-width="3" />
`, "#422006");

// Write all SVGs cleanly (zero black background margin)
fs.writeFileSync(path.join(targetDir, "green-sandalwood.svg"), greenSandalwood);
fs.writeFileSync(path.join(targetDir, "gold-phoebe.svg"), goldPhoebe);
fs.writeFileSync(path.join(targetDir, "ebony-wood.svg"), blackEbony);
fs.writeFileSync(path.join(targetDir, "rosewood.svg"), rosewood);
fs.writeFileSync(path.join(targetDir, "thuja-cypress.svg"), cypress);
fs.writeFileSync(path.join(targetDir, "peach-wood.svg"), peachWood);
fs.writeFileSync(path.join(targetDir, "natural-turquoise.svg"), turquoise);
fs.writeFileSync(path.join(targetDir, "lapis-lazuli.svg"), lapis);
fs.writeFileSync(path.join(targetDir, "red-agate.svg"), redAgate);
fs.writeFileSync(path.join(targetDir, "tigers-eye.svg"), tigersEye);
fs.writeFileSync(path.join(targetDir, "black-obsidian.svg"), obsidian);
fs.writeFileSync(path.join(targetDir, "amethyst.svg"), amethyst);
fs.writeFileSync(path.join(targetDir, "hetian-jade.svg"), jade);
fs.writeFileSync(path.join(targetDir, "silver-lotus.svg"), silverLotus);
fs.writeFileSync(path.join(targetDir, "pixiu-charm.svg"), pixiu);
fs.writeFileSync(path.join(targetDir, "om-mantra.svg"), omMantra);
fs.writeFileSync(path.join(targetDir, "brass-ring.svg"), brassRing);

console.log("All 17 bead SVGs rebuilt cleanly!");
