# DCG Multi-Brand Websites

Modern Next.js 14 platform voor de 6 DCG merk websites, met Drupal Headless CMS en BASZ Platform integratie.

## 🏢 Merken

| Merk | Domein | Focus |
|------|--------|-------|
| **Vijfhart** | vijfhart.nl | IT & Software Development |
| **IT Masters** | itmasters.nl | Enterprise IT Training |
| **Startel** | startel.nl | Telecom & Network |
| **Wink Academy** | winkacademy.nl | Soft Skills & Personal Development |
| **Global Knowledge** | globalknowledge.nl | Vendor Certifications |
| **Ictivity** | ictivity.nl | Digital Skills |

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **CMS:** Drupal 10 Headless (JSON:API)
- **Backend:** BASZ Platform (real-time pricing, orders)
- **Deployment:** Vercel (planned)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/WizzAIWig/dcg-websites.git
cd dcg-websites

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
# Drupal CMS
NEXT_PUBLIC_DRUPAL_BASE_URL=https://cms.dcg.nl
DRUPAL_API_KEY=your-api-key

# BASZ Platform
NEXT_PUBLIC_BASZ_API_URL=https://api.basz.dcg.nl/v1

# Default brand for development
NEXT_PUBLIC_DEFAULT_BRAND=vijfhart
```

## 📁 Project Structure

```
src/
├── app/
│   ├── [brand]/              # Dynamic brand routing
│   │   ├── layout.tsx        # Brand-specific layout
│   │   ├── page.tsx          # Homepage
│   │   ├── cursussen/        # Course pages
│   │   ├── leertrajecten/    # Learning paths
│   │   ├── trainers/         # Trainer profiles
│   │   ├── blog/             # Blog (if enabled)
│   │   ├── evenementen/      # Events (if enabled)
│   │   ├── mijn-omgeving/    # Customer dashboard
│   │   └── ...
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Redirects to default brand
├── components/
│   ├── layout/               # Header, Footer, Navigation
│   ├── ui/                   # Reusable UI components
│   └── ...
├── config/
│   └── brands.ts             # Brand configurations
├── lib/
│   ├── brand-context.tsx     # Brand React context
│   ├── basz-client.ts        # BASZ API client
│   └── drupal-client.ts      # Drupal JSON:API client
└── styles/
    └── globals.css           # Global styles
```

## 🎨 Multi-Brand Architecture

### Domain Detection

In production, each brand has its own domain:
- `vijfhart.nl` → Vijfhart brand
- `itmasters.nl` → IT Masters brand
- etc.

The brand is detected from the request hostname and the appropriate configuration is loaded.

### Development

For local development, use URL parameters:
- `localhost:3000/vijfhart` → Vijfhart brand
- `localhost:3000/itmasters` → IT Masters brand

### Brand Configuration

Each brand is configured in `src/config/brands.ts`:

```typescript
const brands = {
  vijfhart: {
    id: 'vijfhart',
    name: 'Vijfhart',
    domain: 'vijfhart.nl',
    colors: { primary: '#1E3A5F', ... },
    features: { blog: true, events: true, ... },
    seo: { titleTemplate: '%s | Vijfhart IT Opleidingen', ... },
    // ...
  },
  // ... other brands
};
```

### Feature Flags

Brands can enable/disable features:

```typescript
features: {
  blog: true,        // Blog section
  events: true,      // Events calendar
  careerPaths: true, // Career path guides
  learningPaths: true, // Learning path bundles
  strippenkaart: true, // Credit balance system
  subscriptions: true, // Subscription plans
  liveChat: true,    // Live chat widget
  newsletter: true,  // Newsletter signup
}
```

## 🔌 API Integration

### Drupal CMS (Cached Content)

Content that changes infrequently:
- Course catalog (synced from BASZ PIM)
- Blog posts
- Events
- Trainers
- Landing pages

```typescript
import { DrupalClient } from '@/lib/drupal-client';

const drupal = new DrupalClient({
  baseUrl: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  brandId: 'vijfhart',
});

const courses = await drupal.getCourses();
```

### BASZ Platform (Real-time)

Transactional data requiring accuracy:
- Pricing (customer-specific discounts)
- Availability (exact seat count)
- Orders & Checkout
- Customer balance (Strippenkaart)

```typescript
import { BaszClient } from '@/lib/basz-client';

const basz = new BaszClient({
  baseUrl: process.env.NEXT_PUBLIC_BASZ_API_URL,
  brandId: 'vijfhart',
});

const price = await basz.getCoursePrice(courseId, customerId);
const availability = await basz.getCourseAvailability(courseId);
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Domain configuration in `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "vijfhart.nl" }],
      "destination": "/vijfhart/:path*"
    }
  ]
}
```

## 📖 Documentation

- [Architecture Document](./docs/WEBSITE_ARCHITECTURE.md) - Full technical architecture
- [Brand Guidelines](./docs/BRAND_GUIDELINES.md) - Visual identity per brand
- [API Reference](./docs/API_REFERENCE.md) - BASZ & Drupal API docs

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📝 License

Proprietary - DCG Training Group

---

Built with ❤️ by the BASZ Development Team
