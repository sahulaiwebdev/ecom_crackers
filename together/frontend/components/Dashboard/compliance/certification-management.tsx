'use client';

import { IconCheck, IconAlertTriangle, IconDownload } from '@tabler/icons-react';

interface Certificate {
  id: string;
  certificateType: string;
  certificateNo: string;
  issuedDate: string;
  expiryDate: string;
  issuer: string;
  status: 'valid' | 'expiring' | 'expired';
}

export default function CertificationManagement() {
  const [certificates] = React.useState<Certificate[]>([
    {
      id: '1',
      certificateType: 'PESO Approval Certificate',
      certificateNo: 'PESO-2024-12345',
      issuedDate: '2024-01-15',
      expiryDate: '2026-01-14',
      issuer: 'Petroleum & Explosives Safety Organisation',
      status: 'valid',
    },
    {
      id: '2',
      certificateType: 'Green Cracker Certification',
      certificateNo: 'GCERT-2024-001',
      issuedDate: '2024-03-01',
      expiryDate: '2025-02-28',
      issuer: 'Ministry of Environment',
      status: 'valid',
    },
    {
      id: '3',
      certificateType: 'Fire Safety Audit Report',
      certificateNo: 'FSA-2024-001',
      issuedDate: '2024-06-20',
      expiryDate: '2025-06-19',
      issuer: 'Fire Department',
      status: 'valid',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Certificate Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map(cert => (
          <div key={cert.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{cert.certificateType}</h3>
                <p className="text-sm text-gray-600 mt-1">No: {cert.certificateNo}</p>
              </div>
              <IconCheck size={24} className="text-green-500 flex-shrink-0" />
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div>
                <p className="text-gray-600">Issuer</p>
                <p className="font-medium text-gray-900">{cert.issuer}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-600 text-xs">Issued</p>
                  <p className="font-medium text-gray-900 text-sm">
                    {new Date(cert.issuedDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Expires</p>
                  <p className="font-medium text-gray-900 text-sm">
                    {new Date(cert.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 text-center py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors flex items-center justify-center gap-1">
                <IconDownload size={16} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Key Points */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-3">PESO Approval Requirements</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>✓ All crackers must have PESO approval certificate</li>
          <li>✓ Green crackers only - Barium/Lead free</li>
          <li>✓ Sound level must be below 125 dB</li>
          <li>✓ Proper manufacturing and packaging standards</li>
          <li>✓ Certification valid for 2 years from issue date</li>
        </ul>
      </div>

      {/* Compliance Checklist */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Compliance Checklist</h3>
        <div className="space-y-2">
          {[
            { item: 'PESO Approval Certificate', status: true },
            { item: 'Green Cracker Certification', status: true },
            { item: 'Fire Safety Audit', status: true },
            { item: 'Storage License', status: true },
            { item: 'Dealer License', status: true },
          ].map((check, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                check.status ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {check.status && <IconCheck size={16} className="text-white" />}
              </div>
              <span className={`text-sm font-medium ${check.status ? 'text-green-700' : 'text-gray-600'}`}>
                {check.item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
