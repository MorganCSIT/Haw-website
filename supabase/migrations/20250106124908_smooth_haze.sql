-- Add specific_needs column to user_profiles
ALTER TABLE public.user_profiles
ADD COLUMN specific_needs text;

-- Add comment explaining the column
COMMENT ON COLUMN public.user_profiles.specific_needs IS 
  'Specific needs, health concerns, or requirements of the user';