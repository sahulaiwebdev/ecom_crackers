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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const conversionData = [
  { stage: 'New Leads', count: 125 },
  { stage: 'Contacted', count: 98 },
  { stage: 'Quoted', count: 76 },
  { stage: 'Negotiating', count: 45 },
  { stage: 'Confirmed', count: 32 },
  { stage: 'Converted', count: 28 },
];

const conversionTrendData = [
  { week: 'Week 1', newLeads: 25, converted: 5, conversionRate: 20 },
  { week: 'Week 2', newLeads: 32, converted: 8, conversionRate: 25 },
  { week: 'Week 3', newLeads: 38, converted: 12, conversionRate: 31 },
  { week: 'Week 4', newLeads: 30, converted: 10, conversionRate: 33 },
];

const leadSourceData = [
  { source: 'Website', leads: 45, percentage: 36 },
  { source: 'WhatsApp', leads: 32, percentage: 26 },
  { source: 'Phone Call', leads: 28, percentage: 22 },
  { source: 'Walk-in', leads: 15, percentage: 12 },
  { source: 'Referral', leads: 5, percentage: 4 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

export function LeadConversionReports() {
  const totalLeads = 125;
  const convertedLeads = 28;
  const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Leads</p>
              <div className="text-3xl font-bold">{totalLeads}</div>
              <p className="text-xs text-blue-600 mt-1">This month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Converted Orders</p>
              <div className="text-3xl font-bold text-green-600">{convertedLeads}</div>
              <p className="text-xs text-gray-600 mt-1">From leads</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Conversion Rate</p>
              <div className="text-3xl font-bold text-green-600">{conversionRate}%</div>
              <p className="text-xs text-gray-600 mt-1">Industry avg: 10-15%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Avg Response Time</p>
              <div className="text-3xl font-bold">2.5h</div>
              <p className="text-xs text-blue-600 mt-1">↓ 20% vs last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Funnel</CardTitle>
            <CardDescription>Pipeline breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Trend</CardTitle>
            <CardDescription>Weekly conversion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="conversionRate" stroke="#10b981" name="Conversion %" strokeWidth={2} />
                <Line type="monotone" dataKey="newLeads" stroke="#3b82f6" name="New Leads" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Source Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Where leads are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ source, percentage }) => `${source} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="leads"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Source Details */}
        <Card>
          <CardHeader>
            <CardTitle>Source Performance</CardTitle>
            <CardDescription>Detailed metrics by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadSourceData.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{source.leads} leads</p>
                    <p className="text-xs text-gray-600">{source.percentage}% of total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Avg Lead Response Time</p>
              <p className="text-2xl font-bold">2.5 hours</p>
              <p className="text-xs text-blue-600 mt-1">Target: &lt; 4 hours</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Follow-up Success Rate</p>
              <p className="text-2xl font-bold">72%</p>
              <p className="text-xs text-green-600 mt-1">Leads that respond</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Quote to Order Rate</p>
              <p className="text-2xl font-bold">45%</p>
              <p className="text-xs text-amber-600 mt-1">Quoted leads converting</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
