import { useState } from 'react';
import type { CMSSection } from '../../../types/cms';

interface GallerySectionProps {
  section: CMSSection;
}

export default function GallerySection({ section }: GallerySectionProps) {
  const { title, content } = section;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {title && (
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {title}
            </h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.images?.map((image: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image.url)}
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <img
                  src={image.url}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    {image.caption && (
                      <p className="text-sm">{image.caption}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}