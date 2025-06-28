
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Bed, Bath, Square, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertiesList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const properties = [
    {
      id: 1,
      title: 'Luxury Villa in Beverly Hills',
      price: '$2,850,000',
      address: '1234 Sunset Boulevard, Beverly Hills, CA 90210',
      type: 'Villa',
      status: 'For Sale',
      size: '3,500 sq ft',
      bedrooms: 5,
      bathrooms: 4,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Modern Downtown Condo',
      price: '$1,200,000',
      address: '456 City Center, Los Angeles, CA 90012',
      type: 'Condo',
      status: 'For Sale',
      size: '1,800 sq ft',
      bedrooms: 3,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Cozy Family Home',
      price: '$3,200/month',
      address: '789 Oak Street, Pasadena, CA 91101',
      type: 'House',
      status: 'For Rent',
      size: '2,400 sq ft',
      bedrooms: 4,
      bathrooms: 3,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop'
    }
  ];

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
              <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
              <Button className="bg-landify-blue hover:bg-landify-blue-light">
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-3 right-3 ${
                      property.status === 'For Sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {property.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{property.title}</h3>
                        <p className="text-2xl font-bold text-landify-blue">{property.price}</p>
                      </div>
                      
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {property.address}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Square className="w-4 h-4" />
                          {property.size}
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          {property.bedrooms}
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          {property.bathrooms}
                        </div>
                      </div>

                      <Link to={`/properties/${property.id}`}>
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

export default PropertiesList;
