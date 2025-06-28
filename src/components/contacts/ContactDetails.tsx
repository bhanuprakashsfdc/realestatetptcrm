
import React from 'react';
import { Phone, Mail, Building, MapPin, MessageCircle, Edit, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ContactTimeline } from './ContactTimeline';
import { ContactNotes } from './ContactNotes';

export const ContactDetails = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b1ef?w=64&h=64&fit=crop&crop=face" />
            <AvatarFallback className="bg-landify-blue text-white text-lg font-semibold">AM</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Anna Martinez</h1>
            <p className="text-gray-600">Senior Real Estate Agent • Pinnacle Properties</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-green-100 text-green-800">Active Client</Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button size="sm" className="bg-landify-blue hover:bg-landify-blue-light">
            <Edit className="w-4 h-4 mr-2" />
            Edit Contact
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
                    <p className="font-semibold text-gray-900">+1 (555) 987-6543</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">anna.martinez@pinnacle.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-semibold text-gray-900">Pinnacle Properties</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">Los Angeles, CA</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Position</p>
                    <p className="font-semibold text-gray-900">Senior Real Estate Agent</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Experience</p>
                    <p className="font-semibold text-gray-900">8+ Years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Specialization</p>
                    <p className="font-semibold text-gray-900">Luxury Residential</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">License #</p>
                    <p className="font-semibold text-gray-900">DRE #01234567</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication History */}
          <ContactTimeline />
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
                Start Call
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
                <Building className="w-4 h-4 mr-2" />
                View Properties
              </Button>
            </CardContent>
          </Card>

          {/* Relationship Stats */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Relationship Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-landify-blue">4.8</div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Client Rating</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">23</p>
                  <p className="text-sm text-gray-600">Interactions</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-600">Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">VIP Client</Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">High Value</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">Referral Source</Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">Luxury Market</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <ContactNotes />
        </div>
      </div>
    </div>
  );
};
