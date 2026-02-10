# DCG Multi-Brand Websites

## Overview
Modern Next.js 14 platform voor de 6 DCG merk websites met Drupal Headless CMS en BASZ Platform integratie.

## Quick Links
- **Repository:** https://github.com/WizzAIWig/dcg-websites
- **Local Path:** `~/dcg-websites`
- **Architecture Doc:** `pixel-perfect-replica/docs/WEBSITE_ARCHITECTURE.md`

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Drupal 10 Headless (JSON:API) - planned
- **Backend:** BASZ Platform - planned

## Brands
| Merk | Slug | Domein | Focus |
|------|------|--------|-------|
| Vijfhart | vijfhart | vijfhart.nl | IT & Software |
| IT Masters | itmasters | itmasters.nl | Enterprise IT |
| Startel | startel | startel.nl | Telecom & Network |
| Wink Academy | winkacademy | winkacademy.nl | Soft Skills |
| Global Knowledge | globalknowledge | globalknowledge.nl | Vendor Certifications |
| Ictivity | ictivity | ictivity.nl | Digital Skills |

## Project Structure
```
src/
├── app/
│   ├── [brand]/          # Dynamic brand routing
│   │   ├── layout.tsx    # Brand layout with Header/Footer
│   │   └── page.tsx      # Homepage
│   └── page.tsx          # Root redirect to default brand
├── components/
│   └── layout/           # Header, Footer, Navigation
├── config/
│   └── brands.ts         # All brand configurations
└── lib/
    ├── brand-context.tsx # Brand React context
    ├── basz-client.ts    # BASZ API client (placeholder)
    └── drupal-client.ts  # Drupal JSON:API client (placeholder)
```

## Development
```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # Production build
```

## Status
- ✅ Project setup met Next.js 14
- ✅ Multi-brand configuratie (6 merken)
- ✅ Brand context en theming
- ✅ Dynamic [brand] routing
- ✅ Layout componenten (Header, Footer, Navigation)
- ✅ BASZ API client (placeholder)
- ✅ Drupal JSON:API client (placeholder)
- ⏳ Page routes (cursussen, trainers, etc.)
- ⏳ Drupal CMS integratie
- ⏳ BASZ Platform integratie
- ⏳ Vercel deployment configuratie

## Changelog

### 2026-02-11
- Initial project setup
- Multi-brand architecture implemented
- Brand configurations for all 6 DCG brands
- Layout components (Header, Footer, Navigation)
- API client placeholders for BASZ and Drupal
- Pushed to GitHub

## Known Issues
- None yet

## Next Steps
1. Create remaining page routes (cursussen, leertrajecten, trainers, etc.)
2. Set up Drupal CMS connection
3. Implement course listing and detail pages
4. Add BASZ real-time pricing integration
5. Configure Vercel deployment with domain routing
