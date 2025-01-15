import { Heart, Clock, UserCog, Stethoscope } from "lucide-react";

export interface CarePackage {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: any;
  price: string;
  suitable: string[];
}

export const carePackages: CarePackage[] = [
  {
    id: "specialized-care",
    title: "Specialized Care Package",
    description:
      "Tailored care programs for specific conditions and requirements.",
    icon: UserCog,
    price: "Custom pricing 0$",
    features: [
      "Condition-specific care plans",
      "Specialized medical equipment",
      "Expert medical consultation",
      "Rehabilitation programs",
      "Family coordination meetings",
      "Customized support services",
    ],
    suitable: [
      "Dementia care",
      "Stroke recovery",
      "Parkinson's support",
      "Other specific conditions",
    ],
  },
  {
    id: "basic-support",
    title: "Basic Support Package",
    description:
      "Essential assistance for independent seniors who need occasional help.",
    icon: Heart,
    price: "From $800/month",
    features: [
      "Weekly health check-ups",
      "Transportation assistance",
      "Shopping and errands support",
      "Light housekeeping",
      "24/7 emergency contact",
    ],
    suitable: [
      "Active seniors",
      "Independent living",
      "Minimal assistance needed",
    ],
  },
  {
    id: "medical-care",
    title: "Medical Care Package",
    description:
      "Comprehensive medical support with regular monitoring and assistance.",
    icon: Stethoscope,
    price: "From $1,500/month",
    features: [
      "Daily medical check-ups",
      "Medication management",
      "Physical therapy sessions",
      "Medical appointment coordination",
      "Hospital liaison services",
      "Emergency medical response",
    ],
    suitable: [
      "Chronic condition management",
      "Post-surgery recovery",
      "Regular medical attention needed",
    ],
  },
  {
    id: "full-time-care",
    title: "24/7 Comprehensive Care",
    description:
      "Round-the-clock professional care and support for all daily activities.",
    icon: Clock,
    price: "From $2,800/month",
    features: [
      "24/7 dedicated caregiver",
      "Full personal care assistance",
      "Complete meal preparation",
      "Medication administration",
      "Regular nurse visits",
      "Social activity coordination",
      "Specialized medical equipment",
    ],
    suitable: [
      "Limited mobility",
      "Advanced age care",
      "Complex medical conditions",
    ],
  },
];
