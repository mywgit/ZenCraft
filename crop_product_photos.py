from PIL import Image
import os

base_upload = r"C:/Users/myw/.gemini/antigravity/brain/cb8d82e2-1692-4b72-8025-cd79ade98405/.user_uploaded"
out_dir = r"c:/Users/myw/Desktop/newcode/zen/public/products"
hero_dir = r"c:/Users/myw/Desktop/newcode/zen/public/hero"
os.makedirs(out_dir, exist_ok=True)
os.makedirs(hero_dir, exist_ok=True)

# 1. From media_1788268672437.jpg (473 x 1024)
# Hero banner photo of the amber/red bracelet on mossy stone
im_home = Image.open(os.path.join(base_upload, "media_1788268672437.jpg")).convert("RGB")
hero_crop = im_home.crop((20, 190, 453, 375))
hero_crop.save(os.path.join(hero_dir, "hero-zen-tray.jpg"), quality=95)

# 镇店之宝:
# Card 1: 爆满金星紫檀
crop_zitan_top = im_home.crop((40, 615, 175, 735))
crop_zitan_top.save(os.path.join(out_dir, "master-zitan.jpg"), quality=95)

# Card 2: 极品保山南红
crop_nanhong_top = im_home.crop((190, 615, 325, 735))
crop_nanhong_top.save(os.path.join(out_dir, "master-nanhong.jpg"), quality=95)

# Card 3: 老料沉水沉香
crop_chenxiang_top = im_home.crop((340, 615, 465, 735))
crop_chenxiang_top.save(os.path.join(out_dir, "master-chenxiang.jpg"), quality=95)

# 2. From media_1788271742596.png (687 x 855)
# 4 big curated collector cards:
im_gallery = Image.open(os.path.join(base_upload, "media_1788271742596.png")).convert("RGB")

# Top Left: 原矿高瓷蓝绿松 (on coastal driftwood)
crop_turquoise = im_gallery.crop((65, 88, 328, 395))
crop_turquoise.save(os.path.join(out_dir, "gallery-turquoise.jpg"), quality=95)

# Top Right: 夏日清心星月菩提 (on tea table with incense)
crop_bodhi = im_gallery.crop((350, 88, 615, 395))
crop_bodhi.save(os.path.join(out_dir, "gallery-bodhi.jpg"), quality=95)

# Bottom Left: 金星爆满小叶紫檀 (macro on silk)
crop_zitan_macro = im_gallery.crop((65, 560, 328, 868))
crop_zitan_macro.save(os.path.join(out_dir, "gallery-zitan.jpg"), quality=95)

# Bottom Right: 保山满肉转运南红 (on linen)
crop_nanhong_macro = im_gallery.crop((350, 560, 615, 868))
crop_nanhong_macro.save(os.path.join(out_dir, "gallery-nanhong.jpg"), quality=95)

print("All real product and lifestyle photographs successfully cropped & saved to public/products/ and public/hero/!")
