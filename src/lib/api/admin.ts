import { supabase } from '../supabase';

export async function deleteInquiry(id: string) {
  try {
    // Start a transaction by disabling RLS temporarily
    const { error: rpcError } = await supabase.rpc('delete_inquiry', { inquiry_id: id });
    
    if (rpcError) throw rpcError;
    return { success: true };
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return { success: false, error };
  }
}

export async function deleteCartInquiry(id: string) {
  try {
    // Cart inquiries have ON DELETE CASCADE set up by default
    const { error } = await supabase
      .from('cart_inquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting cart inquiry:', error);
    return { success: false, error };
  }
}