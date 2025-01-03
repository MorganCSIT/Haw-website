import { supabase } from '../supabase';
import type { FormSubmission } from '../types/forms';

export async function submitInquiry(data: FormSubmission) {
  try {
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) throw inquiryError;

    // Add details
    const detailsToInsert = Object.entries(data.details)
      .filter(([_, value]) => value)
      .map(([field_name, field_value]) => ({
        inquiry_id: inquiry.id,
        field_name,
        field_value: String(field_value)
      }));

    if (detailsToInsert.length > 0) {
      const { error: detailsError } = await supabase
        .from('inquiry_details')
        .insert(detailsToInsert);

      if (detailsError) throw detailsError;
    }

    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, error };
  }
}