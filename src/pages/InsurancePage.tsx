import { insuranceOptions, hospitals } from "../data/insurance";
import InsuranceProductCard from "../components/insurance/InsuranceProductCard";
import HospitalCard from "../components/insurance/HospitalCard";
import HealthcareFacts from "../components/insurance/HealthcareFacts";
import ConsultationForm from "../components/insurance/ConsultationForm";
import { ArrowDown } from "lucide-react";

export default function InsurancePage() {
  const scrollToCareForm = () => {
    const formElement = document.getElementById("consultationForm");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="pt-16">
      <section className="relative h-[60vh] min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Insurance & Legal Support
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Navigate Thailand's healthcare system with confidence. Get
                comprehensive insurance coverage and expert guidance for a
                worry-free stay.
              </p>
            </div>
            <button
              onClick={scrollToCareForm}
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors animate-bounce"
            >
              Request Consultation
              {/* Replace ArrowRight with your own imported icon component */}
              <ArrowDown className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Insurance Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully selected insurance plans, designed to
              provide comprehensive coverage for your stay in Thailand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {insuranceOptions.map((insurance) => (
              <InsuranceProductCard key={insurance.id} insurance={insurance} />
            ))}
          </div>
        </div>
      </section>

      <HealthcareFacts />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Leading Hospitals in Phuket
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover Phuket's world-class healthcare facilities, offering
              international standard medical care with English-speaking staff.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {hospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        </div>
      </section>
      <div id="consultationForm">
        <ConsultationForm />
      </div>
    </div>
  );
}
