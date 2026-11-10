# House of Amelia – Residence photo replacement guide

The residence cards and detail-page galleries now have dedicated image spaces. The current pictures are illustrative placeholders, not verified photographs of each specific apartment. Replace them with your own approved property photos before publishing.

## Where the photos are

All website images are stored in `public/assets/images/`. The website uses these paths:

### Gemland Executive Residence
- Living room: `living.webp`
- Bedroom: `bedroom2.webp`
- Kitchen: `kitchen.webp`
- Swimming pool: `pool.webp`
- Dining area: `dinning.webp`

### The Marquis by House of Amelia
- Living room: `hero-living.webp`
- Bedroom: `bedroom.webp`
- Dining area: `dinning.webp`
- Kitchen: `kitchen.webp`
- Swimming pool: `pool.webp`

### House of Amelia Nyali
- Balcony: `balcony.jpg`
- Bedroom: `bedroom.jpg`
- Kitchen: `kitchen.jpg`
- Swimming pool: `pool.jpg`
- Nearby coastline: `journal-nyali.jpg`

To replace a placeholder without changing code, keep the same filename and overwrite the existing file with your real photograph. Use JPG, PNG or WebP images; WebP is recommended for performance. Keep landscape photos around 1600px wide where possible. Do not use the same photo for different rooms unless it is a shared facility, such as a swimming pool.

## New residence pages
- `/residences/gemland-executive-residence/`
- `/residences/the-marquis/`
- `/residences/house-of-amelia-nyali/`

The homepage residence cards now link directly to these pages. Each page includes a gallery, amenities, indicative nightly rate and an enquiry action.

## Logo and favicon
The supplied House of Amelia logo has been used to create `public/favicon-hoa.png` and `public/assets/hoa-logo.png`. The favicon is linked from `index.html` and the logo is used in the website header and footer.
