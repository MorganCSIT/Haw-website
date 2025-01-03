import { Shield, Heart, Building, Stethoscope, FileCheck, Clock } from 'lucide-react';

export interface InsuranceOption {
  id: string;
  title: string;
  description: string;
  coverage: string[];
  icon: any;
  price: string;
  benefits: string[];
}

export const insuranceOptions = [
  {
    id: "comprehensive",
    title: "Comprehensive Health Insurance",
    description: "Full coverage health insurance for complete peace of mind",
    coverage: [
      "Inpatient & outpatient care",
      "Emergency services",
      "Specialist consultations",
      "Prescription medications",
      "Preventive care"
    ],
    icon: Shield,
    price: "From $200/month",
    benefits: [
      "No waiting period",
      "Direct billing available",
      "Worldwide coverage",
      "24/7 support"
    ]
  },
  {
    id: "basic",
    title: "Essential Care Plan",
    description: "Basic health coverage for routine medical needs",
    coverage: [
      "Basic inpatient care",
      "Emergency services",
      "General practitioner visits",
      "Basic medications"
    ],
    icon: Heart,
    price: "From $100/month",
    benefits: [
      "Affordable monthly payments",
      "Basic hospital coverage",
      "Thailand-wide network"
    ]
  }
];

export interface Hospital {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  facilities: string[];
  image: string;
  internationalPatients: boolean;
}

export const hospitals = [
  {
    id: "bangkok-hospital-phuket",
    name: "Bangkok Hospital Phuket",
    location: "2/1 Hongyok Utis Road, Phuket Town",
    specialties: [
      "Emergency Care",
      "Cardiology",
      "Orthopedics",
      "Neurology"
    ],
    facilities: [
      "International Patient Center",
      "24/7 Emergency Room",
      "Modern Diagnostic Equipment",
      "Rehabilitation Center"
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    internationalPatients: true
  },
  {
    id: "siriroj-hospital",
    name: "Siriroj International Hospital",
    location: "44 Chalermprakiat Ror 9 Road, Phuket",
    specialties: [
      "General Surgery",
      "Internal Medicine",
      "Pediatrics",
      "Dental Care"
    ],
    facilities: [
      "Multi-language Staff",
      "Modern Surgery Rooms",
      "Pharmacy",
      "Laboratory Services"
    ],
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    internationalPatients: true
  }
];

export const healthcareFacts = [
  {
    icon: Building,
    title: "World-Class Facilities",
    description: "Thailand's private hospitals meet international standards with state-of-the-art equipment and facilities."
  },
  {
    icon: Stethoscope,
    title: "Experienced Doctors",
    description: "Many Thai doctors are internationally trained and speak excellent English."
  },
  {
    icon: FileCheck,
    title: "JCI Accreditation",
    description: "Major hospitals in Phuket hold Joint Commission International accreditation."
  },
  {
    icon: Clock,
    title: "Quick Access",
    description: "Minimal waiting times for appointments and procedures compared to many Western countries."
  }
];