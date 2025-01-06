-- Create a function to handle inquiry deletion with proper cleanup
CREATE OR REPLACE FUNCTION delete_inquiry(inquiry_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete the inquiry and all related records will be deleted via CASCADE
  DELETE FROM public.inquiries WHERE id = inquiry_id;
END;
$$;