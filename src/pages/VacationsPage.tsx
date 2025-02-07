import { useState } from "react";
import ExperiencesList from "../components/vacations/ExperiencesList";
import ConsultationForm from "../components/vacations/ConsultationForm";
import { ArrowDown } from "lucide-react";

export default function VacationsPage() {
  const [selectedExperience, setSelectedExperience] = useState("");
  const scrollToConsultationForm = () => {
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
              'url("https://fanclubthailand.co.uk/wp-content/uploads/2022/10/Thailand_older_visitors.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Senior Holiday Experiences in Phuket
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Discover a range of engaging experiences tailored for seniors in
                the beautiful island of Phuket. From relaxing beach walks to
                cultural tours, we ensure a memorable and enjoyable holiday
                experience.
              </p>

              {/* //button here// */}
              <button
                onClick={scrollToConsultationForm}
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors animate-bounce"
              >
                Learn More
                {/* Replace ArrowRight with your own imported icon component */}
                <ArrowDown className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <ExperiencesList onExperienceSelect={setSelectedExperience} />
      <div id="consultationForm">
        <ConsultationForm selectedExperience={selectedExperience} />
      </div>
    </div>
  );
}
