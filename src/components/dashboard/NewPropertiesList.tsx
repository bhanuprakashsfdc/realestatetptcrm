
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface Property {
  id: string;
  title: string;
  price: string;
  address: string | null;
  image_url: string | null;
  created_at: string;
}

export const NewPropertiesList: React.FC = () => {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['recent-properties'],
    queryFn: async (): Promise<Property[]> => {
      console.log('Fetching recent properties...');
      
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, price, address, image_url, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }

      console.log('Recent properties fetched:', data);
      return data || [];
    },
  });

  if (error) {
    return (
      <div className="dashboard-card">
        <div className="text-center text-red-600">
          Error loading properties
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">New Properties</h3>
        <button className="text-sm text-landify-blue hover:text-landify-blue-light font-medium">
          All Properties
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-3">
              <Skeleton className="w-16 h-12 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))
        ) : properties && properties.length > 0 ? (
          // Real data
          properties.map((property) => (
            <div key={property.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <img 
                src={property.image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=60&fit=crop'} 
                alt={property.title}
                className="w-16 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{property.price}</div>
                <div className="text-sm text-gray-500">{property.address || property.title}</div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          // No data state
          <div className="text-center text-gray-500 py-8">
            No properties found
          </div>
        )}
      </div>
    </div>
  );
};
