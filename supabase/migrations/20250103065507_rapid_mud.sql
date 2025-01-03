/*
  # Create inquiries management system

  1. New Tables
    - `inquiries`
      - Core table for all form submissions
      - Tracks basic contact info and metadata
    - `inquiry_types` 
      - Lookup table for different inquiry categories
    - `inquiry_details`
      - Stores form-specific fields
    
  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create enum for inquiry status
CREATE TYPE public.inquiry_status AS ENUM (
  'new',
  'in_progress',
  'completed',
  'archived'
);

-- Create inquiry types table
CREATE TABLE public.inquiry_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Insert standard inquiry types
INSERT INTO public.inquiry_types (name, description) VALUES
  ('property', 'Property investment inquiries'),
  ('healthcare', 'Healthcare service inquiries'),
  ('insurance', 'Insurance and legal inquiries'),
  ('vacation', 'Assisted vacation inquiries'),
  ('newsletter', 'Newsletter subscriptions'),
  ('contact', 'General contact form submissions');

-- Create main inquiries table
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_type_id uuid REFERENCES public.inquiry_types(id),
  name text NOT NULL,
  email text NOT NULL,
  status inquiry_status DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  assigned_to uuid REFERENCES auth.users(id),
  notes text
);

-- Create inquiry details table for additional fields
CREATE TABLE public.inquiry_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id),
  field_name text NOT NULL,
  field_value text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inquiry_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_details ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin full access on inquiry_types"
  ON public.inquiry_types
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');

CREATE POLICY "Admin full access on inquiries"
  ON public.inquiries
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');

CREATE POLICY "Admin full access on inquiry_details"
  ON public.inquiry_details
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'homeassistancewellness@gmail.com');

-- Create policy for inserting new inquiries
CREATE POLICY "Allow public to create inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to create inquiry details"
  ON public.inquiry_details
  FOR INSERT
  TO anon
  WITH CHECK (true);