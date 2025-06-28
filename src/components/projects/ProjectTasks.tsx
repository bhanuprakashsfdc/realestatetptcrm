
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Plus } from 'lucide-react';

export const ProjectTasks = () => {
  const tasks = [
    {
      id: 1,
      title: 'Install electrical wiring - Building A',
      assignee: 'Mike Johnson',
      avatar: 'MJ',
      deadline: 'Jul 15, 2024',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Plumbing inspection - All units',
      assignee: 'Sarah Chen',
      avatar: 'SC',
      deadline: 'Jul 20, 2024',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Interior design approval',
      assignee: 'Lisa Wong',
      avatar: 'LW',
      deadline: 'Jul 25, 2024',
      priority: 'Low',
      status: 'Pending'
    }
  ];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gray-900">Active Tasks</CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'secondary' : 'outline'}>
                  {task.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-landify-blue text-white">{task.avatar}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{task.assignee}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {task.deadline}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
