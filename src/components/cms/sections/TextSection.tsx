import type { CMSSection } from '../../../types/cms';

interface TextSectionProps {
  section: CMSSection;
}

export default function TextSection({ section }: TextSectionProps) {
  const { title, content } = section;

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {title && (
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {title}
            </h2>
          )}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
        </div>
      </div>
    </section>
  );
}