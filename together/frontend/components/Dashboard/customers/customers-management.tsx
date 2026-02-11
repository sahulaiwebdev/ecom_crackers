'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  IconSearch,
  IconPhone,
  IconBrandWhatsapp,
  IconUser,
  IconShoppingCart,
  IconClock,
} from '@tabler/icons-react';
import { toast } from 'sonner';

interface Customer {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  city: string;
  customerType: 'Retail' | 'Bulk';
  totalPurchases: number;
  totalSpent: number;
  lastPurchaseDate: string;
  leadCount: number;
  orderCount: number;
  isFrequentBuyer: boolean;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Raj Kumar',
    phone: '+919876543210',
    whatsapp: '+919876543210',
    city: 'Chennai',
    customerType: 'Bulk',
    totalPurchases: 5,
    totalSpent: 125000,
    lastPurchaseDate: '2024-10-15',
    leadCount: 3,
    orderCount: 5,
    isFrequentBuyer: true,
  },
  {
    id: '2',
    name: 'Priya Singh',
    phone: '+918765432109',
    whatsapp: '+918765432109',
    city: 'Bangalore',
    customerType: 'Retail',
    totalPurchases: 3,
    totalSpent: 45000,
    lastPurchaseDate: '2024-10-14',
    leadCount: 2,
    orderCount: 3,
    isFrequentBuyer: false,
  },
  {
    id: '3',
    name: 'Amit Patel',
    phone: '+917654321098',
    whatsapp: '+917654321098',
    city: 'Mumbai',
    customerType: 'Bulk',
    totalPurchases: 8,
    totalSpent: 280000,
    lastPurchaseDate: '2024-10-13',
    leadCount: 5,
    orderCount: 8,
    isFrequentBuyer: true,
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    phone: '+916543210987',
    whatsapp: '+916543210987',
    city: 'Delhi',
    customerType: 'Retail',
    totalPurchases: 1,
    totalSpent: 15000,
    lastPurchaseDate: '2024-10-12',
    leadCount: 1,
    orderCount: 1,
    isFrequentBuyer: false,
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    phone: '+915432109876',
    whatsapp: '+915432109876',
    city: 'Hyderabad',
    customerType: 'Bulk',
    totalPurchases: 12,
    totalSpent: 520000,
    lastPurchaseDate: '2024-10-15',
    leadCount: 8,
    orderCount: 12,
    isFrequentBuyer: true,
  },
];

export function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'retail' | 'bulk'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, filterType, searchTerm]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      setCustomers(mockCustomers);
    } catch (error) {
      toast.error('Failed to load customers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    let filtered = customers;

    if (filterType !== 'all') {
      filtered = filtered.filter(
        c => c.customerType.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        c =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.phone.includes(searchTerm) ||
          c.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCustomers(filtered);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading customers...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search by name, phone, or city..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterType('all')}
          >
            All
          </Button>
          <Button
            variant={filterType === 'retail' ? 'default' : 'outline'}
            onClick={() => setFilterType('retail')}
          >
            Retail
          </Button>
          <Button
            variant={filterType === 'bulk' ? 'default' : 'outline'}
            onClick={() => setFilterType('bulk')}
          >
            Bulk
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{customers.length}</div>
              <p className="text-sm text-gray-600">Total Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{customers.filter(c => c.isFrequentBuyer).length}</div>
              <p className="text-sm text-gray-600">Frequent Buyers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</div>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">₹{(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toLocaleString()}</div>
              <p className="text-sm text-gray-600">Avg. Customer Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers List</CardTitle>
          <CardDescription>{filteredCustomers.length} customers found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Customer Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">City</th>
                  <th className="text-center py-3 px-4 font-semibold">Orders</th>
                  <th className="text-right py-3 px-4 font-semibold">Total Spent</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-center py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map(customer => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">
                        <div>
                          <p>{customer.name}</p>
                          <p className="text-xs text-gray-600">{customer.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={customer.customerType === 'Bulk' ? 'default' : 'secondary'}>
                          {customer.customerType}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{customer.city}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-semibold">{customer.orderCount}</span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">₹{customer.totalSpent.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        {customer.isFrequentBuyer ? (
                          <Badge className="bg-amber-100 text-amber-800">⭐ Frequent</Badge>
                        ) : (
                          <span className="text-gray-600 text-xs">Regular</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => window.open(`tel:${customer.phone}`)}
                            title="Call"
                          >
                            <IconPhone size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-green-600"
                            onClick={() => window.open(`https://wa.me/${customer.whatsapp.replace(/\D/g, '')}`)}
                            title="WhatsApp"
                          >
                            <IconBrandWhatsapp size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
