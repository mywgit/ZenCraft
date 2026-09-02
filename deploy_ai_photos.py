import shutil
import os

artifact_dir = r"C:\Users\myw\.gemini\antigravity\brain\cb8d82e2-1692-4b72-8025-cd79ade98405"
products_dir = r"c:\Users\myw\Desktop\newcode\zen\public\products"

# 1. New AI Generated Imperial Zitan 108 Mala
zitan_src = os.path.join(artifact_dir, "zitan_108_lifestyle_1788319573897.jpg")
shutil.copyfile(zitan_src, os.path.join(products_dir, "master-zitan.jpg"))
shutil.copyfile(zitan_src, os.path.join(products_dir, "gallery-zitan.jpg"))

# 2. New AI Generated Baoshan Red Agate Bracelet
nanhong_src = os.path.join(artifact_dir, "nanhong_bracelet_scene_1788319593151.jpg")
shutil.copyfile(nanhong_src, os.path.join(products_dir, "master-nanhong.jpg"))
shutil.copyfile(nanhong_src, os.path.join(products_dir, "gallery-nanhong.jpg"))

# 3. New AI Generated High-Porcelain Turquoise Bracelet
turq_src = os.path.join(artifact_dir, "turquoise_driftwood_scene_1788319612276.jpg")
shutil.copyfile(turq_src, os.path.join(products_dir, "gallery-turquoise.jpg"))

print("All new Gemini AI product photos copied and integrated successfully!")
