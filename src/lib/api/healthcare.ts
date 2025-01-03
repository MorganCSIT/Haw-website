import { supabase } from '../supabase';
import type { HealthcareInquiry } from '../types/inquiries';

export async function submitHealthcareInquiry(data: HealthcareInquiry) {
  try {
    // Create main inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        category: 'healthcare',
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) throw inquiryError;

    // Create healthcare-specific details
    const { error: healthcareError } = await supabase
      .from('healthcare_inquiries')
      .insert({
        inquiry_id: inquiry.id,
        care_package: data.details.care_package,
        mobility_level: data.details.mobility_level,
        medical_conditions: data.details.medical_conditions,
        care_timeline: data.details.care_timeline,
        additional_requirements: data.details.additional_requirements
      });

    if (healthcareError) throw healthcareError;

    return { success: true };
  } catch (error) {
    console.error('Healthcare inquiry submission error:', error);
    return { success: false, error };
  }
}