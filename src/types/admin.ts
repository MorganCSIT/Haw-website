export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  category: string;
  status: string;
  created_at: string;
  updated_at: string;
  property_inquiries?: any[];
  healthcare_inquiries?: any[];
  vacation_inquiries?: any[];
  insurance_inquiries?: any[];
  newsletter_subscriptions?: any[];
  contact_inquiries?: any[];
  [key: string]: any;
}