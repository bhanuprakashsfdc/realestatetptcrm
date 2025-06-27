
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: LucideIcon;
  iconColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  iconColor = 'text-landify-blue'
}) => {
  return (
    <div className="metric-card">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Icon className={cn("w-5 h-5", iconColor)} />
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {change && (
            <div className={cn(
              "text-sm font-medium",
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            )}>
              {changeType === 'positive' ? '+' : ''}{change}
              <span className="text-gray-500 ml-1">Higher than last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
