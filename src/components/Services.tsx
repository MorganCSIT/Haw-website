import { Heart, Home, Plane, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    icon: Heart,
    title: "Healthcare Support",
    description: "Access to premium healthcare services and assistance in navigating Thailand's healthcare system.",
    path: "/healthcare"
  },
  {
    icon: Shield,
    title: "Legal & Insurance",
    description: "Comprehensive assistance with visas, health insurance, and all legal matters for a worry-free transition.",
    path: "/insurance"
  },
  {
    icon: Plane,
    title: "Assisted Vacations",
    description: "Customized vacation experiences with full support, including transportation, accommodation, and medical assistance if needed.",
    path: "/vacations"
  },
  {
    icon: Home,
    title: "Property Investment",
    description: "Expert guidance in finding and investing in your perfect retirement property in Phuket's most desirable locations.",
    path: "/property"
  }
];

export default function Services() {
  const navigate = useNavigate();

  const handleCardClick = (path: string | null) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive support to make your transition to Phuket smooth and enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow ${service.path ? 'cursor-pointer' : ''}`}
              onClick={() => handleCardClick(service.path)}
            >
              <service.icon className="h-12 w-12 text-teal-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}