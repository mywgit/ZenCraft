import os
import numpy as np
from PIL import Image, ImageDraw

DEST_DIR = r"c:\Users\myw\Desktop\newcode\zen\public\beads"
MUTOU_DIR = r"c:\Users\myw\Desktop\newcode\zen\mutou\mutou"

wood_mappings = {
    "green-sandalwood.png": ("GreenSandalwood.png", (60, 80, 45)),
    "gold-phoebe.png": ("GoldenThreadNanmu.png", (160, 120, 40)),
    "ebony-wood.png": ("EbonyBogWood.png", (30, 30, 30)),
    "rosewood.png": ("Rosewood.png", (90, 30, 35)),
    "thuja-cypress.png": ("CliffCypressBurl.png", (140, 60, 35)),
    "peach-wood.png": ("PeachWood.png", (180, 140, 110)),
    "red-sandalwood.png": ("RedSandalwood.png", (80, 25, 30)),
    "hainan-huanghuali.png": ("HainanHuanghuali.png", (130, 65, 35)),
    "indian-sandalwood.png": ("IndianSandalwood.png", (170, 130, 85)),
    "star-moon-bodhi.png": ("StarMoonBodhi.png", (190, 180, 160)),
    "white-bodhi.png": ("WhiteBodhiRoot.png", (210, 200, 190)),
    "golden-camphor.png": ("GoldenCamphorBurl.png", (160, 110, 40)),
    "blood-dragon.png": ("BloodDragonWood.png", (150, 40, 40)),
    "chickenwing-wood.png": ("ChickenwingWood.png", (90, 65, 55)),
    "boxwood.png": ("Boxwood.png", (185, 150, 80)),
    "snakewood.png": ("Snakewood.png", (110, 50, 30)),
}

for dest_name, (src_name, edge_tone) in wood_mappings.items():
    src_fp = os.path.join(MUTOU_DIR, src_name)
    dest_fp = os.path.join(DEST_DIR, dest_name)
    if not os.path.exists(src_fp):
        continue
    
    im = Image.open(src_fp).convert("RGBA")
    arr = np.array(im)
    alpha = arr[:, :, 3]
    y_idx, x_idx = np.where(alpha > 20)
    if len(y_idx) == 0:
        continue
    ymin, ymax = y_idx.min(), y_idx.max()
    xmin, xmax = x_idx.min(), x_idx.max()
    
    cropped = im.crop((xmin, ymin, xmax + 1, ymax + 1))
    w, h = cropped.size
    
    # Inset by 2.8px to strictly eliminate the white rim from the source graphic
    inset_px = 2.8
    scale = 4
    mask_w, mask_h = w * scale, h * scale
    mask = Image.new("L", (mask_w, mask_h), 0)
    draw = ImageDraw.Draw(mask)
    inset = inset_px * scale
    draw.ellipse([inset, inset, mask_w - inset, mask_h - inset], fill=255)
    smooth_mask = mask.resize((w, h), Image.Resampling.LANCZOS)
    
    # Color-defringe the border
    crop_arr = np.array(cropped).astype(np.float32)
    
    # Edge darkening to perfectly blend into dark background with 0% white halo
    center_x, center_y = w / 2.0, h / 2.0
    y_grid, x_grid = np.ogrid[:h, :w]
    dist = np.sqrt((x_grid - center_x)**2 + (y_grid - center_y)**2)
    max_r = min(w, h) / 2.0 - inset_px
    rim_zone = np.clip((dist - (max_r - 2.5)) / 2.5, 0, 1.0)[:, :, np.newaxis]
    
    for c in range(3):
        crop_arr[:, :, c] = crop_arr[:, :, c] * (1.0 - rim_zone[:, :, 0] * 0.4) + edge_tone[c] * (rim_zone[:, :, 0] * 0.4)
        
    rgba = Image.fromarray(crop_arr.astype(np.uint8)).convert("RGBA")
    rgba.putalpha(smooth_mask)
    
    max_dim = max(w, h)
    square = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
    square.paste(rgba, ((max_dim - w) // 2, (max_dim - h) // 2))
    
    final = square.resize((256, 256), Image.Resampling.LANCZOS)
    final.save(dest_fp, "PNG")
    print(f"[Perfect Wood Bead] {dest_name}")

print("All wood beads updated with 0% white edge on dark background!")
