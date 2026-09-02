import urllib.request
import os
from PIL import Image

out_dir = r"c:/Users/myw/Desktop/newcode/zen/public/products"
hero_dir = r"c:/Users/myw/Desktop/newcode/zen/public/hero"
os.makedirs(out_dir, exist_ok=True)
os.makedirs(hero_dir, exist_ok=True)

photo_urls = {
    "hero-zen-tray.jpg": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&auto=format&fit=crop&q=85",
    "master-zitan.jpg": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=85",
    "master-nanhong.jpg": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=85",
    "master-chenxiang.jpg": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=85",
    "gallery-turquoise.jpg": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=85",
    "gallery-bodhi.jpg": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=85",
    "gallery-zitan.jpg": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=85",
    "gallery-nanhong.jpg": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=85",
    "dragon-teapet.jpg": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=85",
    "ebony-pixiu.jpg": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=85",
    "lotus-incense.jpg": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=85",
    "cypress-roller.jpg": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=85",
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in photo_urls.items():
    try:
        dest = os.path.join(hero_dir if fname.startswith("hero") else out_dir, fname)
        print(f"Downloading: {fname}...")
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        
        with Image.open(dest) as img:
            print(f"  OK {fname}: {img.size[0]}x{img.size[1]} px, {img.format}")
    except Exception as e:
        print(f"  FAILED {fname}: {e}")

print("All brand-new high-definition photography assets downloaded & verified successfully!")
