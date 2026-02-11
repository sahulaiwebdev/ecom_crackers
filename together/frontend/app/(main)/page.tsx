import FirecrackerHeroSection from '@/components/Firecracker/FirecrackerHeroSection';
import FirecrackerProductsSection from '@/components/Firecracker/FirecrackerProductsSection';
import { generatePageMetadata } from '@/lib/seo';
import { 
  fetchBanners, 
  fetchCategories, 
  fetchHomepageProducts 
} from '@/lib/server-fetch';

export async function generateMetadata() {
  return await generatePageMetadata({
    pagePath: "/",
    defaultTitle: "Premium Firecracker Supplier - Licensed Green Crackers",
    defaultDescription: "PESO approved, green firecracker products for licensed sale. Enquiry-based sales model with free quotations.",
    defaultKeywords: "firecracker, green crackers, PESO approved, licensed sale, firecracker supplier",
  });
}

export default async function Home() {
  // Fetch all data in parallel on server-side
  const [banners, categories, bestsellerProducts] = await Promise.all([
    fetchBanners(),
    fetchCategories(),
    fetchHomepageProducts({ badge: 'Bestseller', limit: 20 }),
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Lead Generation Focus */}
      <FirecrackerHeroSection banners={banners} />
      
      {/* Popular Products - Green Crackers */}
      <FirecrackerProductsSection 
        initialProducts={bestsellerProducts} 
        categories={categories}
        title="Featured Green Crackers"
        subtitle="PESO approved, safe & compliant products for licensed sale"
      />

      {/* Info Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Legal & Licensed Firecracker Sales
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-orange-600 mb-3">Enquiry-Based Model</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Online sales are banned in India</li>
                  <li>✓ We handle lead generation & quotations</li>
                  <li>✓ Offline sales through licensed dealers</li>
                  <li>✓ Fast quotation response</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-green-600 mb-3">Compliance & Safety</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ All products PESO approved</li>
                  <li>✓ Green crackers only (environment friendly)</li>
                  <li>✓ Sound level &lt; 125 dB</li>
                  <li>✓ Proper storage & handling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
