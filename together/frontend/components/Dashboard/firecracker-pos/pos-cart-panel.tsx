'use client';

import { IconMinus, IconPlus, IconX, IconShoppingCart } from '@tabler/icons-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  mrp: number;
  category: string;
}

interface POSCartPanelProps {
  items: CartItem[];
  totalAmount: number;
  totalMRP: number;
  totalDiscount: number;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export default function POSCartPanel({
  items,
  totalAmount,
  totalMRP,
  totalDiscount,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: POSCartPanelProps) {
  const discountPercentage = totalMRP > 0 ? Math.round((totalDiscount / totalMRP) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <IconShoppingCart size={20} />
          <h2 className="text-lg font-bold">Cart</h2>
        </div>
        <p className="text-sm text-orange-100">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <IconShoppingCart size={48} className="text-gray-300 mb-2" />
            <p className="text-gray-600 font-medium">Cart is empty</p>
            <p className="text-sm text-gray-500">Add products to get started</p>
          </div>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-200"
            >
              {/* Item Name */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                  title="Remove item"
                >
                  <IconX size={18} />
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <IconMinus size={14} />
                  </button>
                  <span className="px-3 text-sm font-semibold text-gray-900 min-w-[30px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <IconPlus size={14} />
                  </button>
                </div>
                <p className="font-bold text-gray-900 text-sm">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Divider */}
      {items.length > 0 && <div className="border-t border-gray-200"></div>}

      {/* Summary */}
      {items.length > 0 && (
        <div className="p-4 space-y-2 bg-gray-50">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal (MRP)</span>
            <span className="font-medium text-gray-900">₹{totalMRP.toFixed(2)}</span>
          </div>

          {/* Discount */}
          {totalDiscount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600 font-medium">Discount ({discountPercentage}%)</span>
              <span className="font-medium text-green-600">-₹{totalDiscount.toFixed(2)}</span>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-lg">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-bold">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {items.length > 0 && (
        <div className="p-4 space-y-2 border-t border-gray-200">
          <button
            onClick={onCheckout}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
          >
            Complete Purchase
          </button>
          <button
            onClick={onClearCart}
            className="w-full py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
