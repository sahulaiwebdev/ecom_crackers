'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  AlertCircle,
  Package,
  DollarSign,
  Users,
  FileText,
  Shield,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ActivityFeed } from './activity-feed';

// Sales Data
const salesData = [
  { month: 'Jan', sales: 15000, leads: 45, conversions: 12, compliance: 100 },
  { month: 'Feb', sales: 24000, leads: 58, conversions: 18, compliance: 100 },
  { month: 'Mar', sales: 32000, leads: 72, conversions: 28, compliance: 98 },
  { month: 'Apr', sales: 18000, leads: 38, conversions: 9, compliance: 100 },
  { month: 'May', sales: 45000, leads: 95, conversions: 35, compliance: 100 },
  { month: 'Jun', sales: 52000, leads: 108, conversions: 42, compliance: 99 },
];

// Lead Status Data
const leadStatusData = [
  { name: 'New Leads', value: 24, color: '#3b82f6' },
  { name: 'Quoted', value: 18, color: '#8b5cf6' },
  { name: 'Negotiating', value: 12, color: '#f59e0b' },
  { name: 'Closed', value: 8, color: '#10b981' },
  { name: 'Lost', value: 5, color: '#ef4444' },
];

// Product Category Performance
const categoryPerformance = [
  { category: 'Sparklers', revenue: 125000, units: 4500, compliance: 100 },
  { category: 'Fountains', revenue: 98000, units: 2100, compliance: 100 },
  { category: 'Atom Bombs', revenue: 76000, units: 1800, compliance: 98 },
  { category: 'Crackers', revenue: 54000, units: 1200, compliance: 100 },
  { category: 'Flower Pots', revenue: 43000, units: 980, compliance: 99 },
];

// Compliance Metrics
const complianceMetrics = [
  { metric: 'PESO Certification', current: 24, target: 24, status: 'compliant' },
  { metric: 'Green Crackers', current: 18, target: 20, status: 'compliant' },
  { metric: 'Legal Stock Limits', current: 1680, limit: 2000, status: 'compliant' },
  { metric: 'Safety Testing Done', current: 22, target: 24, status: 'warning' },
];

// License Status
const licenseStatus = {
  type: 'Distributor',
  expiryDate: '2024-12-31',
  daysLeft: 324,
  maxStockAllowed: 2000,
  currentStock: 1680,
  renewalDue: false,
};

// Real-time Statistics
const statistics = {
  totalLeads: 67,
  activeLeads: 24,
  conversionRate: 37.31,
  avgLeadValue: 2485,
  totalRevenue: 186000,
  avgOrderValue: 23250,
  totalOrders: 8,
  pendingOrders: 2,
};

export function FirecrackerDashboard() {
  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-900">
          <strong>License Renewal Notice:</strong> Your distributor license expires in{' '}
          <strong>{licenseStatus.daysLeft} days</strong> (
          {licenseStatus.expiryDate}). Please initiate renewal process.
        </AlertDescription>
      </Alert>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-3xl font-bold mt-2">{statistics.totalLeads}</p>
                <p className="text-xs text-green-600 mt-1">+12 this week</p>
              </div>
              <PhoneCall className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-3xl font-bold mt-2">{statistics.conversionRate.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">+2.5% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
                <p className="text-3xl font-bold mt-2">₹{(statistics.totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-green-600 mt-1">On track for ₹250K</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stock Status</p>
                <p className="text-3xl font-bold mt-2">{licenseStatus.currentStock}</p>
                <p className="text-xs text-green-600 mt-1">
                  {licenseStatus.maxStockAllowed - licenseStatus.currentStock} capacity left
                </p>
              </div>
              <Package className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales Trend</TabsTrigger>
          <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="categories">Product Categories</TabsTrigger>
        </TabsList>

        {/* Tab 1: Sales Trend */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales & Lead Conversion Trend</CardTitle>
              <CardDescription>Monthly performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#2563eb"
                    name="Sales (₹)"
                    connectNulls
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversions"
                    stroke="#10b981"
                    name="Conversions"
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Lead Analytics */}
        <TabsContent value="leads">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Status Distribution</CardTitle>
                <CardDescription>Current lead pipeline status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leadStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <p className="text-sm text-muted-foreground">Active Leads</p>
                  <p className="text-2xl font-bold">{statistics.activeLeads}</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-sm text-muted-foreground">Average Lead Value</p>
                  <p className="text-2xl font-bold">₹{statistics.avgLeadValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Follow-up Required</p>
                  <p className="text-2xl font-bold text-orange-600">8</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Compliance Status */}
        <TabsContent value="compliance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Compliance Checklist
                </CardTitle>
                <CardDescription>Legal and regulatory compliance status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {complianceMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-sm">{metric.metric}</p>
                      <p className="text-xs text-muted-foreground">
                        {metric.current} of {metric.target || metric.limit}
                      </p>
                    </div>
                    {metric.status === 'compliant' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>License Information</CardTitle>
                <CardDescription>Distributor license details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <p className="text-sm text-muted-foreground">License Type</p>
                  <p className="text-lg font-bold">{licenseStatus.type}</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                  <p className="text-lg font-bold text-orange-600">
                    {licenseStatus.expiryDate}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {licenseStatus.daysLeft} days remaining
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stock Capacity</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used: {licenseStatus.currentStock}</span>
                      <span>Max: {licenseStatus.maxStockAllowed}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(licenseStatus.currentStock / licenseStatus.maxStockAllowed) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(
                        (licenseStatus.currentStock / licenseStatus.maxStockAllowed) *
                        100
                      ).toFixed(1)}
                      % capacity used
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 4: Product Categories */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Product Category Performance</CardTitle>
              <CardDescription>Revenue and units sold by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#2563eb" name="Revenue (₹)" />
                  <Bar yAxisId="right" dataKey="units" fill="#10b981" name="Units Sold" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-2">
                {categoryPerformance.map((cat, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 border-b">
                    <span className="font-semibold">{cat.category}</span>
                    <div className="flex gap-4 text-sm">
                      <span className="text-muted-foreground">₹{(cat.revenue / 1000).toFixed(0)}K</span>
                      <span className="text-muted-foreground">{cat.units} units</span>
                      <span
                        className={
                          cat.compliance === 100
                            ? 'text-green-600 font-bold'
                            : 'text-yellow-600 font-bold'
                        }
                      >
                        {cat.compliance}% compliant
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Orders & Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest sales and quotations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'ORD-001', customer: 'ABC Retail', amount: 45000, status: 'Delivered' },
                { id: 'ORD-002', customer: 'XYZ Traders', amount: 32000, status: 'Processing' },
                { id: 'ORD-003', customer: 'Kumar & Co', amount: 28000, status: 'Pending' },
              ].map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{(order.amount / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Activity Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today's Quick Stats</CardTitle>
            <CardDescription>Real-time business metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: PhoneCall, label: 'New Leads', value: '5', color: 'text-blue-600' },
              { icon: FileText, label: 'Quotations Sent', value: '3', color: 'text-green-600' },
              { icon: AlertTriangle, label: 'Follow-ups Due', value: '2', color: 'text-orange-600' },
              { icon: DollarSign, label: 'Orders Placed', value: '1', color: 'text-green-600' },
            ].map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${activity.color}`} />
                    <p className="font-semibold text-sm">{activity.label}</p>
                  </div>
                  <p className="text-lg font-bold">{activity.value}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
