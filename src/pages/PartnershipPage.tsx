import { useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { partnerships } from "../data/partnerships";

export default function PartnershipPage() {
  const { id } = useParams();
  const partnership = partnerships.find((p) => p.id === id);

  if (!partnership) {
    return <Navigate to="/" replace />;
  }

  const Icon = partnership.icon;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate back and scroll to partnerships section
    window.history.back();
    setTimeout(() => {
      document
        .querySelector(".bg-gray-50.overflow-hidden")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="pt-20">
      <div className="container mx-auto px-6 py-12">
        <button
          onClick={handleBack}
          className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${partnership.image})` }}
            />

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  {partnership.name}
                </h1>
                <Icon className="h-12 w-12 text-teal-600" />
              </div>

              <p className="text-xl text-gray-600 mb-8">
                {partnership.longDescription}
              </p>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Key Benefits
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {partnership.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3" />
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
