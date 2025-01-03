import { supabase } from '../supabase';
import type { VacationInquiry } from '../types/inquiries';

export async function submitVacationInquiry(data: VacationInquiry) {
  try {
    // Create main inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        category: 'vacation',
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) {
      console.error('Error creating inquiry:', inquiryError);
      throw inquiryError;
    }

    // Create vacation-specific details
    const { error: vacationError } = await supabase
      .from('vacation_inquiries')
      .insert({
        inquiry_id: inquiry.id,
        preferred_experience: data.details.preferred_experience,
        preferred_dates: data.details.preferred_dates,
        mobility_requirements: data.details.mobility_requirements,
        additional_requirements: data.details.additional_requirements || ''
      });

    if (vacationError) {
      console.error('Error creating vacation details:', vacationError);
      throw vacationError;
    }

    return { success: true };
  } catch (error) {
    console.error('Vacation inquiry submission error:', error);
    return { success: false, error };
  }
}