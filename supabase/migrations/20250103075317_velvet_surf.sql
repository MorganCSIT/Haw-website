/*
  # Fix RLS policies for form submissions

  1. Changes
    - Drop existing policies
    - Add new policies for public submissions
    - Add policies for related tables
    - Fix admin access policies
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
    EXECUTE format('DROP POLICY IF EXISTS "Allow public submissions" ON public.%I', table_name);
    EXECUTE format('DROP POLICY IF EXISTS "Admin full access" ON public.%I', table_name);
  END LOOP;
END $$;

-- Create policies for main inquiries table
CREATE POLICY "Allow anonymous submissions"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated submissions"
  ON public.inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin manage inquiries"
  ON public.inquiries
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Create policies for all related tables
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
    -- Allow anonymous submissions
    EXECUTE format('
      CREATE POLICY "Allow anonymous submissions" ON public.%I
        FOR INSERT
        TO anon
        WITH CHECK (true)
    ', table_name);

    -- Allow authenticated submissions
    EXECUTE format('
      CREATE POLICY "Allow authenticated submissions" ON public.%I
        FOR INSERT
        TO authenticated
        WITH CHECK (true)
    ', table_name);

    -- Admin access
    EXECUTE format('
      CREATE POLICY "Admin manage all" ON public.%I
        FOR ALL
        TO authenticated
        USING (auth.jwt() ->> ''email'' = ''morgankieffer@gmail.com'')
        WITH CHECK (auth.jwt() ->> ''email'' = ''morgankieffer@gmail.com'')
    ', table_name);
  END LOOP;
END $$;