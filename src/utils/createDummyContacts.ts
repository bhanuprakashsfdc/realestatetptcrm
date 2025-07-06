
import { supabase } from '@/integrations/supabase/client';

export const createDummyContacts = async () => {
  const dummyContacts = [
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc',
      position: 'CEO',
      type: 'client',
      address: '123 Business Ave, New York, NY 10001',
      notes: 'High-value client interested in luxury properties',
      created_by: crypto.randomUUID()
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.j@realestate.com',
      phone: '+1 (555) 987-6543',
      company: 'Johnson Real Estate',
      position: 'Senior Agent',
      type: 'partner',
      address: '456 Market Street, San Francisco, CA 94102',
      notes: 'Reliable partner for referrals',
      created_by: crypto.randomUUID()
    },
    {
      name: 'Michael Chen',
      email: 'mchen@startup.io',
      phone: '+1 (555) 456-7890',
      company: 'InnovateNow',
      position: 'Founder',
      type: 'prospect',
      address: '789 Innovation Drive, Austin, TX 73301',
      notes: 'Potential client looking for office space',
      created_by: crypto.randomUUID()
    },
    {
      name: 'Emily Rodriguez',
      email: 'emily.r@vendor.com',
      phone: '+1 (555) 321-0987',
      company: 'Property Services LLC',
      position: 'Manager',
      type: 'vendor',
      address: '321 Service Road, Miami, FL 33101',
      notes: 'Reliable vendor for property maintenance',
      created_by: crypto.randomUUID()
    },
    {
      name: 'David Wilson',
      email: 'dwilson@consulting.com',
      phone: '+1 (555) 654-3210',
      company: 'Wilson Consulting',
      position: 'Principal Consultant',
      type: 'client',
      address: '987 Executive Blvd, Chicago, IL 60601',
      notes: 'VIP client with multiple property investments',
      created_by: crypto.randomUUID()
    }
  ];

  try {
    console.log('Creating dummy contacts...');
    
    const { data, error } = await supabase
      .from('contacts')
      .insert(dummyContacts)
      .select();

    if (error) {
      console.error('Error creating dummy contacts:', error);
      throw error;
    }

    console.log('Dummy contacts created successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to create dummy contacts:', error);
    throw error;
  }
};
