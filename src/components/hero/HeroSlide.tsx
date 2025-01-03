import { ReactNode } from 'react';

interface HeroSlideProps {
  image: string;
  children: ReactNode;
}

export default function HeroSlide({ image, children }: HeroSlideProps) {
  return (
    <div className="absolute inset-0 transition-opacity duration-1000">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${image}")` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}