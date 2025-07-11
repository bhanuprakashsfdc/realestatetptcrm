import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Plus, MapPin, Bed, Bath, Square, Eye, Loader2, Edit, Trash2, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PropertyModal } from '@/components/properties/PropertyModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 9;

const PropertiesList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const fetchProperties = async (page: number) => {
    try {
      setLoading(true);
      const itemsPerPage = ITEMS_PER_PAGE;
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage - 1;

      const { data, error, count } = await supabase
        .from('properties')
        .select('*', { count: 'exact' })
        .range(start, end)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Error",
          description: "Failed to fetch properties",
          variant: "destructive"
        });
        return;
      }

      setProperties(data || []);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error", 
        description: "Failed to fetch properties",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateProperty = () => {
    setModalMode('create');
    setSelectedProperty(null);
    setIsModalOpen(true);
  };

  const handleEditProperty = (property: any) => {
    setModalMode('edit');
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleDuplicateProperty = async (property: any) => {
    try {
      const duplicateData = {
        ...property,
        title: `${property.title} (Copy)`,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
        created_by: crypto.randomUUID()
      };

      const { error } = await supabase
        .from('properties')
        .insert([duplicateData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property duplicated successfully",
      });

      fetchProperties(currentPage);
    } catch (error) {
      console.error('Error duplicating property:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate property",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProperty = async (property: any) => {
    if (!confirm(`Are you sure you want to delete "${property.title}"?`)) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', property.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property deleted successfully",
      });

      fetchProperties(currentPage);
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive"
      });
    }
  };

  const handleSubmitProperty = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      if (modalMode === 'create') {
        const { error } = await supabase
          .from('properties')
          .insert([{ ...data, created_by: crypto.randomUUID() }]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Property created successfully",
        });
      } else {
        const { error } = await supabase
          .from('properties')
          .update(data)
          .eq('id', selectedProperty.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Property updated successfully",
        });
      }
      
      setIsModalOpen(false);
      fetchProperties(currentPage);
    } catch (error) {
      console.error('Error submitting property:', error);
      toast({
        title: "Error",
        description: `Failed to ${modalMode} property`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'For Sale': return 'bg-green-100 text-green-800';
      case 'For Rent': return 'bg-blue-100 text-blue-800';
      case 'Sold': return 'bg-gray-100 text-gray-800';
      case 'Rented': return 'bg-purple-100 text-purple-800';
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Properties</h1>
              <Button 
                className="bg-landify-blue hover:bg-landify-blue-light w-full sm:w-auto"
                onClick={handleCreateProperty}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading properties...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {properties.map((property) => (
                  <Card key={property.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                          {property.image_url ? (
                            <img 
                              src={property.image_url} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-900 line-clamp-2">{property.title}</h3>
                            <Badge className={getStatusColor(property.status)}>
                              {property.status}
                            </Badge>
                          </div>
                          
                          <p className="text-xl font-bold text-landify-blue">{property.price}</p>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{property.address}</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            {property.bedrooms && (
                              <div className="flex items-center gap-1">
                                <Bed className="w-4 h-4" />
                                <span>{property.bedrooms}</span>
                              </div>
                            )}
                            {property.bathrooms && (
                              <div className="flex items-center gap-1">
                                <Bath className="w-4 h-4" />
                                <span>{property.bathrooms}</span>
                              </div>
                            )}
                            {property.size && (
                              <div className="flex items-center gap-1">
                                <Square className="w-4 h-4" />
                                <span>{property.size}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="text-sm text-gray-600">
                            Created: {new Date(property.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link to={`/properties/${property.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProperty(property)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDuplicateProperty(property)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteProperty(property)}
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
                    
                    {/* First page */}
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

                    {/* Current page range */}
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

                    {/* Last page */}
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

      <PropertyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProperty}
        initialData={selectedProperty}
        isLoading={isSubmitting}
        mode={modalMode}
      />
    </div>
  );
};

export default PropertiesList;
