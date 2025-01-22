#!/bin/bash

# Create categories directory
mkdir -p public/images/categories

# Download category images from Unsplash
curl "https://images.unsplash.com/photo-1545165375-1b744b9ed444?w=800&q=80" -o public/images/categories/interior.jpg
curl "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80" -o public/images/categories/suculentas.jpg
curl "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?w=800&q=80" -o public/images/categories/exterior.jpg

echo "Category images downloaded successfully!"
