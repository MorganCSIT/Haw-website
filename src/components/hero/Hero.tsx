import { useState, useEffect } from 'react';
import HeroSlide from './HeroSlide';
import { heroContent } from './HeroContent';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen">
      {heroContent.map((content, index) => (
        <div
          key={index}
          className={`${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 ease-in-out`}
        >
          <HeroSlide image={content.image}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {content.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {content.description}
            </p>
            <div>
              <a 
                href="#contact" 
                className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Start Your Journey
              </a>
            </div>
          </HeroSlide>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}