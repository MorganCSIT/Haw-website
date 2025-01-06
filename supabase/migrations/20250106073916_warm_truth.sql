-- Drop existing policies first
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can manage their own interests" ON public.user_interests;
  DROP POLICY IF EXISTS "Admin can view all interests" ON public.user_interests;
END $$;

-- Ensure RLS is enabled
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;

-- Recreate policies
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

-- Add indexes if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_interests_user_id') THEN
    CREATE INDEX idx_user_interests_user_id ON public.user_interests(user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_interests_category') THEN
    CREATE INDEX idx_user_interests_category ON public.user_interests(category);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_interests_created_at') THEN
    CREATE INDEX idx_user_interests_created_at ON public.user_interests(created_at);
  END IF;
END $$;

-- Add comment explaining the table
COMMENT ON TABLE public.user_interests IS 'Stores user interests across different categories (property, healthcare, etc.)';