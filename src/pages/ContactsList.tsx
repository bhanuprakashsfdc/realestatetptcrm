import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Plus, Phone, Mail, Building, Eye, Loader2, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactModal } from '@/components/contacts/ContactModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 9;

const ContactsList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contacts, setContacts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const fetchContacts = async (page: number) => {
    try {
      setLoading(true);
      console.log('Fetching contacts for page:', page);
      
      const itemsPerPage = ITEMS_PER_PAGE;
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage - 1;

      const { data, error, count } = await supabase
        .from('contacts')
        .select('*', { count: 'exact' })
        .range(start, end)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch contacts",
          variant: "destructive"
        });
        return;
      }

      console.log('Fetched contacts:', data);
      console.log('Total count:', count);
      
      setContacts(data || []);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Error", 
        description: "Failed to fetch contacts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time subscription for automatic sync
  useEffect(() => {
    console.log('Setting up real-time subscription for contacts');
    
    const channel = supabase
      .channel('contacts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contacts'
        },
        (payload) => {
          console.log('Real-time contact change:', payload);
          
          // Refresh contacts when any change occurs
          fetchContacts(currentPage);
          
          // Show appropriate toast message
          const eventType = payload.eventType;
          if (eventType === 'INSERT') {
            toast({
              title: "New Contact",
              description: "A new contact has been added",
            });
          } else if (eventType === 'UPDATE') {
            toast({
              title: "Contact Updated",
              description: "A contact has been updated",
            });
          } else if (eventType === 'DELETE') {
            toast({
              title: "Contact Deleted",
              description: "A contact has been deleted",
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [currentPage, toast]);

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateContact = () => {
    console.log('Opening create contact modal');
    setModalMode('create');
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: any) => {
    console.log('Opening edit contact modal for:', contact);
    setModalMode('edit');
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteContact = async (contact: any) => {
    if (!confirm(`Are you sure you want to delete "${contact.name}"?`)) return;

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

      // Refresh will happen automatically via real-time subscription
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive"
      });
    }
  };

  const handleSubmitContact = async (data: any) => {
    try {
      setIsSubmitting(true);
      console.log('Submitting contact data:', data);
      
      if (modalMode === 'create') {
        console.log('Creating new contact');
        const { data: newContact, error } = await supabase
          .from('contacts')
          .insert([{ 
            ...data, 
            created_by: crypto.randomUUID() // Temporary user ID until auth is implemented
          }])
          .select()
          .single();
        
        if (error) {
          console.error('Create error:', error);
          throw error;
        }
        
        console.log('Contact created successfully:', newContact);
        toast({
          title: "Success",
          description: "Contact created successfully",
        });
      } else {
        console.log('Updating existing contact:', selectedContact.id);
        const { data: updatedContact, error } = await supabase
          .from('contacts')
          .update(data)
          .eq('id', selectedContact.id)
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
      }
      
      setIsModalOpen(false);
      // Refresh will happen automatically via real-time subscription
    } catch (error) {
      console.error('Error submitting contact:', error);
      toast({
        title: "Error",
        description: `Failed to ${modalMode} contact`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    console.log('Closing contact modal');
    setIsModalOpen(false);
    setSelectedContact(null);
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contacts</h1>
              <Button 
                className="bg-landify-blue hover:bg-landify-blue-light w-full sm:w-auto"
                onClick={handleCreateContact}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Contact
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading contacts...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {contacts.map((contact) => (
                  <Card key={contact.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                            <AvatarFallback className="bg-landify-blue text-white">
                              {contact.name.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                            <p className="text-sm text-gray-600 truncate">{contact.position || 'N/A'}</p>
                            <Badge className={getStatusColor(contact.type)}>
                              {contact.type || 'client'}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {contact.company && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{contact.company}</span>
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{contact.email}</span>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{contact.phone}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="text-sm text-gray-600">
                            Created: {new Date(contact.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link to={`/contacts/${contact.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditContact(contact)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteContact(contact)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {currentPage > 3 && (
                      <>
                        <PaginationItem>
                          <PaginationLink onClick={() => handlePageChange(1)} className="cursor-pointer">
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {currentPage > 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      if (pageNumber > totalPages) return null;
                      
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNumber)}
                            isActive={pageNumber === currentPage}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink onClick={() => handlePageChange(totalPages)} className="cursor-pointer">
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </main>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitContact}
        initialData={selectedContact}
        isLoading={isSubmitting}
        mode={modalMode}
      />
    </div>
  );
};

export default ContactsList;
