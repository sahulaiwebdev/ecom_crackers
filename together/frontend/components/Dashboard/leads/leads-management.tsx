'use client';

import { useState, useEffect } from 'react';
import { IconPhone, IconBrandWhatsapp, IconSearch, IconPlus, IconFilter } from '@tabler/icons-react';
import { toast } from 'sonner';
import LeadFiltersPanel from './lead-filters-panel';
import LeadDetailModal from './lead-detail-modal';
import LeadForm from './lead-form';

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

export function LeadsManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterSource, setFilterSource] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch leads
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      // For now, load from mock data - replace with API call
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
          notes: 'Need green crackers only for Diwali',
          leadSource: 'Website',
          leadStatus: 'New Lead',
          createdAt: '2024-10-15T10:30:00Z',
          updatedAt: '2024-10-15T10:30:00Z',
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
          notes: 'Wholesale inquiry',
          leadSource: 'Phone',
          leadStatus: 'Contacted',
          createdAt: '2024-10-14T14:20:00Z',
          updatedAt: '2024-10-15T09:00:00Z',
        },
        {
          id: '3',
          customerName: 'Amit Patel',
          phone: '+917654321098',
          whatsapp: '+917654321098',
          city: 'Delhi',
          interestedProduct: 'Flowerpots',
          quantity: '1000 pieces',
          requirementDate: '2024-11-10',
          notes: 'Regular customer',
          leadSource: 'WhatsApp',
          leadStatus: 'Quotation Sent',
          createdAt: '2024-10-13T11:45:00Z',
          updatedAt: '2024-10-15T08:15:00Z',
        },
      ];

      setLeads(mockLeads);
      applyFilters(mockLeads, '', '', '');
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (
    leadsToFilter: Lead[],
    search: string,
    status: string,
    source: string
  ) => {
    let filtered = leadsToFilter;

    if (search) {
      filtered = filtered.filter(lead =>
        lead.customerName.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        lead.city.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter(lead => lead.leadStatus === status);
    }

    if (source) {
      filtered = filtered.filter(lead => lead.leadSource === source);
    }

    setFilteredLeads(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(leads, term, filterStatus, filterSource);
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    applyFilters(leads, searchTerm, status, filterSource);
  };

  const handleSourceFilter = (source: string) => {
    setFilterSource(source);
    applyFilters(leads, searchTerm, filterStatus, source);
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailModal(true);
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: Lead['leadStatus']) => {
    try {
      // Update API call here
      const updatedLeads = leads.map(lead =>
        lead.id === leadId
          ? { ...lead, leadStatus: newStatus, updatedAt: new Date().toISOString() }
          : lead
      );
      setLeads(updatedLeads);
      applyFilters(updatedLeads, searchTerm, filterStatus, filterSource);

      if (selectedLead?.id === leadId) {
        setSelectedLead({
          ...selectedLead,
          leadStatus: newStatus,
          updatedAt: new Date().toISOString(),
        });
      }

      toast.success(`Lead status updated to "${newStatus}"`);
    } catch (error) {
      toast.error('Failed to update lead status');
    }
  };

  const handleConvertToOrder = (lead: Lead) => {
    // This would navigate to order creation page
    toast.success(`Converting lead "${lead.customerName}" to order...`);
  };

  const statuses: Lead['leadStatus'][] = [
    'New Lead',
    'Contacted',
    'Quotation Sent',
    'Negotiation',
    'Confirmed',
    'Converted to Order',
    'Rejected',
  ];

  const sources = ['Website', 'Phone', 'WhatsApp', 'Walk-in', 'Referral'];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600 mt-1">Manage and convert firecracker sales leads</p>
        </div>
        <button
          onClick={() => setShowLeadForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          <IconPlus size={20} />
          Add Lead
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <IconSearch className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, phone, or city..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <IconFilter size={20} />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <LeadFiltersPanel
            statuses={statuses}
            sources={sources}
            selectedStatus={filterStatus}
            selectedSource={filterSource}
            onStatusChange={handleStatusFilter}
            onSourceChange={handleSourceFilter}
          />
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">Loading leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No leads found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Qty</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Source</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>{lead.phone}</span>
                        <a href={`tel:${lead.phone}`} className="text-blue-500 hover:text-blue-700">
                          <IconPhone size={16} />
                        </a>
                        {lead.whatsapp && (
                          <a
                            href={`https://wa.me/${lead.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 hover:text-green-700"
                          >
                            <IconBrandWhatsapp size={16} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.interestedProduct}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.quantity}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        lead.leadStatus === 'New Lead'
                          ? 'bg-blue-100 text-blue-700'
                          : lead.leadStatus === 'Contacted'
                          ? 'bg-yellow-100 text-yellow-700'
                          : lead.leadStatus === 'Quotation Sent'
                          ? 'bg-purple-100 text-purple-700'
                          : lead.leadStatus === 'Confirmed'
                          ? 'bg-green-100 text-green-700'
                          : lead.leadStatus === 'Converted to Order'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {lead.leadStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.leadSource}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleViewLead(lead)}
                        className="text-orange-500 hover:text-orange-700 font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {showLeadForm && (
        <LeadForm onClose={() => setShowLeadForm(false)} />
      )}

      {showDetailModal && selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setShowDetailModal(false)}
          onStatusChange={handleUpdateLeadStatus}
          onConvertToOrder={handleConvertToOrder}
        />
      )}
    </div>
  );
}
