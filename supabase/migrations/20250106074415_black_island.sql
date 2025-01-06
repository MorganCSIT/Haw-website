-- Create user interests table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add unique constraint
ALTER TABLE public.user_interests 
DROP CONSTRAINT IF EXISTS user_interests_user_id_item_id_key;

ALTER TABLE public.user_interests 
ADD CONSTRAINT user_interests_user_id_item_id_key 
UNIQUE (user_id, item_id);

-- Enable RLS
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own interests" ON public.user_interests;
DROP POLICY IF EXISTS "Admin can view all interests" ON public.user_interests;

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
CREATE INDEX IF NOT EXISTS idx_user_interests_user_id ON public.user_interests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interests_category ON public.user_interests(category);