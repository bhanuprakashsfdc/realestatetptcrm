
import React, { useState } from 'react';
import { Home, Building, Users, TrendingUp } from 'lucide-react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { SalesReportsTable } from '@/components/dashboard/SalesReportsTable';
import { NewPropertiesList } from '@/components/dashboard/NewPropertiesList';
import { MessagesList } from '@/components/dashboard/MessagesList';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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
              <MetricCard
                title="Total properties"
                value="59"
                change="+8%"
                changeType="positive"
                icon={Home}
                iconColor="text-landify-blue"
              />
              <MetricCard
                title="Properties for sale"
                value="23"
                change="+12%"
                changeType="positive"
                icon={Building}
                iconColor="text-green-500"
              />
              <MetricCard
                title="Properties for rent"
                value="36"
                change="-10%"
                changeType="negative"
                icon={Building}
                iconColor="text-blue-500"
              />
              <MetricCard
                title="New leads"
                value="320"
                change="+6%"
                changeType="positive"
                icon={Users}
                iconColor="text-purple-500"
              />
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
