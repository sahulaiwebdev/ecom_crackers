'use client';

import { IconCheck, IconAlertTriangle, IconX } from '@tabler/icons-react';

interface Product {
  id: string;
  name: string;
  pesoApproved: boolean;
  greenCracker: boolean;
  soundLevel: number;
  bariumFree: boolean;
  certificateNo: string;
  compliance: 'compliant' | 'non-compliant';
}

export default function ProductComplianceCheck() {
  const [products] = React.useState<Product[]>([
    {
      id: '1',
      name: 'Green Atom Bombs',
      pesoApproved: true,
      greenCracker: true,
      soundLevel: 120,
      bariumFree: true,
      certificateNo: 'PESO-2024-12345',
      compliance: 'compliant',
    },
    {
      id: '2',
      name: 'Flying Rockets',
      pesoApproved: true,
      greenCracker: true,
      soundLevel: 115,
      bariumFree: true,
      certificateNo: 'PESO-2024-12346',
      compliance: 'compliant',
    },
    {
      id: '3',
      name: 'Regular Ground Bombs',
      pesoApproved: false,
      greenCracker: false,
      soundLevel: 135,
      bariumFree: false,
      certificateNo: 'N/A',
      compliance: 'non-compliant',
    },
  ]);

  const complianceStats = {
    total: products.length,
    compliant: products.filter(p => p.compliance === 'compliant').length,
    nonCompliant: products.filter(p => p.compliance === 'non-compliant').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm font-medium">Total Products</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{complianceStats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4">
          <p className="text-green-700 text-sm font-medium">Compliant</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{complianceStats.compliant}</p>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4">
          <p className="text-red-700 text-sm font-medium">Non-Compliant</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{complianceStats.nonCompliant}</p>
        </div>
      </div>

      {/* Compliance Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">PESO Approved</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Green Cracker</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sound Level (dB)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Barium Free</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm">
                  {product.pesoApproved ? (
                    <IconCheck size={18} className="text-green-600" />
                  ) : (
                    <IconX size={18} className="text-red-600" />
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {product.greenCracker ? (
                    <IconCheck size={18} className="text-green-600" />
                  ) : (
                    <IconX size={18} className="text-red-600" />
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <span className={`${product.soundLevel > 125 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.soundLevel}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {product.bariumFree ? (
                    <IconCheck size={18} className="text-green-600" />
                  ) : (
                    <IconX size={18} className="text-red-600" />
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.compliance === 'compliant'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.compliance === 'compliant' ? 'Compliant' : 'Non-Compliant'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Warning */}
      {complianceStats.nonCompliant > 0 && (
        <div className="bg-red-50 rounded-lg p-6 border border-red-200 flex gap-3">
          <IconAlertTriangle size={24} className="text-red-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-red-900">Non-Compliant Products Found</p>
            <p className="text-sm text-red-800 mt-1">
              {complianceStats.nonCompliant} product(s) do not meet legal requirements. These cannot be sold. Please update or remove them from inventory.
            </p>
          </div>
        </div>
      )}

      {/* Compliance Standards */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-3">Compliance Standards for Firecracker Products</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>✓ Must have PESO approval certificate</li>
          <li>✓ Must be classified as green cracker</li>
          <li>✓ Sound level must be below 125 dB</li>
          <li>✓ Must be barium-free</li>
          <li>✓ Proper labeling with all safety information</li>
          <li>✓ Manufacturing date and batch number clearly marked</li>
        </ul>
      </div>
    </div>
  );
}

import React from 'react';
