-- Drop existing view that depends on user_profiles
DROP VIEW IF EXISTS public.cart_inquiries_with_users;

-- Drop existing user_profiles table
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Create user_profiles table
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  nationality text,
  languages text,
  marital_status text,
  date_of_birth date,
  phone_number text,
  emergency_contact text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all profiles"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Create indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_user_profiles_created_at ON public.user_profiles(created_at);

-- Add comments
COMMENT ON TABLE public.user_profiles IS 'Stores additional information about users';
COMMENT ON COLUMN public.user_profiles.user_id IS 'References the auth.users table';

-- Recreate the cart inquiries view with user profiles
CREATE OR REPLACE VIEW public.cart_inquiries_with_users AS
SELECT 
  ci.*,
  au.email as user_email,
  up.first_name,
  up.last_name,
  up.nationality,
  up.languages,
  up.marital_status,
  up.date_of_birth,
  up.phone_number,
  up.emergency_contact,
  up.address,
  ci_items.items
FROM public.cart_inquiries ci
LEFT JOIN auth.users au ON ci.user_id = au.id
LEFT JOIN public.user_profiles up ON ci.user_id = up.user_id
LEFT JOIN LATERAL (
  SELECT 
    cart_inquiry_id,
    json_agg(json_build_object(
      'id', cii.id,
      'name', cii.name,
      'description', cii.description,
      'price', cii.price,
      'quantity', cii.quantity,
      'category', cii.category,
      'created_at', cii.created_at
    )) as items
  FROM public.cart_inquiry_items cii
  WHERE cii.cart_inquiry_id = ci.id
  GROUP BY cart_inquiry_id
) ci_items ON true;

-- Grant access to the view
GRANT SELECT ON public.cart_inquiries_with_users TO authenticated;

-- Add comment explaining the view
COMMENT ON VIEW public.cart_inquiries_with_users IS 
  'View that combines cart inquiries with user information (email and profile) and aggregated items';