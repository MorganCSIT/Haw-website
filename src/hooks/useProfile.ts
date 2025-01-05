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
          .maybeSingle(); // Use maybeSingle instead of single to handle no results gracefully

        // Only set error if it's not a "no rows returned" error
        if (error && !error.message.includes('contains 0 rows')) {
          throw error;
        }

        setProfile(data);
      } catch (err: any) {
        setError(err);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
      return data;
    } catch (err: any) {
      setError(err);
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  return { profile, loading, error, updateProfile };
}