export default function Hero() {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 pt-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your Dream Retirement in Paradise Awaits
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience the perfect blend of luxury, comfort, and care in beautiful Phuket. 
              Whether you're planning retirement, investment, or a tailored vacation, we're here to guide you every step of the way.
            </p>
            <div className="space-x-4">
              <a 
                href="#contact" 
                className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Start Your Journey
              </a>
              <a 
                href="#services" 
                className="inline-block px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}