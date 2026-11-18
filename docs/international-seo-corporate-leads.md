# International SEO and corporate lead tracking

## Audience and search intent

The current route set targets people who are already looking for accommodation in Kenya. Prioritise high-intent searches over country-specific doorway pages.

Primary themes:
- corporate accommodation Nairobi
- furnished apartments Nairobi
- executive serviced apartments Nairobi
- long-term serviced apartments Nairobi
- expatriate accommodation Nairobi
- relocation accommodation Nairobi
- furnished apartments Kileleshwa
- serviced apartments Nyali / Mombasa

International modifiers to work naturally into useful content where accurate:
- corporate housing in Kenya
- temporary accommodation for employees in Kenya
- furnished accommodation for consultants in Nairobi
- relocation accommodation for international staff
- monthly serviced apartment in Nairobi

Do not create thin pages for the United States, United Kingdom, Canada, Europe or individual countries. A searcher in London or Toronto should land on a useful Kenya-focused service page, not a location page pretending the accommodation is in their home country.

## Conversion tracking

The enquiry flow pushes the following events to `window.dataLayer` when the visitor submits the form and is sent to WhatsApp:
- `corporate_quote_request` for corporate enquiries
- `accommodation_enquiry` for other accommodation enquiries

Event fields are limited to non-personal context: residence key, stay duration, purpose, rooms required, lead source and campaign name. Names, email addresses, phone numbers and free-text notes are not sent to the data layer.

The generated WhatsApp message includes the landing page and any `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term` values. This helps the team identify which campaign generated the conversation.

No GA4 measurement ID is embedded by this change. Connect the data layer to the site's verified GA4 / Google Tag Manager property only after confirming the correct measurement ID and consent/privacy requirements. In GA4, mark `corporate_quote_request` and `accommodation_enquiry` as key events after verifying them in DebugView.

Suggested campaign URLs:
- `?utm_source=linkedin&utm_medium=organic_social&utm_campaign=corporate_housing_kenya`
- `?utm_source=google&utm_medium=cpc&utm_campaign=nairobi_corporate_accommodation`
- `?utm_source=partner&utm_medium=referral&utm_campaign=relocation_partners`

## SEO implementation

- Each prerendered landing page has a canonical URL, Open Graph title/description/URL and Twitter card metadata.
- Landing pages have WebPage and BreadcrumbList structured data.
- The corporate accommodation page has Service structured data.
- Each residence page has LodgingBusiness and BreadcrumbList structured data.
- Homepage-only LodgingBusiness schema is removed before generating child routes to avoid describing every page as the same homepage business entity.
- `npm run build` runs an SEO output smoke test against all nine prerendered routes.

## Before scaling content

1. Verify every property fact, amenity, neighbourhood and image against the actual residence.
2. Set up Google Search Console and submit `https://www.houseofamelia.co.ke/sitemap.xml`.
3. Review Search Console queries and landing-page performance after indexing.
4. Publish useful supporting guides for relocation, corporate stays, monthly accommodation and settling into Nairobi; link them to the relevant service and residence pages.
5. Add country- or sector-specific content only when it answers a genuinely different need and has unique evidence and useful detail.
