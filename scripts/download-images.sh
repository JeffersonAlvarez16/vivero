#!/bin/bash

# Create necessary directories
mkdir -p public/images
mkdir -p public/images/plantas

# Download images from Unsplash
# Hero image
curl "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=80" -o public/images/hero.jpg

# Product images
curl "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&q=80" -o public/images/plantas/orquidea-mini.jpg
curl "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80" -o public/images/plantas/suculenta.jpg
curl "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=800&q=80" -o public/images/plantas/helecho.jpg

echo "Images downloaded successfully!"
