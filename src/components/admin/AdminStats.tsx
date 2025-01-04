import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { AdminInquiry } from '../../types/admin';

interface AdminStatsProps {
  inquiries: AdminInquiry[];
}

export default function AdminStats({ inquiries }: AdminStatsProps) {
  const stats = [
    {
      label: 'Total Inquiries',
      value: inquiries.length,
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'New Inquiries',
      value: inquiries.filter(i => i.status === 'new').length,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      label: 'Completed',
      value: inquiries.filter(i => i.status === 'completed').length,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600'
    },
    {
      label: 'Requires Attention',
      value: inquiries.filter(i => i.status === 'in_progress').length,
      icon: AlertCircle,
      color: 'bg-red-50 text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}