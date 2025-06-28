
import React from 'react';
import { MapPin, Bed, Bath, Square, Edit, Trash2, Copy, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertyCarousel } from './PropertyCarousel';
import { PropertyMap } from './PropertyMap';

export const PropertyDetails = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Luxury Villa in Beverly Hills</h1>
          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4" />
            1234 Sunset Boulevard, Beverly Hills, CA 90210
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Carousel */}
          <PropertyCarousel />

          {/* Property Details */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Square className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Size</p>
                    <p className="font-semibold text-gray-900">3,500 sq ft</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Bed className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="font-semibold text-gray-900">5</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Bath className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="font-semibold text-gray-900">4</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-landify-blue" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900">Villa</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {['Swimming Pool', 'Garden', 'Garage', 'Fireplace', 'Balcony', 'Gym'].map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="bg-landify-blue/10 text-landify-blue">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  This stunning luxury villa offers breathtaking views and premium finishes throughout. 
                  Located in the prestigious Beverly Hills area, this property features spacious living areas, 
                  a gourmet kitchen, and beautifully landscaped grounds. Perfect for entertaining with its 
                  open floor plan and resort-style backyard.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Price and Map */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">$2,850,000</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">For Sale</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Price per sq ft</p>
                    <p className="font-semibold">$814</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Est. Payment</p>
                    <p className="font-semibold">$12,450/mo</p>
                  </div>
                </div>
                <Button className="w-full bg-landify-blue hover:bg-landify-blue-light">
                  Schedule Viewing
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <PropertyMap />
        </div>
      </div>
    </div>
  );
};
