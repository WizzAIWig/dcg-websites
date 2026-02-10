'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useBrand, useBrandFeature } from '@/lib/brand-context';

export function Footer() {
  const { brand, brandSlug } = useBrand();
  
  const hasEvents = useBrandFeature('events');
  const hasBlog = useBrandFeature('blog');
  const hasLearningPaths = useBrandFeature('learningPaths');
  const hasNewsletter = useBrandFeature('newsletter');
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className="bg-gray-900 text-white"
      style={{ 
        '--footer-accent': brand.colors.primary,
      } as React.CSSProperties}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href={`/${brandSlug}`}>
              <Image
                src={brand.logo.dark}
                alt={brand.name}
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              {brand.tagline}
            </p>
            <div className="flex space-x-4">
              {brand.social.linkedin && (
                <a 
                  href={brand.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {brand.social.twitter && (
                <a 
                  href={brand.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {brand.social.youtube && (
                <a 
                  href={brand.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {brand.social.instagram && (
                <a 
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Opleidingen</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${brandSlug}/cursussen`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Alle cursussen
                </Link>
              </li>
              {hasLearningPaths && (
                <li>
                  <Link 
                    href={`/${brandSlug}/leertrajecten`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Leertrajecten
                  </Link>
                </li>
              )}
              <li>
                <Link 
                  href={`/${brandSlug}/trainers`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Onze trainers
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${brandSlug}/locaties`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Locaties
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Over ons</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${brandSlug}/over-ons`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Over {brand.name}
                </Link>
              </li>
              {hasBlog && (
                <li>
                  <Link 
                    href={`/${brandSlug}/blog`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Blog
                  </Link>
                </li>
              )}
              {hasEvents && (
                <li>
                  <Link 
                    href={`/${brandSlug}/evenementen`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Evenementen
                  </Link>
                </li>
              )}
              <li>
                <Link 
                  href={`/${brandSlug}/contact`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${brandSlug}/faq`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Veelgestelde vragen
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <address className="not-italic text-gray-400 text-sm space-y-2 mb-6">
              <p>{brand.contact.address.street}</p>
              <p>{brand.contact.address.postalCode} {brand.contact.address.city}</p>
              <p>
                <a 
                  href={`tel:${brand.contact.phone.replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {brand.contact.phone}
                </a>
              </p>
              <p>
                <a 
                  href={`mailto:${brand.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {brand.contact.email}
                </a>
              </p>
            </address>
            
            {hasNewsletter && (
              <div>
                <h4 className="font-medium text-sm mb-2">Nieuwsbrief</h4>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="E-mailadres"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
                    style={{ '--tw-ring-color': brand.colors.primary } as React.CSSProperties}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded text-sm font-medium text-white transition-colors"
                    style={{ backgroundColor: brand.colors.primary }}
                  >
                    Aanmelden
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} {brand.name}. Alle rechten voorbehouden.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href={`/${brandSlug}/privacy`}
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Privacybeleid
              </Link>
              <Link 
                href={`/${brandSlug}/voorwaarden`}
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Algemene voorwaarden
              </Link>
              <Link 
                href={`/${brandSlug}/cookies`}
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Cookiebeleid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
