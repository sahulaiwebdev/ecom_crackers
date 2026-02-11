'use client';

import { IconX } from '@tabler/icons-react';

interface LeadFiltersPanelProps {
  statuses: string[];
  sources: string[];
  selectedStatus: string;
  selectedSource: string;
  onStatusChange: (status: string) => void;
  onSourceChange: (source: string) => void;
}

export default function LeadFiltersPanel({
  statuses,
  sources,
  selectedStatus,
  selectedSource,
  onStatusChange,
  onSourceChange,
}: LeadFiltersPanelProps) {
  return (
    <div className="space-y-4">
      {/* Status Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Lead Status</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onStatusChange('')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedStatus === ''
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Status
          </button>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedStatus === status
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Source Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Lead Source</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSourceChange('')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedSource === ''
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Sources
          </button>
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => onSourceChange(source)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedSource === source
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
