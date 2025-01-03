/*
  # Fix RLS policies for inquiries and details

  1. Changes
    - Drop and recreate all policies with proper permissions
    - Enable RLS on all tables
    - Add policies for anonymous submissions
    - Add admin access policies

  2. Security
    - Allow anonymous users to submit inquiries
    - Maintain admin-only access for sensitive operations
    - Ensure proper data isolation
*/

-- First, enable RLS on all tables
ALTER TABLE public.inquiry_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_details ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow public to read inquiry types" ON public.inquiry_types;
DROP POLICY IF EXISTS "Admin manage inquiry types" ON public.inquiry_types;
DROP POLICY IF EXISTS "Allow anonymous submissions" ON public.inquiries;
DROP POLICY IF EXISTS "Admin access inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow anonymous detail submissions" ON public.inquiry_details;
DROP POLICY IF EXISTS "Admin access inquiry details" ON public.inquiry_details;

-- Create policies for inquiry_types
CREATE POLICY "Public read inquiry types"
  ON public.inquiry_types
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin manage inquiry types"
  ON public.inquiry_types
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');

-- Create policies for inquiries
CREATE POLICY "Public create inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admin manage inquiries"
  ON public.inquiries
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');

-- Create policies for inquiry_details
CREATE POLICY "Public create inquiry details"
  ON public.inquiry_details
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admin manage inquiry details"
  ON public.inquiry_details
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_inquiry_details_created_at ON public.inquiry_details(created_at);