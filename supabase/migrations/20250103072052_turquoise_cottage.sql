/*
  # Fix RLS policies for inquiries and details

  1. Changes
    - Add policies for public insert access to inquiries and details
    - Update existing policies to be more specific
    - Ensure proper data isolation

  2. Security
    - Allow anonymous users to submit inquiries
    - Maintain admin-only access for sensitive operations
    - Prevent unauthorized access to other users' data
*/

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Allow public to create inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public to create inquiry details" ON public.inquiry_details;
DROP POLICY IF EXISTS "Admin manage inquiries" ON public.inquiries;

-- Create new policies for inquiries
CREATE POLICY "Allow anonymous submissions"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admin access inquiries"
  ON public.inquiries
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');

-- Create policies for inquiry details
CREATE POLICY "Allow anonymous detail submissions"
  ON public.inquiry_details
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admin access inquiry details"
  ON public.inquiry_details
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');