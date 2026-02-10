import { getBrandBySlug } from '@/config/brands';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BrandHomePageProps {
  params: Promise<{ brand: string }>;
}

/**
 * Brand Homepage
 * 
 * This is a placeholder page demonstrating the multi-brand setup.
 * In production, this would fetch content from Drupal CMS.
 */
export default async function BrandHomePage({ params }: BrandHomePageProps) {
  const { brand: brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  
  if (!brand) {
    notFound();
  }
  
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32"
        style={{ backgroundColor: brand.colors.primary }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ 
                color: brand.colors.primaryForeground,
                fontFamily: brand.headingFont,
              }}
            >
              {brand.tagline}
            </h1>
            <p 
              className="text-lg md:text-xl mb-8 opacity-90"
              style={{ color: brand.colors.primaryForeground }}
            >
              {brand.seo.defaultDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${brandSlug}/cursussen`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-base transition-colors"
                style={{
                  backgroundColor: brand.colors.accent,
                  color: brand.colors.accentForeground,
                }}
              >
                Bekijk alle cursussen
                <svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </Link>
              <Link
                href={`/${brandSlug}/contact`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-base border-2 transition-colors"
                style={{
                  borderColor: brand.colors.primaryForeground,
                  color: brand.colors.primaryForeground,
                }}
              >
                Neem contact op
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: brand.headingFont }}
          >
            Waarom {brand.name}?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              title="Ervaren trainers"
              description="Onze trainers zijn experts met jarenlange praktijkervaring in hun vakgebied."
              color={brand.colors.primary}
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              title="Praktijkgericht"
              description="Leer direct toepasbare vaardigheden met hands-on oefeningen en realistische cases."
              color={brand.colors.primary}
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              }
              title="Gecertificeerd"
              description="Officiële certificeringen van toonaangevende technologieleveranciers."
              color={brand.colors.primary}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: brand.colors.muted }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: brand.headingFont }}
          >
            Klaar om te starten?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Bekijk ons uitgebreide cursusaanbod en vind de training die bij jou past.
          </p>
          <Link
            href={`/${brandSlug}/cursussen`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-lg transition-colors"
            style={{
              backgroundColor: brand.colors.primary,
              color: brand.colors.primaryForeground,
            }}
          >
            Ontdek onze cursussen
          </Link>
        </div>
      </section>
      
      {/* Contact Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: brand.headingFont }}
            >
              Vragen?
            </h2>
            <p className="text-gray-600 mb-6">
              Neem gerust contact met ons op voor advies over de beste training voor jou of je team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`tel:${brand.contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 text-lg font-medium"
                style={{ color: brand.colors.primary }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {brand.contact.phone}
              </a>
              <a
                href={`mailto:${brand.contact.email}`}
                className="inline-flex items-center justify-center gap-2 text-lg font-medium"
                style={{ color: brand.colors.primary }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {brand.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description,
  color,
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
}) {
  return (
    <div className="text-center p-6">
      <div 
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
        style={{ 
          backgroundColor: `${color}10`,
          color: color,
        }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
