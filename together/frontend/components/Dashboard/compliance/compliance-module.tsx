'use client';

import { useState } from 'react';
import { IconAlertTriangle, IconCheck, IconClock, IconUpload, IconX } from '@tabler/icons-react';
import { toast } from 'sonner';
import LicenseManagement from './license-management';
import CertificationManagement from './certification-management';
import ComplianceAlerts from './compliance-alerts';
import ProductComplianceCheck from './product-compliance-check';

export function ComplianceModule() {
  const [activeTab, setActiveTab] = useState<'licenses' | 'certifications' | 'products' | 'alerts'>('licenses');

  const tabs = [
    { id: 'licenses', label: 'Licenses & Permits', icon: '📋' },
    { id: 'certifications', label: 'PESO Certificates', icon: '✓' },
    { id: 'products', label: 'Product Compliance', icon: '📦' },
    { id: 'alerts', label: 'Compliance Alerts', icon: '⚠️' },
  ] as const;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          License & Compliance Management
        </h1>
        <p className="text-gray-600 mt-1">
          Manage regulatory compliance and legal requirements for firecracker sales
        </p>
      </div>

      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Licenses</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
            </div>
            <IconCheck size={32} className="text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">All valid</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Expiring Soon</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1</p>
            </div>
            <IconClock size={32} className="text-yellow-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Within 30 days</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Expired</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
            </div>
            <IconAlertTriangle size={32} className="text-red-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Renewal required</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">PESO Compliant</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">45</p>
            </div>
            <IconCheck size={32} className="text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Out of 50 products</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 p-4 md:p-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'licenses' && <LicenseManagement />}
          {activeTab === 'certifications' && <CertificationManagement />}
          {activeTab === 'products' && <ProductComplianceCheck />}
          {activeTab === 'alerts' && <ComplianceAlerts />}
        </div>
      </div>

      {/* Legal Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-2">Important Legal Notice</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Online firecracker sales are strictly banned in India</li>
          <li>• Only licensed offline sales through authorized dealers are permitted</li>
          <li>• All products must be PESO (Petroleum & Explosives Safety Organisation) approved</li>
          <li>• Only green crackers with sound level &lt; 125 dB are allowed</li>
          <li>• Maintain detailed records of all sales and licenses for 30 days minimum</li>
          <li>• Violators face penalties, fines, and business closure</li>
        </ul>
      </div>
    </div>
  );
}
