# External Integrations & Services

## Current Status: No External Integrations

This is a **static content site with zero external service dependencies**. All functionality is self-contained and runs locally or on a standard host.

## Components with Local/Built-in Processing

### Content Delivery
- **@nuxt/content**: Self-contained file-based CMS
  - Uses local SQLite database (better-sqlite3)
  - No remote content source
  - Data stored in `content/` directory, SQLite in `.data/content`

### Authentication
- **None** — No user login, sessions, or third-party auth providers

### Analytics & Monitoring
- **None** — No GA, Sentry, or observability tools configured

### CDN & Asset Delivery
- **None** — Static assets served from application server; no image CDN or caching layer

### API Integrations
- **None** — No REST/GraphQL endpoints, webhooks, payments, or email services

### Icon System
- **@iconify-json/lucide**: Locally bundled (no remote CDN dependency)
  - 5000+ Lucide icons available via `i-lucide-*` class names

### Styling
- **Tailwind CSS v4**: Processed locally at build time
- **Nuxt UI**: Bundled components, no remote dependencies

## Environment Variables

No `.env` files found. Application runs with zero environment variable requirements.

## Potential Future Integrations

If the site grows, likely candidates include:
- Search indexing (Algolia, MeiliSearch)
- Image optimization (Cloudinary, imgix)
- Form backends or contact handling
- CDN/edge caching (Cloudflare)
- Analytics
