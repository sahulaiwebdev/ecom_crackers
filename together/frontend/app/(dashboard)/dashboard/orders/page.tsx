'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Orders } from "@/components/Dashboard/orders/orders";
import { OrdersManagementEnhanced } from "@/components/Dashboard/orders/orders-management-enhanced";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-gray-600 mt-1">Track and manage all orders converted from leads</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="packed">Packed</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Orders />
        </TabsContent>
        <TabsContent value="all">
          <OrdersManagementEnhanced status="all" />
        </TabsContent>
        <TabsContent value="pending">
          <OrdersManagementEnhanced status="pending" />
        </TabsContent>
        <TabsContent value="packed">
          <OrdersManagementEnhanced status="packed" />
        </TabsContent>
        <TabsContent value="delivered">
          <OrdersManagementEnhanced status="delivered" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
