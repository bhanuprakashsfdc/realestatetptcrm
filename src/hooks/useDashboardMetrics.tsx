
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface DashboardMetrics {
  totalProperties: number;
  propertiesForSale: number;
  propertiesForRent: number;
  newLeads: number;
}

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async (): Promise<DashboardMetrics> => {
      console.log('Fetching dashboard metrics...');
      
      // Fetch total properties
      const { count: totalProperties } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      // Fetch properties for sale
      const { count: propertiesForSale } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'For Sale');

      // Fetch properties for rent
      const { count: propertiesForRent } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'For Rent');

      // Fetch new leads (all leads for now, could be filtered by date)
      const { count: newLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      const metrics = {
        totalProperties: totalProperties || 0,
        propertiesForSale: propertiesForSale || 0,
        propertiesForRent: propertiesForRent || 0,
        newLeads: newLeads || 0,
      };

      console.log('Dashboard metrics fetched:', metrics);
      return metrics;
    },
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });
};
