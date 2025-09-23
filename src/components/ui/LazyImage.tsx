import { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, createIntersectionObserver } from '../../utils/performance';
import LoadingSpinner from './LoadingSpinner';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  placeholder?: string;
}

export default function LazyImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  quality = 80,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const optimizedSrc = getOptimizedImageUrl(src, width, height, quality);

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {!isInView && (
        <img
          src={placeholder}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
      
      {isInView && (
        <>
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <LoadingSpinner />
            </div>
          )}
          
          <img
            src={optimizedSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
          
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <p className="text-gray-500 text-sm">Failed to load image</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}