import { investmentFacts } from '../../data/investmentFacts';

export default function InvestmentFacts() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Invest in Phuket?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the benefits of investing in one of Thailand's most sought-after property markets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {investmentFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <Icon className="h-12 w-12 text-teal-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{fact.title}</h3>
                <p className="text-gray-600">{fact.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}