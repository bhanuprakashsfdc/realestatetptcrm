
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Calendar, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const projects = [
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
    }
  ];

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
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
              <Button className="bg-landify-blue hover:bg-landify-blue-light">
                <Plus className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
                          <Badge className={getStatusColor(project.status)}>
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
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <p className="font-medium">{project.deadline}</p>
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectsList;
