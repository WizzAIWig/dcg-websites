import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBrandBySlug, getAllBrandSlugs, BrandConfig } from '@/config/brands';
import { BrandProvider } from '@/lib/brand-context';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface BrandLayoutProps {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}

/**
 * Generate static params for all brands
 */
export function generateStaticParams() {
  return getAllBrandSlugs().map((brand) => ({ brand }));
}

/**
 * Generate metadata based on brand
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ brand: string }> 
}): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  
  if (!brand) {
    return {
      title: 'DCG Websites',
    };
  }
  
  return {
    title: {
      template: brand.seo.titleTemplate,
      default: brand.seo.defaultTitle,
    },
    description: brand.seo.defaultDescription,
    openGraph: {
      title: brand.seo.defaultTitle,
      description: brand.seo.defaultDescription,
      images: [brand.seo.ogImage],
      siteName: brand.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: brand.seo.defaultTitle,
      description: brand.seo.defaultDescription,
      images: [brand.seo.ogImage],
      creator: brand.seo.twitterHandle,
    },
  };
}

/**
 * Brand layout wrapper
 * Provides brand context and common layout elements (Header, Footer)
 */
export default async function BrandLayout({ children, params }: BrandLayoutProps) {
  const { brand: brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  
  // Return 404 for unknown brands
  if (!brand) {
    notFound();
  }
  
  return (
    <BrandProvider brandSlug={brandSlug}>
      <BrandStyles brand={brand} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </BrandProvider>
  );
}

/**
 * Inject brand-specific CSS variables
 */
function BrandStyles({ brand }: { brand: BrandConfig }) {
  const cssVariables = `
    :root {
      --brand-primary: ${brand.colors.primary};
      --brand-primary-foreground: ${brand.colors.primaryForeground};
      --brand-secondary: ${brand.colors.secondary};
      --brand-secondary-foreground: ${brand.colors.secondaryForeground};
      --brand-accent: ${brand.colors.accent};
      --brand-accent-foreground: ${brand.colors.accentForeground};
      --brand-background: ${brand.colors.background};
      --brand-foreground: ${brand.colors.foreground};
      --brand-muted: ${brand.colors.muted};
      --brand-muted-foreground: ${brand.colors.mutedForeground};
      --brand-border: ${brand.colors.border};
      --font-family: ${brand.fontFamily};
      --heading-font: ${brand.headingFont};
    }
  `;
  
  return (
    <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
  );
}
