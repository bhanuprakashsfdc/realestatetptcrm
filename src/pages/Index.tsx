
import React, { useState } from 'react';
import { Home, Building, Users, TrendingUp } from 'lucide-react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { SalesReportsTable } from '@/components/dashboard/SalesReportsTable';
import { NewPropertiesList } from '@/components/dashboard/NewPropertiesList';
import { MessagesList } from '@/components/dashboard/MessagesList';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { data: metrics, isLoading, error } = useDashboardMetrics();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Helper function to calculate percentage change (placeholder for now)
  const getPercentageChange = (current: number, category: string) => {
    // For now, return some sample changes. In a real app, you'd compare with previous period
    const changes = {
      totalProperties: '+8%',
      propertiesForSale: '+12%',
      propertiesForRent: '-10%',
      newLeads: '+6%'
    };
    return changes[category as keyof typeof changes] || '+0%';
  };

  const getChangeType = (change: string): 'positive' | 'negative' => {
    return change.startsWith('+') ? 'positive' : 'negative';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex-shrink-0`}>
        <DashboardSidebar isCollapsed={sidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onToggleSidebar={toggleSidebar} />
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="metric-card">
                    <Skeleton className="h-20 w-full" />
                  </div>
                ))
              ) : error ? (
                // Error state
                <div className="col-span-4 text-center text-red-600">
                  Error loading dashboard metrics. Please try again.
                </div>
              ) : (
                // Real data
                <>
                  <MetricCard
                    title="Total properties"
                    value={metrics?.totalProperties.toString() || "0"}
                    change={getPercentageChange(metrics?.totalProperties || 0, 'totalProperties')}
                    changeType={getChangeType(getPercentageChange(metrics?.totalProperties || 0, 'totalProperties'))}
                    icon={Home}
                    iconColor="text-landify-blue"
                  />
                  <MetricCard
                    title="Properties for sale"
                    value={metrics?.propertiesForSale.toString() || "0"}
                    change={getPercentageChange(metrics?.propertiesForSale || 0, 'propertiesForSale')}
                    changeType={getChangeType(getPercentageChange(metrics?.propertiesForSale || 0, 'propertiesForSale'))}
                    icon={Building}
                    iconColor="text-green-500"
                  />
                  <MetricCard
                    title="Properties for rent"
                    value={metrics?.propertiesForRent.toString() || "0"}
                    change={getPercentageChange(metrics?.propertiesForRent || 0, 'propertiesForRent')}
                    changeType={getChangeType(getPercentageChange(metrics?.propertiesForRent || 0, 'propertiesForRent'))}
                    icon={Building}
                    iconColor="text-blue-500"
                  />
                  <MetricCard
                    title="New leads"
                    value={metrics?.newLeads.toString() || "0"}
                    change={getPercentageChange(metrics?.newLeads || 0, 'newLeads')}
                    changeType={getChangeType(getPercentageChange(metrics?.newLeads || 0, 'newLeads'))}
                    icon={Users}
                    iconColor="text-purple-500"
                  />
                </>
              )}
            </div>

            {/* Charts and Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Chart - Takes 2 columns */}
              <div className="lg:col-span-2">
                <SalesChart />
              </div>
              
              {/* New Properties - Takes 1 column */}
              <div>
                <NewPropertiesList />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Reports - Takes 2 columns */}
              <div className="lg:col-span-2">
                <SalesReportsTable />
              </div>
              
              {/* Messages - Takes 1 column */}
              <div>
                <MessagesList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
