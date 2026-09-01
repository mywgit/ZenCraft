import { BeadMaterial, getMaterialById } from "./materialsData";

// Image Cache for preloaded real photo textures
const imageCache: Record<string, HTMLImageElement> = {};

export function preloadBeadImages() {
  if (typeof window === "undefined") return;
  const imageSources: Record<string, string> = {
    "green-sandalwood": "/beads/green-sandalwood.jpg",
    "gold-phoebe": "/beads/gold-phoebe.jpg",
    "ebony-wood": "/beads/ebony-wood.jpg",
  };

  Object.entries(imageSources).forEach(([id, src]) => {
    if (!imageCache[id]) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache[id] = img;
      };
    }
  });
}

/**
 * Render an ultra-realistic 3D sphere bead with ZERO black border & authentic physical luster.
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
  ctx.shadowBlur = radius * 0.8;
  ctx.shadowOffsetX = Math.cos(angle + Math.PI / 4) * (radius * 0.3) + 2;
  ctx.shadowOffsetY = Math.sin(angle + Math.PI / 4) * (radius * 0.3) + 3.5;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(18, 12, 8, 0.3)";
  ctx.fill();
  ctx.restore();

  // 2. Selection Cinnabar / Amber Halo Ring
  if (isSelected) {
    ctx.save();
    ctx.strokeStyle = "#eab308";
    ctx.lineWidth = 3.5;
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
    ctx.stroke();

    // Outer subtle pulse ring
    ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, radius + 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 3. Precise Circular Sphere Clip
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.clip();

  // Check if we have a real high-res photograph texture loaded
  const cachedImg = imageCache[bead.materialId];
  if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
    // Zoom into the center 72% of the photo to completely eliminate any black background!
    const nw = cachedImg.naturalWidth;
    const nh = cachedImg.naturalHeight;
    const cropRatio = 0.72; // Zoom in to sphere core
    const sw = nw * cropRatio;
    const sh = nh * cropRatio;
    const sx = (nw - sw) / 2;
    const sy = (nh - sh) / 2;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(cachedImg, sx, sy, sw, sh, -radius, -radius, radius * 2, radius * 2);
    ctx.restore();

    // Apply Patina Color Grading Filter & 3D Lighting
    const sphereShade = ctx.createRadialGradient(
      x - radius * 0.38,
      y - radius * 0.38,
      radius * 0.05,
      x,
      y,
      radius
    );
    if (patinaLevel === 0) {
      sphereShade.addColorStop(0, "rgba(255, 255, 255, 0.2)");
      sphereShade.addColorStop(0.5, "rgba(0, 0, 0, 0)");
      sphereShade.addColorStop(1, "rgba(0, 0, 0, 0.6)");
    } else if (patinaLevel === 1) {
      sphereShade.addColorStop(0, "rgba(254, 240, 138, 0.25)");
      sphereShade.addColorStop(0.5, "rgba(0, 0, 0, 0)");
      sphereShade.addColorStop(1, "rgba(0, 0, 0, 0.7)");
    } else if (patinaLevel === 2) {
      // 5-year glass patina (深沉高亮)
      sphereShade.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      sphereShade.addColorStop(0.4, "rgba(0, 0, 0, 0.1)");
      sphereShade.addColorStop(1, "rgba(0, 0, 0, 0.8)");
    } else {
      // 10-year jade amber patina
      sphereShade.addColorStop(0, "rgba(254, 215, 170, 0.45)");
      sphereShade.addColorStop(0.4, "rgba(120, 53, 15, 0.2)");
      sphereShade.addColorStop(1, "rgba(15, 5, 0, 0.85)");
    }
    ctx.fillStyle = sphereShade;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  } else {
    // Render Ultra-Realistic Procedural Mineral/Timber Texture
    renderProceduralBead(ctx, mat, x, y, radius, patinaLevel, angle);
  }

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
  const highlightAlpha = patinaLevel >= 2 ? 0.8 : patinaLevel === 1 ? 0.6 : 0.4;

  // Primary Softbox Curved Highlight
  const primGrad = ctx.createRadialGradient(
    x - radius * 0.38,
    y - radius * 0.38,
    0,
    x - radius * 0.38,
    y - radius * 0.38,
    radius * 0.45
  );
  primGrad.addColorStop(0, `rgba(255, 255, 255, ${highlightAlpha})`);
  primGrad.addColorStop(0.35, `rgba(255, 255, 255, ${highlightAlpha * 0.4})`);
  primGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = primGrad;
  ctx.beginPath();
  ctx.arc(x - radius * 0.38, y - radius * 0.38, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // Secondary Bottom-Right Amber Ambient Bounce Light (托盘环境反光)
  const bounceGrad = ctx.createRadialGradient(
    x + radius * 0.45,
    y + radius * 0.45,
    0,
    x + radius * 0.45,
    y + radius * 0.45,
    radius * 0.45
  );
  bounceGrad.addColorStop(0, "rgba(254, 240, 138, 0.3)");
  bounceGrad.addColorStop(0.6, "rgba(254, 240, 138, 0.1)");
  bounceGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = bounceGrad;
  ctx.beginPath();
  ctx.arc(x + radius * 0.45, y + radius * 0.45, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  ctx.restore();
}

/**
 * Procedurally render authentic micro-textures (Turquoise spiderweb, Lapis pyrite flecks, Thuja bird-eyes, etc.)
 */
function renderProceduralBead(
  ctx: CanvasRenderingContext2D,
  mat: BeadMaterial,
  x: number,
  y: number,
  radius: number,
  patinaLevel: number,
  angle: number
) {
  // Base Color Selection based on Patina
  let baseColor = mat.colors.base;
  if (patinaLevel === 1) baseColor = mat.colors.patina1y;
  else if (patinaLevel === 2) baseColor = mat.colors.patina5y;
  else if (patinaLevel === 3) baseColor = mat.colors.patina10y;

  // 1. Base 3D Sphere Radial Gradient
  const grad = ctx.createRadialGradient(
    x - radius * 0.35,
    y - radius * 0.35,
    radius * 0.05,
    x,
    y,
    radius
  );
  grad.addColorStop(0, mat.colors.highlight);
  grad.addColorStop(0.35, baseColor);
  grad.addColorStop(0.8, mat.colors.shadow);
  grad.addColorStop(1, "#09090b");
  ctx.fillStyle = grad;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);

  // 2. Specific Micro-Textures by Material Type

  // --- A. Natural Turquoise: High Porcelain with Golden/Brown Spiderweb Veins (绿松石铁线) ---
  if (mat.id === "natural-turquoise") {
    ctx.save();
    ctx.strokeStyle = "rgba(68, 36, 17, 0.85)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x - radius * 0.7, y - radius * 0.3);
    ctx.lineTo(x - radius * 0.2, y + radius * 0.1);
    ctx.lineTo(x + radius * 0.5, y - radius * 0.2);
    ctx.lineTo(x + radius * 0.7, y + radius * 0.4);
    ctx.moveTo(x - radius * 0.2, y + radius * 0.1);
    ctx.lineTo(x + radius * 0.1, y + radius * 0.6);
    ctx.stroke();

    // Fine spiderweb branches
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = "rgba(41, 20, 8, 0.7)";
    ctx.beginPath();
    ctx.moveTo(x + radius * 0.1, y - radius * 0.5);
    ctx.lineTo(x + radius * 0.3, y - radius * 0.2);
    ctx.lineTo(x - radius * 0.5, y + radius * 0.4);
    ctx.stroke();
    ctx.restore();
  }

  // --- B. Lapis Lazuli: Ultramarine Blue with Sparkling Pyrite Gold Flecks (青金石天然金星) ---
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
      ctx.arc(px, py, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(253, 224, 71, 0.6)";
      ctx.beginPath();
      ctx.arc(px, py, 2.4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  // --- C. Red Agate: Translucent Persimmon Jelly & Concentric Flame (保山南红玛瑙胶质感) ---
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

  // --- D. Tiger's Eye: Dynamic Chatoyant Silk Cat-Eye Light Band (虎眼石猫眼光带) ---
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

  // --- E. Thuja Cypress: Swirling Tiger Flames & Bird-Eye Dots (太行崖柏雀眼舍利料) ---
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

  // --- F. Red Rosewood & Peach Wood: Oily Timber Grains & End-Grain Rays (大红酸枝与桃木) ---
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

  // --- G. Silver Lotus Guru / Pixiu / Spacers: 3D Embossed Metallic Carvings (纯银与藏银浮雕) ---
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
