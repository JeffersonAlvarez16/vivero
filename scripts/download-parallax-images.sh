#!/bin/bash

# Create parallax directory
mkdir -p public/images/parallax

# Download parallax background images from Unsplash
curl "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=1920&q=80" -o public/images/parallax/bg-1.jpg
curl "https://images.unsplash.com/photo-1444392061186-9fc38f84f726?w=1920&q=80" -o public/images/parallax/bg-2.jpg
curl "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&q=80" -o public/images/parallax/bg-3.jpg

echo "Parallax images downloaded successfully!"
