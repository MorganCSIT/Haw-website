import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { UserProfile } from '../types/profile';

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) {
          // Only set error if it's not a "no rows returned" error
          if (!error.message.includes('contains 0 rows')) {
            throw error;
          }
        }

        setProfile(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    // Set up real-time subscription for profile updates
    const subscription = supabase
      .channel('profile_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setProfile(null);
          } else {
            setProfile(payload.new as UserProfile);
          }
        }
      )
      .subscribe();

    fetchProfile();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!userId) throw new Error('No user ID provided');

      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      setError(null);
      return data;
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err);
      throw err;
    }
  };

  return { profile, loading, error, updateProfile };
}