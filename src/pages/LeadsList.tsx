
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Phone, Mail, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const LeadsList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const leads = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      status: 'In Progress',
      source: 'Website Inquiry',
      interest: 'Luxury Homes',
      budget: '$2M - $3M',
      score: 85,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      status: 'New',
      source: 'Referral',
      interest: 'Family Homes',
      budget: '$800K - $1.2M',
      score: 72,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 456-7890',
      status: 'Converted',
      source: 'Social Media',
      interest: 'Investment Properties',
      budget: '$1.5M - $2.5M',
      score: 92,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Converted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex-shrink-0`}>
        <DashboardSidebar isCollapsed={sidebarCollapsed} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
              <Button className="bg-landify-blue hover:bg-landify-blue-light">
                <Plus className="w-4 h-4 mr-2" />
                Add New Lead
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map((lead) => (
                <Card key={lead.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={lead.avatar} />
                          <AvatarFallback className="bg-landify-blue text-white">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {lead.phone}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Source:</span>
                          <p className="font-medium">{lead.source}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Interest:</span>
                          <p className="font-medium">{lead.interest}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Budget:</span>
                          <p className="font-medium">{lead.budget}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Score:</span>
                          <p className="font-medium text-landify-blue">{lead.score}</p>
                        </div>
                      </div>

                      <Link to={`/leads/${lead.id}`}>
                        <Button variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeadsList;
