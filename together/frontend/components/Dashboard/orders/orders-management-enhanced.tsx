'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  IconSearch,
  IconPrinter,
  IconShare2,
  IconFileText,
  IconTruck,
  IconPackage,
  IconX,
  IconCheck,
} from '@tabler/icons-react';
import { toast } from 'sonner';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paymentMode: 'Cash' | 'UPI' | 'Bank';
  deliveryType: 'Pickup' | 'Local Delivery';
  status: 'Pending' | 'Packed' | 'Delivered' | 'Cancelled';
  convertedFromLead: string;
  createdAt: string;
  deliveredAt?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderId: 'ORD-2024-4521',
    customerName: 'Raj Kumar',
    phone: '+919876543210',
    whatsapp: '+919876543210',
    city: 'Chennai',
    items: [
      { productId: '1', productName: 'Atom Bombs', quantity: 500, price: 45, total: 22500 },
      { productId: '2', productName: 'Green Sparklers', quantity: 200, price: 30, total: 6000 },
    ],
    subtotal: 28500,
    discount: 2850,
    tax: 2565,
    totalAmount: 28215,
    paymentMode: 'Bank',
    deliveryType: 'Local Delivery',
    status: 'Pending',
    convertedFromLead: 'LC-2024-1001',
    createdAt: '2024-10-15T10:30:00Z',
  },
  {
    id: '2',
    orderId: 'ORD-2024-4520',
    customerName: 'Priya Singh',
    phone: '+918765432109',
    whatsapp: '+918765432109',
    city: 'Bangalore',
    items: [
      { productId: '3', productName: 'Rockets', quantity: 200, price: 35, total: 7000 },
    ],
    subtotal: 7000,
    discount: 0,
    tax: 630,
    totalAmount: 7630,
    paymentMode: 'UPI',
    deliveryType: 'Pickup',
    status: 'Packed',
    convertedFromLead: 'LC-2024-1002',
    createdAt: '2024-10-14T14:20:00Z',
  },
  {
    id: '3',
    orderId: 'ORD-2024-4519',
    customerName: 'Amit Patel',
    phone: '+917654321098',
    whatsapp: '+917654321098',
    city: 'Mumbai',
    items: [
      { productId: '4', productName: 'Flower Pots', quantity: 300, price: 25, total: 7500 },
    ],
    subtotal: 7500,
    discount: 750,
    tax: 607,
    totalAmount: 7357,
    paymentMode: 'Cash',
    deliveryType: 'Local Delivery',
    status: 'Delivered',
    convertedFromLead: 'LC-2024-1003',
    createdAt: '2024-10-13T11:15:00Z',
    deliveredAt: '2024-10-14T16:45:00Z',
  },
];

interface OrdersManagementEnhancedProps {
  status?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-blue-100 text-blue-800';
    case 'Packed':
      return 'bg-amber-100 text-amber-800';
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Pending':
      return <Package size={16} />;
    case 'Packed':
      return <Package size={16} />;
    case 'Delivered':
      return <TrendingUp size={16} />;
    case 'Cancelled':
      return <X size={16} />;
    default:
      return <FileText size={16} />;
  }
};

export function OrdersManagementEnhanced({ status = 'all' }: OrdersManagementEnhancedProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, status, searchTerm]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Mock data - replace with API call
      setOrders(mockOrders);
    } catch (error) {
      toast.error('Failed to load orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (status !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === status.toLowerCase());
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm)
      );
    }

    setFilteredOrders(filtered);
  };

  const handleGenerateInvoice = (order: Order) => {
    toast.success(`Invoice generated for ${order.orderId}`);
  };

  const handlePrintBill = (order: Order) => {
    toast.success(`Printing bill for ${order.orderId}`);
  };

  const handleShareWhatsApp = (order: Order) => {
    const message = `Order ${order.orderId} - ₹${order.totalAmount}. Status: ${order.status}`;
    window.open(`https://wa.me/${order.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`);
  };

  const handleUpdateStatus = async (order: Order, newStatus: string) => {
    toast.success(`Order ${order.orderId} updated to ${newStatus}`);
    // Replace with API call
    setOrders(orders.map(o => (o.id === order.id ? { ...o, status: newStatus as any } : o)));
  };

  if (loading) {
    return <div className="p-8 text-center">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search by Order ID, Customer Name, or Phone..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{orders.length}</div>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{orders.filter(o => o.status === 'Pending').length}</div>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{orders.filter(o => o.status === 'Delivered').length}</div>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">₹{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}</div>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
          <CardDescription>{filteredOrders.length} orders found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold">Items</th>
                  <th className="text-right py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Payment</th>
                  <th className="text-left py-3 px-4 font-semibold">Delivery</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-center py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{order.orderId}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-xs text-gray-600">{order.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {order.items.map((item, i) => (
                          <div key={i}>{item.productName} × {item.quantity}</div>
                        ))}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">₹{order.totalAmount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-xs">{order.paymentMode}</td>
                      <td className="py-3 px-4 text-xs">{order.deliveryType}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleGenerateInvoice(order)}
                            title="Generate Invoice"
                          >
                            <IconFileText size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handlePrintBill(order)}
                            title="Print Bill"
                          >
                            <IconPrinter size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-green-600"
                            onClick={() => handleShareWhatsApp(order)}
                            title="Share on WhatsApp"
                          >
                            <IconShare2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      No orders found
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
