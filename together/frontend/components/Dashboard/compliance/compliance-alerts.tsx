'use client';

import { IconAlertTriangle, IconAlertCircle, IconClock, IconTrendingDown } from '@tabler/icons-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  action?: string;
  daysRemaining?: number;
}

export default function ComplianceAlerts() {
  const [alerts] = React.useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'License Expiring Soon',
      description: 'Firecracker Dealer License (FDL-2024-001) expires in 30 days',
      action: 'Renew License',
      daysRemaining: 30,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Non-Compliant Products',
      description: 'Ground Bombs product does not meet PESO approval requirements',
      action: 'Review Products',
    },
    {
      id: '3',
      type: 'warning',
      title: 'Storage Limit Alert',
      description: 'Current stock (45 units) is approaching your licensed limit of 50 units',
      action: 'View Stock',
      daysRemaining: undefined,
    },
    {
      id: '4',
      type: 'info',
      title: 'Compliance Audit Due',
      description: 'Annual fire safety audit is due within 45 days',
      action: 'Schedule Audit',
      daysRemaining: 45,
    },
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <IconAlertTriangle size={24} className="text-red-600" />;
      case 'warning':
        return <IconAlertCircle size={24} className="text-yellow-600" />;
      case 'info':
        return <IconClock size={24} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const getAlertBackground = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm font-medium">Critical</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {alerts.filter(a => a.type === 'critical').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm font-medium">Warnings</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {alerts.filter(a => a.type === 'warning').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm font-medium">Info</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {alerts.filter(a => a.type === 'info').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm font-medium">Total Alerts</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{alerts.length}</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`rounded-lg border p-4 flex gap-4 ${getAlertBackground(alert.type)}`}
          >
            <div className="flex-shrink-0 pt-0.5">
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{alert.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
              {alert.daysRemaining && (
                <p className="text-xs text-gray-500 mt-2 font-medium">
                  {alert.daysRemaining} days remaining
                </p>
              )}
            </div>
            {alert.action && (
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm flex-shrink-0">
                {alert.action}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-green-50 rounded-lg border border-green-200 p-6">
        <h3 className="font-bold text-green-900 mb-3">Recommendations</h3>
        <ul className="text-sm text-green-800 space-y-2">
          <li>✓ Renew Dealer License immediately to avoid penalties</li>
          <li>✓ Remove non-compliant Ground Bombs from inventory</li>
          <li>✓ Monitor storage levels and prevent exceeding 50-unit limit</li>
          <li>✓ Schedule fire safety audit with authorized inspector</li>
          <li>✓ Keep all certifications and licenses updated at all times</li>
        </ul>
      </div>
    </div>
  );
}

import React from 'react';
