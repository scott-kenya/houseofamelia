import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const routes = [
  'serviced-apartments-nairobi',
  'executive-serviced-apartments-nairobi',
  'furnished-apartments-kileleshwa',
  'corporate-accommodation-nairobi',
  'long-term-serviced-apartments-nairobi',
  'serviced-apartments-nyali',
  'residences/gemland-executive-residence',
  'residences/the-marquis',
  'residences/house-of-amelia-nyali'
];
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
assert.match(sitemap, /https:\/\/www\.houseofamelia\.co\.ke\//, 'sitemap should contain the canonical host');

for (const route of routes) {
  const file = path.join('dist', route, 'index.html');
  assert.ok(fs.existsSync(file), `Missing prerendered route: ${route}`);
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /<title>[^<]+<\/title>/, `Missing title: ${route}`);
  assert.match(html, /<meta name="description" content="[^"]+"/, `Missing description: ${route}`);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.houseofamelia\.co\.ke\//, `Missing canonical URL: ${route}`);
  assert.match(html, /property="og:title"/, `Missing Open Graph title: ${route}`);
  assert.match(html, /property="og:description"/, `Missing Open Graph description: ${route}`);
  assert.match(html, /property="og:url"/, `Missing Open Graph URL: ${route}`);
  assert.match(html, /name="twitter:card"/, `Missing Twitter card: ${route}`);
  assert.match(html, /application\/ld\+json/, `Missing structured data: ${route}`);
}
const corporate = fs.readFileSync('dist/corporate-accommodation-nairobi/index.html', 'utf8');
assert.match(corporate, /"@type":"Service"/, 'Corporate route should include Service structured data');
for (const route of routes.filter(x => x.startsWith('residences/'))) {
  const html = fs.readFileSync(path.join('dist', route, 'index.html'), 'utf8');
  assert.match(html, /"@type":"LodgingBusiness"/, `Residence route should include LodgingBusiness schema: ${route}`);
}
console.log(`SEO output check passed for ${routes.length} prerendered routes.`);
