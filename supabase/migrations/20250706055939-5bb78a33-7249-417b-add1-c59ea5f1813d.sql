
-- Update RLS policies for contacts to allow public access for now
-- This will enable contact creation and viewing without authentication requirements

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Staff and admins can insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Staff and admins can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Staff and admins can delete contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can view all contacts" ON public.contacts;

-- Create more permissive policies for contacts
CREATE POLICY "Allow public read access to contacts" 
  ON public.contacts 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert access to contacts" 
  ON public.contacts 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update access to contacts" 
  ON public.contacts 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete access to contacts" 
  ON public.contacts 
  FOR DELETE 
  USING (true);
