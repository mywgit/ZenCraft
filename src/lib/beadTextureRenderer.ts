import { BeadMaterial, getMaterialById } from "./materialsData";

// In-memory image cache for instantaneous, synchronous drawing
const beadImageCache: Record<string, HTMLImageElement> = {};

if (typeof window !== "undefined") {
  // Eagerly preload all 30 bead assets
  const beadAssetMap: Record<string, string> = {
    "green-sandalwood": "/beads/green-sandalwood.png",
    "gold-phoebe": "/beads/gold-phoebe.png",
    "ebony-wood": "/beads/ebony-wood.png",
    "rosewood": "/beads/rosewood.png",
    "thuja-cypress": "/beads/thuja-cypress.png",
    "peach-wood": "/beads/peach-wood.png",
    "red-sandalwood": "/beads/red-sandalwood.png",
    "hainan-huanghuali": "/beads/hainan-huanghuali.png",
    "indian-sandalwood": "/beads/indian-sandalwood.png",
    "star-moon-bodhi": "/beads/star-moon-bodhi.png",
    "white-bodhi": "/beads/white-bodhi.png",
    "golden-camphor": "/beads/golden-camphor.png",
    "blood-dragon": "/beads/blood-dragon.png",
    "boxwood": "/beads/boxwood.png",
    "natural-turquoise": "/beads/turquoise.png",
    "lapis-lazuli": "/beads/lapis-lazuli.png",
    "red-agate": "/beads/nanhong-agate.png",
    "amethyst": "/beads/amethyst.png",
    "citrine": "/beads/citrine.png",
    "rose-quartz": "/beads/rose-quartz.png",
    "rutilated-quartz": "/beads/rutilated-quartz.png",
    "strawberry-quartz": "/beads/strawberry-quartz.png",
    "clear-quartz": "/beads/clear-quartz.png",
    "hetian-jade": "/beads/hetian-jade.png",
    "tigers-eye": "/beads/tigers-eye.png",
    "black-obsidian": "/beads/black-obsidian.png",
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
 * Render a 100% photorealistic 3D bead with dynamic 3D depth, specular sheen & contact shadows
 */
export function drawRealisticBead(
  ctx: CanvasRenderingContext2D,
  bead: { materialId: string; sizeMm: number },
  x: number,
  y: number,
  radius: number,
  patinaLevel: number = 1,
  depthScale: number = 1.0,
  isSelected: boolean = false,
  lightAngle: number = -Math.PI / 4 // Top-left studio keylight
) {
  const mat = getMaterialById(bead.materialId);
  if (!mat) return;

  ctx.save();

  // 1. Soft Ambient Drop Shadow onto Silk Tray / Velvet
  const shadowDistance = radius * 0.35 * depthScale;
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
  ctx.shadowBlur = radius * 0.9 * depthScale;
  ctx.shadowOffsetX = Math.cos(Math.PI / 3) * shadowDistance;
  ctx.shadowOffsetY = Math.sin(Math.PI / 3) * shadowDistance + 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(10, 6, 4, 0.35)";
  ctx.fill();
  ctx.restore();

  // 2. Selection Glow Halo
  if (isSelected) {
    ctx.save();
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3.5;
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(245, 158, 11, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, radius + 7.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 3. Render High-Definition Bead Texture Asset
  const cachedImg = beadImageCache[bead.materialId];

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.clip();

  if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
    ctx.drawImage(cachedImg, x - radius, y - radius, radius * 2, radius * 2);
  } else {
    renderFallbackSphere(ctx, mat, x, y, radius);
  }

  // 4. 3D Spherical Shading & Rim Darkening (立体球体光影重塑)
  const sphereShade = ctx.createRadialGradient(
    x + Math.cos(lightAngle) * radius * 0.35,
    y + Math.sin(lightAngle) * radius * 0.35,
    radius * 0.1,
    x,
    y,
    radius
  );
  sphereShade.addColorStop(0, "rgba(255, 255, 255, 0.15)");
  sphereShade.addColorStop(0.5, "rgba(0, 0, 0, 0)");
  sphereShade.addColorStop(0.85, "rgba(15, 8, 4, 0.35)");
  sphereShade.addColorStop(1, "rgba(0, 0, 0, 0.65)");
  ctx.fillStyle = sphereShade;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);

  // 5. Living Patina Glass Glaze Overlay (包浆温润蜕变)
  if (patinaLevel > 0) {
    const patinaAlpha = patinaLevel === 1 ? 0.14 : patinaLevel === 2 ? 0.28 : 0.42;
    const patinaGrad = ctx.createRadialGradient(
      x - radius * 0.25,
      y - radius * 0.25,
      0,
      x,
      y,
      radius
    );
    patinaGrad.addColorStop(0, `rgba(245, 158, 11, ${patinaAlpha * 0.6})`);
    patinaGrad.addColorStop(0.65, `rgba(120, 53, 15, ${patinaAlpha})`);
    patinaGrad.addColorStop(1, `rgba(50, 18, 4, ${patinaAlpha * 1.6})`);
    ctx.fillStyle = patinaGrad;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  ctx.restore(); // End clipping

  // 6. 3D Specular Keylight Reflection & Mineral Flare (珠宝级镜面水磨反光)
  ctx.save();
  const highlightIntensity = (patinaLevel >= 2 ? 0.85 : patinaLevel === 1 ? 0.65 : 0.45) * depthScale;
  const lx = x + Math.cos(lightAngle) * radius * 0.38;
  const ly = y + Math.sin(lightAngle) * radius * 0.38;
  const primGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, radius * 0.45);
  primGrad.addColorStop(0, `rgba(255, 255, 255, ${highlightIntensity})`);
  primGrad.addColorStop(0.3, `rgba(255, 255, 255, ${highlightIntensity * 0.4})`);
  primGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = primGrad;
  ctx.beginPath();
  ctx.arc(lx, ly, radius * 0.45, 0, Math.PI * 2);
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
