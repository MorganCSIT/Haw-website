-- Create a function to safely create user profile
CREATE OR REPLACE FUNCTION create_user_profile(
  user_id uuid,
  profile_data jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Wait briefly to ensure auth.users record exists
  PERFORM pg_sleep(0.5);
  
  -- Insert the profile
  INSERT INTO public.user_profiles (
    user_id,
    first_name,
    last_name,
    nationality,
    languages,
    phone_number,
    specific_needs
  ) VALUES (
    user_id,
    profile_data->>'first_name',
    profile_data->>'last_name',
    profile_data->>'nationality',
    profile_data->>'languages',
    profile_data->>'phone_number',
    profile_data->>'specific_needs'
  )
  ON CONFLICT (user_id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    nationality = EXCLUDED.nationality,
    languages = EXCLUDED.languages,
    phone_number = EXCLUDED.phone_number,
    specific_needs = EXCLUDED.specific_needs,
    updated_at = now();
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_user_profile TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_profile TO anon;

-- Add comment explaining the function
COMMENT ON FUNCTION create_user_profile IS 
  'Creates or updates a user profile with a brief delay to ensure auth user exists';