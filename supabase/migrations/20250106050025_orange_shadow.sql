-- Drop existing foreign key constraint
ALTER TABLE public.email_responses DROP CONSTRAINT IF EXISTS email_responses_inquiry_id_fkey;

-- Recreate foreign key constraint with ON DELETE CASCADE
ALTER TABLE public.email_responses 
  ADD CONSTRAINT email_responses_inquiry_id_fkey 
  FOREIGN KEY (inquiry_id) 
  REFERENCES public.inquiries(id) 
  ON DELETE CASCADE;

-- Add comment explaining the cascade behavior
COMMENT ON CONSTRAINT email_responses_inquiry_id_fkey ON public.email_responses IS 
  'Automatically deletes email responses when the parent inquiry is deleted';