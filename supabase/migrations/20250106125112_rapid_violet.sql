-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admin can view all profiles" ON public.user_profiles;

-- Create new policies with proper permissions
CREATE POLICY "Enable insert for authenticated users"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable insert for new signups"
  ON public.user_profiles
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable select for users"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable update for users"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable admin access"
  ON public.user_profiles
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Add comment explaining the policies
COMMENT ON TABLE public.user_profiles IS 
  'User profiles with RLS policies allowing creation during signup and management by authenticated users';