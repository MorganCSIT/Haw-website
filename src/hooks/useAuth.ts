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
      
      if (session?.refresh_token) {
        // Only set user if we have a valid refresh token
        set({ user: session.user ?? null, loading: false });
      } else {
        // Clear state if no refresh token
        set({ user: null, loading: false });
        return;
      }
      
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
          set({ user: null, loading: false });
          return;
        }

        // Only set user if email is verified and we have a refresh token
        const user = session?.user && session.user.email_confirmed_at && session.refresh_token
          ? session.user
          : null;
        set({ user, loading: false });

        // If session exists but is about to expire, refresh it
        if (session?.expires_at) {
          const expiresAt = new Date(session.expires_at * 1000);
          const now = new Date();
          const timeUntilExpiry = expiresAt.getTime() - now.getTime();
          
          // If session expires in less than 5 minutes, refresh it
          if (timeUntilExpiry < 300000) {
            try {
              const { data: { session: newSession }, error } = await supabase.auth.refreshSession();
              if (!error && newSession) {
                set({ user: newSession.user });
              }
            } catch (error) {
              console.error('Failed to refresh session:', error);
              // On refresh error, sign out to prevent invalid state
              await supabase.auth.signOut();
              set({ user: null, loading: false });
            }
          }
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Auth initialization error:', error);
      // On any error, clear state and sign out
      await supabase.auth.signOut();
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