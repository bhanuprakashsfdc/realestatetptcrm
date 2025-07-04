
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, FileText, Settings, CheckCircle, Clock, Loader2, Edit, Trash2, Copy, Heart, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProjectTasks } from './ProjectTasks';
import { ProjectFiles } from './ProjectFiles';
import { ProjectTeam } from './ProjectTeam';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching project:', error);
        toast({
          title: "Error",
          description: "Failed to fetch project details",
          variant: "destructive"
        });
        return;
      }

      if (!data) {
        toast({
          title: "Not Found",
          description: "Project not found",
          variant: "destructive"
        });
        return;
      }

      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast({
        title: "Error",
        description: "Failed to fetch project details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'Ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Planning': return <Clock className="w-4 h-4" />;
      case 'Ongoing': return <AlertCircle className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading project details...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center py-12">
        <span>Project not found</span>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-gray-600 mt-1">{project.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={getStatusColor(project.status)}>
              {getStatusIcon(project.status)}
              <span className="ml-1">{project.status}</span>
            </Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Overall Completion</span>
              <span className="font-semibold text-gray-900">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{project.total_tasks || 0}</p>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{project.completed_tasks || 0}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{(project.total_tasks || 0) - (project.completed_tasks || 0)}</p>
                <p className="text-sm text-gray-600">Remaining</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline'}
                </p>
                <p className="text-sm text-gray-600">Deadline</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tasks and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <ProjectTasks />
          
          {/* Key Milestones */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Key Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Foundation Complete', date: 'Mar 15, 2024', status: 'completed' },
                  { title: 'Framing Phase', date: 'May 20, 2024', status: 'completed' },
                  { title: 'Electrical & Plumbing', date: 'Jul 10, 2024', status: 'in-progress' },
                  { title: 'Interior Finishing', date: 'Sep 30, 2024', status: 'pending' },
                  { title: 'Final Inspection', date: 'Nov 15, 2024', status: 'pending' }
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100">
                    {milestone.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : milestone.status === 'in-progress' ? (
                      <Clock className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                      <p className="text-sm text-gray-600">{milestone.date}</p>
                    </div>
                    <Badge variant={
                      milestone.status === 'completed' ? 'default' : 
                      milestone.status === 'in-progress' ? 'secondary' : 'outline'
                    }>
                      {milestone.status.replace('-', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Team and Files */}
        <div className="space-y-6">
          {/* Team Members Card */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Team Members</p>
                    <div className="flex -space-x-2">
                      {project.team_members && project.team_members.length > 0 ? (
                        project.team_members.slice(0, 4).map((member: string, index: number) => (
                          <Avatar key={index} className="w-8 h-8 border-2 border-white">
                            <AvatarImage src={member} />
                            <AvatarFallback className="bg-landify-blue text-white text-xs">
                              U{index + 1}
                            </AvatarFallback>
                          </Avatar>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No team members assigned</span>
                      )}
                      {project.team_members && project.team_members.length > 4 && (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                          +{project.team_members.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <ProjectFiles />
        </div>
      </div>
    </div>
  );
};
