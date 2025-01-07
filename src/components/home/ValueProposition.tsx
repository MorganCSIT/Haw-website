import { Shield, Heart, Compass, Users } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: "Full-Service Support",
    description: "One trusted partner for healthcare, insurance, property, and lifestyle needs in Thailand."
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Tailored assistance for healthcare needs and mobility requirements, ensuring peace of mind."
  },
  {
    icon: Compass,
    title: "Expert Guidance",
    description: "Navigate Thai healthcare, legal systems, and property markets with our local expertise."
  },
  {
    icon: Users,
    title: "Community Integration",
    description: "Join a vibrant expat community with regular social events and cultural activities."
  }
];

export default function ValueProposition() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Your Complete Assisted Living Solution in Thailand
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience worry-free living with our comprehensive support services designed for retirees and health-conscious travelers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-block p-4 bg-teal-50 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}