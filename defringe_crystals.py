import os
import numpy as np
from PIL import Image, ImageDraw

DEST_DIR = r"c:\Users\myw\Desktop\newcode\zen\public\beads"
MUTOU_DIR = r"c:\Users\myw\Desktop\newcode\zen\mutou\mutou"

crystals = {
    "amethyst.png": ("crystal_amethyst.jpg", (95, 30, 130)), # Deep purple
    "citrine.png": ("crystal_citrine.jpg", (200, 140, 40)),   # Warm golden yellow
    "rose-quartz.png": ("crystal_rose.jpg", (210, 120, 140)), # Rose pink
    "rutilated-quartz.png": ("crystal_rutilated.jpg", (180, 140, 70)), # Golden rutilated
    "strawberry-quartz.png": ("crystal_strawberry.jpg", (190, 70, 90)), # Strawberry red
    "clear-quartz.png": ("crystal_clear.jpg", (140, 170, 190)), # Subtle ice blue-white
}

for dest_name, (src_name, tint_color) in crystals.items():
    src_fp = os.path.join(MUTOU_DIR, src_name)
    dest_fp = os.path.join(DEST_DIR, dest_name)
    if not os.path.exists(src_fp):
        continue
    
    im = Image.open(src_fp).convert("RGB")
    w, h = im.size
    cx, cy = w // 2, h // 2
    
    # Inset slightly to only capture the rich inner sphere without the bright background rim
    r = int(min(w, h) * 0.355)
    
    cropped = im.crop((cx - r, cy - r, cx + r, cy + r))
    cw, ch = cropped.size
    
    # Create smooth 4x antialiased mask
    scale = 4
    mask = Image.new("L", (cw * scale, ch * scale), 0)
    draw = ImageDraw.Draw(mask)
    inset = 2.5 * scale
    draw.ellipse([inset, inset, cw * scale - inset, ch * scale - inset], fill=255)
    smooth_mask = mask.resize((cw, ch), Image.Resampling.LANCZOS)
    
    # Defringe: any pixels that are bright white background, replace with dark/tinted edge
    arr = np.array(cropped).astype(np.float32)
    brightness = arr.mean(axis=2)
    
    # Where background was white (> 210), blend with crystal color
    white_mask = np.clip((brightness - 190) / 40.0, 0, 1.0)[:, :, np.newaxis]
    for c in range(3):
        arr[:, :, c] = arr[:, :, c] * (1.0 - white_mask[:, :, 0]) + tint_color[c] * white_mask[:, :, 0]
        
    rgba = Image.fromarray(arr.astype(np.uint8)).convert("RGBA")
    rgba.putalpha(smooth_mask)
    
    final = rgba.resize((256, 256), Image.Resampling.LANCZOS)
    final.save(dest_fp, "PNG")
    print(f"[Defringed Crystal] {dest_name}")

print("All crystals defringed with 0% white border!")
