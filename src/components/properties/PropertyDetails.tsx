
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Edit, Trash2, Copy, Heart, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertyCarousel } from './PropertyCarousel';
import { PropertyMap } from './PropertyMap';
import { PropertyModal } from './PropertyModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching property:', error);
        toast({
          title: "Error",
          description: "Failed to fetch property details",
          variant: "destructive"
        });
        return;
      }

      if (!data) {
        toast({
          title: "Not Found",
          description: "Property not found",
          variant: "destructive"
        });
        return;
      }

      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast({
        title: "Error",
        description: "Failed to fetch property details",
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
    if (!property) return;

    try {
      const duplicateData = {
        ...property,
        title: `${property.title} (Copy)`,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
        created_by: crypto.randomUUID()
      };

      const { data, error } = await supabase
        .from('properties')
        .insert([duplicateData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property duplicated successfully",
      });

      // Refresh the current property data
      fetchProperty(id!);
    } catch (error) {
      console.error('Error duplicating property:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate property",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!property || !confirm(`Are you sure you want to delete "${property.title}"? This action cannot be undone.`)) return;

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

      // Navigate back or redirect
      window.history.back();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive"
      });
    }
  };

  const handleSubmitEdit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('properties')
        .update(data)
        .eq('id', property.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property updated successfully",
      });

      setIsEditModalOpen(false);
      fetchProperty(id!);
    } catch (error) {
      console.error('Error updating property:', error);
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading property details...</span>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center py-12">
        <span>Property not found</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4" />
            {property.address}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleDuplicate}>
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Carousel */}
          <PropertyCarousel />

          {/* Property Details */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Square className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Size</p>
                    <p className="font-semibold text-gray-900">{property.size || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Bed className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="font-semibold text-gray-900">{property.bedrooms || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Bath className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="font-semibold text-gray-900">{property.bathrooms || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900">{property.type || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {['Swimming Pool', 'Garden', 'Garage', 'Fireplace', 'Balcony', 'Gym'].map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="bg-landify-blue/10 text-landify-blue">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {property.description || 'No description available.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Price and Map */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{property.price}</p>
                  <Badge className={`mt-2 ${
                    property.status === 'For Sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {property.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Price per sq ft</p>
                    <p className="font-semibold">$814</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Est. Payment</p>
                    <p className="font-semibold">$12,450/mo</p>
                  </div>
                </div>
                <Button className="w-full bg-landify-blue hover:bg-landify-blue-light">
                  Schedule Viewing
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <PropertyMap />
        </div>
      </div>

      <PropertyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmitEdit}
        initialData={property}
        isLoading={isSubmitting}
        mode="edit"
      />
    </div>
  );
};
