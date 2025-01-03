/*
  # Update Admin Email Access

  Updates the admin email address in RLS policies to grant dashboard access to the new administrator.

  1. Changes
    - Update admin email in all relevant policies
    - Preserve existing policy structure and security
*/

-- Drop existing admin policies
DROP POLICY IF EXISTS "Admin view all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admin view all inquiry details" ON public.inquiry_details;

-- Recreate policies with new admin email
CREATE POLICY "Admin view all inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

CREATE POLICY "Admin view all inquiry details"
  ON public.inquiry_details
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');