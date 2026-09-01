import { BeadMaterial, getMaterialById } from "./materialsData";

/**
 * Render a 100% consistent, hyper-realistic 3D sphere bead with instant zero-delay loading,
 * authentic wood grain textures, mineral veins, and living patina luster.
 */
export function drawRealisticBead(
  ctx: CanvasRenderingContext2D,
  bead: { materialId: string; sizeMm: number },
  x: number,
  y: number,
  radius: number,
  patinaLevel: number = 1,
  angle: number = 0,
  isSelected: boolean = false
) {
  const mat = getMaterialById(bead.materialId);
  if (!mat) return;

  ctx.save();

  // 1. Draw Bead Deep Ambient Drop Shadow (Realistic contact shadow on silk tray)
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
  ctx.shadowBlur = radius * 0.75;
  ctx.shadowOffsetX = Math.cos(angle + Math.PI / 4) * (radius * 0.25) + 2;
  ctx.shadowOffsetY = Math.sin(angle + Math.PI / 4) * (radius * 0.25) + 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(18, 12, 8, 0.25)";
  ctx.fill();
  ctx.restore();

  // 2. Selection Golden / Amber Halo Glow
  if (isSelected) {
    ctx.save();
    ctx.strokeStyle = "#eab308";
    ctx.lineWidth = 3.5;
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(x, y, radius + 4.5, 0, Math.PI * 2);
    ctx.stroke();

    // Outer subtle pulse ring
    ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, radius + 7.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 3. Precise Circular Sphere Clip
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.clip();

  // Render Master-Crafted Procedural 3D Texture (100% stable, zero texture pop-in)
  renderMasterProceduralBead(ctx, mat, x, y, radius, patinaLevel, angle);

  ctx.restore(); // End clipping

  // 4. Central Bead Thread Hole & Bevel (打孔孔道与边缘倒角)
  ctx.save();
  const holeSize = Math.max(1.8, radius * 0.11);
  const holeGrad = ctx.createRadialGradient(x, y - radius * 0.82, 0, x, y - radius * 0.82, holeSize * 1.6);
  holeGrad.addColorStop(0, "#000000");
  holeGrad.addColorStop(0.7, "#1c1917");
  holeGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = holeGrad;
  ctx.beginPath();
  ctx.ellipse(x, y - radius * 0.82, holeSize * 1.3, holeSize * 0.65, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 5. Multi-layered Specular Highlights & Living Patina Gloss (水磨高光与包浆镜面反射)
  ctx.save();
  const highlightAlpha = patinaLevel >= 2 ? 0.75 : patinaLevel === 1 ? 0.55 : 0.35;

  // Primary Softbox Curved Highlight
  const primGrad = ctx.createRadialGradient(
    x - radius * 0.36,
    y - radius * 0.36,
    0,
    x - radius * 0.36,
    y - radius * 0.36,
    radius * 0.45
  );
  primGrad.addColorStop(0, `rgba(255, 255, 255, ${highlightAlpha})`);
  primGrad.addColorStop(0.35, `rgba(255, 255, 255, ${highlightAlpha * 0.35})`);
  primGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = primGrad;
  ctx.beginPath();
  ctx.arc(x - radius * 0.36, y - radius * 0.36, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // Secondary Bottom-Right Ambient Bounce Light (托盘丝绸环境反光)
  const bounceGrad = ctx.createRadialGradient(
    x + radius * 0.45,
    y + radius * 0.45,
    0,
    x + radius * 0.45,
    y + radius * 0.45,
    radius * 0.45
  );
  bounceGrad.addColorStop(0, "rgba(254, 240, 138, 0.25)");
  bounceGrad.addColorStop(0.6, "rgba(254, 240, 138, 0.08)");
  bounceGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = bounceGrad;
  ctx.beginPath();
  ctx.arc(x + radius * 0.45, y + radius * 0.45, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  ctx.restore();
}

/**
 * Master-crafted procedural 3D shader for authentic woods, crystals, and silver charms.
 */
function renderMasterProceduralBead(
  ctx: CanvasRenderingContext2D,
  mat: BeadMaterial,
  x: number,
  y: number,
  radius: number,
  patinaLevel: number,
  angle: number
) {
  // 1. Dynamic Patina Base Color Selection
  let baseColor = mat.colors.base;
  let highlightColor = mat.colors.highlight;
  let shadowColor = mat.colors.shadow;

  if (patinaLevel === 1) {
    baseColor = mat.colors.patina1y;
  } else if (patinaLevel === 2) {
    baseColor = mat.colors.patina5y;
  } else if (patinaLevel === 3) {
    baseColor = mat.colors.patina10y;
  }

  // 2. Base 3D Sphere Radial Shading
  const grad = ctx.createRadialGradient(
    x - radius * 0.35,
    y - radius * 0.35,
    radius * 0.05,
    x,
    y,
    radius
  );
  grad.addColorStop(0, highlightColor);
  grad.addColorStop(0.35, baseColor);
  grad.addColorStop(0.8, shadowColor);
  grad.addColorStop(1, "#09090b");
  ctx.fillStyle = grad;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);

  // 3. Unique Authentic Material Textures

  // --- A. Green Sandalwood (天然野生绿檀): Organic Jade-Green Wood Grain & Growth Rings ---
  if (mat.id === "green-sandalwood") {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + 0.3);

    // Multi-layer growth rings & organic pores
    ctx.strokeStyle = "rgba(40, 54, 24, 0.45)";
    ctx.lineWidth = 1.3;
    for (let r = radius * 0.2; r < radius * 1.2; r += radius * 0.22) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Subtle golden wood grain fibers
    ctx.strokeStyle = "rgba(169, 179, 136, 0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-radius * 0.8, -radius * 0.3);
    ctx.bezierCurveTo(-radius * 0.2, radius * 0.4, radius * 0.2, -radius * 0.4, radius * 0.8, radius * 0.2);
    ctx.stroke();
    ctx.restore();
  }

  // --- B. Gold Phoebe (百年金丝楠): Dynamic 3D Shimmering Golden Water Waves (水波纹) ---
  else if (mat.id === "gold-phoebe") {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Glowing golden wave ripples (流动水波纹)
    const waveCount = 5;
    for (let i = 0; i < waveCount; i++) {
      const offset = (i - 2) * (radius * 0.35);
      const waveGrad = ctx.createLinearGradient(-radius, offset, radius, offset);
      waveGrad.addColorStop(0, "rgba(253, 224, 71, 0.1)");
      waveGrad.addColorStop(0.5, "rgba(254, 240, 138, 0.55)");
      waveGrad.addColorStop(1, "rgba(253, 224, 71, 0.1)");

      ctx.strokeStyle = waveGrad;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-radius * 0.85, offset - 3);
      ctx.bezierCurveTo(-radius * 0.3, offset + 6, radius * 0.3, offset - 6, radius * 0.85, offset + 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // --- C. Dense Black Ebony (高密黑檀): Piano Lacquer Reflection & Dark Chocolate Fibers ---
  else if (mat.id === "ebony-wood") {
    ctx.save();
    ctx.strokeStyle = "rgba(41, 37, 36, 0.5)";
    ctx.lineWidth = 1.2;
    for (let i = -radius * 0.6; i <= radius * 0.6; i += radius * 0.3) {
      ctx.beginPath();
      ctx.moveTo(x - radius, y + i);
      ctx.lineTo(x + radius, y + i + 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // --- D. Natural Turquoise (天然原矿绿松石): High Porcelain Glaze with Golden-Brown Spiderweb Veins (铁线) ---
  else if (mat.id === "natural-turquoise") {
    ctx.save();
    ctx.strokeStyle = "rgba(58, 30, 15, 0.85)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x - radius * 0.7, y - radius * 0.3);
    ctx.lineTo(x - radius * 0.2, y + radius * 0.1);
    ctx.lineTo(x + radius * 0.5, y - radius * 0.2);
    ctx.lineTo(x + radius * 0.7, y + radius * 0.4);
    ctx.moveTo(x - radius * 0.2, y + radius * 0.1);
    ctx.lineTo(x + radius * 0.1, y + radius * 0.6);
    ctx.stroke();

    // Secondary fine spiderweb veins
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = "rgba(41, 20, 8, 0.7)";
    ctx.beginPath();
    ctx.moveTo(x + radius * 0.1, y - radius * 0.5);
    ctx.lineTo(x + radius * 0.3, y - radius * 0.2);
    ctx.lineTo(x - radius * 0.5, y + radius * 0.4);
    ctx.stroke();
    ctx.restore();
  }

  // --- E. Lapis Lazuli (帝王青金石): Ultramarine Blue with Natural Pyrite Gold Stars (金星) ---
  else if (mat.id === "lapis-lazuli") {
    ctx.save();
    const goldPoints = [
      [-0.4, -0.2], [-0.1, -0.5], [0.3, -0.3], [0.5, 0.2],
      [-0.3, 0.4], [0.1, 0.3], [-0.5, 0.1], [0.2, -0.6], [0.4, 0.5]
    ];
    goldPoints.forEach(([dx, dy]) => {
      const px = x + dx * radius;
      const py = y + dy * radius;
      ctx.fillStyle = "#fef08a";
      ctx.beginPath();
      ctx.arc(px, py, 1.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(253, 224, 71, 0.55)";
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  // --- F. Red Agate (保山南红玛瑙): Translucent Persimmon Jelly Core (胶质感) ---
  else if (mat.id === "red-agate") {
    ctx.save();
    const flameGrad = ctx.createRadialGradient(x + radius * 0.1, y + radius * 0.1, 0, x, y, radius * 0.85);
    flameGrad.addColorStop(0, "rgba(254, 202, 202, 0.7)");
    flameGrad.addColorStop(0.4, "rgba(239, 68, 68, 0.5)");
    flameGrad.addColorStop(0.8, "rgba(185, 28, 28, 0.8)");
    flameGrad.addColorStop(1, "rgba(127, 29, 29, 0)");
    ctx.fillStyle = flameGrad;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
  }

  // --- G. Tiger's Eye (天然金虎眼石): Dynamic Silk Chatoyant Light Band (猫眼光带) ---
  else if (mat.id === "tigers-eye") {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    const bandGrad = ctx.createLinearGradient(-radius, 0, radius, 0);
    bandGrad.addColorStop(0, "rgba(113, 63, 18, 0.8)");
    bandGrad.addColorStop(0.4, "rgba(202, 138, 4, 0.95)");
    bandGrad.addColorStop(0.5, "rgba(254, 240, 138, 1)");
    bandGrad.addColorStop(0.6, "rgba(202, 138, 4, 0.95)");
    bandGrad.addColorStop(1, "rgba(66, 32, 6, 0.8)");
    ctx.fillStyle = bandGrad;
    ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
    ctx.restore();
  }

  // --- H. Thuja Cypress (太行崖柏): Bird-Eye Flame Knots & Swirling Grain (雀眼舍利料) ---
  else if (mat.id === "thuja-cypress") {
    ctx.save();
    ctx.strokeStyle = "rgba(124, 45, 18, 0.8)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.5, 0, Math.PI * 1.5);
    ctx.stroke();

    const birdEyes = [[-0.3, -0.2], [0.2, -0.4], [0.3, 0.3], [-0.2, 0.4]];
    birdEyes.forEach(([dx, dy]) => {
      const px = x + dx * radius;
      const py = y + dy * radius;
      ctx.fillStyle = "#451a03";
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#9a3412";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(px, py, 4.8, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.restore();
  }

  // --- I. Red Rosewood & Peach Wood: Oily Timber Grains & End-Grain Rays (大红酸枝与桃木) ---
  else if (mat.id === "rosewood" || mat.id === "peach-wood") {
    ctx.save();
    ctx.strokeStyle = mat.id === "rosewood" ? "rgba(80, 7, 36, 0.85)" : "rgba(146, 64, 14, 0.7)";
    ctx.lineWidth = 1.6;
    for (let i = -radius * 0.7; i <= radius * 0.7; i += radius * 0.3) {
      ctx.beginPath();
      ctx.moveTo(x - radius, y + i);
      ctx.bezierCurveTo(x - radius * 0.3, y + i + 4, x + radius * 0.3, y + i - 4, x + radius, y + i + 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // --- J. Silver Lotus Guru / Pixiu / Spacers: 3D Embossed Metallic Carvings (纯银与藏银浮雕) ---
  else if (mat.category === "spacer") {
    ctx.save();
    ctx.strokeStyle = "rgba(71, 85, 105, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.55, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${Math.round(radius * 0.65)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const symbol = mat.id === "silver-lotus" ? "🌸" : mat.id === "pixiu-charm" ? "🦁" : "ॐ";
    ctx.fillText(symbol, x, y);
    ctx.restore();
  }
}
