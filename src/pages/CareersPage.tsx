import { ArrowRight } from 'lucide-react';

const openPositions = [
  {
    title: "Healthcare Coordinator",
    department: "Healthcare Services",
    location: "Phuket, Thailand",
    type: "Full-time"
  },
  {
    title: "Property Investment Advisor",
    department: "Real Estate",
    location: "Phuket, Thailand",
    type: "Full-time"
  },
  {
    title: "Community Event Manager",
    department: "Community Services",
    location: "Phuket, Thailand",
    type: "Full-time"
  }
];

export default function CareersPage() {
  return (
    <div className="pt-16">
      <section className="relative h-[40vh] min-h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Join Our Team
              </h1>
              <p className="text-xl text-white/90">
                Help us create exceptional experiences for our community in Phuket.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Open Positions</h2>
              <p className="text-xl text-gray-600">
                Discover opportunities to grow with us and make a difference in people's lives.
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {position.title}
                      </h3>
                      <p className="text-gray-600">{position.department}</p>
                    </div>
                    <button className="flex items-center text-teal-600 hover:text-teal-700">
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{position.location}</span>
                    <span>•</span>
                    <span>{position.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}