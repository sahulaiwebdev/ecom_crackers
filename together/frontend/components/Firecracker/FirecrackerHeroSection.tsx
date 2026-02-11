'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconChevronLeft, IconChevronRight, IconFlame, IconShieldCheck, IconTruck } from '@tabler/icons-react';
import LeadEnquiryForm from './LeadEnquiryForm';

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
}

interface FirecrackerHeroSectionProps {
  banners: Banner[];
}

export default function FirecrackerHeroSection({ banners }: FirecrackerHeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  if (banners.length === 0) {
    return (
      <section className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <IconFlame size={48} className="text-yellow-300" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Premium Firecracker Supplier
            </h1>
            <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Licensed Green Firecracker Products | PESO Approved | Safe & Legal
            </p>
            <button
              onClick={() => setShowEnquiry(true)}
              className="inline-block px-8 py-3 bg-white text-red-600 font-bold rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              Get Quotation Now
            </button>
          </div>
        </div>

        <LeadEnquiryForm isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} />
      </section>
    );
  }

  return (
    <>
      <section className="bg-gray-900">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-4">
          {/* Main Banner Slider */}
          <div className="relative rounded-lg sm:rounded-xl overflow-hidden group shadow-lg">
            {/* Banner Container */}
            <div className="relative w-full h-[180px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px]">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Link href={banner.linkUrl || '/products'} className="block w-full h-full">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index === 0}
                      quality={85}
                      loading={index === 0 ? undefined : 'lazy'}
                    />
                  </Link>

                  {/* Overlay with CTA */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={() => setShowEnquiry(true)}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 active:scale-95"
                    >
                      Get Free Quotation
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  aria-label="Previous slide"
                >
                  <IconChevronLeft size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  aria-label="Next slide"
                >
                  <IconChevronRight size={20} className="text-gray-700" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-orange-500 w-6 sm:w-8 shadow-lg'
                          : 'bg-white/70 hover:bg-white w-1.5 sm:w-2'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <IconShieldCheck size={32} className="text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">PESO Approved</h3>
                <p className="text-sm text-gray-600">Licensed & Safe Explosives</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <IconFlame size={32} className="text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Green Crackers</h3>
                <p className="text-sm text-gray-600">Environment Friendly Only</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <IconTruck size={32} className="text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Licensed Delivery</h3>
                <p className="text-sm text-gray-600">Safe & Compliant Handling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadEnquiryForm isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} />
    </>
  );
}
