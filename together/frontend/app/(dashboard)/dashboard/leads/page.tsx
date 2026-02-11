'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadsManagement } from '@/components/Dashboard/leads/leads-management';
import { LeadsKanbanView } from '@/components/Dashboard/leads/leads-kanban-view';

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState('kanban');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lead Management</h1>
        <p className="text-gray-600 mt-1">Convert leads to orders through the sales pipeline</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          <LeadsKanbanView 
            onLeadClick={(lead) => {
              console.log('[v0] Lead clicked:', lead);
            }}
            onConvertToOrder={(lead) => {
              console.log('[v0] Convert to order:', lead);
            }}
          />
        </TabsContent>

        <TabsContent value="list">
          <LeadsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
