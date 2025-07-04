-- Generate a random UUID for created_by to avoid foreign key constraints
DO $$
DECLARE
    dummy_user_id UUID := gen_random_uuid();
BEGIN
    -- Insert dummy properties
    INSERT INTO public.properties (title, price, address, type, status, size, bedrooms, bathrooms, image_url, description, created_by) VALUES
    ('Luxury Villa in Beverly Hills', '$2,850,000', '1234 Sunset Boulevard, Beverly Hills, CA 90210', 'Villa', 'For Sale', '3,500 sq ft', 5, 4, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', 'This stunning luxury villa offers breathtaking views and premium finishes throughout.', dummy_user_id),
    ('Modern Downtown Condo', '$1,250,000', '567 Main Street, Downtown LA, CA 90012', 'Condo', 'For Sale', '1,800 sq ft', 3, 2, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop', 'Contemporary condo with city views and modern amenities.', dummy_user_id),
    ('Cozy Suburban Home', '$650,000', '890 Oak Avenue, Pasadena, CA 91101', 'House', 'For Sale', '2,200 sq ft', 4, 3, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop', 'Perfect family home in quiet neighborhood with great schools.', dummy_user_id),
    ('Beachfront Property', '$3,200,000', '123 Pacific Coast Highway, Malibu, CA 90265', 'House', 'For Sale', '4,200 sq ft', 6, 5, 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop', 'Stunning oceanfront property with private beach access.', dummy_user_id),
    ('City Loft', '$950,000', '456 Industrial Blvd, Arts District, CA 90013', 'Loft', 'For Rent', '1,500 sq ft', 2, 2, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'Industrial-style loft with exposed brick and high ceilings.', dummy_user_id);

    -- Insert dummy projects
    INSERT INTO public.projects (name, description, status, progress, deadline, total_tasks, completed_tasks, team_members, created_by) VALUES
    ('Sunset Plaza Development', 'Luxury residential complex with 50 units', 'Ongoing', 65, '2024-12-31', 25, 16, ARRAY['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'https://images.unsplash.com/photo-1494790108755-2616b612b1ab?w=150&h=150&fit=crop&crop=face'], dummy_user_id),
    ('Downtown Office Tower', 'Modern 20-story office building', 'Planning', 15, '2025-06-30', 45, 7, ARRAY['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'], dummy_user_id),
    ('Marina Bay Resort', 'Waterfront hotel and conference center', 'Completed', 100, '2024-01-15', 30, 30, ARRAY['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'], dummy_user_id),
    ('Green Valley Homes', 'Sustainable housing development', 'Ongoing', 45, '2024-10-30', 35, 15, ARRAY['https://images.unsplash.com/photo-1494790108755-2616b612b1ab?w=150&h=150&fit=crop&crop=face', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'], dummy_user_id);

    -- Insert dummy contacts
    INSERT INTO public.contacts (name, email, phone, company, position, type, address, notes, created_by) VALUES
    ('John Smith', 'john.smith@example.com', '+1 (555) 123-4567', 'ABC Real Estate', 'Senior Agent', 'client', '123 Business Ave, Los Angeles, CA 90210', 'Excellent track record with luxury properties', dummy_user_id),
    ('Sarah Johnson', 'sarah.johnson@techcorp.com', '+1 (555) 234-5678', 'TechCorp Industries', 'Property Manager', 'partner', '456 Tech Plaza, San Francisco, CA 94105', 'Handles commercial property acquisitions', dummy_user_id),
    ('Michael Brown', 'michael.brown@gmail.com', '+1 (555) 345-6789', 'Brown Construction', 'CEO', 'prospect', '789 Builder St, Pasadena, CA 91101', 'Interested in development opportunities', dummy_user_id),
    ('Emily Davis', 'emily.davis@investments.com', '+1 (555) 456-7890', 'Davis Investments', 'Investment Director', 'client', '321 Finance Way, Beverly Hills, CA 90210', 'Focuses on high-value property investments', dummy_user_id),
    ('Robert Wilson', 'robert.wilson@contractor.net', '+1 (555) 567-8901', 'Wilson Contractors', 'Project Manager', 'partner', '654 Construction Blvd, Long Beach, CA 90802', 'Reliable contractor for large projects', dummy_user_id);
END $$;