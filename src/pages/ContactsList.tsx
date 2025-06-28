
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Phone, Mail, Building, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactsList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const contacts = [
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
    }
  ];

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
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
              <Button className="bg-landify-blue hover:bg-landify-blue-light">
                <Plus className="w-4 h-4 mr-2" />
                Add New Contact
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <Card key={contact.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="bg-landify-blue text-white">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.role}</p>
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building className="w-4 h-4" />
                          {contact.company}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactsList;
