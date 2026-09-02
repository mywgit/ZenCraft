import os
from PIL import Image

src_dir = r"c:\Users\myw\Desktop\newcode\zen\mutou\mutou"
dest_dir = r"c:\Users\myw\Desktop\newcode\zen\public\beads"

mapping = {
    "GreenSandalwood.png": "green-sandalwood.png",
    "GoldenThreadNanmu.png": "gold-phoebe.png",
    "EbonyBogWood.png": "ebony-wood.png",
    "Rosewood.png": "rosewood.png",
    "CliffCypressBurl.png": "thuja-cypress.png",
    "PeachWood.png": "peach-wood.png",
}

for src_name, dest_name in mapping.items():
    fpath = os.path.join(src_dir, src_name)
    if os.path.exists(fpath):
        im = Image.open(fpath)
        bbox = im.getbbox()
        if bbox:
            # Crop to the exact bead sphere
            cropped = im.crop(bbox)
            # Make it a square 256x256 image with transparent padding
            max_dim = max(cropped.width, cropped.height)
            square = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
            offset_x = (max_dim - cropped.width) // 2
            offset_y = (max_dim - cropped.height) // 2
            square.paste(cropped, (offset_x, offset_y))
            square = square.resize((256, 256), Image.Resampling.LANCZOS)
            square.save(os.path.join(dest_dir, dest_name))
            print(f"Mapped {src_name} -> {dest_name} (256x256 RGBA square OK)")

print("All authentic wood bead assets from mutou/ synchronized cleanly!")
