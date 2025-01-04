import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="pt-16">
      <section className="relative h-[40vh] min-h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-white/90">
                Get in touch with our team to start your journey in Phuket.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}