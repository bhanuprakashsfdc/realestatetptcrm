
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const salesData = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 25 },
  { month: 'Mar', value: 22 },
  { month: 'Apr', value: 30 },
  { month: 'May', value: 35 },
  { month: 'Jun', value: 45 },
  { month: 'Jul', value: 30 },
  { month: 'Aug', value: 35 },
  { month: 'Sep', value: 40 },
  { month: 'Oct', value: 50 },
  { month: 'Nov', value: 45 },
  { month: 'Dec', value: 35 },
];

export const SalesChart: React.FC = () => {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sales Growth</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Yearly</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              className="text-sm text-gray-500"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-sm text-gray-500"
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}M`, 'Sales']}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4f46e5" 
              strokeWidth={3}
              dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
