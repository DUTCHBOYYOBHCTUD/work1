import re

with open('src/data/products.js', 'r') as f:
    content = f.read()

# Dictionary mapping product names (or parts of them) to a list of new images
image_mapping = {
    "Tuna Pickle": ["/media/tunapickle1.jpeg", "/media/tunapickle2.jpeg", "/media/tunapickle3.jpeg"],
    "Prawn Pickle": ["/media/prawnpowder1.jpeg", "/media/prawnpowder2.jpeg", "/media/prawnspowder.jpeg"],
    "Garlic Pickle": ["/media/garlic.jpeg", "/media/garlic (2).jpeg", "/media/garlic5.jpeg"],
    "Lemon Pickle": ["/media/limepickle1.jpeg", "/media/lime.jpeg"],
    "White Lime Pickle": ["/media/whitelime.jpeg"],
    "Hot & Sour Lime Pickle": ["/media/hotandsweetlime.jpeg", "/media/hotandsweetlime (2).jpeg", "/media/hotandsweetlime4.jpeg"],
    "Carrot Pickle": ["/media/carrotpickle2.jpeg", "/media/carrot3.jpeg", "/media/carrot4.jpeg", "/media/carrots5.jpeg"],
    "Mushroom Pickle": ["/media/mushpickle1.jpeg", "/media/mushroom.jpeg", "/media/mushroom2.jpeg"],
    "Dates Pickle": ["/media/dates1.jpeg", "/media/dates2.jpeg", "/media/dates3.jpeg"],
    "Gooseberry Pickle": ["/media/gooseberrypickle1.jpeg", "/media/gooseberrypickle2.jpeg", "/media/gooseberrypickle3.jpeg"],
    "Drumstick Pickle": ["/media/drumstick.jpeg", "/media/drumstick (2).jpeg", "/media/drumstick4.jpeg"]
}

# Find all product blocks and replace their 'image' and 'images' array
def replace_images(match):
    name = match.group(1)
    
    # Try to find a match in our mapping
    new_images = image_mapping.get(name, ["/media/logo.jpeg"]) # Fallback to logo if not found
    
    # Generate new JSON representation
    primary_image = new_images[0]
    images_array = ",\n      ".join(f'"{img}"' for img in new_images)
    
    replacement = f'"name": "{name}",\n    "category"{match.group(2)}\n    "image": "{primary_image}",\n    "images": [\n      {images_array}\n    ],'
    return replacement

# Regex to match the block:
# "name": "Tuna Pickle",
# "category": "Seafood Signature",
# "image": "/media/tunapickle1.jpeg",
# "images": [ ... ],
pattern = r'"name":\s*"([^"]+)",\n\s*"category"([^,]+),\n\s*"image":\s*"[^"]+",\n\s*"images":\s*\[.*?\]\s*,'

new_content = re.sub(pattern, replace_images, content, flags=re.DOTALL)

with open('src/data/products.js', 'w') as f:
    f.write(new_content)

print("Successfully updated products.js")
