'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconHeart, IconPhone, IconBrandWhatsapp, IconFlame } from '@tabler/icons-react';
import type { Product } from '@/services/online-services/frontendProductService';
import { generateProductUrl } from '@/lib/slugify';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/hooks/useCurrency';
import LeadEnquiryForm from './LeadEnquiryForm';

interface FirecrackerProductCardProps {
  product: Product;
}

export default function FirecrackerProductCard({ product }: FirecrackerProductCardProps) {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const currencySymbol = useCurrency();
  const productUrl = generateProductUrl(product);

  const isWishlistedValue = isInWishlist(product.id);
  const defaultVariant = product.variants?.[0];
  const productImage = defaultVariant?.variantImages?.[0] || null;
  const price = defaultVariant?.variantSellingPrice || product.defaultSellingPrice;
  const mrp = defaultVariant?.variantMRP || product.defaultMRP;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlistedValue) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, you'd get business phone from settings
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi, I'm interested in ${product.shortDescription}. Can you provide a quotation?`;
    const encoded = encodeURIComponent(message);
    // In a real app, you'd get business WhatsApp from settings
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow group relative overflow-visible flex flex-col h-full">
        {/* Green Cracker Badge */}
        <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
          <IconFlame size={12} />
          Green Cracker
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 z-20 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          aria-label="Add to wishlist"
        >
          <IconHeart
            size={18}
            className={`transition-colors ${
              isWishlistedValue
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-12 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            {discount}% OFF
          </span>
        )}

        {/* Product Image */}
        <Link href={productUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-t-lg flex-shrink-0 bg-white">
          <div className="relative aspect-square w-full flex items-center justify-center">
            {productImage ? (
              <Image
                src={productImage}
                alt={product.shortDescription}
                width={300}
                height={300}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="w-full h-full object-contain p-4"
                priority={false}
                quality={75}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-3 flex flex-col flex-1">
          {/* Category Badge */}
          <p className="text-xs text-orange-600 font-semibold mb-1">
            {product.category}
          </p>

          {/* Product Name */}
          <Link href={productUrl} target="_blank" rel="noopener noreferrer">
            <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
              {defaultVariant?.displayName || product.shortDescription}
            </h3>
          </Link>

          {/* Specifications */}
          <div className="text-xs text-gray-500 mb-2 space-y-1">
            <p>✓ PESO Approved</p>
            <p>✓ Sound Level: &lt;125 dB</p>
            <p>✓ Licensed Sale Only</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              {currencySymbol}{price.toFixed(0)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                {currencySymbol}{mrp.toFixed(0)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            {/* Get Quotation Button */}
            <button
              onClick={() => setShowEnquiry(true)}
              className="flex-1 py-2 px-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              Get Quotation
            </button>

            {/* Contact Buttons */}
            <button
              onClick={handleCall}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              title="Call us"
            >
              <IconPhone size={16} />
            </button>
            <button
              onClick={handleWhatsApp}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              title="WhatsApp"
            >
              <IconBrandWhatsapp size={16} />
            </button>
          </div>
        </div>
      </div>

      <LeadEnquiryForm product={product} isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} />
    </>
  );
}
