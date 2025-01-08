import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { partnerships } from '../../data/partnerships';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PartnershipSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto-scroll timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partnerships.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % partnerships.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + partnerships.length) % partnerships.length);
  };

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Working with Thailand's leading service providers to ensure a smooth transition to your new life in Phuket.
          </p>
        </div>

        <div className="relative">
          <div className="relative h-[400px] overflow-hidden rounded-xl">
            {partnerships.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.id}
                  className={`absolute inset-0 w-full h-full transition-transform duration-500 ${
                    index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                  }`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${partner.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="relative h-full flex items-center justify-center">
                    <div 
                      className="bg-white/95 backdrop-blur-sm p-8 rounded-xl max-w-xl mx-4 cursor-pointer hover:bg-white transition-colors"
                      onClick={() => navigate(`/partnerships/${partner.id}`)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="h-12 w-12 text-teal-600" />
                        <span className="px-4 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
                          Learn More
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-3">{partner.name}</h3>
                      <p className="text-gray-600">{partner.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}