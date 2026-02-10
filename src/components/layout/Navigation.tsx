'use client';

import Link from 'next/link';
import { useBrand, useBrandFeature } from '@/lib/brand-context';

interface NavigationProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export function Navigation({ onClose, isMobile }: NavigationProps) {
  const { brand, brandSlug } = useBrand();
  
  const hasEvents = useBrandFeature('events');
  const hasBlog = useBrandFeature('blog');
  const hasLearningPaths = useBrandFeature('learningPaths');
  const hasCareerPaths = useBrandFeature('careerPaths');
  
  const handleClick = () => {
    if (onClose) onClose();
  };
  
  if (isMobile) {
    return (
      <div className="md:hidden border-t border-gray-200 bg-white">
        <nav className="container mx-auto px-4 py-4 space-y-1">
          <Link
            href={`/${brandSlug}/cursussen`}
            onClick={handleClick}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cursussen
          </Link>
          
          {hasLearningPaths && (
            <Link
              href={`/${brandSlug}/leertrajecten`}
              onClick={handleClick}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Leertrajecten
            </Link>
          )}
          
          {hasCareerPaths && (
            <Link
              href={`/${brandSlug}/carrierepaden`}
              onClick={handleClick}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Carrièrepaden
            </Link>
          )}
          
          <Link
            href={`/${brandSlug}/trainers`}
            onClick={handleClick}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Trainers
          </Link>
          
          {hasBlog && (
            <Link
              href={`/${brandSlug}/blog`}
              onClick={handleClick}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Blog
            </Link>
          )}
          
          {hasEvents && (
            <Link
              href={`/${brandSlug}/evenementen`}
              onClick={handleClick}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Evenementen
            </Link>
          )}
          
          <Link
            href={`/${brandSlug}/over-ons`}
            onClick={handleClick}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Over ons
          </Link>
          
          <Link
            href={`/${brandSlug}/contact`}
            onClick={handleClick}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Contact
          </Link>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <Link
              href={`/${brandSlug}/mijn-omgeving`}
              onClick={handleClick}
              className="flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors"
              style={{ 
                backgroundColor: brand.colors.primary,
                color: brand.colors.primaryForeground,
              }}
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
              Mijn omgeving
            </Link>
          </div>
        </nav>
      </div>
    );
  }
  
  // Desktop mega menu (simplified for now)
  return (
    <nav className="hidden md:flex items-center space-x-1">
      <NavLink href={`/${brandSlug}/cursussen`}>
        Cursussen
      </NavLink>
      
      {hasLearningPaths && (
        <NavLink href={`/${brandSlug}/leertrajecten`}>
          Leertrajecten
        </NavLink>
      )}
      
      <NavLink href={`/${brandSlug}/trainers`}>
        Trainers
      </NavLink>
      
      {hasBlog && (
        <NavLink href={`/${brandSlug}/blog`}>
          Blog
        </NavLink>
      )}
      
      {hasEvents && (
        <NavLink href={`/${brandSlug}/evenementen`}>
          Evenementen
        </NavLink>
      )}
      
      <NavLink href={`/${brandSlug}/contact`}>
        Contact
      </NavLink>
    </nav>
  );
}

function NavLink({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
    >
      {children}
    </Link>
  );
}
