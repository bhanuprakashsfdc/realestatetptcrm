
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, Building } from 'lucide-react';

export const ContactTimeline = () => {
  const timelineItems = [
    {
      id: 1,
      type: 'call',
      title: 'Phone Call',
      description: 'Discussed upcoming luxury listings in Beverly Hills area',
      time: '3 hours ago',
      icon: Phone,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      type: 'email',
      title: 'Email Exchange',
      description: 'Shared market analysis report for Q3 2024',
      time: '2 days ago',
      icon: Mail,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Property Showing',
      description: 'Showed Sunset Plaza property to client referral',
      time: '1 week ago',
      icon: Building,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      type: 'message',
      title: 'Text Message',
      description: 'Quick update on new listing availability',
      time: '2 weeks ago',
      icon: MessageCircle,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Communication History</CardTitle>
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
