/*
  # Fix RLS policies for form submissions

  1. Changes
    - Drop existing policies
    - Create new policies that properly allow anonymous submissions
    - Add policies for related tables
    - Enable RLS on all tables
  
  2. Security
    - Allow anonymous submissions
    - Restrict admin access to specific email
    - Enable row level security
*/

-- Drop existing policies
DO $$ 
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT unnest(ARRAY[
      'inquiries',
      'property_inquiries',
      'healthcare_inquiries',
      'vacation_inquiries',
      'insurance_inquiries',
      'newsletter_subscriptions',
      'contact_inquiries'
    ])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Allow anonymous submissions" ON public.%I', table_name);
    EXECUTE format('DROP POLICY IF EXISTS "Allow authenticated submissions" ON public.%I', table_name);
    EXECUTE format('DROP POLICY IF EXISTS "Admin manage all" ON public.%I', table_name);
  END LOOP;
END $$;

-- Enable RLS on all tables
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.healthcare_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacation_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for main inquiries table
CREATE POLICY "Enable insert for anonymous users"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for anonymous users"
  ON public.inquiries
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Enable all for authenticated admin"
  ON public.inquiries
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Create policies for related tables
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
    -- Allow anonymous inserts
    EXECUTE format('
      CREATE POLICY "Enable insert for anonymous users" ON public.%I
        FOR INSERT
        TO anon
        WITH CHECK (true)
    ', table_name);

    -- Allow anonymous reads
    EXECUTE format('
      CREATE POLICY "Enable read for anonymous users" ON public.%I
        FOR SELECT
        TO anon
        USING (true)
    ', table_name);

    -- Admin access
    EXECUTE format('
      CREATE POLICY "Enable all for authenticated admin" ON public.%I
        FOR ALL
        TO authenticated
        USING (auth.jwt() ->> ''email'' = ''morgankieffer@gmail.com'')
        WITH CHECK (auth.jwt() ->> ''email'' = ''morgankieffer@gmail.com'')
    ', table_name);
  END LOOP;
END $$;