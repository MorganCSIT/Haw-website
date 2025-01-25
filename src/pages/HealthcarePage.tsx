import { carePackages } from "../data/carePackages";
import PackageCard from "../components/healthcare/PackageCard";
import CareForm from "../components/healthcare/CareForm";
import { ArrowDown } from "lucide-react";
// If you’re using Lucide or Heroicons, ensure to import ArrowRight properly.
// e.g. import { ArrowRight } from "lucide-react";

export default function HealthcarePage() {
  const scrollToCareForm = () => {
    const formElement = document.getElementById("careForm");
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
              'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Professional Healthcare Support
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Comprehensive care solutions tailored to your needs. From basic
                assistance to specialized medical care, we ensure your comfort
                and well-being in paradise.
              </p>

              {/* //button here// */}
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
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Care Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of comprehensive care packages, each
              designed to provide the perfect level of support for your specific
              needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {carePackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Add an id to scroll here */}
      <div id="careForm">
        <CareForm />
      </div>
    </div>
  );
}
