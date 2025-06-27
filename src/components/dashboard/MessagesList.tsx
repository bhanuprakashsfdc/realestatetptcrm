
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const messages = [
  {
    id: 1,
    name: 'Amr ibn al-Jamuh',
    message: 'Monthly rent done',
    time: '1m',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    online: true
  },
  {
    id: 2,
    name: 'Miqdad ibn Aswad',
    message: 'Monthly rent done',
    time: '1m',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    online: true
  },
  {
    id: 3,
    name: "Sa'd ibn Mu'adh",
    message: 'Monthly rent done',
    time: '1m',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    online: false
  },
  {
    id: 4,
    name: 'Talha',
    message: 'Monthly rent done',
    time: '1m',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face',
    online: false
  },
  {
    id: 5,
    name: 'Abbad ibn Bishr',
    message: 'Monthly rent done',
    time: '1m',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face',
    online: false
  }
];

export const MessagesList: React.FC = () => {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={message.avatar} />
                <AvatarFallback>{message.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {message.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 truncate">{message.name}</span>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
