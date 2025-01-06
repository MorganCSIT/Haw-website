import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { UserProfile } from '../types/profile';

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [needsProfile, setNeedsProfile] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setNeedsProfile(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) throw error;

        setProfile(data);
        // Set needsProfile if no profile exists or if required fields are missing
        setNeedsProfile(!data || !data.first_name || !data.last_name || !data.nationality);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err);
        setProfile(null);
        setNeedsProfile(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    // Subscribe to profile changes
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
            setNeedsProfile(true);
          } else {
            const newProfile = payload.new as UserProfile;
            setProfile(newProfile);
            setNeedsProfile(!newProfile || !newProfile.first_name || !newProfile.last_name || !newProfile.nationality);
          }
        }
      )
      .subscribe();

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
      setNeedsProfile(false);
      setError(null);
      return data;
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err);
      throw err;
    }
  };

  return { profile, loading, error, updateProfile, needsProfile };
}