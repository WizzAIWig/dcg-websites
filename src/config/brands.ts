/**
 * DCG Multi-Brand Configuration
 * 
 * Central configuration for all 6 DCG brands with their visual identity,
 * feature flags, and API settings.
 */

export interface BrandColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
}

export interface BrandLogo {
  light: string;
  dark: string;
  favicon: string;
  width: number;
  height: number;
}

export interface BrandFeatures {
  blog: boolean;
  events: boolean;
  careerPaths: boolean;
  learningPaths: boolean;
  strippenkaart: boolean;
  subscriptions: boolean;
  liveChat: boolean;
  newsletter: boolean;
}

export interface BrandSeo {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  ogImage: string;
  twitterHandle?: string;
}

export interface BrandSocial {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface BrandContact {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface BrandConfig {
  id: string;
  name: string;
  slug: string;
  domain: string;
  tagline: string;
  
  // Visual identity
  logo: BrandLogo;
  colors: BrandColors;
  fontFamily: string;
  headingFont: string;
  
  // Feature flags
  features: BrandFeatures;
  
  // SEO
  seo: BrandSeo;
  
  // Contact & Social
  contact: BrandContact;
  social: BrandSocial;
  
  // Categories this brand focuses on
  categoryFilters?: string[];
}

/**
 * All DCG brand configurations
 */
export const brands: Record<string, BrandConfig> = {
  vijfhart: {
    id: 'vijfhart',
    name: 'Vijfhart',
    slug: 'vijfhart',
    domain: 'vijfhart.nl',
    tagline: 'Dé specialist in IT trainingen',
    
    logo: {
      light: '/brands/vijfhart/logo-light.svg',
      dark: '/brands/vijfhart/logo-dark.svg',
      favicon: '/brands/vijfhart/favicon.ico',
      width: 180,
      height: 48,
    },
    
    colors: {
      primary: '#1E3A5F',
      primaryForeground: '#FFFFFF',
      secondary: '#4A90A4',
      secondaryForeground: '#FFFFFF',
      accent: '#F5A623',
      accentForeground: '#1E3A5F',
      background: '#FFFFFF',
      foreground: '#1E293B',
      muted: '#F1F5F9',
      mutedForeground: '#64748B',
      border: '#E2E8F0',
    },
    
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFont: 'Poppins, system-ui, sans-serif',
    
    features: {
      blog: true,
      events: true,
      careerPaths: true,
      learningPaths: true,
      strippenkaart: true,
      subscriptions: true,
      liveChat: true,
      newsletter: true,
    },
    
    seo: {
      titleTemplate: '%s | Vijfhart IT Opleidingen',
      defaultTitle: 'Vijfhart - IT Trainingen & Cursussen',
      defaultDescription: 'Vijfhart is dé specialist in IT trainingen. Ontdek ons uitgebreide aanbod aan cursussen voor developers, IT professionals en teams.',
      ogImage: '/brands/vijfhart/og-image.jpg',
      twitterHandle: '@vijfhart',
    },
    
    contact: {
      email: 'info@vijfhart.nl',
      phone: '+31 (0)30 123 4567',
      address: {
        street: 'Kanaalweg 1',
        city: 'Utrecht',
        postalCode: '3526 KL',
        country: 'Nederland',
      },
    },
    
    social: {
      linkedin: 'https://linkedin.com/company/vijfhart',
      twitter: 'https://twitter.com/vijfhart',
      youtube: 'https://youtube.com/@vijfhart',
    },
    
    categoryFilters: ['development', 'devops', 'cloud', 'data', 'security'],
  },
  
  itmasters: {
    id: 'itmasters',
    name: 'IT Masters',
    slug: 'itmasters',
    domain: 'itmasters.nl',
    tagline: 'Enterprise IT Training',
    
    logo: {
      light: '/brands/itmasters/logo-light.svg',
      dark: '/brands/itmasters/logo-dark.svg',
      favicon: '/brands/itmasters/favicon.ico',
      width: 180,
      height: 48,
    },
    
    colors: {
      primary: '#0F172A',
      primaryForeground: '#FFFFFF',
      secondary: '#3B82F6',
      secondaryForeground: '#FFFFFF',
      accent: '#10B981',
      accentForeground: '#FFFFFF',
      background: '#FFFFFF',
      foreground: '#0F172A',
      muted: '#F8FAFC',
      mutedForeground: '#64748B',
      border: '#E2E8F0',
    },
    
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFont: 'Inter, system-ui, sans-serif',
    
    features: {
      blog: true,
      events: true,
      careerPaths: false,
      learningPaths: true,
      strippenkaart: true,
      subscriptions: true,
      liveChat: true,
      newsletter: true,
    },
    
    seo: {
      titleTemplate: '%s | IT Masters',
      defaultTitle: 'IT Masters - Enterprise IT Training',
      defaultDescription: 'IT Masters levert hoogwaardige trainingen voor enterprise architecten, IT managers en senior professionals.',
      ogImage: '/brands/itmasters/og-image.jpg',
    },
    
    contact: {
      email: 'info@itmasters.nl',
      phone: '+31 (0)30 123 4568',
      address: {
        street: 'Kanaalweg 1',
        city: 'Utrecht',
        postalCode: '3526 KL',
        country: 'Nederland',
      },
    },
    
    social: {
      linkedin: 'https://linkedin.com/company/itmasters',
    },
    
    categoryFilters: ['architecture', 'management', 'agile', 'itil'],
  },
  
  startel: {
    id: 'startel',
    name: 'Startel',
    slug: 'startel',
    domain: 'startel.nl',
    tagline: 'Telecom & Network Training',
    
    logo: {
      light: '/brands/startel/logo-light.svg',
      dark: '/brands/startel/logo-dark.svg',
      favicon: '/brands/startel/favicon.ico',
      width: 180,
      height: 48,
    },
    
    colors: {
      primary: '#7C3AED',
      primaryForeground: '#FFFFFF',
      secondary: '#A78BFA',
      secondaryForeground: '#FFFFFF',
      accent: '#F59E0B',
      accentForeground: '#1E293B',
      background: '#FFFFFF',
      foreground: '#1E293B',
      muted: '#F5F3FF',
      mutedForeground: '#6B7280',
      border: '#E5E7EB',
    },
    
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFont: 'Inter, system-ui, sans-serif',
    
    features: {
      blog: true,
      events: true,
      careerPaths: false,
      learningPaths: true,
      strippenkaart: true,
      subscriptions: false,
      liveChat: false,
      newsletter: true,
    },
    
    seo: {
      titleTemplate: '%s | Startel',
      defaultTitle: 'Startel - Telecom & Network Training',
      defaultDescription: 'Startel is specialist in telecom en netwerk trainingen voor network engineers en telecom professionals.',
      ogImage: '/brands/startel/og-image.jpg',
    },
    
    contact: {
      email: 'info@startel.nl',
      phone: '+31 (0)30 123 4569',
      address: {
        street: 'Kanaalweg 1',
        city: 'Utrecht',
        postalCode: '3526 KL',
        country: 'Nederland',
      },
    },
    
    social: {
      linkedin: 'https://linkedin.com/company/startel',
    },
    
    categoryFilters: ['networking', 'telecom', 'cisco', '5g'],
  },
  
  winkacademy: {
    id: 'winkacademy',
    name: 'Wink Academy',
    slug: 'winkacademy',
    domain: 'winkacademy.nl',
    tagline: 'Soft Skills & Personal Development',
    
    logo: {
      light: '/brands/winkacademy/logo-light.svg',
      dark: '/brands/winkacademy/logo-dark.svg',
      favicon: '/brands/winkacademy/favicon.ico',
      width: 180,
      height: 48,
    },
    
    colors: {
      primary: '#EC4899',
      primaryForeground: '#FFFFFF',
      secondary: '#F472B6',
      secondaryForeground: '#FFFFFF',
      accent: '#8B5CF6',
      accentForeground: '#FFFFFF',
      background: '#FFFFFF',
      foreground: '#1E293B',
      muted: '#FDF2F8',
      mutedForeground: '#6B7280',
      border: '#FBCFE8',
    },
    
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFont: 'Outfit, system-ui, sans-serif',
    
    features: {
      blog: true,
      events: true,
      careerPaths: true,
      learningPaths: true,
      strippenkaart: true,
      subscriptions: true,
      liveChat: true,
      newsletter: true,
    },
    
    seo: {
      titleTemplate: '%s | Wink Academy',
      defaultTitle: 'Wink Academy - Soft Skills Training',
      defaultDescription: 'Wink Academy biedt trainingen in soft skills, persoonlijke ontwikkeling en communicatie voor alle professionals.',
      ogImage: '/brands/winkacademy/og-image.jpg',
    },
    
    contact: {
      email: 'info@winkacademy.nl',
      phone: '+31 (0)30 123 4570',
      address: {
        street: 'Kanaalweg 1',
        city: 'Utrecht',
        postalCode: '3526 KL',
        country: 'Nederland',
      },
    },
    
    social: {
      linkedin: 'https://linkedin.com/company/winkacademy',
      instagram: 'https://instagram.com/winkacademy',
    },
    
    categoryFilters: ['communication', 'leadership', 'teamwork', 'presentation'],
  },
  
  globalknowledge: {
    id: 'globalknowledge',
    name: 'Global Knowledge',
    slug: 'globalknowledge',
    domain: 'globalknowledge.nl',
    tagline: 'Vendor Certifications & Training',
    
    logo: {
      light: '/brands/globalknowledge/logo-light.svg',
      dark: '/brands/globalknowledge/logo-dark.svg',
      favicon: '/brands/globalknowledge/favicon.ico',
      width: 200,
      height: 48,
    },
    
    colors: {
      primary: '#DC2626',
      primaryForeground: '#FFFFFF',
      secondary: '#1E40AF',
      secondaryForeground: '#FFFFFF',
      accent: '#F59E0B',
      accentForeground: '#1E293B',
      background: '#FFFFFF',
      foreground: '#1E293B',
      muted: '#FEF2F2',
      mutedForeground: '#6B7280',
      border: '#E5E7EB',
    },
    
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFont: 'Inter, system-ui, sans-serif',
    
    features: {
      blog: true,
      events: true,
      careerPaths: true,
      learningPaths: true,
      strippenkaart: true,
      subscriptions: true,
      liveChat: true,
      newsletter: true,
    },
    
    seo: {
      titleTemplate: '%s | Global Knowledge Nederland',
      defaultTitle: 'Global Knowledge - Vendor Certifications',
      defaultDescription: 'Global Knowledge Nederland biedt officiële certificeringstrainingen van Microsoft, AWS, Google, Cisco en meer.',
      ogImage: '/brands/globalknowledge/og-image.jpg',
    },
    
    contact: {
      email: 'info@globalknowledge.nl',
      phone: '+31 (0)30 123 4571',
      address: {
        street: 'Kanaalweg 1',
        city: 'Utrecht',
        postalCode: '3526 KL',
        country: 'Nederland',
      },
    },
    
    social: {
      linkedin: 'https://linkedin.com/company/global-knowledge-nl',
      twitter: 'https://twitter.com/globalknowledge',
    },
    
    categoryFilters: ['microsoft', 'aws', 'google', 'cisco', 'vmware', 'comptia'],
  },
  
  ictivity: {
    id: 'ictivity',
    name: 'Ictivity',
    slug: 'ictivity',
    domain: 'ictivity.nl',
    tagline: 'Digital Skills voor Iedereen',
    
    logo: {
      light: '/brands/ictivity/logo-light.svg',
      dark: '/brands/ictivity/logo-dark.svg',
      favicon: '/brands/ictivity/favicon.ico',
      width: 180,
      height: 48,
    },
    
    colors: {
      primary: '#059669',
      primaryForeground: '#FFFFFF',
      secondary: '#34D399',
      secondaryForeground: '#1E293B',
      accent: '#0EA5E9',
      accentForeground: '#FFFFFF',
      background: '#FFFFFF',
      foreground: '#1E293B',
      muted: '#ECFDF5',
      mutedForeground: '#6B7280',
      border: '#D1FAE5',
    },
    
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFont: 'Inter, system-ui, sans-serif',
    
    features: {
      blog: true,
      events: false,
      careerPaths: false,
      learningPaths: true,
      strippenkaart: true,
      subscriptions: false,
      liveChat: false,
      newsletter: true,
    },
    
    seo: {
      titleTemplate: '%s | Ictivity',
      defaultTitle: 'Ictivity - Digital Skills Training',
      defaultDescription: 'Ictivity biedt praktische digitale vaardigheden trainingen voor de moderne werknemer.',
      ogImage: '/brands/ictivity/og-image.jpg',
    },
    
    contact: {
      email: 'info@ictivity.nl',
      phone: '+31 (0)30 123 4572',
      address: {
        street: 'Kanaalweg 1',
        city: 'Utrecht',
        postalCode: '3526 KL',
        country: 'Nederland',
      },
    },
    
    social: {
      linkedin: 'https://linkedin.com/company/ictivity',
    },
    
    categoryFilters: ['office', 'productivity', 'basics', 'ai-tools'],
  },
};

/**
 * Get brand config by domain
 */
export function getBrandByDomain(domain: string): BrandConfig | undefined {
  return Object.values(brands).find(
    (brand) => brand.domain === domain || domain.endsWith(`.${brand.domain}`)
  );
}

/**
 * Get brand config by slug
 */
export function getBrandBySlug(slug: string): BrandConfig | undefined {
  return brands[slug];
}

/**
 * Get all brand slugs (for static generation)
 */
export function getAllBrandSlugs(): string[] {
  return Object.keys(brands);
}

/**
 * Domain to brand slug mapping
 */
export const domainToBrandSlug: Record<string, string> = {
  'vijfhart.nl': 'vijfhart',
  'www.vijfhart.nl': 'vijfhart',
  'itmasters.nl': 'itmasters',
  'www.itmasters.nl': 'itmasters',
  'startel.nl': 'startel',
  'www.startel.nl': 'startel',
  'winkacademy.nl': 'winkacademy',
  'www.winkacademy.nl': 'winkacademy',
  'globalknowledge.nl': 'globalknowledge',
  'www.globalknowledge.nl': 'globalknowledge',
  'ictivity.nl': 'ictivity',
  'www.ictivity.nl': 'ictivity',
  // Development/preview domains
  'localhost': 'vijfhart',
};

/**
 * Default brand for development
 */
export const DEFAULT_BRAND = 'vijfhart';
