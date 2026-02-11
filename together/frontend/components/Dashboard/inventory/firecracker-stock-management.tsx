'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Package, TrendingUp, TrendingDown, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface StockItem {
  id: string;
  productName: string;
  sku: string;
  currentStock: number;
  minAllowedStock: number;
  maxAllowedStock: number;
  legalLimit: number; // Firecracker specific - max quantity allowed per license
  reorderLevel: number;
  status: 'safe' | 'warning' | 'critical' | 'overstock';
  lastUpdated: string;
  location: string;
}

interface StockAdjustment {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment' | 'legal_check';
  quantity: number;
  reason: string;
  timestamp: string;
  adjustedBy: string;
}

const mockStockData: StockItem[] = [
  {
    id: '1',
    productName: 'Green Sparkler Pro',
    sku: 'GSP-001',
    currentStock: 450,
    minAllowedStock: 50,
    maxAllowedStock: 1000,
    legalLimit: 500, // Distributor license limit
    reorderLevel: 100,
    status: 'warning',
    lastUpdated: '2024-02-11T10:30:00Z',
    location: 'Warehouse A - Shelf 3',
  },
  {
    id: '2',
    productName: 'Multi-Color Fountain',
    sku: 'MCF-002',
    currentStock: 250,
    minAllowedStock: 25,
    maxAllowedStock: 500,
    legalLimit: 300,
    reorderLevel: 50,
    status: 'safe',
    lastUpdated: '2024-02-11T11:00:00Z',
    location: 'Warehouse A - Shelf 5',
  },
  {
    id: '3',
    productName: 'Atom Bomb Deluxe',
    sku: 'ABD-003',
    currentStock: 80,
    minAllowedStock: 10,
    maxAllowedStock: 200,
    legalLimit: 150,
    reorderLevel: 30,
    status: 'critical',
    lastUpdated: '2024-02-10T14:20:00Z',
    location: 'Warehouse B - Shelf 1',
  },
];

const stockHistoryData = [
  { date: '02-05', stock: 300, legalLimit: 500 },
  { date: '02-06', stock: 350, legalLimit: 500 },
  { date: '02-07', stock: 400, legalLimit: 500 },
  { date: '02-08', stock: 450, legalLimit: 500 },
  { date: '02-09', stock: 420, legalLimit: 500 },
  { date: '02-10', stock: 400, legalLimit: 500 },
  { date: '02-11', stock: 450, legalLimit: 500 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'safe':
      return 'bg-green-50 border-green-200 text-green-900';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 text-yellow-900';
    case 'critical':
      return 'bg-red-50 border-red-200 text-red-900';
    case 'overstock':
      return 'bg-orange-50 border-orange-200 text-orange-900';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'safe':
      return '✓';
    case 'warning':
      return '⚠';
    case 'critical':
      return '!';
    case 'overstock':
      return '↑';
    default:
      return '•';
  }
};

export function FirecrackerStockManagement() {
  const [stocks, setStocks] = useState<StockItem[]>(mockStockData);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [adjustmentForm, setAdjustmentForm] = useState({
    productId: '',
    quantity: 0,
    type: 'in' as const,
    reason: '',
  });

  const handleStockAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Stock adjustment:', adjustmentForm);
    // TODO: Submit to backend
    setAdjustmentForm({ productId: '', quantity: 0, type: 'in', reason: '' });
  };

  const getLegalLimitPercentage = (item: StockItem) => {
    return (item.currentStock / item.legalLimit) * 100;
  };

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Stock Overview</TabsTrigger>
          <TabsTrigger value="legal-check">Legal Compliance</TabsTrigger>
          <TabsTrigger value="adjust">Adjust Stock</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Tab 1: Stock Overview */}
        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">1,680</div>
                    <p className="text-xs text-muted-foreground">Total Stock</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Safe Items</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <TrendingDown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Warning Items</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Lock className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Critical Items</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stock Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Firecracker Stock Inventory</CardTitle>
                <CardDescription>Current stock levels with legal compliance limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stocks.map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-4 ${getStatusColor(item.status)}`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <p className="font-semibold">{item.productName}</p>
                          <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Current Stock</p>
                          <p className="text-lg font-bold">{item.currentStock} units</p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Legal Limit</p>
                          <p className="text-lg font-bold text-red-600">{item.legalLimit} units</p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Compliance</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  getLegalLimitPercentage(item) > 100
                                    ? 'bg-red-500'
                                    : getLegalLimitPercentage(item) > 80
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(getLegalLimitPercentage(item), 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold">
                              {getLegalLimitPercentage(item).toFixed(0)}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{getStatusIcon(item.status)}</span>
                          <span className="text-xs font-semibold uppercase">{item.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Legal Compliance Check */}
        <TabsContent value="legal-check">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-orange-600" />
                Legal Limit Compliance Check
              </CardTitle>
              <CardDescription>Verify stock against firecracker distribution license limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  As a distributor, your license limits the maximum quantity you can hold per product. Exceeding these limits is illegal and can result in penalties.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {stocks.map((item) => {
                  const overLimit = item.currentStock > item.legalLimit;
                  return (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-4 ${
                        overLimit
                          ? 'border-red-200 bg-red-50'
                          : 'border-green-200 bg-green-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{item.productName}</h4>
                          <p className="text-sm text-muted-foreground">
                            Location: {item.location}
                          </p>
                        </div>
                        {overLimit ? (
                          <div className="text-right">
                            <p className="text-xs font-bold text-red-600 mb-1">EXCEEDS LEGAL LIMIT</p>
                            <p className="text-lg font-bold text-red-600">
                              +{item.currentStock - item.legalLimit} units over limit
                            </p>
                          </div>
                        ) : (
                          <div className="text-right">
                            <p className="text-xs font-bold text-green-600 mb-1">COMPLIANT</p>
                            <p className="text-lg font-bold text-green-600">
                              {item.legalLimit - item.currentStock} units available
                            </p>
                          </div>
                        )}
                      </div>

                      {overLimit && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="mt-3"
                          onClick={() =>
                            setAdjustmentForm({
                              productId: item.id,
                              quantity: item.currentStock - item.legalLimit,
                              type: 'out',
                              reason: 'Legal limit reduction',
                            })
                          }
                        >
                          Reduce to Legal Limit
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Adjust Stock */}
        <TabsContent value="adjust">
          <Card>
            <CardHeader>
              <CardTitle>Adjust Stock Level</CardTitle>
              <CardDescription>
                Add, remove, or adjust inventory with audit trail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStockAdjustment} className="space-y-4">
                <div>
                  <Label htmlFor="productSelect">Select Product</Label>
                  <select
                    id="productSelect"
                    value={adjustmentForm.productId}
                    onChange={(e) =>
                      setAdjustmentForm({ ...adjustmentForm, productId: e.target.value })
                    }
                    className="w-full mt-2 px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select a product...</option>
                    {stocks.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.productName} (Current: {item.currentStock})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="adjustType">Type of Adjustment</Label>
                    <select
                      id="adjustType"
                      value={adjustmentForm.type}
                      onChange={(e) =>
                        setAdjustmentForm({
                          ...adjustmentForm,
                          type: e.target.value as any,
                        })
                      }
                      className="w-full mt-2 px-3 py-2 border rounded-lg"
                    >
                      <option value="in">Stock In</option>
                      <option value="out">Stock Out</option>
                      <option value="adjustment">Adjustment</option>
                      <option value="legal_check">Legal Check Reduction</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={adjustmentForm.quantity}
                      onChange={(e) =>
                        setAdjustmentForm({
                          ...adjustmentForm,
                          quantity: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reason">Reason for Adjustment</Label>
                  <Input
                    id="reason"
                    value={adjustmentForm.reason}
                    onChange={(e) =>
                      setAdjustmentForm({
                        ...adjustmentForm,
                        reason: e.target.value,
                      })
                    }
                    placeholder="e.g., Daily count, Customer return, Damage"
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Record Adjustment
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Stock History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Stock Level History</CardTitle>
              <CardDescription>7-day stock trend against legal limits</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="stock"
                    stroke="#2563eb"
                    name="Current Stock"
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="legalLimit"
                    stroke="#dc2626"
                    strokeDasharray="5 5"
                    name="Legal Limit"
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
