import os
from PIL import Image

def compress_images(directory, max_width=800, quality=75):
    supported_formats = ('.jpg', '.jpeg')
    total_saved = 0

    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(supported_formats):
                file_path = os.path.join(root, file)
                try:
                    original_size = os.path.getsize(file_path)
                    
                    # Open the image
                    with Image.open(file_path) as img:
                        # Convert to RGB if necessary (e.g., if it has an alpha channel or is in CMYK)
                        if img.mode != 'RGB':
                            img = img.convert('RGB')
                        
                        # Resize if larger than max_width
                        if img.width > max_width:
                            ratio = max_width / float(img.width)
                            new_height = int(float(img.height) * float(ratio))
                            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        
                        # Save the image, overwriting the original
                        img.save(file_path, "JPEG", quality=quality, optimize=True)
                    
                    new_size = os.path.getsize(file_path)
                    saved = original_size - new_size
                    if saved > 0:
                        total_saved += saved
                        print(f"Compressed {file}: {original_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB")
                except Exception as e:
                    print(f"Failed to process {file}: {e}")

    print(f"\nTotal space saved: {total_saved/1024/1024:.2f} MB")

if __name__ == "__main__":
    media_dir = os.path.join(os.path.dirname(__file__), "public", "media")
    print(f"Starting compression in {media_dir}...")
    compress_images(media_dir)
