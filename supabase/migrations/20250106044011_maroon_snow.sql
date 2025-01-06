-- Add notes column to cart_inquiries table
ALTER TABLE public.cart_inquiries 
ADD COLUMN notes text;

-- Add index for better performance when searching notes
CREATE INDEX idx_cart_inquiries_notes ON public.cart_inquiries(notes);

-- Add comment explaining the column
COMMENT ON COLUMN public.cart_inquiries.notes IS 'Admin notes for cart inquiries';