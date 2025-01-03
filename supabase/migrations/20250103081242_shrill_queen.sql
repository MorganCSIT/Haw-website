-- Modify vacation_inquiries table to use text for dates instead of daterange
ALTER TABLE public.vacation_inquiries 
  DROP COLUMN preferred_dates,
  ADD COLUMN preferred_dates text;

-- Add comment explaining the change
COMMENT ON COLUMN public.vacation_inquiries.preferred_dates IS 
  'Preferred dates in text format (e.g., "June 2024", "15-30 July 2024")';