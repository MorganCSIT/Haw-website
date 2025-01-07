import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 'healthcare',
      text: t('home.testimonials.testimonials.healthcare.text'),
      name: t('home.testimonials.testimonials.healthcare.author'),
      location: t('home.testimonials.testimonials.healthcare.location'),
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'vacation',
      text: t('home.testimonials.testimonials.vacation.text'),
      name: t('home.testimonials.testimonials.vacation.author'),
      location: t('home.testimonials.testimonials.vacation.location'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'investment',
      text: t('home.testimonials.testimonials.investment.text'),
      name: t('home.testimonials.testimonials.investment.author'),
      location: t('home.testimonials.testimonials.investment.location'),
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('home.testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home.testimonials.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.location}</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}