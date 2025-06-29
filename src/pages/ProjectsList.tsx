
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import { Plus, Calendar, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 9;

const ProjectsList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const allProjects = [
    {
      id: 1,
      name: 'Sunset Plaza Development',
      description: 'Luxury residential complex with 24 units',
      status: 'Ongoing',
      progress: 68,
      deadline: 'Nov 15, 2024',
      totalTasks: 156,
      completedTasks: 106,
      teamMembers: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
      ]
    },
    {
      id: 2,
      name: 'Downtown Office Complex',
      description: 'Modern commercial building renovation',
      status: 'Planning',
      progress: 25,
      deadline: 'Dec 20, 2024',
      totalTasks: 89,
      completedTasks: 22,
      teamMembers: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=32&h=32&fit=crop&crop=face'
      ]
    },
    {
      id: 3,
      name: 'Marina View Apartments',
      description: 'Waterfront residential development',
      status: 'Completed',
      progress: 100,
      deadline: 'Sep 30, 2024',
      totalTasks: 134,
      completedTasks: 134,
      teamMembers: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      ]
    },
    // Adding more sample data for pagination demo
    {
      id: 4,
      name: 'Green Valley Homes',
      description: 'Eco-friendly residential community',
      status: 'Ongoing',
      progress: 45,
      deadline: 'Jan 30, 2025',
      totalTasks: 78,
      completedTasks: 35,
      teamMembers: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      ]
    },
    {
      id: 5,
      name: 'Tech Hub Renovation',
      description: 'Converting warehouse to modern office space',
      status: 'Planning',
      progress: 15,
      deadline: 'Mar 15, 2025',
      totalTasks: 112,
      completedTasks: 17,
      teamMembers: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      ]
    },
    {
      id: 6,
      name: 'Coastal Retreat',
      description: 'Luxury beachfront resort development',
      status: 'Ongoing',
      progress: 72,
      deadline: 'Aug 20, 2024',
      totalTasks: 203,
      completedTasks: 146,
      teamMembers: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
      ]
    },
    {
      id: 7,
      name: 'Urban Lofts',
      description: 'Industrial building conversion to loft apartments',
      status: 'Planning',
      progress: 8,
      deadline: 'Jun 10, 2025',
      totalTasks: 145,
      completedTasks: 12,
      teamMembers: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=32&h=32&fit=crop&crop=face'
      ]
    },
    {
      id: 8,
      name: 'Shopping Plaza Upgrade',
      description: 'Modernizing existing retail complex',
      status: 'Completed',
      progress: 100,
      deadline: 'Oct 5, 2024',
      totalTasks: 87,
      completedTasks: 87,
      teamMembers: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      ]
    },
    {
      id: 9,
      name: 'Hospital Extension',
      description: 'Adding new wing to existing medical facility',
      status: 'Ongoing',
      progress: 55,
      deadline: 'Apr 12, 2025',
      totalTasks: 234,
      completedTasks: 129,
      teamMembers: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      ]
    },
    {
      id: 10,
      name: 'School Renovation',
      description: 'Complete renovation of elementary school',
      status: 'Planning',
      progress: 20,
      deadline: 'May 30, 2025',
      totalTasks: 98,
      completedTasks: 20,
      teamMembers: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
      ]
    }
  ];

  // Pagination logic
  const totalProjects = allProjects.length;
  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const projects = allProjects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'Ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Projects</h1>
              <Button className="bg-landify-blue hover:bg-landify-blue-light w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {projects.map((project) => (
                <Card key={project.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg truncate pr-4">{project.name}</h3>
                          <Badge className={getStatusColor(project.status)} style={{ flexShrink: 0 }}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{project.description}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Tasks:</span>
                          <p className="font-medium">{project.completedTasks}/{project.totalTasks}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <p className="font-medium truncate">{project.deadline}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <div className="flex -space-x-2">
                            {project.teamMembers.map((member, index) => (
                              <Avatar key={index} className="w-6 h-6 border-2 border-white">
                                <AvatarImage src={member} />
                                <AvatarFallback className="bg-landify-blue text-white text-xs">
                                  U{index + 1}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Link to={`/projects/${project.id}`}>
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

export default ProjectsList;
