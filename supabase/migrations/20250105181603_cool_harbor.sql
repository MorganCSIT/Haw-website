/*
  # Add Cart Inquiries Table

  1. New Tables
    - `cart_inquiries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `status` (enum: new, in_progress, completed, archived)
      - `message` (text)
      - `total_amount` (decimal)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `cart_inquiry_items`
      - `id` (uuid, primary key)
      - `cart_inquiry_id` (uuid, references cart_inquiries)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `quantity` (integer)
      - `category` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for user access and admin management
*/

-- Create cart inquiry status enum
CREATE TYPE public.cart_inquiry_status AS ENUM ('new', 'in_progress', 'completed', 'archived');

-- Create cart inquiries table
CREATE TABLE public.cart_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  status cart_inquiry_status DEFAULT 'new',
  message text,
  total_amount decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart inquiry items table
CREATE TABLE public.cart_inquiry_items (
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

-- Create indexes
CREATE INDEX idx_cart_inquiries_user_id ON public.cart_inquiries(user_id);
CREATE INDEX idx_cart_inquiries_status ON public.cart_inquiries(status);
CREATE INDEX idx_cart_inquiry_items_inquiry_id ON public.cart_inquiry_items(cart_inquiry_id);