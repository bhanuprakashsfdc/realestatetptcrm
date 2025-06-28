
import React from 'react';
import { Phone, Mail, User, Calendar, MessageCircle, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LeadTimeline } from './LeadTimeline';
import { LeadNotes } from './LeadNotes';

export const LeadDetails = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" />
            <AvatarFallback className="bg-landify-blue text-white text-lg font-semibold">JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
            <p className="text-gray-600">Potential Buyer • High Priority</p>
            <Badge className="mt-1 bg-green-100 text-green-800">In Progress</Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Follow-up Reminder
          </Button>
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            Assign to Agent
          </Button>
          <Button size="sm" className="bg-landify-blue hover:bg-landify-blue-light">
            <Edit className="w-4 h-4 mr-2" />
            Edit Lead
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Info and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">john.doe@email.com</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lead Source</p>
                  <p className="font-semibold text-gray-900">Website Inquiry</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Interest</p>
                  <p className="font-semibold text-gray-900">Luxury Homes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Budget Range</p>
                  <p className="font-semibold text-gray-900">$2M - $3M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location Preference</p>
                  <p className="font-semibold text-gray-900">Beverly Hills</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <LeadTimeline />
        </div>

        {/* Right Column - Quick Actions and Notes */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="w-4 h-4 mr-2" />
                Call Lead
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          {/* Lead Score */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Lead Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-landify-blue">85</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-landify-blue h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-gray-600">High quality lead</p>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <LeadNotes />
        </div>
      </div>
    </div>
  );
};
