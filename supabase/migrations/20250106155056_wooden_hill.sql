-- Add calendar_sync_url to properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  calendar_sync_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
  ON public.properties FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert/update for admin users"
  ON public.properties FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Create function to fetch and parse iCal data
CREATE OR REPLACE FUNCTION fetch_property_calendar(property_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  calendar_url text;
  result jsonb;
BEGIN
  -- Get calendar URL for property
  SELECT calendar_sync_url INTO calendar_url
  FROM public.properties
  WHERE id = property_id;

  IF calendar_url IS NULL THEN
    RETURN jsonb_build_object('error', 'No calendar URL configured');
  END IF;

  -- Return calendar data
  RETURN jsonb_build_object(
    'property_id', property_id,
    'calendar_url', calendar_url
  );
END;
$$;