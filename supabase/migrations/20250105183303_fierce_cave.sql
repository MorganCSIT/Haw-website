-- Drop existing view
DROP VIEW IF EXISTS public.cart_inquiries_with_users;

-- Create updated view with user profile information
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