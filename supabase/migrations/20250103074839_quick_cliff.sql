/*
  # Database Structure Update
  
  1. Drop existing tables and types
  2. Create new tables with specific fields for each inquiry type
  3. Set up security policies
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.inquiry_details CASCADE;
DROP TABLE IF EXISTS public.inquiry_types CASCADE;
DROP TABLE IF EXISTS public.inquiries CASCADE;

-- Drop existing enum if it exists
DROP TYPE IF EXISTS public.inquiry_status;

-- Create enum for inquiry status
CREATE TYPE public.inquiry_status AS ENUM ('new', 'in_progress', 'completed', 'archived');

-- Main inquiries table
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  status inquiry_status DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Property investment inquiries
CREATE TABLE public.property_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id),
  budget decimal,
  purpose text,
  property_type text,
  services text[],
  additional_requirements text
);

-- Healthcare inquiries
CREATE TABLE public.healthcare_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id),
  care_package text,
  mobility_level text,
  medical_conditions text[],
  care_timeline text,
  additional_requirements text
);

-- Vacation inquiries
CREATE TABLE public.vacation_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id),
  preferred_experience text,
  preferred_dates daterange,
  mobility_requirements text,
  additional_requirements text
);

-- Insurance inquiries
CREATE TABLE public.insurance_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id),
  insurance_type text,
  coverage_level text,
  additional_requirements text
);

-- Newsletter subscriptions
CREATE TABLE public.newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id),
  subscription_type text DEFAULT 'general'
);

-- Contact form inquiries
CREATE TABLE public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id),
  interest text,
  message text
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.healthcare_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacation_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for public submissions
CREATE POLICY "Allow public submissions" ON public.inquiries
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Policies for admin access
CREATE POLICY "Admin full access" ON public.inquiries
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Create similar policies for all inquiry type tables
DO $$ 
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT unnest(ARRAY[
      'property_inquiries',
      'healthcare_inquiries',
      'vacation_inquiries',
      'insurance_inquiries',
      'newsletter_subscriptions',
      'contact_inquiries'
    ])
  LOOP
    EXECUTE format('
      CREATE POLICY "Allow public submissions" ON public.%I
        FOR INSERT TO anon, authenticated WITH CHECK (true);
      
      CREATE POLICY "Admin full access" ON public.%I
        FOR ALL TO authenticated
        USING (auth.jwt() ->> ''email'' = ''morgankieffer@gmail.com'')
        WITH CHECK (auth.jwt() ->> ''email'' = ''morgankieffer@gmail.com'');
    ', table_name, table_name);
  END LOOP;
END $$;

-- Add indexes for better performance
CREATE INDEX idx_inquiries_email ON public.inquiries(email);
CREATE INDEX idx_inquiries_category ON public.inquiries(category);
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at);