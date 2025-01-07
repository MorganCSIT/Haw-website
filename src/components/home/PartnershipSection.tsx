import { Building, Award, CheckCircle } from 'lucide-react';

const partnerships = [
  {
    icon: Building,
    name: "Bangkok Hospital Phuket",
    description: "Access to Thailand's leading healthcare facilities"
  },
  {
    icon: Award,
    name: "Licensed Insurance Providers",
    description: "Comprehensive coverage from trusted partners"
  },
  {
    icon: CheckCircle,
    name: "Certified Property Developers",
    description: "Quality-assured real estate investments"
  }
];

export default function PartnershipSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trusted Partnerships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We work with Thailand's leading healthcare providers and property developers to ensure the highest quality service.
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