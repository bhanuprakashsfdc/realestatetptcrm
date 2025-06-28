
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

export const ContactNotes = () => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 flex items-center justify-between">
          Notes & Updates
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
            <p className="text-sm font-medium text-gray-900">Successful referral</p>
            <p className="text-sm text-gray-600 mt-1">Referred Johnson family - closed $2.3M deal</p>
            <p className="text-xs text-gray-500 mt-2">Added 1 week ago</p>
          </div>
          <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <p className="text-sm font-medium text-gray-900">Partnership opportunity</p>
            <p className="text-sm text-gray-600 mt-1">Interested in co-listing high-end properties</p>
            <p className="text-xs text-gray-500 mt-2">Added 2 weeks ago</p>
          </div>
          <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
            <p className="text-sm font-medium text-gray-900">Market insights</p>
            <p className="text-sm text-gray-600 mt-1">Shared valuable data on luxury market trends</p>
            <p className="text-xs text-gray-500 mt-2">Added 3 weeks ago</p>
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
