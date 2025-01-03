import { supabase } from './supabase';

export interface FormSubmission {
  type: string;
  name: string;
  email: string;
  details: Record<string, string>;
}

export async function submitForm({ type, name, email, details }: FormSubmission) {
  try {
    // Get inquiry type id
    const { data: types, error: typeError } = await supabase
      .from('inquiry_types')
      .select('id')
      .eq('name', type)
      .limit(1);

    if (typeError) throw typeError;
    if (!types || types.length === 0) {
      // If type doesn't exist, create it
      const { data: newType, error: createTypeError } = await supabase
        .from('inquiry_types')
        .insert({ name: type, description: `${type} inquiries` })
        .select('id')
        .single();

      if (createTypeError) throw createTypeError;
      if (!newType) throw new Error('Failed to create inquiry type');
      
      types = [newType];
    }

    // Create inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        inquiry_type_id: types[0].id,
        name,
        email,
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) throw inquiryError;

    // Add details
    const detailsToInsert = Object.entries(details)
      .filter(([_, value]) => value) // Only insert non-empty values
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