-- Add notes column to inquiries table
ALTER TABLE public.inquiries
ADD COLUMN notes text;

-- Add index for better performance when searching notes
CREATE INDEX idx_inquiries_notes ON public.inquiries(notes);