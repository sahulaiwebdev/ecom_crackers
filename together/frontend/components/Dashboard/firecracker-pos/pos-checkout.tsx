'use client';

import { useState } from 'react';
import { IconX, IconPrinter, IconDownload, IconCheck } from '@tabler/icons-react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  mrp: number;
  category: string;
}

interface POSCheckoutProps {
  items: CartItem[];
  totalAmount: number;
  onClose: () => void;
  onComplete: () => void;
}

export default function POSCheckout({
  items,
  totalAmount,
  onClose,
  onComplete,
}: POSCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card'>('cash');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [billGenerated, setBillGenerated] = useState(false);

  const handleGenerateBill = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName) {
      toast.error('Please enter customer name');
      return;
    }

    setLoading(true);
    try {
      // Simulate bill generation
      await new Promise(resolve => setTimeout(resolve, 1000));

      setBillGenerated(true);
      toast.success('Bill generated successfully!');

      // Auto-close after showing success
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (error) {
      toast.error('Failed to generate bill');
    } finally {
      setLoading(false);
    }
  };

  const invoiceNo = `INV-${Date.now().toString().slice(-6)}`;
  const billDate = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const totalMRP = items.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  const totalDiscount = totalMRP - totalAmount;
  const discountPercentage = totalMRP > 0 ? Math.round((totalDiscount / totalMRP) * 100) : 0;

  if (billGenerated) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <IconCheck size={32} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bill Generated!</h2>
          <p className="text-gray-600 mb-4">
            Invoice: <span className="font-semibold">{invoiceNo}</span>
          </p>
          <p className="text-gray-600">
            Amount: <span className="font-bold">₹{totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Complete Purchase</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <IconX size={20} />
          </button>
        </div>

        <form onSubmit={handleGenerateBill} className="p-6 space-y-6">
          {/* Invoice Details */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Invoice Number</p>
                <p className="font-bold text-gray-900">{invoiceNo}</p>
              </div>
              <div>
                <p className="text-gray-600">Date & Time</p>
                <p className="font-bold text-gray-900">{billDate}</p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Customer Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Customer phone (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Bill Items */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Items Summary</h3>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-300 p-3 grid grid-cols-12 gap-2 text-xs font-semibold text-gray-700">
                <span className="col-span-5">Product</span>
                <span className="col-span-2 text-right">Qty</span>
                <span className="col-span-2 text-right">Price</span>
                <span className="col-span-3 text-right">Total</span>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <div key={item.id} className="p-3 grid grid-cols-12 gap-2 text-xs">
                    <span className="col-span-5 text-gray-900 line-clamp-2">{item.name}</span>
                    <span className="col-span-2 text-right text-gray-700 font-medium">{item.quantity}</span>
                    <span className="col-span-2 text-right text-gray-700">₹{item.price}</span>
                    <span className="col-span-3 text-right text-gray-900 font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal (MRP)</span>
              <span className="font-medium text-gray-900">₹{totalMRP.toFixed(2)}</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-medium">Discount ({discountPercentage}%)</span>
                <span className="font-medium text-green-600">-₹{totalDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-300 pt-2 flex items-center justify-between">
              <span className="font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-orange-600">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Payment Method</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'cash', label: 'Cash', color: 'green' },
                { id: 'upi', label: 'UPI', color: 'blue' },
                { id: 'card', label: 'Card', color: 'purple' },
              ].map(method => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`py-2 px-4 rounded-lg font-medium transition-all ${
                    paymentMethod === method.id
                      ? `bg-${method.color}-500 text-white shadow-lg`
                      : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">Compliance Notice</p>
            <ul className="text-xs space-y-1">
              <li>✓ Only green/permitted crackers sold</li>
              <li>✓ PESO certification verified</li>
              <li>✓ Customer to sign bill</li>
              <li>✓ Sales record maintained for 30 days</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <IconPrinter size={20} />
              {loading ? 'Generating Bill...' : 'Generate & Print Bill'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
