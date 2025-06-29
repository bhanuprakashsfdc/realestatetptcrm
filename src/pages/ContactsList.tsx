
import React, { useState } from 'react';
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
import { Plus, Phone, Mail, Building, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 9;

const ContactsList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const allContacts = [
    {
      id: 1,
      name: 'Anna Martinez',
      company: 'Pinnacle Properties',
      role: 'Senior Real Estate Agent',
      email: 'anna.martinez@pinnacle.com',
      phone: '+1 (555) 987-6543',
      location: 'Los Angeles, CA',
      status: 'Active Client',
      rating: 4.8,
      interactions: 23,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Robert Johnson',
      company: 'Elite Realty Group',
      role: 'Property Manager',
      email: 'robert.j@eliterealty.com',
      phone: '+1 (555) 123-9876',
      location: 'Beverly Hills, CA',
      status: 'Business Partner',
      rating: 4.5,
      interactions: 18,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      company: 'Metropolitan Development',
      role: 'Construction Manager',
      email: 'lisa.chen@metrodev.com',
      phone: '+1 (555) 456-1234',
      location: 'Santa Monica, CA',
      status: 'New Contact',
      rating: 5.0,
      interactions: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    },
    // Adding more sample data for pagination demo
    {
      id: 4,
      name: 'Michael Thompson',
      company: 'Coastal Investments',
      role: 'Investment Advisor',
      email: 'mike.thompson@coastal.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      status: 'Active Client',
      rating: 4.7,
      interactions: 31,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Sarah Williams',
      company: 'Prime Locations',
      role: 'Sales Director',
      email: 'sarah.w@primelocations.com',
      phone: '+1 (555) 345-6789',
      location: 'San Diego, CA',
      status: 'Business Partner',
      rating: 4.9,
      interactions: 42,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'David Brown',
      company: 'Urban Developers',
      role: 'Project Manager',
      email: 'david.brown@urbandev.com',
      phone: '+1 (555) 456-7890',
      location: 'Oakland, CA',
      status: 'New Contact',
      rating: 4.3,
      interactions: 8,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 7,
      name: 'Jennifer Davis',
      company: 'Luxury Estates',
      role: 'Luxury Specialist',
      email: 'jennifer.d@luxuryestates.com',
      phone: '+1 (555) 567-8901',
      location: 'Palo Alto, CA',
      status: 'Active Client',
      rating: 4.8,
      interactions: 27,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 8,
      name: 'James Wilson',
      company: 'Capital Realty',
      role: 'Broker',
      email: 'james.wilson@capitalrealty.com',
      phone: '+1 (555) 678-9012',
      location: 'San Jose, CA',
      status: 'Business Partner',
      rating: 4.6,
      interactions: 19,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 9,
      name: 'Emily Garcia',
      company: 'Modern Homes',
      role: 'Marketing Director',
      email: 'emily.garcia@modernhomes.com',
      phone: '+1 (555) 789-0123',
      location: 'Sacramento, CA',
      status: 'New Contact',
      rating: 4.4,
      interactions: 12,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 10,
      name: 'Christopher Lee',
      company: 'Heritage Properties',
      role: 'Senior Agent',
      email: 'chris.lee@heritage.com',
      phone: '+1 (555) 890-1234',
      location: 'Fresno, CA',
      status: 'Active Client',
      rating: 4.7,
      interactions: 35,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    }
  ];

  // Pagination logic
  const totalContacts = allContacts.length;
  const totalPages = Math.ceil(totalContacts / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const contacts = allContacts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active Client': return 'bg-green-100 text-green-800';
      case 'Business Partner': return 'bg-blue-100 text-blue-800';
      case 'New Contact': return 'bg-yellow-100 text-yellow-800';
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
              <Button className="bg-landify-blue hover:bg-landify-blue-light w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add New Contact
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {contacts.map((contact) => (
                <Card key={contact.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="bg-landify-blue text-white">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{contact.role}</p>
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{contact.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{contact.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(contact.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{contact.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {contact.interactions} interactions
                        </div>
                      </div>

                      <Link to={`/contacts/${contact.id}`}>
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

export default ContactsList;
