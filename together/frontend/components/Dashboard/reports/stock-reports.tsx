'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AlertTriangle, TrendingDown, Package } from 'lucide-react';

const stockData = [
  { product: 'Atom Bombs', current: 680, minimum: 500, reorderLevel: 700, status: 'Normal' },
  { product: 'Sparklers', current: 450, minimum: 300, reorderLevel: 500, status: 'Low' },
  { product: 'Rockets', current: 320, minimum: 200, reorderLevel: 400, status: 'Critical' },
  { product: 'Flower Pots', current: 890, minimum: 600, reorderLevel: 1000, status: 'Normal' },
  { product: 'Green Crackers', current: 540, minimum: 400, reorderLevel: 600, status: 'Low' },
];

const stockTrendData = [
  { month: 'August', stock: 5200, inflow: 2100, outflow: 1500 },
  { month: 'September', stock: 5800, inflow: 2800, outflow: 2200 },
  { month: 'October', stock: 5400, inflow: 1800, outflow: 2200 },
  { month: 'November', stock: 4900, inflow: 1200, outflow: 1700 },
];

export function StockReports() {
  const totalStock = stockData.reduce((sum, item) => sum + item.current, 0);
  const licenseLimit = 2000;
  const utilization = ((totalStock / licenseLimit) * 100).toFixed(1);
  const lowStockItems = stockData.filter(item => item.status === 'Low' || item.status === 'Critical').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Package className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Stock</p>
                <p className="text-2xl font-bold">{totalStock} boxes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">License Capacity Used</p>
              <p className="text-2xl font-bold">{utilization}%</p>
              <p className="text-xs text-gray-600">of {licenseLimit} boxes allowed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-amber-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-amber-600">{lowStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Stock Turnover</p>
              <p className="text-2xl font-bold">4.2x</p>
              <p className="text-xs text-green-600 mt-1">Per month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Levels Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Trend</CardTitle>
          <CardDescription>Monthly stock movement</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inflow" fill="#10b981" name="Stock In" />
              <Bar dataKey="outflow" fill="#ef4444" name="Stock Out" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Stock Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Product Stock Levels</CardTitle>
          <CardDescription>Individual product inventory status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stockData.map((item, index) => {
              const utilizationPercent = (item.current / item.reorderLevel) * 100;
              const statusColor = 
                item.status === 'Normal' ? 'bg-green-100 text-green-800' :
                item.status === 'Low' ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800';

              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{item.product}</h4>
                    <Badge className={statusColor}>{item.status}</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        item.status === 'Normal' ? 'bg-green-600' :
                        item.status === 'Low' ? 'bg-amber-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{item.current} boxes current</span>
                    <span>Min: {item.minimum} | Reorder: {item.reorderLevel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
