
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Phone, Mail, Building, MapPin, MessageCircle, Edit, Star, Loader2, Trash2, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ContactTimeline } from './ContactTimeline';
import { ContactNotes } from './ContactNotes';
import { ContactModal } from './ContactModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchContact = async (contactId: string) => {
    try {
      setLoading(true);
      console.log('Fetching contact details for ID:', contactId);
      
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', contactId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching contact:', error);
        toast({
          title: "Error",
          description: "Failed to fetch contact details",
          variant: "destructive"
        });
        return;
      }

      if (!data) {
        console.log('Contact not found');
        toast({
          title: "Not Found",
          description: "Contact not found",
          variant: "destructive"
        });
        return;
      }

      console.log('Contact details fetched:', data);
      setContact(data);
    } catch (error) {
      console.error('Error fetching contact:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time subscription for this specific contact
  useEffect(() => {
    if (!id) return;

    console.log('Setting up real-time subscription for contact:', id);
    
    const channel = supabase
      .channel(`contact-${id}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contacts',
          filter: `id=eq.${id}`
        },
        (payload) => {
          console.log('Real-time contact detail change:', payload);
          
          if (payload.eventType === 'UPDATE') {
            console.log('Contact updated, refreshing details');
            setContact(payload.new);
            toast({
              title: "Contact Updated",
              description: "Contact details have been updated",
            });
          } else if (payload.eventType === 'DELETE') {
            console.log('Contact deleted');
            toast({
              title: "Contact Deleted",
              description: "This contact has been deleted",
              variant: "destructive"
            });
            window.history.back();
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up contact detail subscription');
      supabase.removeChannel(channel);
    };
  }, [id, toast]);

  useEffect(() => {
    if (id) {
      fetchContact(id);
    }
  }, [id]);

  const handleEdit = () => {
    console.log('Opening edit modal for contact');
    setIsEditModalOpen(true);
  };

  const handleDuplicate = async () => {
    if (!contact) return;

    console.log('Duplicating contact:', contact);
    
    try {
      const duplicateData = {
        ...contact,
        name: `${contact.name} (Copy)`,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
        created_by: crypto.randomUUID()
      };

      console.log('Creating duplicate with data:', duplicateData);
      
      const { data, error } = await supabase
        .from('contacts')
        .insert([duplicateData])
        .select()
        .single();

      if (error) {
        console.error('Duplicate error:', error);
        throw error;
      }

      console.log('Contact duplicated successfully:', data);
      toast({
        title: "Success",
        description: "Contact duplicated successfully",
      });

      // Navigate to the new contact or refresh current view
      if (id) {
        fetchContact(id);
      }
    } catch (error) {
      console.error('Error duplicating contact:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate contact",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!contact || !confirm(`Are you sure you want to delete "${contact.name}"? This action cannot be undone.`)) return;

    console.log('Deleting contact:', contact.id);
    
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contact.id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      console.log('Contact deleted successfully');
      toast({
        title: "Success",
        description: "Contact deleted successfully",
      });

      window.history.back();
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive"
      });
    }
  };

  const handleSubmitEdit = async (data: any) => {
    try {
      setIsSubmitting(true);
      console.log('Updating contact with data:', data);
      
      const { data: updatedContact, error } = await supabase
        .from('contacts')
        .update(data)
        .eq('id', contact.id)
        .select()
        .single();

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      console.log('Contact updated successfully:', updatedContact);
      toast({
        title: "Success",
        description: "Contact updated successfully",
      });

      setIsEditModalOpen(false);
      // The real-time subscription will update the UI automatically
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: "Failed to update contact",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-green-100 text-green-800';
      case 'partner': return 'bg-blue-100 text-blue-800';
      case 'prospect': return 'bg-yellow-100 text-yellow-800';
      case 'vendor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading contact details...</span>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex justify-center items-center py-12">
        <span>Contact not found</span>
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
              {contact.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{contact.name}</h1>
            <p className="text-gray-600">{contact.position || 'N/A'} {contact.company ? `• ${contact.company}` : ''}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getStatusColor(contact.type)}>
                {contact.type || 'client'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button variant="outline" size="sm" onClick={handleDuplicate}>
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button size="sm" className="bg-landify-blue hover:bg-landify-blue-light" onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Contact
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
                    <p className="font-semibold text-gray-900">{contact.phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{contact.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-semibold text-gray-900">{contact.company || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold text-gray-900">{contact.address || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Position</p>
                    <p className="font-semibold text-gray-900">{contact.position || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <p className="font-semibold text-gray-900">{contact.type || 'client'}</p>
                  </div>
                </div>
              </div>

              {contact.notes && (
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                  <p className="text-gray-700">{contact.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Communication History */}
          <ContactTimeline />
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
                Start Call
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
                <Building className="w-4 h-4 mr-2" />
                View Properties
              </Button>
            </CardContent>
          </Card>

          {/* Relationship Stats */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Relationship Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-landify-blue">4.8</div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Client Rating</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">23</p>
                  <p className="text-sm text-gray-600">Interactions</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-600">Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">VIP Client</Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">High Value</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">Referral Source</Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">Luxury Market</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <ContactNotes />
        </div>
      </div>

      <ContactModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmitEdit}
        initialData={contact}
        isLoading={isSubmitting}
        mode="edit"
      />
    </div>
  );
};
