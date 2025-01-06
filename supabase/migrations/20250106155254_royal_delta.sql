-- Add calendar sync configuration table
CREATE TABLE IF NOT EXISTS public.calendar_sync_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
  sync_url text NOT NULL,
  last_sync timestamptz,
  sync_frequency interval DEFAULT '1 hour',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.calendar_sync_config ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
  ON public.calendar_sync_config FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert/update for admin users"
  ON public.calendar_sync_config FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Create function to update sync timestamp
CREATE OR REPLACE FUNCTION update_calendar_sync_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_calendar_sync_timestamp
  BEFORE UPDATE ON public.calendar_sync_config
  FOR EACH ROW
  EXECUTE FUNCTION update_calendar_sync_timestamp();