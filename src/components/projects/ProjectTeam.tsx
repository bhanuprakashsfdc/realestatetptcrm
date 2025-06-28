
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserPlus } from 'lucide-react';

export const ProjectTeam = () => {
  const teamMembers = [
    {
      name: 'David Wilson',
      role: 'Project Manager',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      status: 'online'
    },
    {
      name: 'Sarah Chen',
      role: 'Architect',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=32&h=32&fit=crop&crop=face',
      status: 'online'
    },
    {
      name: 'Mike Johnson',
      role: 'Site Supervisor',
      avatar: null,
      status: 'offline'
    },
    {
      name: 'Lisa Wong',
      role: 'Interior Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      status: 'away'
    }
  ];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-900">Team Members</CardTitle>
          <Button size="sm" variant="outline">
            <UserPlus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.avatar || undefined} />
                    <AvatarFallback className="bg-landify-blue text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    member.status === 'online' ? 'bg-green-400' :
                    member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {member.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
