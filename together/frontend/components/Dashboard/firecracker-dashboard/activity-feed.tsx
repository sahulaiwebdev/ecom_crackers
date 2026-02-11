'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  IconUser,
  IconShoppingCart,
  IconPackage,
  IconAlertTriangle,
  IconFileText,
  IconClock,
  IconCheckCircle,
  IconPhone,
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'lead' | 'order' | 'stock' | 'license' | 'invoice' | 'pos' | 'compliance' | 'contact';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ReactNode;
  severity?: 'info' | 'warning' | 'error' | 'success';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'lead',
    title: 'New Lead Created',
    description: 'Raj Kumar from Chennai enquired for 500 boxes of Atom Bombs',
    timestamp: new Date(Date.now() - 5 * 60000),
    icon: <IconUser size={20} />,
    severity: 'info',
  },
  {
    id: '2',
    type: 'pos',
    title: 'POS Sale Completed',
    description: 'Walk-in sale: ₹5,200 for Sparklers (200 boxes)',
    timestamp: new Date(Date.now() - 15 * 60000),
    icon: <IconShoppingCart size={20} />,
    severity: 'success',
  },
  {
    id: '3',
    type: 'order',
    title: 'Order Converted',
    description: 'Lead #LC-2024-1023 converted to Order #ORD-2024-4521',
    timestamp: new Date(Date.now() - 25 * 60000),
    icon: <IconCheckCircle size={20} />,
    severity: 'success',
  },
  {
    id: '4',
    type: 'stock',
    title: 'Stock Updated',
    description: 'Atom Bombs stock reduced from 800 to 650 boxes',
    timestamp: new Date(Date.now() - 45 * 60000),
    icon: <IconPackage size={20} />,
    severity: 'info',
  },
  {
    id: '5',
    type: 'license',
    title: 'License Expiry Warning',
    description: 'Shop license expires in 45 days (Dec 31, 2024)',
    timestamp: new Date(Date.now() - 60 * 60000),
    icon: <IconAlertTriangle size={20} />,
    severity: 'warning',
  },
  {
    id: '6',
    type: 'invoice',
    title: 'Invoice Generated',
    description: 'Invoice #INV-2024-1847 generated for Order #ORD-2024-4520',
    timestamp: new Date(Date.now() - 90 * 60000),
    icon: <IconFileText size={20} />,
    severity: 'info',
  },
  {
    id: '7',
    type: 'compliance',
    title: 'Compliance Check Failed',
    description: 'Product "Banned Cracker X" added - violates green cracker policy',
    timestamp: new Date(Date.now() - 120 * 60000),
    icon: <IconAlertTriangle size={20} />,
    severity: 'error',
  },
  {
    id: '8',
    type: 'contact',
    title: 'Customer Called',
    description: 'Follow-up call made to Priya Singh regarding quotation',
    timestamp: new Date(Date.now() - 180 * 60000),
    icon: <IconPhone size={20} />,
    severity: 'info',
  },
];

const getSeverityColor = (severity?: string) => {
  switch (severity) {
    case 'error':
      return 'bg-red-50 border-red-200';
    case 'warning':
      return 'bg-amber-50 border-amber-200';
    case 'success':
      return 'bg-green-50 border-green-200';
    default:
      return 'bg-blue-50 border-blue-200';
  }
};

const getSeverityBadgeColor = (severity?: string) => {
  switch (severity) {
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'warning':
      return 'bg-amber-100 text-amber-800';
    case 'success':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

const getIconColor = (severity?: string) => {
  switch (severity) {
    case 'error':
      return 'text-red-600';
    case 'warning':
      return 'text-amber-600';
    case 'success':
      return 'text-green-600';
    default:
      return 'text-blue-600';
  }
};

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Real-time updates from your firecracker business</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivities.map((activity) => (
          <div
            key={activity.id}
            className={`flex gap-4 p-3 rounded-lg border-2 transition-all hover:shadow-sm ${getSeverityColor(activity.severity)}`}
          >
            {/* Icon */}
            <div className={`flex-shrink-0 ${getIconColor(activity.severity)}`}>
              {activity.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm text-gray-900">{activity.title}</h4>
                <Badge className={getSeverityBadgeColor(activity.severity)} variant="secondary">
                  {activity.type}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                <IconClock size={12} />
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </div>
            </div>
          </div>
        ))}

        {/* View All Button */}
        <div className="text-center pt-2">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Activities →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
