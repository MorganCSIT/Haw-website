-- Create a view to join cart inquiries with user emails
CREATE OR REPLACE VIEW public.cart_inquiries_with_users AS
SELECT 
  ci.*,
  au.email as user_email,
  ci_items.items
FROM public.cart_inquiries ci
LEFT JOIN auth.users au ON ci.user_id = au.id
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
  'View that combines cart inquiries with user emails and aggregated items';