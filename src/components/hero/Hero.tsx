import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlide from './HeroSlide';
import { heroContent } from './HeroContent';
import GetStartedButton from '../home/GetStartedButton';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] min-h-[500px] max-h-[600px]">
      {heroContent.map((content, index) => (
        <div
          key={index}
          className={`${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 ease-in-out`}
        >
          <HeroSlide image={content.image}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              {content.description}
            </p>
            <div>
              <GetStartedButton />
            </div>
          </HeroSlide>
        </div>
      ))}
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
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