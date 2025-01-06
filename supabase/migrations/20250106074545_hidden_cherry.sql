-- Drop existing table if it exists
DROP TABLE IF EXISTS public.user_interests;

-- Create user interests table
CREATE TABLE public.user_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id text NOT NULL,
  item_name text NOT NULL,
  item_description text,
  item_price decimal NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_id)
);

-- Enable RLS
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own interests"
  ON public.user_interests
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all interests"
  ON public.user_interests
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Create indexes
CREATE INDEX idx_user_interests_user_id ON public.user_interests(user_id);
CREATE INDEX idx_user_interests_category ON public.user_interests(category);
CREATE INDEX idx_user_interests_created_at ON public.user_interests(created_at);

-- Add comments
COMMENT ON TABLE public.user_interests IS 'Stores user interests across different categories (property, healthcare, etc.)';
COMMENT ON CONSTRAINT user_interests_user_id_item_id_key ON public.user_interests IS 'Ensures a user cannot have duplicate interests for the same item';