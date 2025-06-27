
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const salesData = [
  {
    id: 1,
    saleTo: 'Ammar Ibn Yasir',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    propertyName: '7529 E. Pecan St.',
    salesType: 'Sale',
    price: '$5,200,000',
    status: 'Paid'
  },
  {
    id: 2,
    saleTo: 'Abu Talha al-Ansari',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    propertyName: '3890 Poplar Dr.',
    salesType: 'Rent',
    price: '$9,750,000',
    status: 'Pending'
  },
  {
    id: 3,
    saleTo: 'Miqdad Ibn Aswad',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    propertyName: '3605 Parker Rd.',
    salesType: 'Sale',
    price: '$4,000,000',
    status: 'Paid'
  },
  {
    id: 4,
    saleTo: 'Amir Ibn Fuhayra',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face',
    propertyName: '775 Rolling Green Rd.',
    salesType: 'Sale',
    price: '$3,725,000',
    status: 'Paid'
  }
];

export const SalesReportsTable: React.FC = () => {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sales Reports</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Yearly</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Sales To</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Property Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Sales Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Price</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id} className="border-b border-gray-50 hover:bg-gray-25">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={sale.avatar} />
                      <AvatarFallback>{sale.saleTo.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">{sale.saleTo}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">{sale.propertyName}</td>
                <td className="py-4 px-4 text-gray-600">{sale.salesType}</td>
                <td className="py-4 px-4 font-semibold text-gray-900">{sale.price}</td>
                <td className="py-4 px-4">
                  <Badge 
                    variant="secondary"
                    className={sale.status === 'Paid' ? 'status-badge-paid' : 'status-badge-pending'}
                  >
                    {sale.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
