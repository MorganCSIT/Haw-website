import { supabase } from '../supabase';
import type { PropertyInquiry } from '../types/inquiries';

export async function submitPropertyInquiry(data: PropertyInquiry) {
  try {
    // Create main inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        category: 'property',
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) throw inquiryError;

    // Create property-specific details
    const { error: propertyError } = await supabase
      .from('property_inquiries')
      .insert({
        inquiry_id: inquiry.id,
        budget: parseFloat(data.details.budget),
        purpose: data.details.purpose,
        property_type: data.details.property_type,
        services: data.details.services,
        additional_requirements: data.details.additional_requirements
      });

    if (propertyError) throw propertyError;

    return { success: true };
  } catch (error) {
    console.error('Property inquiry submission error:', error);
    return { success: false, error };
  }
}