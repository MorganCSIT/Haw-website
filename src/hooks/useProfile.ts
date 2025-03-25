import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { UserProfile } from "../types/profile";

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      setProfile(data || null);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    profileData: Partial<UserProfile>
  ): Promise<void> => {
    if (!userId) return;

    try {
      // First try to update
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("user_id", userId)
        .single();

      const { error: updateError } = await supabase
        .from("user_profiles")
        .upsert({
          id: existingProfile?.id,
          user_id: userId,
          ...profileData,
          updated_at: new Date().toISOString(),
          created_at: existingProfile ? undefined : new Date().toISOString(),
        });

      if (updateError) throw updateError;

      // Refresh the profile data
      await fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return { profile, loading, error, updateProfile };
}
