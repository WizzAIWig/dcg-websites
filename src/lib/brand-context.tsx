'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { 
  BrandConfig, 
  brands, 
  getBrandByDomain, 
  getBrandBySlug,
  DEFAULT_BRAND 
} from '@/config/brands';

/**
 * Brand Context for multi-brand support
 * 
 * Provides the active brand configuration throughout the app.
 * Brand is determined by:
 * 1. URL parameter (development/preview)
 * 2. Domain detection (production)
 * 3. Fallback to default brand
 */

interface BrandContextValue {
  brand: BrandConfig;
  brandSlug: string;
  isLoading: boolean;
}

const BrandContext = createContext<BrandContextValue | undefined>(undefined);

interface BrandProviderProps {
  children: React.ReactNode;
  /** Brand slug from URL parameter (dynamic routing) */
  brandSlug?: string;
  /** Override brand for testing/preview */
  forceBrand?: string;
}

/**
 * Detect brand from current domain (client-side)
 */
function detectBrandFromDomain(): string {
  if (typeof window === 'undefined') {
    return DEFAULT_BRAND;
  }
  
  const hostname = window.location.hostname;
  const brand = getBrandByDomain(hostname);
  
  return brand?.slug ?? DEFAULT_BRAND;
}

/**
 * BrandProvider - Wraps the app to provide brand context
 */
export function BrandProvider({ 
  children, 
  brandSlug,
  forceBrand 
}: BrandProviderProps) {
  const resolvedBrandSlug = useMemo(() => {
    // Priority: forceBrand > brandSlug > domain detection
    if (forceBrand) return forceBrand;
    if (brandSlug) return brandSlug;
    return detectBrandFromDomain();
  }, [brandSlug, forceBrand]);
  
  const brand = useMemo(() => {
    return getBrandBySlug(resolvedBrandSlug) ?? brands[DEFAULT_BRAND];
  }, [resolvedBrandSlug]);
  
  const value = useMemo<BrandContextValue>(() => ({
    brand,
    brandSlug: resolvedBrandSlug,
    isLoading: false,
  }), [brand, resolvedBrandSlug]);
  
  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
}

/**
 * Hook to access the current brand configuration
 */
export function useBrand(): BrandContextValue {
  const context = useContext(BrandContext);
  
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  
  return context;
}

/**
 * Hook to check if a feature is enabled for the current brand
 */
export function useBrandFeature(feature: keyof BrandConfig['features']): boolean {
  const { brand } = useBrand();
  return brand.features[feature] ?? false;
}

/**
 * Hook to get brand colors as CSS custom properties
 */
export function useBrandColors(): Record<string, string> {
  const { brand } = useBrand();
  
  return useMemo(() => ({
    '--brand-primary': brand.colors.primary,
    '--brand-primary-foreground': brand.colors.primaryForeground,
    '--brand-secondary': brand.colors.secondary,
    '--brand-secondary-foreground': brand.colors.secondaryForeground,
    '--brand-accent': brand.colors.accent,
    '--brand-accent-foreground': brand.colors.accentForeground,
    '--brand-background': brand.colors.background,
    '--brand-foreground': brand.colors.foreground,
    '--brand-muted': brand.colors.muted,
    '--brand-muted-foreground': brand.colors.mutedForeground,
    '--brand-border': brand.colors.border,
  }), [brand.colors]);
}

/**
 * Server-side brand detection
 */
export function getBrandFromHeaders(headers: Headers): BrandConfig {
  const host = headers.get('host') ?? '';
  const brand = getBrandByDomain(host);
  return brand ?? brands[DEFAULT_BRAND];
}

/**
 * Generate CSS variables for a brand
 */
export function generateBrandCssVariables(brand: BrandConfig): string {
  return `
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
      --brand-font-family: ${brand.fontFamily};
      --brand-heading-font: ${brand.headingFont};
    }
  `.trim();
}

export { BrandContext };
