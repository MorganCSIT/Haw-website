import { Lightbulb } from 'lucide-react';

export default function SalesTips() {
  const tips = [
    {
      title: "Response Time Matters",
      description: "Aim to respond to new inquiries within 2 hours. Quick responses show professionalism and increase conversion rates."
    },
    {
      title: "Personalization is Key",
      description: "Always use the client's name and reference specific details from their inquiry in your response."
    },
    {
      title: "Follow-up Strategy",
      description: "If no response after 48 hours, send a friendly follow-up. Include additional value like relevant blog posts or property recommendations."
    },
    {
      title: "Qualify Leads",
      description: "Ask about timeline, budget, and specific needs early in the conversation to provide better-targeted solutions."
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h3 className="font-semibold text-gray-900">Sales Tips & Best Practices</h3>
      </div>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="border-l-2 border-teal-500 pl-4">
            <h4 className="text-sm font-medium text-gray-900">{tip.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}