import { supabase } from '../supabase';
import type { InsuranceInquiry } from '../types/inquiries';

export async function submitInsuranceInquiry(data: InsuranceInquiry) {
  try {
    // Create main inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        category: 'insurance',
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) throw inquiryError;

    // Create insurance-specific details
    const { error: insuranceError } = await supabase
      .from('insurance_inquiries')
      .insert({
        inquiry_id: inquiry.id,
        insurance_type: data.details.insurance_type,
        coverage_level: data.details.coverage_level,
        additional_requirements: data.details.additional_requirements
      });

    if (insuranceError) throw insuranceError;

    return { success: true };
  } catch (error) {
    console.error('Insurance inquiry submission error:', error);
    return { success: false, error };
  }
}