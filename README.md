# Luxe Store - Premium Product Catalogue

A sophisticated, high-performance e-commerce product catalogue built with Next.js, featuring elegant design, comprehensive filtering, and responsive layouts.

## Features

- **Responsive Design**: Mobile-first approach with elegant layouts across all devices
- **Product Catalogue**: Comprehensive product listings with detailed information
- **Advanced Filtering**: Filter by category, brand, price range, rating, and availability
- **Smart Search**: Real-time product search with intelligent matching
- **Product Details**: Rich product pages with image galleries and specifications
- **Performance Optimized**: Built for speed with Next.js App Router and optimized images
- **Modern UI**: Clean, sophisticated design with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui with Radix UI primitives
- **Typography**: Geist Sans + Playfair Display
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd luxe-store-catalogue
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── products/          # Product detail pages
│   ├── globals.css        # Global styles and design tokens
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Site header with navigation
│   ├── product-card.tsx  # Product card component
│   ├── product-grid.tsx  # Product grid layout
│   └── ...               # Other components
├── lib/                  # Utility functions and types
│   ├── types.ts          # TypeScript type definitions
│   ├── mock-data.ts      # Mock product data
│   └── utils.ts          # Utility functions
└── public/               # Static assets
\`\`\`

## API Endpoints

- `GET /api/products` - Get all products with filtering and sorting
- `GET /api/products/[id]` - Get single product by ID

### Query Parameters for `/api/products`:

- `category` - Filter by product category
- `brand` - Filter by brand
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `inStock` - Filter for in-stock items only
- `rating` - Minimum rating filter
- `search` - Search query
- `sort` - Sort order (name, price-low, price-high, rating, newest)

## Deployment

### Deploy to Vercel

The easiest way to deploy is using the Vercel platform:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

## Customization

### Design Tokens

The design system uses CSS custom properties defined in `app/globals.css`. Modify the color palette and spacing by updating the design tokens.

### Adding Products

Products are currently stored in `lib/mock-data.ts`. To integrate with a real database:

1. Replace the mock API routes in `app/api/products/`
2. Update the data fetching logic in components
3. Add your database connection and queries

### Styling

The project uses Tailwind CSS v4 with a custom design system. Key styling files:

- `app/globals.css` - Design tokens and global styles
- Component files - Component-specific styling with Tailwind classes

## Performance

- **Image Optimization**: Next.js Image component with optimized loading
- **Code Splitting**: Automatic code splitting with Next.js App Router
- **Bundle Analysis**: Use `npm run build` to analyze bundle size
- **Caching**: API responses and static assets are cached for performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
