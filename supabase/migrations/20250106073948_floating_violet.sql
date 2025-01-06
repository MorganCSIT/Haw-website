-- Drop existing foreign key if it exists
ALTER TABLE IF EXISTS public.user_profiles 
DROP CONSTRAINT IF EXISTS user_profiles_user_id_fkey;

-- Add foreign key with correct reference
ALTER TABLE public.user_profiles
ADD CONSTRAINT user_profiles_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id)
ON DELETE CASCADE;

-- Add comment explaining the relationship
COMMENT ON CONSTRAINT user_profiles_user_id_fkey ON public.user_profiles IS 
  'Links user profiles to auth.users table';

-- Add index for better join performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id 
ON public.user_profiles(user_id);