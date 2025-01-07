import { useTranslation } from 'react-i18next';
import { Heart, Home, Plane, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    icon: Heart,
    path: "/healthcare",
    key: "healthcare"
  },
  {
    icon: Shield,
    path: "/insurance",
    key: "legal"
  },
  {
    icon: Plane,
    path: "/vacations",
    key: "vacation"
  },
  {
    icon: Home,
    path: "/property",
    key: "property"
  }
];

export default function Services() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCardClick = (path: string | null) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('home.services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home.services.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.key} 
                className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow ${service.path ? 'cursor-pointer' : ''}`}
                onClick={() => handleCardClick(service.path)}
              >
                <Icon className="h-12 w-12 text-teal-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {t(`home.services.${service.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`home.services.${service.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}