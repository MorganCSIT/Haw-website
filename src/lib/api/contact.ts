import { supabase } from '../supabase';
import type { ContactInquiry } from '../types/inquiries';

export async function submitContactInquiry(data: ContactInquiry) {
  try {
    // Create main inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        category: 'contact',
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) throw inquiryError;

    // Create contact-specific details
    const { error: contactError } = await supabase
      .from('contact_inquiries')
      .insert({
        inquiry_id: inquiry.id,
        interest: data.details.interest,
        message: data.details.message
      });

    if (contactError) throw contactError;

    return { success: true };
  } catch (error) {
    console.error('Contact inquiry submission error:', error);
    return { success: false, error };
  }
}