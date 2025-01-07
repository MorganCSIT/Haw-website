import { useTranslation } from 'react-i18next';
import { Building, Award, CheckCircle } from 'lucide-react';

export default function PartnershipSection() {
  const { t } = useTranslation();

  const partnerships = [
    {
      icon: Building,
      name: t('home.partnerships.partners.hospital.name'),
      description: t('home.partnerships.partners.hospital.description')
    },
    {
      icon: Award,
      name: t('home.partnerships.partners.insurance.name'),
      description: t('home.partnerships.partners.insurance.description')
    },
    {
      icon: CheckCircle,
      name: t('home.partnerships.partners.property.name'),
      description: t('home.partnerships.partners.property.description')
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('home.partnerships.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.partnerships.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {partnerships.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <Icon className="h-12 w-12 text-teal-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{partner.name}</h3>
                <p className="text-gray-600">{partner.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}