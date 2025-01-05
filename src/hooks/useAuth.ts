import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { AuthState } from '../lib/types/auth';

interface AuthStore extends AuthState {
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  isEmailVerified: () => boolean;
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ user: session?.user ?? null, loading: false });
      
      supabase.auth.onAuthStateChange((_event, session) => {
        // Only set user if email is verified
        const user = session?.user && session.user.email_confirmed_at
          ? session.user
          : null;
        set({ user });
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ user: null, loading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  isEmailVerified: () => {
    const { user } = get();
    return Boolean(user?.email_confirmed_at);
  }
}));