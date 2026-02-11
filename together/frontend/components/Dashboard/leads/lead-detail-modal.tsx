'use client';

import { useState } from 'react';
import { IconX, IconPhone, IconBrandWhatsapp, IconCheck } from '@tabler/icons-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  city: string;
  interestedProduct: string;
  quantity: string;
  requirementDate: string;
  notes: string;
  leadSource: string;
  leadStatus: 'New Lead' | 'Contacted' | 'Quotation Sent' | 'Negotiation' | 'Confirmed' | 'Converted to Order' | 'Rejected';
  createdAt: string;
  updatedAt: string;
}

interface LeadDetailModalProps {
  lead: Lead;
  onClose: () => void;
  onStatusChange: (leadId: string, newStatus: Lead['leadStatus']) => void;
  onConvertToOrder: (lead: Lead) => void;
}

export default function LeadDetailModal({
  lead,
  onClose,
  onStatusChange,
  onConvertToOrder,
}: LeadDetailModalProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statuses: Lead['leadStatus'][] = [
    'New Lead',
    'Contacted',
    'Quotation Sent',
    'Negotiation',
    'Confirmed',
    'Converted to Order',
    'Rejected',
  ];

  const handleStatusChange = (newStatus: Lead['leadStatus']) => {
    onStatusChange(lead.id, newStatus);
    setShowStatusMenu(false);
  };

  const handleCall = () => {
    window.location.href = `tel:${lead.phone}`;
  };

  const handleWhatsApp = () => {
    const message = `Hi ${lead.customerName}, I'm following up on your enquiry for ${lead.interestedProduct}. Let me provide you a quotation.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${lead.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{lead.customerName}</h2>
            <p className="text-sm text-orange-100">Lead ID: {lead.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Lead Status Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Current Status</p>
                <p className={`text-lg font-bold mt-1 ${
                  lead.leadStatus === 'New Lead'
                    ? 'text-blue-700'
                    : lead.leadStatus === 'Contacted'
                    ? 'text-yellow-700'
                    : lead.leadStatus === 'Quotation Sent'
                    ? 'text-purple-700'
                    : lead.leadStatus === 'Confirmed'
                    ? 'text-green-700'
                    : lead.leadStatus === 'Converted to Order'
                    ? 'text-emerald-700'
                    : 'text-red-700'
                }`}>
                  {lead.leadStatus}
                </p>
              </div>

              {/* Status Change Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
                >
                  Change Status
                </button>

                {showStatusMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[200px]">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          status === lead.leadStatus ? 'bg-orange-50' : ''
                        }`}
                      >
                        {status}
                        {status === lead.leadStatus && <IconCheck size={16} className="text-orange-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-medium text-gray-900">{lead.phone}</p>
                    <button
                      onClick={handleCall}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="Call"
                    >
                      <IconPhone size={18} />
                    </button>
                  </div>
                </div>

                {lead.whatsapp && (
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-medium text-gray-900">{lead.whatsapp}</p>
                      <button
                        onClick={handleWhatsApp}
                        className="text-green-500 hover:text-green-700 transition-colors"
                        title="WhatsApp"
                      >
                        <IconBrandWhatsapp size={18} />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-medium text-gray-900 mt-1">{lead.city}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Lead Source</p>
                  <p className="font-medium text-gray-900 mt-1">{lead.leadSource}</p>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Interested Product</p>
                  <p className="font-medium text-gray-900 mt-1">{lead.interestedProduct}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Estimated Quantity</p>
                  <p className="font-medium text-gray-900 mt-1">{lead.quantity}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Requirement Date</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {lead.requirementDate ? new Date(lead.requirementDate).toLocaleDateString() : 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {lead.notes && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-500">
                <p className="text-gray-700">{lead.notes}</p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Created:</span>
                <span className="font-medium">{new Date(lead.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Last Updated:</span>
                <span className="font-medium">{new Date(lead.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {lead.leadStatus !== 'Converted to Order' && lead.leadStatus !== 'Rejected' && (
              <button
                onClick={() => {
                  onConvertToOrder(lead);
                  onClose();
                }}
                className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Convert to Order
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
