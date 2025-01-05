import { supabase } from '../supabase';
import type { Cart } from '../types/cart';

export async function submitCartInquiry(userId: string, cart: Cart, message: string = '') {
  try {
    // Start a transaction by creating the cart inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('cart_inquiries')
      .insert({
        user_id: userId,
        message,
        total_amount: cart.total,
        status: 'new'
      })
      .select()
      .single();

    if (inquiryError) throw inquiryError;

    // Create cart inquiry items
    const cartItems = cart.items.map(item => ({
      cart_inquiry_id: inquiry.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      category: item.category
    }));

    const { error: itemsError } = await supabase
      .from('cart_inquiry_items')
      .insert(cartItems);

    if (itemsError) throw itemsError;

    return { success: true, data: inquiry };
  } catch (error) {
    console.error('Error submitting cart inquiry:', error);
    return { success: false, error };
  }
}