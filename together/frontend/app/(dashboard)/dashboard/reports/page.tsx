'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SalesReports } from '@/components/Dashboard/reports/sales-reports';
import { LeadConversionReports } from '@/components/Dashboard/reports/lead-conversion-reports';
import { StockReports } from '@/components/Dashboard/reports/stock-reports';
import { POSReports } from '@/components/Dashboard/reports/pos-reports';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive reporting for firecracker business</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="leads">Lead Conversion</TabsTrigger>
          <TabsTrigger value="stock">Stock Reports</TabsTrigger>
          <TabsTrigger value="pos">POS Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <SalesReports />
        </TabsContent>
        <TabsContent value="leads">
          <LeadConversionReports />
        </TabsContent>
        <TabsContent value="stock">
          <StockReports />
        </TabsContent>
        <TabsContent value="pos">
          <POSReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
