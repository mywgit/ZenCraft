import { BeadMaterial, getMaterialById } from "./materialsData";

// In-memory image cache for instantaneous, synchronous drawing
const beadImageCache: Record<string, HTMLImageElement> = {};

if (typeof window !== "undefined") {
  // Eagerly preload all bead assets
  const beadAssetMap: Record<string, string> = {
    "green-sandalwood": "/beads/green-sandalwood.png",
    "gold-phoebe": "/beads/gold-phoebe.png",
    "ebony-wood": "/beads/ebony-wood.png",
    "rosewood": "/beads/rosewood.png",
    "thuja-cypress": "/beads/thuja-cypress.png",
    "peach-wood": "/beads/peach-wood.png",
    "natural-turquoise": "/beads/natural-turquoise.png",
    "lapis-lazuli": "/beads/lapis-lazuli.png",
    "red-agate": "/beads/red-agate.png",
    "tigers-eye": "/beads/tigers-eye.png",
    "black-obsidian": "/beads/black-obsidian.png",
    "amethyst": "/beads/amethyst.png",
    "hetian-jade": "/beads/hetian-jade.png",
    "silver-lotus": "/beads/silver-lotus.png",
    "pixiu-charm": "/beads/pixiu-charm.png",
    "om-mantra": "/beads/om-mantra.png",
    "brass-ring": "/beads/brass-ring.png",
  };

  Object.entries(beadAssetMap).forEach(([id, src]) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      beadImageCache[id] = img;
    };
    if (img.complete) {
      beadImageCache[id] = img;
    }
  });
}

/**
 * Render a 100% photorealistic 3D bead directly on canvas using high-definition texture assets
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

  // 1. Ambient Drop Shadow on Silk Tray
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = radius * 0.8;
  ctx.shadowOffsetX = Math.cos(angle + Math.PI / 4) * (radius * 0.25) + 2;
  ctx.shadowOffsetY = Math.sin(angle + Math.PI / 4) * (radius * 0.25) + 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(18, 12, 8, 0.4)";
  ctx.fill();
  ctx.restore();

  // 2. Selection Halo Glow
  if (isSelected) {
    ctx.save();
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3.5;
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(x, y, radius + 4.5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, radius + 7.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 3. Render High-Definition Real Bead Texture
  const cachedImg = beadImageCache[bead.materialId];

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.clip();

  if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
    // Draw the actual macro photo / SVG texture directly
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(cachedImg, -radius, -radius, radius * 2, radius * 2);
    ctx.restore();
  } else {
    // Fallback 3D sphere shader while image binds
    renderFallbackSphere(ctx, mat, x, y, radius);
  }

  // 4. Living Patina Glass Glaze Overlay (包浆透亮保护层)
  if (patinaLevel > 0) {
    ctx.save();
    const patinaAlpha = patinaLevel === 1 ? 0.12 : patinaLevel === 2 ? 0.25 : 0.38;
    const patinaGrad = ctx.createRadialGradient(
      x - radius * 0.2,
      y - radius * 0.2,
      0,
      x,
      y,
      radius
    );
    patinaGrad.addColorStop(0, `rgba(245, 158, 11, ${patinaAlpha * 0.5})`);
    patinaGrad.addColorStop(0.7, `rgba(120, 53, 15, ${patinaAlpha})`);
    patinaGrad.addColorStop(1, `rgba(69, 26, 3, ${patinaAlpha * 1.5})`);
    ctx.fillStyle = patinaGrad;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
  }

  ctx.restore(); // End clipping

  // 5. Specular Highlights & Mirror Flare (水磨高光与镜面反射)
  ctx.save();
  const highlightAlpha = patinaLevel >= 2 ? 0.8 : patinaLevel === 1 ? 0.6 : 0.4;
  const primGrad = ctx.createRadialGradient(
    x - radius * 0.35,
    y - radius * 0.35,
    0,
    x - radius * 0.35,
    y - radius * 0.35,
    radius * 0.45
  );
  primGrad.addColorStop(0, `rgba(255, 255, 255, ${highlightAlpha})`);
  primGrad.addColorStop(0.35, `rgba(255, 255, 255, ${highlightAlpha * 0.35})`);
  primGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = primGrad;
  ctx.beginPath();
  ctx.arc(x - radius * 0.35, y - radius * 0.35, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

function renderFallbackSphere(
  ctx: CanvasRenderingContext2D,
  mat: BeadMaterial,
  x: number,
  y: number,
  radius: number
) {
  const grad = ctx.createRadialGradient(
    x - radius * 0.35,
    y - radius * 0.35,
    radius * 0.05,
    x,
    y,
    radius
  );
  grad.addColorStop(0, mat.colors.highlight);
  grad.addColorStop(0.35, mat.colors.base);
  grad.addColorStop(0.8, mat.colors.shadow);
  grad.addColorStop(1, "#09090b");
  ctx.fillStyle = grad;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}
