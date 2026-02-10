'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useBrand, useBrandFeature } from '@/lib/brand-context';
import { Navigation } from './Navigation';

export function Header() {
  const { brand, brandSlug } = useBrand();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const hasEvents = useBrandFeature('events');
  const hasBlog = useBrandFeature('blog');
  const hasLearningPaths = useBrandFeature('learningPaths');
  
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      style={{ borderColor: brand.colors.border }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${brandSlug}`}
            className="flex items-center space-x-2"
          >
            <Image
              src={brand.logo.light}
              alt={brand.name}
              width={brand.logo.width}
              height={brand.logo.height}
              priority
              className="h-8 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              href={`/${brandSlug}/cursussen`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cursussen
            </Link>
            
            {hasLearningPaths && (
              <Link 
                href={`/${brandSlug}/leertrajecten`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Leertrajecten
              </Link>
            )}
            
            <Link 
              href={`/${brandSlug}/trainers`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Trainers
            </Link>
            
            {hasBlog && (
              <Link 
                href={`/${brandSlug}/blog`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Blog
              </Link>
            )}
            
            {hasEvents && (
              <Link 
                href={`/${brandSlug}/evenementen`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Evenementen
              </Link>
            )}
            
            <Link 
              href={`/${brandSlug}/contact`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              type="button"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Zoeken"
            >
              <svg 
                className="w-5 h-5 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
            
            {/* User Menu / Login */}
            <Link
              href={`/${brandSlug}/mijn-omgeving`}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Mijn omgeving"
            >
              <svg 
                className="w-5 h-5 text-gray-600" 
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
            </Link>
            
            {/* Cart */}
            <Link
              href={`/${brandSlug}/winkelwagen`}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Winkelwagen"
            >
              <svg 
                className="w-5 h-5 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg 
                  className="w-5 h-5 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              ) : (
                <svg 
                  className="w-5 h-5 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <Navigation 
          onClose={() => setMobileMenuOpen(false)} 
          isMobile 
        />
      )}
    </header>
  );
}
