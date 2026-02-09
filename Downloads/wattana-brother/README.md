# Wattana Brother Co., Ltd. - Website

Production-ready Next.js website for Wattana Brother Co., Ltd., a metal and stainless steel fabrication company established since 1984.

## 🎨 Design System

The website uses a **LOCKED COLOR PALETTE** that must not be modified:

- `--navy: #0B1F3B` - Deep navy for headers and navigation
- `--steel-blue: #2F6FB3` - Primary brand blue for sections and buttons
- `--steel-blue-dark: #1E4F86` - Hover/active states
- `--ice-white: #FFFFFF` - White
- `--fog-gray: #F2F4F7` - Light backgrounds
- `--slate: #6B7280` - Secondary text
- `--charcoal: #111827` - Primary text
- `--accent-cyan: #4CC9F0` - Small accents (use sparingly)

## 🚀 Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS**
- **next-sitemap** for SEO
- Static Site Generation (SSG)

## 📁 Project Structure

```
wattana-brother/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with Header/Footer
│   │   ├── page.tsx              # Home page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── factory/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx          # Products listing
│   │   │   ├── water-filter/
│   │   │   ├── reactor/
│   │   │   ├── plastic-mole/
│   │   │   └── conveyor/
│   │   ├── supply/
│   │   │   └── page.tsx
│   │   ├── news/
│   │   │   ├── page.tsx          # News listing
│   │   │   └── 2024-12-24/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── Header.tsx
│       └── Footer.tsx
├── public/
│   └── images/                   # Place your images here
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── next-sitemap.config.js
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Install Dependencies

Using npm:
```bash
npm install
```

Using pnpm (recommended):
```bash
pnpm install
```

Using yarn:
```bash
yarn install
```

## 🏃 Running Locally

### Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Static Export

```bash
npm run build
```

The static site will be exported to the `out/` directory.

## 📸 Adding Images

Place your images in the `/public/images/` directory:

- `/public/images/hero-factory.jpg` - Hero section background
- `/public/images/factory-background.jpg` - Factory section background
- `/public/images/water-filter.jpg` - Water filter product image
- `/public/images/reactor.jpg` - Reactor product image
- `/public/images/plastic-mole.jpg` - Plastic mole product image
- `/public/images/conveyor.jpg` - Conveyor product image
- `/public/og-image.jpg` - OpenGraph social share image

## 🔍 SEO Features

- ✅ Unique metadata for each page
- ✅ OpenGraph tags for social sharing
- ✅ JSON-LD structured data (Organization schema)
- ✅ Sitemap.xml (auto-generated)
- ✅ Robots.txt (auto-generated)
- ✅ Semantic HTML
- ✅ Accessible navigation with ARIA labels
- ✅ Breadcrumbs on detail pages

## 📄 Page Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, about, factory, products |
| `/about/` | Company information |
| `/factory/` | Factory capabilities |
| `/products/` | Products listing |
| `/products/water-filter/` | Water filter details |
| `/products/reactor/` | Reactor details |
| `/products/plastic-mole/` | Plastic mole details |
| `/products/conveyor/` | Conveyor details |
| `/supply/` | Supply & capabilities |
| `/news/` | News listing |
| `/news/2024-12-24/` | News post example |
| `/contact/` | Contact form & information |

## 🎨 Customization

### Updating Content

Edit the respective page files in `src/app/[page]/page.tsx` to update content.

### Adding New Products

1. Create a new directory under `src/app/products/[product-name]/`
2. Create `page.tsx` with product details
3. Add the product to the products array in `/src/app/products/page.tsx`
4. Add the product to the home page products list in `/src/app/page.tsx`

### Adding News Posts

1. Create a new directory under `src/app/news/[post-slug]/`
2. Create `page.tsx` with post content
3. Add the post to the newsItems array in `/src/app/news/page.tsx`

## 🌐 Deployment

### Static Export (Recommended)

```bash
npm run build
```

Deploy the `out/` directory to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

### Environment Variables

Set `SITE_URL` for production:

```bash
SITE_URL=https://wattanabrother.com
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## ♿ Accessibility

- Semantic HTML5
- ARIA labels on navigation
- Focus states on interactive elements
- Alt text on images (placeholders provided)
- Keyboard navigation support

## 📈 Performance

- Static Site Generation (SSG) for all pages
- Optimized images (unoptimized flag for static export)
- Minimal JavaScript bundle
- CSS-in-JS via Tailwind
- No external dependencies in runtime

## 🧪 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Contact Information

**Wattana Brother Co., Ltd.**
- Phone: 02-749-8115-6
- Established: 1984
- Location: Bangkok, Thailand

## 📝 License

© 2024 Wattana Brother Co., Ltd. All rights reserved.

## 🔧 Development Notes

- All colors are locked in `globals.css` and `tailwind.config.ts`
- Do not add new colors to the palette
- Use Server Components by default
- Client Components only when needed (forms, interactive features)
- Follow the existing component structure
- Maintain consistent spacing and typography
