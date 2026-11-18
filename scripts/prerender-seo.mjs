import fs from 'node:fs';
import path from 'node:path';

// Remove homepage-specific JSON-LD before generating child routes.
const base = fs.readFileSync("dist/index.html", "utf8").replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, "");
const withStructuredData = (html, graph) => html.replace('</head>', '<script type="application/ld+json">' + JSON.stringify(graph).replace(/</g, '\\u003c') + '</script></head>');
const breadcrumbs = (title, canonical) => ({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.houseofamelia.co.ke/' }, { '@type': 'ListItem', position: 2, name: title, item: canonical }] });
const pages = [
  { path:'serviced-apartments-nairobi', title:'Serviced Apartments in Nairobi | House of Amelia', description:'Explore premium furnished serviced apartments in Nairobi for executives, expatriates, corporate travellers and families. Nightly, monthly and extended stays.', h1:'Serviced apartments in Nairobi.', intro:'Find a furnished home in Nairobi for a business trip, relocation, family visit or longer assignment. House of Amelia offers professionally supported residences with flexible nightly and monthly arrangements.', sections:[['A furnished base for work and everyday life','Our Nairobi residences are designed for guests who want more room and independence than a conventional hotel stay. Enjoy a private living space, Wi-Fi, Smart TV, swimming pool access and practical support during your stay.'],['Choose the right Nairobi residence','Gemland Executive Residence is a two-bedroom apartment suited to professionals and extended stays. The Marquis by House of Amelia is a private three-bedroom executive residence with a dedicated office and workspace.'],['Flexible stays, clear arrangements','Whether you need a few nights or several months, enquire for current availability and a rate based on your dates and length of stay. Housekeeping, utilities and corporate invoicing can be discussed as part of your accommodation arrangement.']] },
  { path:'executive-serviced-apartments-nairobi', title:'Executive Serviced Apartments in Nairobi | House of Amelia', description:'Executive serviced accommodation in Nairobi for expatriates, consultants, senior professionals and business travellers. Furnished residences with flexible stays.', h1:'A more considered stay for executives.', intro:'When work brings you to Nairobi, your accommodation should support the way you live and work. House of Amelia offers furnished executive residences for short visits, relocations and extended professional assignments.', sections:[['Space to work, rest and settle in','The Marquis by House of Amelia offers a dedicated office/workspace alongside the comfort of a private three-bedroom residence. Gemland Executive Residence provides a two-bedroom furnished option for professionals seeking a practical Nairobi base.'],['Professional support for extended visits','Wi-Fi, Smart TV, housekeeping and utilities help make everyday living straightforward. Washer and dryer facilities are available at both Nairobi residences. Corporate invoicing can be arranged for eligible bookings.'],['A flexible alternative to a hotel','Choose nightly or monthly accommodation, with longer arrangements considered around your assignment. Share your dates, preferred residence and requirements so the team can prepare a suitable quotation.']] },
  { path:'furnished-apartments-kileleshwa', title:'Furnished Apartments in Kileleshwa, Nairobi | House of Amelia', description:'Discover furnished executive apartments in Kileleshwa, Nairobi. Choose a two-bedroom Gemland apartment or The Marquis private residence for flexible stays.', h1:'Furnished apartments in Kileleshwa.', intro:'Looking for a furnished apartment in Kileleshwa for a work assignment, relocation or extended visit? House of Amelia offers two distinct Nairobi residences with flexible nightly and monthly stay options.', sections:[['Gemland Executive Residence','A two-bedroom furnished apartment for professionals, relocating guests and longer assignments. Amenities include swimming pool access, Wi-Fi, Smart TV, washer and dryer, housekeeping and utilities.'],['The Marquis by House of Amelia','A private three-bedroom executive residence for guests who value additional space. A dedicated office/workspace makes it a strong option for guests who need room to work as well as relax.'],['Enquire about dates and monthly rates','Rates vary by property, season, availability and duration. Contact House of Amelia with your intended arrival date, number of guests and expected length of stay for a tailored quotation.']] },
  { path:'corporate-accommodation-nairobi', title:'Corporate Accommodation in Nairobi | Furnished Executive Stays | House of Amelia', description:'Furnished corporate accommodation in Nairobi for employee relocations, consultants, project teams and visiting executives. Request tailored monthly and extended-stay quotations.', h1:'A better base for business in Nairobi.', intro:'Give employees, consultants and visiting teams a furnished place to live while they work in Nairobi. House of Amelia offers executive residences for project assignments, relocations and extended business stays, with tailored arrangements based on each traveller’s dates and requirements.', sections:[['Accommodation that works beyond the hotel room','Our Nairobi collection includes Gemland Executive Residence, a furnished two-bedroom apartment, and The Marquis by House of Amelia, a three-bedroom executive residence with a dedicated office or workspace. Both offer a private living environment for professionals who need room to work, rest and settle into the city.'],['A practical option for organisations and people teams','We welcome enquiries from HR and people teams, companies, NGOs, international organisations, embassies, relocation professionals and project managers arranging stays for employees or visiting personnel. Share the assignment details and we can discuss the most suitable residence and duration.'],['Support for a more settled stay','The residences include practical features such as Wi-Fi, Smart TV, housekeeping and utilities. Corporate invoicing can be discussed for eligible bookings, with the requirements and billing arrangements confirmed during the enquiry process.'],['From one assignment to a longer placement','Whether you are arranging accommodation for one consultant or several members of a visiting team, tell us the preferred area, number of occupants, arrival date and expected length of stay. We will check availability and prepare a tailored quotation for the proposed arrangement.']] },
  { path:'long-term-serviced-apartments-nairobi', title:'Long-Term Serviced Apartments in Nairobi | House of Amelia', description:'Furnished long-term serviced apartments in Nairobi for stays of one month, six months or longer. Flexible monthly accommodation for relocations and work assignments.', h1:'Stay longer. Feel at home.', intro:'For a new role, a relocation or a project that lasts beyond a few weeks, a furnished serviced apartment can offer the privacy and everyday comfort of home. House of Amelia considers monthly stays and longer arrangements in Nairobi.', sections:[['A home for the length of your assignment','Our Nairobi residences are suited to guests who need a furnished base for one month, several months or longer. Availability and terms depend on the chosen residence and dates.'],['Everyday essentials included in the experience','Both Nairobi residences have Wi-Fi, Smart TV, swimming pool access, washer and dryer, smoke and carbon monoxide detectors, housekeeping and utilities as part of the accommodation arrangement. Confirm the precise inclusions and terms in your quotation.'],['Monthly rates tailored to your stay','Long-stay pricing depends on the property, dates, occupancy and duration. Tell us how long you expect to stay and whether you need corporate invoicing so we can prepare the right proposal.']] },
  { path:'serviced-apartments-nyali', title:'Serviced Apartments in Nyali, Mombasa | House of Amelia', description:'Stay in House of Amelia Nyali, a furnished coastal residence just a 2-minute walk from the beach. Nightly, monthly and extended stays in Mombasa.', h1:'A coastal stay in Nyali.', intro:'Discover a furnished coastal residence in Nyali, Mombasa, just a two-minute walk from the beach. House of Amelia Nyali is suited to family holidays, business visits and guests looking for a longer stay by the coast.', sections:[['Two minutes from the beach','Enjoy the convenience of being just a two-minute walk from the beach, with swimming pool access and air conditioning at the residence.'],['Comfort for short and extended stays','The residence includes Wi-Fi, Smart TV, smoke and carbon monoxide detectors, housekeeping and utilities. Airport transfers can be arranged on request. Confirm the details and inclusions for your dates when enquiring.'],['Your Mombasa stay, arranged around you','Whether you are visiting for a few nights or considering a monthly stay, contact us with your dates, number of guests and requirements for current availability and a tailored rate.']] }
];

const residencePages = [
  { path:'residences/gemland-executive-residence', name:'Gemland Executive Residence', area:'Kileleshwa, Nairobi, Kenya', title:'Gemland Executive Residence | House of Amelia', description:'Explore a furnished two-bedroom executive apartment in Kileleshwa, Nairobi. Monthly and extended-stay quotations available on request.', h1:'Gemland Executive Residence', intro:'A refined two-bedroom furnished base in Kileleshwa, Nairobi, for professionals, relocating guests and extended stays.', image:'/assets/images/living.webp' },
  { path:'residences/the-marquis', name:'The Marquis by House of Amelia', area:'Nairobi, Kenya', title:'The Marquis by House of Amelia | Executive Residence', description:'Discover The Marquis, a three-bedroom executive residence in Nairobi with a dedicated office and workspace. Monthly and extended-stay quotations available on request.', h1:'The Marquis by House of Amelia', intro:'Executive living with a dedicated workspace in the Kileleshwa / Riverside area of Nairobi.', image:'/assets/images/hero-living.webp' },
  { path:'residences/house-of-amelia-nyali', name:'House of Amelia Nyali', area:'Nyali, Mombasa, Kenya', title:'House of Amelia Nyali | Coastal Serviced Residence', description:'A furnished coastal residence in Nyali, Mombasa, just a two-minute walk from the beach. Monthly and extended-stay quotations available on request.', h1:'House of Amelia Nyali', intro:'A coastal stay in Nyali, Mombasa, just a two-minute walk from the beach.', image:'/assets/images/balcony.jpg' }
];

for (const page of pages) {
  const canonical = `https://www.houseofamelia.co.ke/${page.path}/`;
  const content = `<main class="seo-prerender"><header><p>HOUSE OF AMELIA · PREMIUM SERVICED ACCOMMODATION</p><h1>${page.h1}</h1><p>${page.intro}</p><p><a href="/">Explore House of Amelia</a> · <a href="/corporate-accommodation-nairobi/">Corporate accommodation</a> · <a href="/serviced-apartments-nyali/">Nyali residence</a></p></header>${page.sections.map(([h,p])=>`<section><h2>${h}</h2><p>${p}</p></section>`).join('')}<section><h2>Explore our residences</h2><p><a href="/serviced-apartments-nairobi/">Serviced apartments in Nairobi</a> · <a href="/executive-serviced-apartments-nairobi/">Executive apartments</a> · <a href="/furnished-apartments-kileleshwa/">Furnished apartments in Kileleshwa</a> · <a href="/long-term-serviced-apartments-nairobi/">Long-term stays</a></p><p>Contact House of Amelia on <a href="https://wa.me/254112415949">WhatsApp</a> to enquire about dates and rates.</p></section></main>`;
  let html = base.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${page.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${page.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, '<meta property="og:url" content="' + canonical + '" />')
    .replace('<meta name="twitter:card" content="summary_large_image" />', '<meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="' + page.title + '" /><meta name="twitter:description" content="' + page.description + '" /><meta name="twitter:image" content="https://www.houseofamelia.co.ke/assets/images/hero-living.webp" />')
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  const graph = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', name: page.title, description: page.description, url: canonical, isPartOf: { '@type': 'WebSite', name: 'House of Amelia', url: 'https://www.houseofamelia.co.ke/' } },
    breadcrumbs(page.title, canonical),
    ...(page.path === 'corporate-accommodation-nairobi' ? [{ '@type': 'Service', name: 'Corporate accommodation in Nairobi', serviceType: 'Furnished corporate and extended-stay accommodation', provider: { '@type': 'Organization', name: 'House of Amelia', url: 'https://www.houseofamelia.co.ke/' }, areaServed: { '@type': 'City', name: 'Nairobi' }, url: canonical }] : [])
  ] };
  html = withStructuredData(html, graph);
  const out = path.join('dist', page.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}
// Render the residence routes with the same React tree the browser will hydrate.
// This prevents the temporary, unstyled SEO-only markup from flashing before the app mounts.
import { createServer } from 'vite';
import { createElement, StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

const vite = await createServer({
  configFile: './vite.config.js',
  server: { middlewareMode: true },
  appType: 'custom'
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  for (const page of residencePages) {
    const route = `/${page.path}/`;
    globalThis.window = { location: { pathname: route } };
    const content = renderToString(createElement(StrictMode, null, createElement(App)));
    const canonical = `https://www.houseofamelia.co.ke${route}`;
    const html = base.replace(new RegExp('<title>.*?</title>'), `<title>${page.title}</title>`)
      .replace(new RegExp('<meta name="description" content="[^"]*" */>'), `<meta name="description" content="${page.description}" />`)
      .replace(new RegExp('<link rel="canonical" href="[^"]*" */>'), `<link rel="canonical" href="${canonical}" />`)
      .replace(new RegExp('<meta property="og:title" content="[^"]*" */>'), `<meta property="og:title" content="${page.title}" />`)
      .replace(new RegExp('<meta property="og:description" content="[^"]*" */>'), `<meta property="og:description" content="${page.description}" />`)
      .replace(new RegExp('<meta property="og:url" content="[^"]*" */>'), '<meta property="og:url" content="' + canonical + '" />')
      .replace('<meta name="twitter:card" content="summary_large_image" />', '<meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="' + page.title + '" /><meta name="twitter:description" content="' + page.description + '" /><meta name="twitter:image" content="https://www.houseofamelia.co.ke' + page.image + '" />')
      .replace(new RegExp('<meta property="og:image" content="[^"]*" */>'), `<meta property="og:image" content="https://www.houseofamelia.co.ke${page.image}" />`)
      .replace('<div id="root"></div>', `<div id="root" data-react-prerender="true">${content}</div>`);
    const graph = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'LodgingBusiness', name: page.name, url: canonical, description: page.description, image: 'https://www.houseofamelia.co.ke' + page.image, telephone: '+254112415949', areaServed: { '@type': 'Place', name: page.area } },
      breadcrumbs(page.name, canonical)
    ] };
    const pageHtml = withStructuredData(html, graph);
    const out = path.join('dist', page.path, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, pageHtml);
  }
} finally {
  delete globalThis.window;
  await vite.close();
}

console.log(`Prerendered ${pages.length} SEO landing pages and ${residencePages.length} hydrated residence pages.`);
