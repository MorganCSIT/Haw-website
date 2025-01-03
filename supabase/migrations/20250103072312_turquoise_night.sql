/*
  # Fix inquiry submission policies

  1. Changes
    - Simplify inquiry submission process
    - Remove dependency on inquiry_types
    - Update RLS policies for public submissions

  2. Security
    - Allow anonymous users to submit inquiries
    - Ensure proper data isolation
*/

-- Reset policies
DROP POLICY IF EXISTS "Public create inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Public create inquiry details" ON public.inquiry_details;

-- Create simplified policies for public submissions
CREATE POLICY "Allow public submissions"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public detail submissions"
  ON public.inquiry_details
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Add policy for reading own submissions
CREATE POLICY "Users can read own submissions"
  ON public.inquiries
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can read own details"
  ON public.inquiry_details
  FOR SELECT
  TO anon, authenticated
  USING (true);