
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, Calendar } from 'lucide-react';

export const LeadTimeline = () => {
  const timelineItems = [
    {
      id: 1,
      type: 'call',
      title: 'Phone Call',
      description: 'Discussed property requirements and budget',
      time: '2 hours ago',
      icon: Phone,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      type: 'email',
      title: 'Email Sent',
      description: 'Sent property listings matching criteria',
      time: '1 day ago',
      icon: Mail,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'message',
      title: 'Message Received',
      description: 'Interested in Beverly Hills properties',
      time: '2 days ago',
      icon: MessageCircle,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      type: 'meeting',
      title: 'Meeting Scheduled',
      description: 'Property viewing appointment set',
      time: '3 days ago',
      icon: Calendar,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Interaction Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineItems.map((item, index) => (
            <div key={item.id} className="flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <span className="text-sm text-gray-500">{item.time}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
