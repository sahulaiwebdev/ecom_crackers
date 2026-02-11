'use client';

import { useState } from 'react';
import Link from 'next/link';
import FirecrackerProductCard from './FirecrackerProductCard';
import { getHomepageProducts, type Product } from '@/services/online-services/frontendProductService';

interface Category {
  id: string;
  name: string;
}

interface FirecrackerProductsSectionProps {
  initialProducts: Product[];
  categories: Category[];
  title?: string;
  subtitle?: string;
}

export default function FirecrackerProductsSection({
  initialProducts,
  categories,
  title = 'Popular Firecracker Products',
  subtitle = 'High quality, PESO approved green crackers'
}: FirecrackerProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = async (categoryName: string) => {
    setActiveCategory(categoryName);
    setLoading(true);

    try {
      const response = await getHomepageProducts({
        badge: 'Bestseller',
        category: categoryName || undefined,
        limit: 12,
      });

      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              {subtitle}
            </p>
          </div>
          <Link
            href="/products"
            className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-sm sm:text-base"
          >
            View All →
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
              activeCategory === ''
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                activeCategory === category.name
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">No products available in this category</p>
            <button
              onClick={() => handleCategoryChange('')}
              className="inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {products.map((product) => (
              <FirecrackerProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
