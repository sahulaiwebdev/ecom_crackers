'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const posSalesData = [
  { date: 'Oct 1', sales: 8500, transactions: 12, avgValue: 708 },
  { date: 'Oct 2', sales: 12300, transactions: 18, avgValue: 683 },
  { date: 'Oct 3', sales: 15600, transactions: 22, avgValue: 709 },
  { date: 'Oct 4', sales: 9200, transactions: 14, avgValue: 657 },
  { date: 'Oct 5', sales: 18900, transactions: 26, avgValue: 727 },
  { date: 'Oct 6', sales: 22100, transactions: 30, avgValue: 737 },
  { date: 'Oct 7', sales: 19800, transactions: 28, avgValue: 707 },
];

const paymentModeData = [
  { mode: 'Cash', transactions: 95, amount: 67300, percentage: 52 },
  { mode: 'UPI', transactions: 68, amount: 48200, percentage: 37 },
  { mode: 'Bank Transfer', transactions: 27, amount: 19200, percentage: 11 },
];

export function POSReports() {
  const totalSales = posSalesData.reduce((sum, item) => sum + item.sales, 0);
  const totalTransactions = posSalesData.reduce((sum, item) => sum + item.transactions, 0);
  const avgTransaction = Math.round(totalSales / totalTransactions);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total POS Sales</p>
              <div className="text-3xl font-bold">₹{(totalSales / 100000).toFixed(1)}L</div>
              <p className="text-xs text-green-600 mt-1">↑ 8% vs last week</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Transactions</p>
              <div className="text-3xl font-bold">{totalTransactions}</div>
              <p className="text-xs text-gray-600 mt-1">Walk-in sales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Avg Transaction Value</p>
              <div className="text-3xl font-bold">₹{avgTransaction.toLocaleString()}</div>
              <p className="text-xs text-gray-600 mt-1">Per transaction</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Avg Daily Sales</p>
              <div className="text-3xl font-bold">₹{(totalSales / 7 / 1000).toFixed(1)}K</div>
              <p className="text-xs text-gray-600 mt-1">Per day</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily POS Sales</CardTitle>
            <CardDescription>Walk-in sales trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={posSalesData}>
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

        {/* Transaction Count */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Number of transactions daily</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={posSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="transactions" fill="#4ecdc4" name="Transactions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payment Mode Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Used</CardTitle>
          <CardDescription>Distribution across payment modes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentModeData.map((payment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{payment.mode}</h4>
                  <Badge variant="outline">{payment.percentage}%</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${payment.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{payment.transactions} transactions</span>
                  <span className="font-semibold">₹{(payment.amount / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* POS Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key POS indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Peak Sales Hour</p>
              <p className="text-2xl font-bold">2:00 PM</p>
              <p className="text-xs text-blue-600 mt-1">Average highest transactions</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Fastest Transaction</p>
              <p className="text-2xl font-bold">45 sec</p>
              <p className="text-xs text-green-600 mt-1">Average billing time</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Customer Satisfaction</p>
              <p className="text-2xl font-bold">4.8/5</p>
              <p className="text-xs text-amber-600 mt-1">Based on feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
