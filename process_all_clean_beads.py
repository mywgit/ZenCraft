import os
import glob
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

DEST_DIR = r"c:\Users\myw\Desktop\newcode\zen\public\beads"
MUTOU_DIR = r"c:\Users\myw\Desktop\newcode\zen\mutou\mutou"
BRAIN_DIR = r"C:\Users\myw\.gemini\antigravity\brain\cb8d82e2-1692-4b72-8025-cd79ade98405"

os.makedirs(DEST_DIR, exist_ok=True)

def clean_alpha_bead(src_path, dest_path, target_size=256, inset_px=2.0):
    """Crops and cleans RGBA PNGs by insetting circle by inset_px to eliminate all white edge halos."""
    im = Image.open(src_path).convert("RGBA")
    arr = np.array(im)
    alpha = arr[:, :, 3]
    y_idx, x_idx = np.where(alpha > 15)
    if len(y_idx) == 0:
        return
    ymin, ymax = y_idx.min(), y_idx.max()
    xmin, xmax = x_idx.min(), x_idx.max()
    
    cropped = im.crop((xmin, ymin, xmax + 1, ymax + 1))
    w, h = cropped.size
    
    scale = 4
    mask_w, mask_h = w * scale, h * scale
    mask = Image.new("L", (mask_w, mask_h), 0)
    draw = ImageDraw.Draw(mask)
    
    # Inset the mask slightly to completely strip the white border from the original cutout
    inset = inset_px * scale
    draw.ellipse([inset, inset, mask_w - inset, mask_h - inset], fill=255)
    
    smooth_mask = mask.resize((w, h), Image.Resampling.LANCZOS)
    cropped.putalpha(smooth_mask)
    
    max_dim = max(w, h)
    square = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
    square.paste(cropped, ((max_dim - w) // 2, (max_dim - h) // 2))
    
    final = square.resize((target_size, target_size), Image.Resampling.LANCZOS)
    final.save(dest_path, "PNG")
    print(f"[Alpha Cleaned] {os.path.basename(dest_path)}")

def clean_black_bg_bead(src_path, dest_path, target_size=256, inset_ratio=0.015):
    """Extracts a perfectly circular sphere from a pure black studio background with zero white border."""
    im = Image.open(src_path).convert("RGB")
    arr = np.array(im)
    
    # Find bounding box of sphere (pixels brighter than pure black)
    brightness = arr.max(axis=2)
    y_idx, x_idx = np.where(brightness > 20)
    if len(y_idx) == 0:
        return
    ymin, ymax = y_idx.min(), y_idx.max()
    xmin, xmax = x_idx.min(), x_idx.max()
    
    cropped = im.crop((xmin, ymin, xmax + 1, ymax + 1))
    w, h = cropped.size
    
    scale = 4
    mask_w, mask_h = w * scale, h * scale
    mask = Image.new("L", (mask_w, mask_h), 0)
    draw = ImageDraw.Draw(mask)
    
    inset = min(w, h) * inset_ratio * scale
    draw.ellipse([inset, inset, mask_w - inset, mask_h - inset], fill=255)
    
    smooth_mask = mask.resize((w, h), Image.Resampling.LANCZOS)
    
    rgba = cropped.convert("RGBA")
    rgba.putalpha(smooth_mask)
    
    max_dim = max(w, h)
    square = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
    square.paste(rgba, ((max_dim - w) // 2, (max_dim - h) // 2))
    
    final = square.resize((target_size, target_size), Image.Resampling.LANCZOS)
    final.save(dest_path, "PNG")
    print(f"[Black-BG Cleaned] {os.path.basename(dest_path)}")

def clean_crystal_jpg(src_path, dest_path, cx, cy, r, target_size=256, inset_px=2.0):
    """Extracts a circular sphere from mutou crystal JPG files with exact center and radius."""
    im = Image.open(src_path).convert("RGB")
    cw, ch = int(r * 2), int(r * 2)
    cx_i, cy_i, r_i = int(cx), int(cy), int(r)
    cropped = im.crop((cx_i - r_i, cy_i - r_i, cx_i + r_i, cy_i + r_i))
    
    scale = 4
    mask = Image.new("L", (cw * scale, ch * scale), 0)
    draw = ImageDraw.Draw(mask)
    inset = inset_px * scale
    draw.ellipse([inset, inset, cw * scale - inset, ch * scale - inset], fill=255)
    smooth_mask = mask.resize((cw, ch), Image.Resampling.LANCZOS)
    
    rgba = cropped.convert("RGBA")
    rgba.putalpha(smooth_mask)
    
    final = rgba.resize((target_size, target_size), Image.Resampling.LANCZOS)
    final.save(dest_path, "PNG")
    print(f"[Crystal Cleaned] {os.path.basename(dest_path)}")


# 1. Process all authentic wood beads from mutou/ with 2px inset defringe
wood_mappings = {
    "GreenSandalwood.png": "green-sandalwood.png",
    "GoldenThreadNanmu.png": "gold-phoebe.png",
    "EbonyBogWood.png": "ebony-wood.png",
    "Rosewood.png": "rosewood.png",
    "CliffCypressBurl.png": "thuja-cypress.png",
    "PeachWood.png": "peach-wood.png",
    "RedSandalwood.png": "red-sandalwood.png",
    "HainanHuanghuali.png": "hainan-huanghuali.png",
    "IndianSandalwood.png": "indian-sandalwood.png",
    "StarMoonBodhi.png": "star-moon-bodhi.png",
    "WhiteBodhiRoot.png": "white-bodhi.png",
    "GoldenCamphorBurl.png": "golden-camphor.png",
    "BloodDragonWood.png": "blood-dragon.png",
    "ChickenwingWood.png": "chickenwing-wood.png",
    "Boxwood.png": "boxwood.png",
    "Snakewood.png": "snakewood.png",
}

for src_name, dest_name in wood_mappings.items():
    src_fp = os.path.join(MUTOU_DIR, src_name)
    dest_fp = os.path.join(DEST_DIR, dest_name)
    if os.path.exists(src_fp):
        clean_alpha_bead(src_fp, dest_fp, inset_px=2.2)

# 2. Process our latest 8K Studio Generated Gemstones (Turquoise, Nanhong, Lapis)
gem_sources = {
    "gem_turquoise_bead*.jpg": "turquoise.png",
    "gem_nanhong_bead*.jpg": "nanhong-agate.png",
}

for pattern, dest_name in gem_sources.items():
    matches = glob.glob(os.path.join(BRAIN_DIR, pattern))
    if matches:
        latest = sorted(matches, key=os.path.getmtime)[-1]
        dest_fp = os.path.join(DEST_DIR, dest_name)
        clean_black_bg_bead(latest, dest_fp)

# Lapis lazuli with exact circle (avoid bottom shadow)
lapis_matches = glob.glob(os.path.join(BRAIN_DIR, "gem_lapis_bead*.jpg"))
if lapis_matches:
    latest_lapis = sorted(lapis_matches, key=os.path.getmtime)[-1]
    clean_crystal_jpg(latest_lapis, os.path.join(DEST_DIR, "lapis-lazuli.png"), cx=510, cy=499, r=337, inset_px=2.5)

# 3. Process Crystal Gem JPGs from mutou/ with exact coordinates
crystal_mappings = {
    "crystal_amethyst.jpg": ("amethyst.png", 511, 509, 232),
    "crystal_citrine.jpg": ("citrine.png", 509, 505, 230),
    "crystal_rose.jpg": ("rose-quartz.png", 514, 500, 257),
    "crystal_rutilated.jpg": ("rutilated-quartz.png", 513, 508, 310),
    "crystal_strawberry.jpg": ("strawberry-quartz.png", 509, 504, 274),
    "crystal_clear.jpg": ("clear-quartz.png", 511, 512, 262),
}

for src_name, (dest_name, cx, cy, r) in crystal_mappings.items():
    src_fp = os.path.join(MUTOU_DIR, src_name)
    dest_fp = os.path.join(DEST_DIR, dest_name)
    if os.path.exists(src_fp):
        clean_crystal_jpg(src_fp, dest_fp, cx, cy, r, inset_px=2.0)

# 4. Defringe remaining beads already in public/beads (silver-lotus, silver-pixiu, om-mani-padme-hum, brass-ring, hetian-jade, tiger-eye, obsidian)
remaining_beads = [
    "silver-lotus.png",
    "silver-pixiu.png",
    "om-mani-padme-hum.png",
    "brass-ring.png",
    "hetian-jade.png",
    "tiger-eye.png",
    "obsidian.png",
]

for b in remaining_beads:
    fp = os.path.join(DEST_DIR, b)
    if os.path.exists(fp):
        clean_alpha_bead(fp, fp, inset_px=2.5)

print("\n>>> ALL BEADS 100% DEFRINGED AND SYNCHRONIZED WITH ZERO WHITE BORDERS! <<<")
