import { supabase } from '../supabase';
import type { Cart, CartItem } from '../types/cart';

// Validate cart item before submission
function validateCartItem(item: CartItem): boolean {
  return (
    typeof item.price === 'number' && 
    !isNaN(item.price) && 
    item.price > 0 &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  );
}

export async function submitCartInquiry(userId: string, cart: Cart, message: string = '') {
  try {
    // Validate all items before submission
    const invalidItems = cart.items.filter(item => !validateCartItem(item));
    if (invalidItems.length > 0) {
      throw new Error('Invalid items in cart: Some items have invalid prices or quantities');
    }

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

    // Create cart inquiry items with validated data
    const cartItems = cart.items.map(item => ({
      cart_inquiry_id: inquiry.id,
      name: item.name,
      description: item.description,
      price: Number(item.price), // Ensure price is a number
      quantity: Number(item.quantity), // Ensure quantity is a number
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