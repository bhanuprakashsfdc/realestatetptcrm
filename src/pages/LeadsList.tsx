
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import { supabase } from '@/integrations/supabase/client';

const LeadsList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Fetch leads from Supabase
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      console.log('Fetching leads from Supabase...');
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching leads:', error);
        throw error;
      }
      
      console.log('Fetched leads:', data);
      return data || [];
    },
  });

  // Create lead mutation
  const createLeadMutation = useMutation({
    mutationFn: async (leadData: any) => {
      console.log('Creating lead:', leadData);
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          ...leadData,
          created_by: '00000000-0000-0000-0000-000000000000' // Temporary user ID until auth is implemented
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating lead:', error);
        throw error;
      }

      console.log('Created lead:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Success",
        description: "Lead created successfully!",
      });
      setIsModalOpen(false);
      setSelectedLead(null);
    },
    onError: (error) => {
      console.error('Create lead error:', error);
      toast({
        title: "Error",
        description: "Failed to create lead. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update lead mutation
  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, ...leadData }: any) => {
      console.log('Updating lead:', id, leadData);
      const { data, error } = await supabase
        .from('leads')
        .update(leadData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating lead:', error);
        throw error;
      }

      console.log('Updated lead:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Success",
        description: "Lead updated successfully!",
      });
      setIsModalOpen(false);
      setSelectedLead(null);
    },
    onError: (error) => {
      console.error('Update lead error:', error);
      toast({
        title: "Error",
        description: "Failed to update lead. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-purple-100 text-purple-800';
      case 'qualified': return 'bg-orange-100 text-orange-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-indigo-100 text-indigo-800';
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
    if (modalMode === 'create') {
      createLeadMutation.mutate(data);
    } else {
      updateLeadMutation.mutate({ id: selectedLead.id, ...data });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex-shrink-0`}>
          <DashboardSidebar isCollapsed={sidebarCollapsed} />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading leads...</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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

            {leads.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">No leads found</div>
                <Button onClick={handleCreateLead} className="bg-landify-blue hover:bg-landify-blue-light">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Lead
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {leads.map((lead) => (
                  <Card key={lead.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                            <AvatarFallback className="bg-landify-blue text-white text-sm">
                              {lead.name?.split(' ').map((n: string) => n[0]).join('') || 'L'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{lead.name}</h3>
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status || 'New'}
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
                          {lead.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{lead.email}</span>
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{lead.phone}</span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {lead.source && (
                            <div>
                              <span className="text-gray-500">Source:</span>
                              <p className="font-medium truncate">{lead.source}</p>
                            </div>
                          )}
                          {lead.property_type && (
                            <div>
                              <span className="text-gray-500">Type:</span>
                              <p className="font-medium truncate">{lead.property_type}</p>
                            </div>
                          )}
                          {(lead.budget_min || lead.budget_max) && (
                            <div className="col-span-2">
                              <span className="text-gray-500">Budget:</span>
                              <p className="font-medium">
                                {lead.budget_min && lead.budget_max ? 
                                  `$${(lead.budget_min / 1000000).toFixed(1)}M - $${(lead.budget_max / 1000000).toFixed(1)}M` :
                                  lead.budget_min ? `From $${(lead.budget_min / 1000000).toFixed(1)}M` :
                                  lead.budget_max ? `Up to $${(lead.budget_max / 1000000).toFixed(1)}M` : ''
                                }
                              </p>
                            </div>
                          )}
                          {lead.location && (
                            <div className="col-span-2">
                              <span className="text-gray-500">Location:</span>
                              <p className="font-medium truncate">{lead.location}</p>
                            </div>
                          )}
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
            )}
          </div>
        </main>
      </div>

      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitLead}
        initialData={selectedLead}
        isLoading={createLeadMutation.isPending || updateLeadMutation.isPending}
        mode={modalMode}
      />
    </div>
  );
};

export default LeadsList;
