'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IconPlus } from '@tabler/icons-react';

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  category: string;
  defaultSellingPrice: number;
  defaultMRP: number;
  variantImages?: string[];
}

interface POSProductCatalogProps {
  searchTerm: string;
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
}

export default function POSProductCatalog({
  searchTerm,
  selectedCategory,
  onAddToCart,
}: POSProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock products - replace with API call
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Green Atom Bomb',
        shortDescription: 'Green Atom Bombs - PESO Approved',
        category: 'Atom Bombs',
        defaultSellingPrice: 450,
        defaultMRP: 500,
        variantImages: ['https://via.placeholder.com/200']
      },
      {
        id: '2',
        name: 'Rocket Cracker',
        shortDescription: 'Flying Rockets - Environment Friendly',
        category: 'Rockets',
        defaultSellingPrice: 120,
        defaultMRP: 150,
      },
      {
        id: '3',
        name: 'Flower Pot',
        shortDescription: 'Color Flower Pots - Safe Crackers',
        category: 'Flower Pots',
        defaultSellingPrice: 80,
        defaultMRP: 100,
      },
      {
        id: '4',
        name: 'Chakri',
        shortDescription: 'Green Chakri - Low Sound',
        category: 'Chakri',
        defaultSellingPrice: 200,
        defaultMRP: 250,
      },
      {
        id: '5',
        name: 'Ground Bomb',
        shortDescription: 'Green Ground Bombs',
        category: 'Bombs',
        defaultSellingPrice: 60,
        defaultMRP: 75,
      },
      {
        id: '6',
        name: 'Sparkler',
        shortDescription: 'Golden Sparklers - 12 inch',
        category: 'Sparklers',
        defaultSellingPrice: 40,
        defaultMRP: 50,
      },
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const discount = (product: Product) => 
    Math.round(((product.defaultMRP - product.defaultSellingPrice) / product.defaultMRP) * 100);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg animate-pulse h-64"></div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-600">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {filteredProducts.map(product => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
            {product.variantImages?.[0] ? (
              <Image
                src={product.variantImages[0]}
                alt={product.shortDescription}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400">No Image</div>
            )}

            {/* Discount Badge */}
            {discount(product) > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discount(product)}%
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="p-3">
            <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2">
              {product.shortDescription}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-1 mb-3">
              <span className="text-lg font-bold text-gray-900">
                ₹{product.defaultSellingPrice}
              </span>
              {discount(product) > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.defaultMRP}
                </span>
              )}
            </div>

            {/* Add Button */}
            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-2 px-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <IconPlus size={16} />
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
