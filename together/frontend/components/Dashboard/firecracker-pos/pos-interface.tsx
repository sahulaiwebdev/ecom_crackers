'use client';

import { useState } from 'react';
import { IconSearch, IconPlus, IconMinus, IconShoppingCart, IconPrinter, IconPhone, IconBrandWhatsapp } from '@tabler/icons-react';
import { toast } from 'sonner';
import POSProductCatalog from './pos-product-catalog';
import POSCartPanel from './pos-cart-panel';
import POSCheckout from './pos-checkout';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  mrp: number;
  category: string;
}

export function FirecrackerPOSInterface() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.shortDescription || product.name,
        price: product.defaultSellingPrice || product.price,
        quantity: 1,
        mrp: product.defaultMRP || product.mrp,
        category: product.category,
      }]);
    }

    toast.success(`${product.shortDescription} added to cart`);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast.info('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalMRP = cartItems.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  const totalDiscount = totalMRP - totalAmount;

  return (
    <div className="space-y-4 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Firecracker POS System</h1>
          <p className="text-gray-600 mt-1">Quick billing for walk-in customers</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCheckout(true)}
            disabled={cartItems.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconShoppingCart size={20} />
            Checkout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Catalog */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <div className="relative">
              <IconSearch className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === ''
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {['Rockets', 'Atom Bombs', 'Flower Pots', 'Chakri', 'Bombs', 'Sparklers'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Catalog */}
          <POSProductCatalog
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Cart Panel */}
        <div className="lg:col-span-1">
          <POSCartPanel
            items={cartItems}
            totalAmount={totalAmount}
            totalMRP={totalMRP}
            totalDiscount={totalDiscount}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onCheckout={() => setShowCheckout(true)}
          />
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <POSCheckout
          items={cartItems}
          totalAmount={totalAmount}
          onClose={() => setShowCheckout(false)}
          onComplete={() => {
            setCartItems([]);
            setShowCheckout(false);
            toast.success('Bill generated successfully!');
          }}
        />
      )}
    </div>
  );
}
