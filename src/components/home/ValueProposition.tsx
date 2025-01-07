import { useTranslation } from 'react-i18next';
import { Shield, Heart, Compass, Users } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    key: 'support'
  },
  {
    icon: Heart,
    key: 'care'
  },
  {
    icon: Compass,
    key: 'guidance'
  },
  {
    icon: Users,
    key: 'community'
  }
];

export default function ValueProposition() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('home.valueProposition.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.valueProposition.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.key} className="text-center">
                <div className="inline-block p-4 bg-teal-50 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t(`home.valueProposition.features.${benefit.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`home.valueProposition.features.${benefit.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}