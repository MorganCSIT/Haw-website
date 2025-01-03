// Base inquiry type
export interface BaseInquiry {
  name: string;
  email: string;
}

// Vacation inquiry
export interface VacationInquiry extends BaseInquiry {
  details: {
    preferred_experience: string;
    preferred_dates: string;
    mobility_requirements: string;
    additional_requirements?: string;
  };
}

// Property inquiry
export interface PropertyInquiry extends BaseInquiry {
  details: {
    budget: string;
    purpose: string;
    property_type: string;
    services?: string[];
    additional_requirements?: string;
  };
}

// Healthcare inquiry
export interface HealthcareInquiry extends BaseInquiry {
  details: {
    care_package: string;
    mobility_level: string;
    medical_conditions?: string[];
    care_timeline: string;
    additional_requirements?: string;
  };
}

// Insurance inquiry
export interface InsuranceInquiry extends BaseInquiry {
  details: {
    insurance_type: string;
    coverage_level: string;
    additional_requirements?: string;
  };
}

// Newsletter subscription
export interface NewsletterSubscription extends BaseInquiry {
  details: {
    subscription_type: string;
  };
}

// Contact inquiry
export interface ContactInquiry extends BaseInquiry {
  details: {
    interest: string;
    message: string;
  };
}