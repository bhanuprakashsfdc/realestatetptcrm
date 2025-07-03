-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  address TEXT,
  type TEXT,
  status TEXT DEFAULT 'For Sale',
  size TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  image_url TEXT,
  description TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Planning',
  progress INTEGER DEFAULT 0,
  deadline DATE,
  total_tasks INTEGER DEFAULT 0,
  completed_tasks INTEGER DEFAULT 0,
  team_members TEXT[], -- JSON array of team member avatars
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on properties table
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Enable RLS on projects table  
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for properties
CREATE POLICY "Allow public read access to properties" ON public.properties
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to properties" ON public.properties
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to properties" ON public.properties
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to properties" ON public.properties
  FOR DELETE USING (true);

-- Create RLS policies for projects
CREATE POLICY "Allow public read access to projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to projects" ON public.projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to projects" ON public.projects
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to projects" ON public.projects
  FOR DELETE USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();