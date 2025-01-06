-- Drop existing foreign key constraints
ALTER TABLE public.insurance_inquiries DROP CONSTRAINT insurance_inquiries_inquiry_id_fkey;
ALTER TABLE public.property_inquiries DROP CONSTRAINT property_inquiries_inquiry_id_fkey;
ALTER TABLE public.healthcare_inquiries DROP CONSTRAINT healthcare_inquiries_inquiry_id_fkey;
ALTER TABLE public.vacation_inquiries DROP CONSTRAINT vacation_inquiries_inquiry_id_fkey;
ALTER TABLE public.newsletter_subscriptions DROP CONSTRAINT newsletter_subscriptions_inquiry_id_fkey;
ALTER TABLE public.contact_inquiries DROP CONSTRAINT contact_inquiries_inquiry_id_fkey;

-- Recreate foreign key constraints with ON DELETE CASCADE
ALTER TABLE public.insurance_inquiries 
  ADD CONSTRAINT insurance_inquiries_inquiry_id_fkey 
  FOREIGN KEY (inquiry_id) 
  REFERENCES public.inquiries(id) 
  ON DELETE CASCADE;

ALTER TABLE public.property_inquiries 
  ADD CONSTRAINT property_inquiries_inquiry_id_fkey 
  FOREIGN KEY (inquiry_id) 
  REFERENCES public.inquiries(id) 
  ON DELETE CASCADE;

ALTER TABLE public.healthcare_inquiries 
  ADD CONSTRAINT healthcare_inquiries_inquiry_id_fkey 
  FOREIGN KEY (inquiry_id) 
  REFERENCES public.inquiries(id) 
  ON DELETE CASCADE;

ALTER TABLE public.vacation_inquiries 
  ADD CONSTRAINT vacation_inquiries_inquiry_id_fkey 
  FOREIGN KEY (inquiry_id) 
  REFERENCES public.inquiries(id) 
  ON DELETE CASCADE;

ALTER TABLE public.newsletter_subscriptions 
  ADD CONSTRAINT newsletter_subscriptions_inquiry_id_fkey 
  FOREIGN KEY (inquiry_id) 
  REFERENCES public.inquiries(id) 
  ON DELETE CASCADE;

ALTER TABLE public.contact_inquiries 
  ADD CONSTRAINT contact_inquiries_inquiry_id_fkey 
  FOREIGN KEY (inquiry_id) 
  REFERENCES public.inquiries(id) 
  ON DELETE CASCADE;