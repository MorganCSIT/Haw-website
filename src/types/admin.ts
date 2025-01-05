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

export interface CartInquiryItem {
  id: string;
  cart_inquiry_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  created_at: string;
}

export interface CartInquiry {
  id: string;
  user_id: string;
  user?: {
    email: string;
  };
  status: string;
  message: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  items?: CartInquiryItem[];
}