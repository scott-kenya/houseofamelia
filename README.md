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

## Enquiry flow and lead capture

The enquiry form supports both individual and corporate enquiries. Nairobi residences appear first, with House of Amelia Nyali retained as the coastal option. Corporate landing-page calls to action open the corporate enquiry path; visitors can also switch between individual and corporate enquiry types inside the form.

Every enquiry opens WhatsApp with the guest's details and campaign attribution. The form does not take payment or confirm availability. Rates and availability are confirmed directly by House of Amelia.

### Optional lead-capture endpoint

The frontend can also POST the enquiry payload to a secure HTTPS endpoint when `VITE_ENQUIRY_ENDPOINT` is configured at build time.

1. Copy `.env.example` to `.env.local` for local development, or configure `VITE_ENQUIRY_ENDPOINT` in the production build environment.
2. Set the variable to the HTTPS URL of a receiving endpoint that House of Amelia controls or has approved.
3. Configure that endpoint to allow CORS requests from the exact House of Amelia website origin, validate the payload, apply spam/rate-limit protection, and store or forward enquiries securely.
4. Test both individual and corporate submissions end-to-end before relying on the endpoint.

The payload uses `schemaVersion: 1` and includes audience type, destination, residence, stay details, contact details, billing preference (corporate enquiries), landing page and UTM attribution. It contains personal information supplied by the enquirer. The endpoint must use HTTPS and an appropriate privacy notice, access controls and retention policy. Do not put API keys, passwords or other secrets in `VITE_*` variables: Vite exposes them in the public browser bundle.

If the endpoint variable is not configured, the form continues to use WhatsApp only. If endpoint delivery fails, WhatsApp remains the enquiry handover path. A configured endpoint has not been connected or verified merely by adding this integration.

## Content notes

- Bamburi has been removed from the live residence collection.
- Nairobi is the primary destination; Nyali is the Mombasa destination.
- Nightly and monthly pricing are presented as enquiry-based. Add approved rates when final pricing is confirmed.
- Confirm all property imagery, included services, and residence descriptions before publishing.

## Residence information and photography

The residence detail pages now present a concise property-at-a-glance summary, labelled gallery captions, a booking-confirmation note and clearer guidance on what guests should verify before booking.

- Gemland is presented as a two-bedroom furnished apartment in Kileleshwa, Nairobi.
- The Marquis is presented as a three-bedroom executive residence in Nairobi with a dedicated office/workspace. Its exact neighbourhood is intentionally not narrowed on the public page until confirmed.
- The Marquis gallery labels building amenities as building facilities rather than implying that a gym, games lounge or cinema is a private in-apartment room.
- Nairobi gallery notices explain that some images are illustrative or may depict shared facilities. Guests are asked to request current photographs and confirm facility access before booking.
- Nyali is presented as a coastal residence in Nyali, Mombasa, with the stated two-minute walk to the beach.

Before launch, replace illustrative Nairobi photography with verified current images of the actual Gemland and Marquis residences. Confirm the exact Marquis neighbourhood, room layout, property details and which building facilities are accessible to guests. Also confirm all property-specific amenities, service frequency and inclusions. Do not describe shared building facilities as private apartment amenities.

Availability, final rates, inclusions and facility access remain subject to direct confirmation by House of Amelia. The website does not confirm a reservation or take payment through the enquiry form.

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
