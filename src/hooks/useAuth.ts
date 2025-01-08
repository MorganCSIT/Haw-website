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
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      set({ user: session?.user ?? null, loading: false });
      
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        // Only set user if email is verified
        const user = session?.user && session.user.email_confirmed_at
          ? session.user
          : null;
        set({ user, loading: false });

        // If session exists but is about to expire, refresh it
        if (session && session.expires_at) {
          const expiresAt = new Date(session.expires_at * 1000);
          const now = new Date();
          const timeUntilExpiry = expiresAt.getTime() - now.getTime();
          
          // If session expires in less than 5 minutes, refresh it
          if (timeUntilExpiry < 300000) {
            const { data: { session: newSession }, error } = await supabase.auth.refreshSession();
            if (!error && newSession) {
              set({ user: newSession.user });
            }
          }
        }
      });

      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
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