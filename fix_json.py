import re

with open('src/data/products.js', 'r') as f:
    content = f.read()

# Fix the missing comma after category
pattern = r'"category"([^,]+)\n\s*"image":'
new_content = re.sub(pattern, r'"category"\1,\n    "image":', content)

with open('src/data/products.js', 'w') as f:
    f.write(new_content)

print("Fixed syntax")
