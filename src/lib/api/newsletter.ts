import { supabase } from '../supabase';
import type { NewsletterSubscription } from '../types/inquiries';

export async function submitNewsletterSubscription(data: NewsletterSubscription) {
  try {
    // Create main inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        category: 'newsletter',
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) throw inquiryError;

    // Create newsletter subscription
    const { error: subscriptionError } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        inquiry_id: inquiry.id,
        subscription_type: data.details.subscription_type
      });

    if (subscriptionError) throw subscriptionError;

    return { success: true };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, error };
  }
}