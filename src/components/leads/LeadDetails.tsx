
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Phone, Mail, User, Calendar, MessageCircle, Edit, Loader2, Trash2, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LeadTimeline } from './LeadTimeline';
import { LeadNotes } from './LeadNotes';
import { LeadModal } from './LeadModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchLead(id);
    }
  }, [id]);

  const fetchLead = async (leadId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching lead:', error);
        toast({
          title: "Error",
          description: "Failed to fetch lead details",
          variant: "destructive"
        });
        return;
      }

      if (!data) {
        toast({
          title: "Not Found",
          description: "Lead not found",
          variant: "destructive"
        });
        return;
      }

      setLead(data);
    } catch (error) {
      console.error('Error fetching lead:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lead details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDuplicate = async () => {
    if (!lead) return;

    try {
      const duplicateData = {
        ...lead,
        name: `${lead.name} (Copy)`,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
        created_by: crypto.randomUUID()
      };

      const { data, error } = await supabase
        .from('leads')
        .insert([duplicateData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead duplicated successfully",
      });

      fetchLead(id!);
    } catch (error) {
      console.error('Error duplicating lead:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate lead",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!lead || !confirm(`Are you sure you want to delete "${lead.name}"? This action cannot be undone.`)) return;

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', lead.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead deleted successfully",
      });

      window.history.back();
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive"
      });
    }
  };

  const handleSubmitEdit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('leads')
        .update(data)
        .eq('id', lead.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead updated successfully",
      });

      setIsEditModalOpen(false);
      fetchLead(id!);
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Error",
        description: "Failed to update lead",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-emerald-100 text-emerald-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading lead details...</span>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex justify-center items-center py-12">
        <span>Lead not found</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
            <AvatarFallback className="bg-landify-blue text-white text-lg font-semibold">
              {lead.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
            <p className="text-gray-600">{lead.property_type || 'Potential Buyer'} • {lead.source || 'Unknown Source'}</p>
            <Badge className={getStatusColor(lead.status)}>
              {lead.status || 'new'}
            </Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Follow-up Reminder
          </Button>
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            Assign to Agent
          </Button>
          <Button variant="outline" size="sm" onClick={handleDuplicate}>
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button size="sm" className="bg-landify-blue hover:bg-landify-blue-light" onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Lead
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Info and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{lead.phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{lead.email || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lead Source</p>
                  <p className="font-semibold text-gray-900">{lead.source || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Property Type</p>
                  <p className="font-semibold text-gray-900">{lead.property_type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Budget Range</p>
                  <p className="font-semibold text-gray-900">
                    {lead.budget_min && lead.budget_max 
                      ? `$${lead.budget_min.toLocaleString()} - $${lead.budget_max.toLocaleString()}`
                      : lead.budget_min 
                        ? `From $${lead.budget_min.toLocaleString()}`
                        : lead.budget_max
                          ? `Up to $${lead.budget_max.toLocaleString()}`
                          : 'N/A'
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location Preference</p>
                  <p className="font-semibold text-gray-900">{lead.location || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <LeadTimeline />
        </div>

        {/* Right Column - Quick Actions and Notes */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="w-4 h-4 mr-2" />
                Call Lead
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          {/* Lead Score */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Lead Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-landify-blue">85</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-landify-blue h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-gray-600">High quality lead</p>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <LeadNotes />
        </div>
      </div>

      <LeadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmitEdit}
        initialData={lead}
        isLoading={isSubmitting}
        mode="edit"
      />
    </div>
  );
};
