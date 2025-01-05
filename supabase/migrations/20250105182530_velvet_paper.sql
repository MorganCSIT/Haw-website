-- Create cart inquiry status enum if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cart_inquiry_status') THEN
    CREATE TYPE public.cart_inquiry_status AS ENUM ('new', 'in_progress', 'completed', 'archived');
  END IF;
END $$;

-- Create cart inquiries table
CREATE TABLE IF NOT EXISTS public.cart_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  status cart_inquiry_status DEFAULT 'new',
  message text,
  total_amount decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart inquiry items table
CREATE TABLE IF NOT EXISTS public.cart_inquiry_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_inquiry_id uuid REFERENCES public.cart_inquiries(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price decimal NOT NULL,
  quantity integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cart_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_inquiry_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own cart inquiries" ON public.cart_inquiries;
DROP POLICY IF EXISTS "Users can create own cart inquiries" ON public.cart_inquiries;
DROP POLICY IF EXISTS "Admin can view all cart inquiries" ON public.cart_inquiries;
DROP POLICY IF EXISTS "Users can view own cart inquiry items" ON public.cart_inquiry_items;
DROP POLICY IF EXISTS "Users can create cart inquiry items" ON public.cart_inquiry_items;
DROP POLICY IF EXISTS "Admin can view all cart inquiry items" ON public.cart_inquiry_items;

-- Create policies for cart_inquiries
CREATE POLICY "Users can view own cart inquiries"
  ON public.cart_inquiries
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own cart inquiries"
  ON public.cart_inquiries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all cart inquiries"
  ON public.cart_inquiries
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Create policies for cart_inquiry_items
CREATE POLICY "Users can view own cart inquiry items"
  ON public.cart_inquiry_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cart_inquiries
      WHERE id = cart_inquiry_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create cart inquiry items"
  ON public.cart_inquiry_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cart_inquiries
      WHERE id = cart_inquiry_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can view all cart inquiry items"
  ON public.cart_inquiry_items
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Create indexes if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_cart_inquiries_user_id') THEN
    CREATE INDEX idx_cart_inquiries_user_id ON public.cart_inquiries(user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_cart_inquiries_status') THEN
    CREATE INDEX idx_cart_inquiries_status ON public.cart_inquiries(status);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_cart_inquiry_items_inquiry_id') THEN
    CREATE INDEX idx_cart_inquiry_items_inquiry_id ON public.cart_inquiry_items(cart_inquiry_id);
  END IF;
END $$;