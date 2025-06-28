
import React from 'react';
import { Calendar, Users, FileText, Settings, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProjectTasks } from './ProjectTasks';
import { ProjectFiles } from './ProjectFiles';
import { ProjectTeam } from './ProjectTeam';

export const ProjectDetails = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sunset Plaza Development</h1>
          <p className="text-gray-600 mt-1">Luxury residential complex with 24 units</p>
          <Badge className="mt-2 bg-blue-100 text-blue-800">Ongoing</Badge>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Timeline
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Reports
          </Button>
          <Button size="sm" className="bg-landify-blue hover:bg-landify-blue-light">
            <Settings className="w-4 h-4 mr-2" />
            Manage
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
              <span className="font-semibold text-gray-900">68%</span>
            </div>
            <Progress value={68} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">106</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">32</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">18</p>
                <p className="text-sm text-gray-600">Pending</p>
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
          <ProjectTeam />
          <ProjectFiles />
        </div>
      </div>
    </div>
  );
};
