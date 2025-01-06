-- Drop existing function
DROP FUNCTION IF EXISTS create_user_profile;

-- Create function with proper error handling and validation
CREATE OR REPLACE FUNCTION create_user_profile(
  profile_data jsonb,
  user_id uuid
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile_id uuid;
BEGIN
  -- Verify user exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_id) THEN
    RAISE EXCEPTION 'User does not exist in auth.users';
  END IF;

  -- Insert or update profile
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
  ON CONFLICT (user_id) 
  DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    nationality = EXCLUDED.nationality,
    languages = EXCLUDED.languages,
    phone_number = EXCLUDED.phone_number,
    specific_needs = EXCLUDED.specific_needs,
    updated_at = now()
  RETURNING id INTO profile_id;

  RETURN profile_id;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION create_user_profile TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_profile TO anon;

-- Add comment
COMMENT ON FUNCTION create_user_profile IS 
  'Creates or updates a user profile, verifying user exists in auth.users first';