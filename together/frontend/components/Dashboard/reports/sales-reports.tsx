'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { IconDownload, IconCalendar } from '@tabler/icons-react';
import { toast } from 'sonner';

const salesData = [
  { date: 'Oct 1', sales: 15000, orders: 8, revenue: 15000 },
  { date: 'Oct 2', sales: 24000, orders: 12, revenue: 24000 },
  { date: 'Oct 3', sales: 32000, orders: 18, revenue: 32000 },
  { date: 'Oct 4', sales: 18000, orders: 9, revenue: 18000 },
  { date: 'Oct 5', sales: 45000, orders: 24, revenue: 45000 },
  { date: 'Oct 6', sales: 52000, orders: 28, revenue: 52000 },
  { date: 'Oct 7', sales: 48000, orders: 25, revenue: 48000 },
];

const categoryData = [
  { name: 'Atom Bombs', value: 125000, percentage: 28 },
  { name: 'Sparklers', value: 98000, percentage: 22 },
  { name: 'Rockets', value: 87000, percentage: 19 },
  { name: 'Flower Pots', value: 76000, percentage: 17 },
  { name: 'Other', value: 59000, percentage: 14 },
];

const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa502', '#95e1d3'];

export function SalesReports() {
  const [dateRange, setDateRange] = useState('week');
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const avgSalesPerDay = totalSales / salesData.length;
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);

  const handleExport = (format: 'pdf' | 'excel') => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Daily Sales Report</h2>
          <p className="text-gray-600">Week ending Oct 7, 2024</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('pdf')} className="gap-2">
            <IconDownload size={16} /> PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')} className="gap-2">
            <IconDownload size={16} /> Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Sales</p>
              <div className="text-3xl font-bold">₹{(totalSales / 100000).toFixed(1)}L</div>
              <p className="text-xs text-green-600 mt-1">↑ 12% vs last week</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Avg Daily Sales</p>
              <div className="text-3xl font-bold">₹{(avgSalesPerDay / 1000).toFixed(1)}K</div>
              <p className="text-xs text-gray-600 mt-1">Per day average</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Orders</p>
              <div className="text-3xl font-bold">{totalOrders}</div>
              <p className="text-xs text-blue-600 mt-1">Avg {Math.round(totalOrders / 7)} per day</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Avg Order Value</p>
              <div className="text-3xl font-bold">₹{Math.round(totalSales / totalOrders).toLocaleString()}</div>
              <p className="text-xs text-gray-600 mt-1">Per order</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Daily sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#ff6b6b" name="Sales (₹)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders by Day */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Day</CardTitle>
            <CardDescription>Number of orders processed daily</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#4ecdc4" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Details */}
        <Card>
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>Top performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{(category.value / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-600">{category.percentage}% of total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
