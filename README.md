# House of Amelia website

Premium serviced accommodation website built with React and Vite.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Deployment

Deploy the contents of `dist/` to the web root for `https://www.houseofamelia.co.ke/`, or connect this repository to a static-site host and use:

- Build command: `npm run build`
- Publish directory: `dist`

## Enquiry flow

The enquiry form opens a WhatsApp conversation with the details entered by the guest. It does not take payment or confirm availability. Rates and availability are confirmed directly by House of Amelia.

## Content notes

- Bamburi has been removed from the live residence collection.
- Nairobi is the primary destination; Nyali is the Mombasa destination.
- Nightly and monthly pricing are presented as enquiry-based. Add approved rates when final pricing is confirmed.
- Confirm all property imagery, included services, and residence descriptions before publishing.

## Before launch

Replace the current illustrative interior photography on the Nairobi residence cards with verified photographs of the actual Gemland and Marquis residences. Confirm the Marquis bedroom count, exact neighbourhood, property details and any property-specific amenities before adding them to the public listing. The supplied original photo library primarily depicts the existing coastal property.

## Phase 2 SEO pages

This version adds six focused landing pages while preserving the existing homepage design:

- `/serviced-apartments-nairobi/`
- `/executive-serviced-apartments-nairobi/`
- `/furnished-apartments-kileleshwa/`
- `/corporate-accommodation-nairobi/`
- `/long-term-serviced-apartments-nairobi/`
- `/serviced-apartments-nyali/`

The build script prerenders readable page content and page-specific metadata into each route, and creates `sitemap.xml` and `robots.txt` is included in `public/`. The React experience enhances these pages with the site's shared navigation, enquiry form, FAQs and structured data.

### Build and deploy

```bash
npm install
npm run build
npm run preview
```

Deploy the generated `dist` directory as the static site's publish directory. Ensure the host serves the existing route folders directly and falls back to `/index.html` for other client-side routes. After deployment, submit `https://www.houseofamelia.co.ke/sitemap.xml` in Google Search Console and inspect each landing-page URL.

The landing pages intentionally do not publish unconfirmed prices, exact street addresses, supplier approvals or guaranteed availability. Confirm rates, inclusions and booking terms with the guest before publishing them as fixed claims.
