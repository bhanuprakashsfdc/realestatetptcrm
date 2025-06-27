
import React from 'react';

const properties = [
  {
    id: 1,
    price: '$9,370,000',
    address: '8502 Preston Rd.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=60&fit=crop'
  },
  {
    id: 2,
    price: '$5,400,000',
    address: '7529 E. Pecan St.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=80&h=60&fit=crop'
  },
  {
    id: 3,
    price: '$6,850,000',
    address: '3890 Poplar Dr.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=80&h=60&fit=crop'
  }
];

export const NewPropertiesList: React.FC = () => {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">New Properties</h3>
        <button className="text-sm text-landify-blue hover:text-landify-blue-light font-medium">
          All Properties
        </button>
      </div>

      <div className="space-y-4">
        {properties.map((property) => (
          <div key={property.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <img 
              src={property.image} 
              alt={property.address}
              className="w-16 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{property.price}</div>
              <div className="text-sm text-gray-500">{property.address}</div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
