
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const PropertyMap = () => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-landify-blue" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square bg-gradient-to-br from-landify-blue/10 to-landify-blue/5 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-landify-blue mx-auto mb-2" />
            <p className="text-sm text-gray-600">Interactive Map</p>
            <p className="text-xs text-gray-500 mt-1">Beverly Hills, CA</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
