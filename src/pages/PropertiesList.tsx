
import React, { useState } from 'react';
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
import { Plus, MapPin, Bed, Bath, Square, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 9;

const PropertiesList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const allProperties = [
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
    },
    // Adding more sample data for pagination demo
    {
      id: 4,
      title: 'Oceanfront Penthouse',
      price: '$4,500,000',
      address: '321 Pacific Coast Hwy, Malibu, CA 90265',
      type: 'Penthouse',
      status: 'For Sale',
      size: '4,200 sq ft',
      bedrooms: 6,
      bathrooms: 5,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Historic Townhouse',
      price: '$1,850,000',
      address: '567 Heritage Lane, San Francisco, CA 94102',
      type: 'Townhouse',
      status: 'For Sale',
      size: '2,800 sq ft',
      bedrooms: 4,
      bathrooms: 3,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Modern Loft',
      price: '$2,800/month',
      address: '890 Industrial Way, Oakland, CA 94607',
      type: 'Loft',
      status: 'For Rent',
      size: '1,600 sq ft',
      bedrooms: 2,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'Garden Apartment',
      price: '$1,950/month',
      address: '234 Garden View, Berkeley, CA 94704',
      type: 'Apartment',
      status: 'For Rent',
      size: '1,200 sq ft',
      bedrooms: 2,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Suburban Estate',
      price: '$3,200,000',
      address: '456 Estate Drive, Palo Alto, CA 94301',
      type: 'Estate',
      status: 'For Sale',
      size: '5,500 sq ft',
      bedrooms: 7,
      bathrooms: 6,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop'
    },
    {
      id: 9,
      title: 'City Studio',
      price: '$1,400/month',
      address: '678 Urban Plaza, San Jose, CA 95113',
      type: 'Studio',
      status: 'For Rent',
      size: '650 sq ft',
      bedrooms: 1,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop'
    },
    {
      id: 10,
      title: 'Luxury Condo',
      price: '$2,100,000',
      address: '789 Skyline Blvd, San Francisco, CA 94132',
      type: 'Condo',
      status: 'For Sale',
      size: '2,200 sq ft',
      bedrooms: 3,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop'
    }
  ];

  // Pagination logic
  const totalProperties = allProperties.length;
  const totalPages = Math.ceil(totalProperties / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const properties = allProperties.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              <Button className="bg-landify-blue hover:bg-landify-blue-light w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
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
                        <h3 className="font-semibold text-gray-900 text-lg truncate">{property.title}</h3>
                        <p className="text-2xl font-bold text-landify-blue">{property.price}</p>
                      </div>
                      
                      <p className="text-gray-600 flex items-center gap-1 text-sm">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{property.address}</span>
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
    </div>
  );
};

export default PropertiesList;
