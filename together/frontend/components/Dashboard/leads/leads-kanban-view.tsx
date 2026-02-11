'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconPhone, IconBrandWhatsapp, IconPlus, IconArrowRight } from '@tabler/icons-react';
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
  leadStatus: 'New Lead' | 'Contacted' | 'Quotation Sent' | 'Negotiation' | 'Confirmed' | 'Converted to Order' | 'Rejected';
  createdAt: string;
}

const LEAD_STATUSES = ['New Lead', 'Contacted', 'Quotation Sent', 'Negotiation', 'Confirmed', 'Converted to Order', 'Rejected'] as const;

const STATUS_COLORS: Record<string, string> = {
  'New Lead': 'bg-blue-50 border-blue-200',
  'Contacted': 'bg-purple-50 border-purple-200',
  'Quotation Sent': 'bg-amber-50 border-amber-200',
  'Negotiation': 'bg-orange-50 border-orange-200',
  'Confirmed': 'bg-green-50 border-green-200',
  'Converted to Order': 'bg-emerald-50 border-emerald-200',
  'Rejected': 'bg-red-50 border-red-200',
};

const STATUS_BADGE_COLORS: Record<string, string> = {
  'New Lead': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-purple-100 text-purple-800',
  'Quotation Sent': 'bg-amber-100 text-amber-800',
  'Negotiation': 'bg-orange-100 text-orange-800',
  'Confirmed': 'bg-green-100 text-green-800',
  'Converted to Order': 'bg-emerald-100 text-emerald-800',
  'Rejected': 'bg-red-100 text-red-800',
};

interface LeadsKanbanViewProps {
  onLeadClick?: (lead: Lead) => void;
  onConvertToOrder?: (lead: Lead) => void;
}

export function LeadsKanbanView({ onLeadClick, onConvertToOrder }: LeadsKanbanViewProps) {
  const [leads, setLeads] = useState<Record<string, Lead[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      // Mock data - replace with API call
      const mockLeads: Lead[] = [
        {
          id: '1',
          customerName: 'Raj Kumar',
          phone: '+919876543210',
          whatsapp: '+919876543210',
          city: 'Chennai',
          interestedProduct: 'Atom Bombs',
          quantity: '500 boxes',
          requirementDate: '2024-11-01',
          leadStatus: 'New Lead',
          createdAt: '2024-10-15T10:30:00Z',
        },
        {
          id: '2',
          customerName: 'Priya Singh',
          phone: '+918765432109',
          whatsapp: '+918765432109',
          city: 'Bangalore',
          interestedProduct: 'Rockets',
          quantity: '200 boxes',
          requirementDate: '2024-11-05',
          leadStatus: 'Contacted',
          createdAt: '2024-10-14T14:20:00Z',
        },
        {
          id: '3',
          customerName: 'Amit Patel',
          phone: '+917654321098',
          whatsapp: '+917654321098',
          city: 'Mumbai',
          interestedProduct: 'Sparklers',
          quantity: '300 boxes',
          requirementDate: '2024-11-03',
          leadStatus: 'Quotation Sent',
          createdAt: '2024-10-13T11:15:00Z',
        },
        {
          id: '4',
          customerName: 'Sarah Johnson',
          phone: '+916543210987',
          whatsapp: '+916543210987',
          city: 'Delhi',
          interestedProduct: 'Flower Pots',
          quantity: '150 boxes',
          requirementDate: '2024-11-02',
          leadStatus: 'Negotiation',
          createdAt: '2024-10-12T09:45:00Z',
        },
        {
          id: '5',
          customerName: 'Vikram Reddy',
          phone: '+915432109876',
          whatsapp: '+915432109876',
          city: 'Hyderabad',
          interestedProduct: 'Atom Bombs',
          quantity: '400 boxes',
          requirementDate: '2024-11-04',
          leadStatus: 'Confirmed',
          createdAt: '2024-10-11T16:30:00Z',
        },
      ];

      // Organize leads by status
      const organizedLeads: Record<string, Lead[]> = {};
      LEAD_STATUSES.forEach(status => {
        organizedLeads[status] = mockLeads.filter(lead => lead.leadStatus === status);
      });

      setLeads(organizedLeads);
    } catch (error) {
      toast.error('Failed to load leads');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToNextStatus = async (lead: Lead) => {
    const currentIndex = LEAD_STATUSES.indexOf(lead.leadStatus);
    if (currentIndex < LEAD_STATUSES.length - 1) {
      const nextStatus = LEAD_STATUSES[currentIndex + 1];
      // Update lead status - replace with API call
      toast.success(`Moved "${lead.customerName}" to "${nextStatus}"`);
      // Update local state
      const updatedLeads = { ...leads };
      updatedLeads[lead.leadStatus] = updatedLeads[lead.leadStatus].filter(l => l.id !== lead.id);
      updatedLeads[nextStatus] = [...(updatedLeads[nextStatus] || []), { ...lead, leadStatus: nextStatus as any }];
      setLeads(updatedLeads);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading leads...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lead Pipeline (Kanban View)</h2>
          <p className="text-sm text-gray-600 mt-1">Drag leads across stages or click to manage</p>
        </div>
        <Button className="gap-2">
          <IconPlus size={16} /> New Lead
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
        {LEAD_STATUSES.map(status => (
          <div key={status} className="space-y-2 min-w-[300px]">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">{status}</h3>
              <Badge variant="outline" className="ml-auto">
                {leads[status]?.length || 0}
              </Badge>
            </div>

            {/* Column Body */}
            <div className={`space-y-3 p-3 rounded-lg border-2 ${STATUS_COLORS[status]} min-h-[400px]`}>
              {leads[status] && leads[status].length > 0 ? (
                leads[status].map(lead => (
                  <Card
                    key={lead.id}
                    className="cursor-move hover:shadow-md transition-shadow"
                    onClick={() => onLeadClick?.(lead)}
                  >
                    <CardContent className="p-3 space-y-2">
                      {/* Customer Name */}
                      <div className="font-medium text-sm text-gray-900">{lead.customerName}</div>

                      {/* Product */}
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-600">Product:</span>
                        <span className="text-xs font-medium text-orange-600">{lead.interestedProduct}</span>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-600">Qty:</span>
                        <span className="text-xs font-medium">{lead.quantity}</span>
                      </div>

                      {/* City */}
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-600">City:</span>
                        <span className="text-xs">{lead.city}</span>
                      </div>

                      {/* Contact Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-8 text-xs gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`tel:${lead.phone}`);
                          }}
                        >
                          <IconPhone size={12} /> Call
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-8 text-xs gap-1 text-green-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`);
                          }}
                        >
                          <IconBrandWhatsapp size={12} /> WhatsApp
                        </Button>
                      </div>

                      {/* Move to Next Status Button */}
                      {status !== 'Converted to Order' && status !== 'Rejected' && (
                        <Button
                          size="sm"
                          variant="default"
                          className="w-full h-8 text-xs gap-1 mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveToNextStatus(lead);
                          }}
                        >
                          <IconArrowRight size={12} /> Move
                        </Button>
                      )}

                      {/* Convert to Order Button - Only for Confirmed */}
                      {status === 'Confirmed' && (
                        <Button
                          size="sm"
                          className="w-full h-8 text-xs bg-green-600 hover:bg-green-700 mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            onConvertToOrder?.(lead);
                          }}
                        >
                          Convert to Order
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No leads in this stage</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
