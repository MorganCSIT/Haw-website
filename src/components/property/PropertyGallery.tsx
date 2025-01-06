import { useState } from 'react';
import type { Property } from '../../data/properties';

// Generate additional images based on the main image
const generateGalleryImages = (mainImage: string) => {
  const images = [mainImage];
  // Add variations of the main image with different query parameters
  for (let i = 1; i <= 4; i++) {
    images.push(`${mainImage}?v=${i}`);
  }
  return images;
};

interface PropertyGalleryProps {
  property: Property;
}

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = generateGalleryImages(property.image);

  return (
    <div className="space-y-4">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
        <img
          src={images[selectedImage]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
              selectedImage === index ? 'ring-2 ring-teal-500' : ''
            }`}
          >
            <img
              src={image}
              alt={`${property.title} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}