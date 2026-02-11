'use client';

import { useState } from 'react';
import { IconPlus, IconDownload, IconAlertCircle } from '@tabler/icons-react';
import { toast } from 'sonner';

interface License {
  id: string;
  licenseType: string;
  licenseNumber: string;
  issuedBy: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expiring-soon' | 'expired';
  documentUrl?: string;
}

export default function LicenseManagement() {
  const [licenses, setLicenses] = useState<License[]>([
    {
      id: '1',
      licenseType: 'Shop License',
      licenseNumber: 'DGL-2024-001',
      issuedBy: 'Explosive License Controller',
      issueDate: '2023-04-15',
      expiryDate: '2025-04-14',
      status: 'active',
      documentUrl: '#',
    },
    {
      id: '2',
      licenseType: 'Firecracker Dealer License',
      licenseNumber: 'FDL-2024-001',
      issuedBy: 'Tamil Nadu Fire Safety Board',
      issueDate: '2023-06-01',
      expiryDate: '2024-11-30',
      status: 'expiring-soon',
      documentUrl: '#',
    },
    {
      id: '3',
      licenseType: 'Storage License',
      licenseNumber: 'SL-2024-001',
      issuedBy: 'District Administration',
      issueDate: '2024-01-10',
      expiryDate: '2026-01-09',
      status: 'active',
      documentUrl: '#',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const daysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'expiring-soon':
        return 'bg-yellow-100 text-yellow-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string, expiryDate: string) => {
    const days = daysUntilExpiry(expiryDate);
    if (status === 'active') {
      return `Active (${days} days remaining)`;
    } else if (status === 'expiring-soon') {
      return `Expiring Soon (${days} days remaining)`;
    } else {
      return 'Expired';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add License Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          <IconPlus size={20} />
          Add License
        </button>
      </div>

      {/* Add License Form */}
      {showAddForm && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-300 space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">Add New License</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="License Type" className="px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="License Number" className="px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="Issued By" className="px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="date" placeholder="Issue Date" className="px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="date" placeholder="Expiry Date" className="px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="file" placeholder="Upload Document" className="px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Save License
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Licenses Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">License Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">License No.</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Issued By</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Expiry Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {licenses.map(license => (
              <tr key={license.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{license.licenseType}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{license.licenseNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{license.issuedBy}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(license.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(license.status)}`}>
                    {getStatusLabel(license.status, license.expiryDate)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <a
                    href={license.documentUrl}
                    className="text-orange-500 hover:text-orange-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    <IconDownload size={16} />
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Renewal Reminder */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
        <IconAlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-yellow-900">License Expiry Reminder</p>
          <p className="text-sm text-yellow-800 mt-1">
            Your Firecracker Dealer License (FDL-2024-001) is expiring in 30 days. Please initiate renewal process to avoid penalties.
          </p>
        </div>
      </div>
    </div>
  );
}
