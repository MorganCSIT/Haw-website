import { supabase } from '../../supabase';
import { validateCart } from './validation';
import type { Cart } from '../../types/cart';

export async function submitCartInquiry(userId: string, cart: Cart, message: string = '') {
  try {
    // Validate user ID
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Validate cart before submission
    const validation = validateCart(cart);
    if (!validation.isValid) {
      throw new Error(`Invalid cart: ${validation.errors.join(', ')}`);
    }

    // Start a transaction
    const { data: inquiry, error: inquiryError } = await supabase
      .from('cart_inquiries')
      .insert({
        user_id: userId,
        message: message.trim(),
        total_amount: Number(cart.total.toFixed(2)), // Ensure proper number format
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) {
      if (inquiryError.code === '23503') { // Foreign key violation
        throw new Error('User authentication error. Please try logging in again.');
      }
      throw new Error(`Failed to create inquiry: ${inquiryError.message}`);
    }

    if (!inquiry) {
      throw new Error('Failed to create inquiry: No data returned');
    }

    // Prepare cart items with proper number formatting
    const cartItems = cart.items.map(item => ({
      cart_inquiry_id: inquiry.id,
      name: item.name.trim(),
      description: item.description?.trim() || '',
      price: Number(item.price.toFixed(2)),
      quantity: Math.max(1, Math.round(item.quantity)), // Ensure positive integer
      category: item.category.trim()
    }));

    const { error: itemsError } = await supabase
      .from('cart_inquiry_items')
      .insert(cartItems);

    if (itemsError) {
      // Attempt to cleanup the failed inquiry
      await supabase
        .from('cart_inquiries')
        .delete()
        .match({ id: inquiry.id });

      throw new Error(`Failed to create cart items: ${itemsError.message}`);
    }

    return { success: true, data: inquiry };
  } catch (error) {
    console.error('Error submitting cart inquiry:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}