
-- Enable RLS on leads table (if not already enabled)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view leads (you can restrict this later)
CREATE POLICY "Allow public read access to leads" ON public.leads
  FOR SELECT USING (true);

-- Create policy to allow anyone to insert leads (you can restrict this later)
CREATE POLICY "Allow public insert access to leads" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to update leads (you can restrict this later)
CREATE POLICY "Allow public update access to leads" ON public.leads
  FOR UPDATE USING (true);

-- Create policy to allow anyone to delete leads (you can restrict this later)
CREATE POLICY "Allow public delete access to leads" ON public.leads
  FOR DELETE USING (true);
