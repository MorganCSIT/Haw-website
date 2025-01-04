-- Create email_responses table
CREATE TABLE public.email_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id),
  to_email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users" ON public.email_responses
  FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

CREATE POLICY "Enable read for authenticated users" ON public.email_responses
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'email' = 'morgankieffer@gmail.com');

-- Add index
CREATE INDEX idx_email_responses_inquiry_id ON public.email_responses(inquiry_id);