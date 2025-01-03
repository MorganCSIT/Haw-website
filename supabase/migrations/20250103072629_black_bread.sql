/*
  # Add admin view policies
  
  1. Changes
    - Add policies for viewing data in Supabase dashboard
    - Enable admin access to all tables
    
  2. Security
    - Only admin can view all submissions
    - Maintain existing public submission policies
*/

-- Add admin view policies for inquiries
CREATE POLICY "Admin view all inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');

-- Add admin view policies for inquiry details  
CREATE POLICY "Admin view all inquiry details"
  ON public.inquiry_details
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');