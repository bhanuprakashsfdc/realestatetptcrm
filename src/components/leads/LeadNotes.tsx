
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

export const LeadNotes = () => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 flex items-center justify-between">
          Notes
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <p className="text-sm font-medium text-gray-900">Follow-up needed</p>
            <p className="text-sm text-gray-600 mt-1">Client requested additional property photos</p>
            <p className="text-xs text-gray-500 mt-2">Added 2 hours ago</p>
          </div>
          <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <p className="text-sm font-medium text-gray-900">Viewing scheduled</p>
            <p className="text-sm text-gray-600 mt-1">Beverly Hills property tour set for Friday 2 PM</p>
            <p className="text-xs text-gray-500 mt-2">Added 1 day ago</p>
          </div>
        </div>
        <Textarea 
          placeholder="Add a new note..." 
          className="min-h-[80px] border-gray-200 focus:border-landify-blue"
        />
      </CardContent>
    </Card>
  );
};
