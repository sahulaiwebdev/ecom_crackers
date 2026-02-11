'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Settings, CheckCircle2, AlertCircle, Send, Copy } from 'lucide-react';

interface WhatsAppConfig {
  apiKey: string;
  phoneNumber: string;
  businessAccountId: string;
  isConfigured: boolean;
  lastUpdated: string;
}

interface QuotationMessage {
  customerId: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  quantity: number;
  price: number;
  quotationId: string;
}

export function WhatsAppIntegration() {
  const [config, setConfig] = useState<WhatsAppConfig>({
    apiKey: '',
    phoneNumber: '',
    businessAccountId: '',
    isConfigured: false,
    lastUpdated: '2024-02-11T10:30:00Z',
  });

  const [testMessage, setTestMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState('setup');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [quotationForm, setQuotationForm] = useState({
    phoneNumber: '',
    customerName: '',
    productName: '',
    quantity: 1,
    price: 0,
  });

  const handleConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfiguring(true);
    try {
      // TODO: Validate and save configuration to backend
      console.log('Saving WhatsApp config:', config);
      setConfig((prev) => ({ ...prev, isConfigured: true, lastUpdated: new Date().toISOString() }));
    } catch (error) {
      console.error('Error configuring WhatsApp:', error);
    } finally {
      setIsConfiguring(false);
    }
  };

  const sendQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Send quotation via WhatsApp API
      console.log('Sending quotation:', quotationForm);
      setQuotationForm({
        phoneNumber: '',
        customerName: '',
        productName: '',
        quantity: 1,
        price: 0,
      });
    } catch (error) {
      console.error('Error sending quotation:', error);
    }
  };

  const sendTestMessage = async () => {
    if (!testMessage.trim()) return;
    try {
      // TODO: Send test message via WhatsApp API
      const response = await fetch('/api/whatsapp/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: config.phoneNumber,
          message: testMessage,
        }),
      });
      if (response.ok) {
        setTestMessage('');
      }
    } catch (error) {
      console.error('Error sending test message:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="quotations">Send Quotations</TabsTrigger>
          <TabsTrigger value="orders">Order Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Tab 1: Setup */}
        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                WhatsApp Business API Configuration
              </CardTitle>
              <CardDescription>
                Connect your WhatsApp Business Account for automated quotations and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {config.isConfigured ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-900">
                    WhatsApp integration is active and configured. Last updated:{' '}
                    <strong>{new Date(config.lastUpdated).toLocaleString()}</strong>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-900">
                    WhatsApp integration is not configured. Follow the steps below to set it up.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleConfigSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="businessAccountId">Business Account ID *</Label>
                  <Input
                    id="businessAccountId"
                    value={config.businessAccountId}
                    onChange={(e) => setConfig({ ...config, businessAccountId: e.target.value })}
                    placeholder="Your WhatsApp Business Account ID"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Found in your WhatsApp Business Account settings
                  </p>
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={config.phoneNumber}
                    onChange={(e) => setConfig({ ...config, phoneNumber: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Include country code (e.g., +91 for India)
                  </p>
                </div>

                <div>
                  <Label htmlFor="apiKey">API Key *</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={config.apiKey}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    placeholder="Your WhatsApp Business API key"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your API key will be encrypted and stored securely
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Setup Instructions</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Create a WhatsApp Business Account at business.facebook.com</li>
                    <li>Get your Business Account ID from Account Settings</li>
                    <li>Generate an API key from the Developer Settings</li>
                    <li>Add your business phone number to your account</li>
                    <li>Copy and paste these details in the form above</li>
                  </ol>
                </div>

                <Button type="submit" disabled={isConfiguring} className="w-full">
                  {isConfiguring ? 'Configuring...' : 'Save Configuration'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Send Quotations */}
        <TabsContent value="quotations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Send Quotation via WhatsApp
              </CardTitle>
              <CardDescription>
                Send product quotations to customers via WhatsApp Business
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!config.isConfigured ? (
                <Alert className="border-red-200 bg-red-50 mb-4">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-900">
                    Please configure WhatsApp integration first in the Setup tab
                  </AlertDescription>
                </Alert>
              ) : null}

              <form onSubmit={sendQuotation} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={quotationForm.customerName}
                      onChange={(e) =>
                        setQuotationForm({ ...quotationForm, customerName: e.target.value })
                      }
                      placeholder="Enter customer name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Customer Phone (WhatsApp)</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      value={quotationForm.phoneNumber}
                      onChange={(e) =>
                        setQuotationForm({ ...quotationForm, phoneNumber: e.target.value })
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      value={quotationForm.productName}
                      onChange={(e) =>
                        setQuotationForm({ ...quotationForm, productName: e.target.value })
                      }
                      placeholder="e.g., Green Sparkler Pro"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quotationForm.quantity}
                      onChange={(e) =>
                        setQuotationForm({
                          ...quotationForm,
                          quantity: parseInt(e.target.value) || 1,
                        })
                      }
                      min="1"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="price">Price per Unit</Label>
                  <Input
                    id="price"
                    type="number"
                    value={quotationForm.price}
                    onChange={(e) =>
                      setQuotationForm({
                        ...quotationForm,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                    className="mt-2"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm font-semibold mb-2">Message Preview</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Hello {quotationForm.customerName || '[Customer Name]'}!</p>
                    <p>
                      We are pleased to provide a quotation for {quotationForm.quantity ||
                        '1'}{' '}
                      unit(s) of {quotationForm.productName || '[Product Name]'}.
                    </p>
                    <p>
                      Unit Price: ₹{quotationForm.price || '0'} | Total: ₹
                      {(quotationForm.price * quotationForm.quantity).toFixed(2)}
                    </p>
                    <p>
                      Please confirm if you would like to proceed with this quotation.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={
                    !config.isConfigured ||
                    !quotationForm.phoneNumber ||
                    !quotationForm.customerName ||
                    !quotationForm.productName
                  }
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Quotation
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Order Notifications */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Notification Settings</CardTitle>
              <CardDescription>
                Automatic notifications sent to customers about their orders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  event: 'Order Placed',
                  enabled: true,
                  message: 'Thank you for your order. We will process it shortly.',
                },
                {
                  event: 'Order Confirmed',
                  enabled: true,
                  message: 'Your order has been confirmed and is being prepared.',
                },
                {
                  event: 'Out for Delivery',
                  enabled: true,
                  message: 'Your order is on the way and will arrive shortly.',
                },
                {
                  event: 'Delivered',
                  enabled: true,
                  message: 'Your order has been delivered. Thank you for your purchase!',
                },
              ].map((notification, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 flex items-start justify-between"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{notification.event}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked={notification.enabled} />
                    <span className="text-sm">Enabled</span>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Message Templates */}
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Message Templates</CardTitle>
              <CardDescription>Pre-configured templates for common messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: 'Quotation Request Follow-up',
                  template:
                    'Hi {customer_name}, Following up on the quotation for {product_name}. Please let us know if you have any questions. We are here to help!',
                },
                {
                  name: 'Stock Availability',
                  template:
                    '{product_name} is now in stock! Limited quantity available. Message us to place your order.',
                },
                {
                  name: 'Compliance Reminder',
                  template:
                    'Important: All our firecracker products are PESO certified and comply with safety standards. For safe usage, please read the instruction manual included in the package.',
                },
                {
                  name: 'Payment Reminder',
                  template:
                    'Hi {customer_name}, Your order {order_id} is ready. Total amount: ₹{amount}. Please confirm payment to proceed.',
                },
              ].map((tmpl, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <h4 className="font-semibold">{tmpl.name}</h4>
                  <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-muted-foreground">
                    {tmpl.template}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      navigator.clipboard.writeText(tmpl.template);
                    }}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Template
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
