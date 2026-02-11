'use client';

import { CustomersManagement } from '@/components/Dashboard/customers/customers-management';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <p className="text-gray-600 mt-1">Track all customers and their purchase history</p>
      </div>

      <CustomersManagement />
    </div>
  );
}
