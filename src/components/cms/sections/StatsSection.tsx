import type { CMSSection } from '../../../types/cms';

interface StatsSectionProps {
  section: CMSSection;
}

export default function StatsSection({ section }: StatsSectionProps) {
  const { title, content } = section;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {title && (
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {title}
            </h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.stats?.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                {stat.description && (
                  <div className="text-gray-600">{stat.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}