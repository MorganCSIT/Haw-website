import type { CMSSection } from '../../../types/cms';

interface FeaturesSectionProps {
  section: CMSSection;
}

export default function FeaturesSection({ section }: FeaturesSectionProps) {
  const { title, content } = section;

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {title && (
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {title}
            </h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features?.map((feature: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                {feature.icon && (
                  <div className="inline-block p-4 bg-teal-50 rounded-full mb-6">
                    <div className="h-8 w-8 text-teal-600">
                      {/* Icon would be rendered here based on feature.icon */}
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}