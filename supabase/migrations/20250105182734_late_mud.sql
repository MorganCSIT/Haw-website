-- Create a view to join cart inquiries with user emails
CREATE OR REPLACE VIEW public.cart_inquiries_with_users AS
SELECT 
  ci.*,
  au.email as user_email
FROM public.cart_inquiries ci
LEFT JOIN auth.users au ON ci.user_id = au.id;

-- Grant access to the view
GRANT SELECT ON public.cart_inquiries_with_users TO authenticated;

-- Create policy for the view
CREATE POLICY "Admin can view all cart inquiries with users"
  ON public.cart_inquiries_with_users
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');