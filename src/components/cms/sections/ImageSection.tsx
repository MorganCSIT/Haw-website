import type { CMSSection } from '../../../types/cms';

interface ImageSectionProps {
  section: CMSSection;
}

export default function ImageSection({ section }: ImageSectionProps) {
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
          <div className="rounded-xl overflow-hidden">
            <img
              src={content.url}
              alt={content.alt || title || 'Image'}
              className="w-full h-auto object-cover"
            />
          </div>
          {content.caption && (
            <p className="text-center text-gray-600 mt-4 italic">
              {content.caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}