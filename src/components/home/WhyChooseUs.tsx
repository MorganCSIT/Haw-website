import { Shield, Heart, Users, Globe } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: "Trusted Expertise",
    description: "Over a decade of experience helping people transition to their dream life in Phuket"
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Tailored solutions that match your unique needs and preferences"
  },
  {
    icon: Users,
    title: "Local Network",
    description: "Strong relationships with healthcare providers, property developers, and local authorities"
  },
  {
    icon: Globe,
    title: "International Standards",
    description: "World-class service delivery with a deep understanding of international client needs"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to making your transition to Phuket seamless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-block p-4 bg-teal-50 rounded-full mb-6">
                  <Icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}