import type { CMSSection } from '../../../types/cms';

interface TestimonialsSectionProps {
  section: CMSSection;
}

export default function TestimonialsSection({ section }: TestimonialsSectionProps) {
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.testimonials?.map((testimonial: any, index: number) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center mb-6">
                  {testimonial.image && (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    {testimonial.location && (
                      <div className="text-gray-600">{testimonial.location}</div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                {testimonial.service && (
                  <div className="text-sm text-teal-600 font-medium">{testimonial.service}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}