
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Phone, Mail, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LeadModal } from '@/components/leads/LeadModal';
import { useToast } from '@/hooks/use-toast';

const LeadsList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      property_type: 'Luxury Homes',
      budget_min: 2000000,
      budget_max: 3000000,
      location: 'Beverly Hills',
      score: 85,
      notes: 'Interested in luxury properties with ocean view',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      status: 'New',
      source: 'Referral',
      property_type: 'Family Homes',
      budget_min: 800000,
      budget_max: 1200000,
      location: 'Manhattan Beach',
      score: 72,
      notes: 'Looking for family-friendly neighborhood',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 456-7890',
      status: 'Converted',
      source: 'Social Media',
      property_type: 'Investment Properties',
      budget_min: 1500000,
      budget_max: 2500000,
      location: 'Downtown LA',
      score: 92,
      notes: 'Investor looking for rental properties',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateLead = () => {
    setModalMode('create');
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead: any) => {
    setModalMode('edit');
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleSubmitLead = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (modalMode === 'create') {
        toast({
          title: "Success",
          description: "Lead created successfully!",
        });
      } else {
        toast({
          title: "Success",
          description: "Lead updated successfully!",
        });
      }
      
      setIsModalOpen(false);
      setSelectedLead(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex-shrink-0`}>
        <DashboardSidebar isCollapsed={sidebarCollapsed} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Leads</h1>
              <Button 
                onClick={handleCreateLead}
                className="bg-landify-blue hover:bg-landify-blue-light w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Lead
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {leads.map((lead) => (
                <Card key={lead.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                          <AvatarImage src={lead.avatar} />
                          <AvatarFallback className="bg-landify-blue text-white text-sm">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{lead.name}</h3>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditLead(lead)}
                          className="flex-shrink-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{lead.phone}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Source:</span>
                          <p className="font-medium truncate">{lead.source}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <p className="font-medium truncate">{lead.property_type}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Budget:</span>
                          <p className="font-medium">
                            ${(lead.budget_min / 1000000).toFixed(1)}M - ${(lead.budget_max / 1000000).toFixed(1)}M
                          </p>
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

      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitLead}
        initialData={selectedLead}
        isLoading={isLoading}
        mode={modalMode}
      />
    </div>
  );
};

export default LeadsList;
