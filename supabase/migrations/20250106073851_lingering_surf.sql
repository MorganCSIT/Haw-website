-- Add unique constraint to user interests if table exists
DO $$ 
BEGIN
  -- Add unique constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'user_interests_user_id_item_id_key'
  ) THEN
    ALTER TABLE public.user_interests 
    ADD CONSTRAINT user_interests_user_id_item_id_key 
    UNIQUE (user_id, item_id);
  END IF;

  -- Ensure RLS is enabled
  ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;

  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can manage their own interests" ON public.user_interests;
  DROP POLICY IF EXISTS "Admin can view all interests" ON public.user_interests;

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

  -- Create indexes if they don't exist
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_interests_user_id') THEN
    CREATE INDEX idx_user_interests_user_id ON public.user_interests(user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_interests_category') THEN
    CREATE INDEX idx_user_interests_category ON public.user_interests(category);
  END IF;

END $$;