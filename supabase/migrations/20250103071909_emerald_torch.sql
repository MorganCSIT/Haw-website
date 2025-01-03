/*
  # Fix RLS policies for form submissions

  1. Changes
    - Add policy for public read access to inquiry_types
    - Update existing policies to be more specific
    - Add indexes for better query performance

  2. Security
    - Maintain strict write control
    - Allow limited public read access
    - Ensure data isolation
*/

-- Allow public to read inquiry types
CREATE POLICY "Allow public to read inquiry types"
  ON public.inquiry_types
  FOR SELECT
  TO anon
  USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inquiry_types_name ON public.inquiry_types(name);
CREATE INDEX IF NOT EXISTS idx_inquiries_type_id ON public.inquiries(inquiry_type_id);
CREATE INDEX IF NOT EXISTS idx_inquiry_details_inquiry_id ON public.inquiry_details(inquiry_id);

-- Update existing policies to be more specific
DROP POLICY IF EXISTS "Admin full access on inquiry_types" ON public.inquiry_types;
DROP POLICY IF EXISTS "Admin full access on inquiries" ON public.inquiry_types;
DROP POLICY IF EXISTS "Admin full access on inquiry_details" ON public.inquiry_types;

CREATE POLICY "Admin manage inquiry types"
  ON public.inquiry_types
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');

CREATE POLICY "Admin manage inquiries"
  ON public.inquiries
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');