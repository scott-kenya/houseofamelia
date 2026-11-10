import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Building2, CalendarDays, Check, CheckCircle2,
  ChevronDown, Clock3, Globe2, Headphones, MapPin, Menu, MessageCircle,
  Plane, ShieldCheck, Sparkles, Users, Wifi, X, BriefcaseBusiness, House,
  Waves, Mail, Phone
} from 'lucide-react';

const WHATSAPP = '254112415949';
const residences = [
  {
    id: 'gemland-2br',
    name: 'Gemland Executive Residence',
    location: 'Kileleshwa, Nairobi',
    type: '2-bedroom apartment',
    nightlyRate: 90,
    audience: 'Executive & extended stays',
    image: '/assets/images/living.webp',
    description: 'A considered, fully furnished base for professionals, relocating guests and longer assignments in Nairobi.',
    features: ['Swimming pool', 'Wi-Fi', 'Smart TV', 'Washer and dryer', 'Smoke & carbon monoxide detectors', 'Housekeeping', 'Utilities'],
    stay: 'Nightly and monthly stays',
    tag: 'Nairobi collection'
  },
  {
    id: 'marquis-3br',
    name: 'The Marquis by House of Amelia',
    location: 'Nairobi, Kenya',
    type: '3-bedroom executive residence',
    nightlyRate: 250,
    audience: 'Executives, families & corporate stays',
    image: '/assets/images/bedroom2.webp',
    description: 'A private residence for guests seeking the ease and comfort of a furnished home for a short visit or extended stay.',
    features: ['Swimming pool', 'Dedicated office / workspace', 'Wi-Fi', 'Smart TV', 'Washer and dryer', 'Smoke & carbon monoxide detectors', 'Housekeeping', 'Utilities', 'Corporate invoicing'],
    stay: 'Nightly and monthly stays',
    tag: 'Executive residence'
  },
  {
    id: 'nyali-house',
    name: 'House of Amelia Nyali',
    location: 'Nyali, Mombasa',
    type: 'Coastal holiday residence',
    nightlyRate: 120,
    audience: 'Leisure, business & extended stays',
    image: '/assets/images/hero-living.webp',
    description: 'A relaxed coastal residence in Nyali, just a 2-minute walk from the beach, with air conditioning for comfortable family holidays, business visits and extended stays.',
    features: ['Swimming pool', '2-minute walk to the beach', 'Air conditioning', 'Wi-Fi', 'Smart TV', 'Smoke & carbon monoxide detectors', 'Housekeeping', 'Utilities', 'Airport transfers on request'],
    stay: 'Nightly and monthly stays',
    tag: '2-minute walk to the beach'
  }
];

function EnquiryModal({ open, onClose, selected }) {
  const [property, setProperty] = useState(selected || 'gemland-2br');
  const [duration, setDuration] = useState('1–3 months');
  const [arrival, setArrival] = useState('');
  const [guests, setGuests] = useState('1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  useEffect(() => { if (selected) setProperty(selected); }, [selected]);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    const getFocusable = () => [...(dialog?.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') || [])];
    getFocusable()[0]?.focus();
    const handleKeyDown = event => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (!items.length) { event.preventDefault(); dialog?.focus(); return; }
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  const chosen = residences.find(r => r.id === property);
  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const submit = e => {
    e.preventDefault();
    const msg = [
      'Hello House of Amelia, I would like to enquire about accommodation.',
      `Residence: ${chosen?.name || property}`,
      `Preferred arrival: ${arrival || 'Flexible'}`,
      `Length of stay: ${duration}`,
      `Guests: ${guests}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'Individual booking'}`,
      `Requirements: ${notes || 'Not specified'}`
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <div ref={dialogRef} className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" tabIndex={-1}>
      <button className="modal-close" onClick={onClose} aria-label="Close enquiry"><X/></button>
      <span className="eyebrow">Start a conversation</span>
      <h2 id="enquiry-title">Tell us about your stay.</h2>
      <p className="muted">Share a few details and our team will help with availability and a tailored rate.</p>
      <form onSubmit={submit}>
        <label>Preferred residence<select value={property} onChange={e=>setProperty(e.target.value)}>{residences.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></label>
        <div className="form-grid">
          <label>Arrival date<input type="date" min={localToday} value={arrival} onChange={e=>setArrival(e.target.value)}/></label>
          <label>Expected stay<select value={duration} onChange={e=>setDuration(e.target.value)}><option>1–3 nights</option><option>4–7 nights</option><option>1–4 weeks</option><option>1–3 months</option><option>3–6 months</option><option>6–12 months</option><option>12 months or more</option><option>Flexible / not sure</option></select></label>
        </div>
        <div className="form-grid">
          <label>Number of guests<select value={guests} onChange={e=>setGuests(e.target.value)}>{[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}</option>)}</select></label>
          <label>Your name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"/></label>
        </div>
        <div className="form-grid">
          <label>Email address<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/></label>
          <label>Company (optional)<input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Organisation"/></label>
        </div>
        <label>Anything we should know?<textarea rows="3" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Corporate invoicing, airport transfer, housekeeping needs…"/></label>
        <button className="button button-dark button-wide" type="submit">Send enquiry via WhatsApp <ArrowUpRight size={17}/></button>
        <p className="form-note">No payment is taken through this form. Rates and availability are confirmed personally.</p>
      </form>
    </div>
  </div>;
}

function Header({onEnquire}) {
  const [scrolled,setScrolled]=useState(false),[menu,setMenu]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>24);window.addEventListener('scroll',fn);fn();return()=>window.removeEventListener('scroll',fn)},[]);
  useEffect(()=>{if(!menu)return;const closeOnEscape=e=>e.key==='Escape'&&setMenu(false);window.addEventListener('keydown',closeOnEscape);return()=>window.removeEventListener('keydown',closeOnEscape)},[menu]);
  const links=[['Residences','/#residences'],['Corporate stays','/corporate-accommodation-nairobi/'],['The experience','/#experience'],['About','/#about']];
  return <header className={`site-header ${scrolled?'scrolled':''}`}>
    <a className="brand" href="/" aria-label="House of Amelia home"><img className="brand-logo" src="/assets/hoa-logo.png" alt="House of Amelia logo"/><span>HOUSE <i>of</i> AMELIA</span><small>PREMIUM SERVICED ACCOMMODATION</small></a>
    <nav id="primary-navigation" className={menu?'nav-open':''}>{links.map(([t,h])=><a key={h} href={h} onClick={()=>setMenu(false)}>{t}</a>)}<button className="mobile-enquire" onClick={()=>{setMenu(false);onEnquire()}}>Enquire now <ArrowUpRight size={15}/></button></nav>
    <button className="header-cta" onClick={onEnquire}>Enquire now <ArrowUpRight size={15}/></button>
    <button className="menu-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="primary-navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
  </header>
}


const seoPages = {
  '/serviced-apartments-nairobi/': {
    title: 'Serviced Apartments in Nairobi | House of Amelia',
    description: 'Explore premium furnished serviced apartments in Nairobi for executives, expatriates, corporate travellers and families. Nightly, monthly and extended stays.',
    eyebrow: 'NAIROBI RESIDENCE COLLECTION', heading: <>Serviced apartments in <em>Nairobi.</em></>,
    intro: 'Find a furnished home in Nairobi for a business trip, relocation, family visit or longer assignment. House of Amelia offers professionally supported residences with flexible nightly and monthly arrangements.',
    sections: [
      ['A furnished base for work and everyday life', 'Our Nairobi residences are designed for guests who want more room and independence than a conventional hotel stay. Enjoy a private living space, Wi-Fi, Smart TV, swimming pool access and practical support during your stay.'],
      ['Choose the right Nairobi residence', 'Gemland Executive Residence is a two-bedroom apartment suited to professionals and extended stays. The Marquis by House of Amelia is a private three-bedroom executive residence with a dedicated office and workspace.'],
      ['Flexible stays, clear arrangements', 'Whether you need a few nights or several months, enquire for current availability and a rate based on your dates and length of stay. Housekeeping, utilities and corporate invoicing can be discussed as part of your accommodation arrangement.']
    ],
    faqs: [['Do you offer monthly serviced apartments in Nairobi?', 'Yes. We consider monthly and longer-term stays, including arrangements of several months or a year and beyond. Contact us for a tailored quotation.'], ['Which areas are your Nairobi apartments in?', 'Our current Nairobi collection includes Gemland Executive Residence in Kileleshwa and The Marquis by House of Amelia in the Kileleshwa/Riverside area.'], ['Can companies book accommodation for staff?', 'Yes. We welcome enquiries from organisations arranging accommodation for employees, consultants, project teams and visiting executives.']]
  },
  '/executive-serviced-apartments-nairobi/': {
    title: 'Executive Serviced Apartments in Nairobi | House of Amelia',
    description: 'Executive serviced accommodation in Nairobi for expatriates, consultants, senior professionals and business travellers. Furnished residences with flexible stays.',
    eyebrow: 'EXECUTIVE LIVING IN NAIROBI', heading: <>A more considered stay for <em>executives.</em></>,
    intro: 'When work brings you to Nairobi, your accommodation should support the way you live and work. House of Amelia offers furnished executive residences for short visits, relocations and extended professional assignments.',
    sections: [
      ['Space to work, rest and settle in', 'The Marquis by House of Amelia offers a dedicated office/workspace alongside the comfort of a private three-bedroom residence. Gemland Executive Residence provides a two-bedroom furnished option for professionals seeking a practical Nairobi base.'],
      ['Professional support for extended visits', 'Wi-Fi, Smart TV, housekeeping and utilities help make everyday living straightforward. Washer and dryer facilities are available at both Nairobi residences. Corporate invoicing can be arranged for eligible bookings.'],
      ['A flexible alternative to a hotel', 'Choose nightly or monthly accommodation, with longer arrangements considered around your assignment. Share your dates, preferred residence and requirements so the team can prepare a suitable quotation.']
    ],
    faqs: [['Is there a workspace in every apartment?', 'The Marquis has a dedicated office/workspace. Please enquire about the layout and working arrangements at Gemland before booking.'], ['Do you accommodate expatriates relocating to Nairobi?', 'Yes. Our furnished residences can provide a temporary home while individuals and families settle into Nairobi.'], ['Can I request a monthly executive rate?', 'Yes. Monthly and longer-stay quotations are available on enquiry and depend on the residence, dates and length of stay.']]
  },
  '/furnished-apartments-kileleshwa/': {
    title: 'Furnished Apartments in Kileleshwa, Nairobi | House of Amelia',
    description: 'Discover furnished executive apartments in Kileleshwa, Nairobi. Choose a two-bedroom Gemland apartment or The Marquis private residence for flexible stays.',
    eyebrow: 'KILELESHWA · NAIROBI', heading: <>Furnished apartments in <em>Kileleshwa.</em></>,
    intro: 'Looking for a furnished apartment in Kileleshwa for a work assignment, relocation or extended visit? House of Amelia offers two distinct Nairobi residences with flexible nightly and monthly stay options.',
    sections: [
      ['Gemland Executive Residence', 'A two-bedroom furnished apartment for professionals, relocating guests and longer assignments. Amenities include swimming pool access, Wi-Fi, Smart TV, washer and dryer, housekeeping and utilities.'],
      ['The Marquis by House of Amelia', 'A private three-bedroom executive residence for guests who value additional space. A dedicated office/workspace makes it a strong option for guests who need room to work as well as relax.'],
      ['Enquire about dates and monthly rates', 'Rates vary by property, season, availability and duration. Contact House of Amelia with your intended arrival date, number of guests and expected length of stay for a tailored quotation.']
    ],
    faqs: [['Are the Kileleshwa apartments fully furnished?', 'Yes. Both Nairobi residences are presented as furnished accommodation with living spaces and practical amenities for everyday stays.'], ['Do the apartments have laundry facilities?', 'Washer and dryer facilities are available at both Gemland Executive Residence and The Marquis.'], ['Can I stay for six months?', 'Longer stays are welcome for enquiry. Share your intended dates and duration to discuss availability and terms.']]
  },
  '/corporate-accommodation-nairobi/': {
    title: 'Corporate Accommodation in Nairobi | House of Amelia',
    description: 'Arrange furnished corporate accommodation in Nairobi for employees, consultants, project teams and visiting executives. Nightly, monthly and extended stays.',
    eyebrow: 'FOR ORGANISATIONS & PEOPLE TEAMS', heading: <>Corporate accommodation in <em>Nairobi.</em></>,
    intro: 'A relocation, project or business assignment comes with enough moving parts. House of Amelia helps organisations arrange furnished accommodation for employees, consultants, project teams and visiting executives in Nairobi.',
    sections: [
      ['Accommodation for business travel and assignments', 'Our Nairobi residences offer private furnished living spaces for short business visits and longer assignments. Choose between a two-bedroom apartment at Gemland Executive Residence and the three-bedroom Marquis residence.'],
      ['Practical support for corporate stays', 'Housekeeping, utilities and Wi-Fi help simplify the stay. Corporate invoicing is available for eligible bookings, with requirements and billing arrangements confirmed during the enquiry process.'],
      ['A straightforward booking conversation', 'Share the traveller or team requirements, preferred location, arrival date and expected duration. We will respond with availability and a suitable nightly or monthly quotation. We welcome enquiries from companies, NGOs, international organisations, embassies and relocation professionals; this does not imply pre-approved supplier status.']
    ],
    faqs: [['Can a company pay for an employee’s accommodation?', 'Corporate booking and invoicing arrangements can be discussed and confirmed for eligible reservations.'], ['Can you accommodate project teams?', 'Please enquire with the number of guests, room requirements, location preference and expected dates so we can advise on suitable options.'], ['Do you provide long-term corporate accommodation?', 'Yes. Monthly and longer-term arrangements can be discussed for assignments and relocations.']]
  },
  '/long-term-serviced-apartments-nairobi/': {
    title: 'Long-Term Serviced Apartments in Nairobi | House of Amelia',
    description: 'Furnished long-term serviced apartments in Nairobi for stays of one month, six months or longer. Flexible monthly accommodation for relocations and work assignments.',
    eyebrow: 'MONTHLY & EXTENDED STAYS', heading: <>Stay longer. Feel <em>at home.</em></>,
    intro: 'For a new role, a relocation or a project that lasts beyond a few weeks, a furnished serviced apartment can offer the privacy and everyday comfort of home. House of Amelia considers monthly stays and longer arrangements in Nairobi.',
    sections: [
      ['A home for the length of your assignment', 'Our Nairobi residences are suited to guests who need a furnished base for one month, several months or longer. Availability and terms depend on the chosen residence and dates.'],
      ['Everyday essentials included in the experience', 'Both Nairobi residences have Wi-Fi, Smart TV, swimming pool access, washer and dryer, smoke and carbon monoxide detectors, housekeeping and utilities as part of the accommodation arrangement. Confirm the precise inclusions and terms in your quotation.'],
      ['Monthly rates tailored to your stay', 'Long-stay pricing depends on the property, dates, occupancy and duration. Tell us how long you expect to stay and whether you need corporate invoicing so we can prepare the right proposal.']
    ],
    faqs: [['What is the minimum long-stay period?', 'We consider stays from one month and can discuss longer arrangements. Confirm the available dates and terms with our team.'], ['Can I book for 12 months or more?', 'Longer-term enquiries are welcome and are assessed based on the residence, availability and agreed terms.'], ['Are utilities and housekeeping included?', 'Utilities and housekeeping are offered services. The exact inclusions and frequency should be confirmed in your individual quotation.']]
  },
  '/serviced-apartments-nyali/': {
    title: 'Serviced Apartments in Nyali, Mombasa | House of Amelia',
    description: 'Stay in House of Amelia Nyali, a furnished coastal residence just a 2-minute walk from the beach. Nightly, monthly and extended stays in Mombasa.',
    eyebrow: 'HOUSE OF AMELIA · NYALI', heading: <>A coastal stay in <em>Nyali.</em></>,
    intro: 'Discover a furnished coastal residence in Nyali, Mombasa, just a two-minute walk from the beach. House of Amelia Nyali is suited to family holidays, business visits and guests looking for a longer stay by the coast.',
    sections: [
      ['Two minutes from the beach', 'Enjoy the convenience of being just a two-minute walk from the beach, with swimming pool access and air conditioning at the residence.'],
      ['Comfort for short and extended stays', 'The residence includes Wi-Fi, Smart TV, smoke and carbon monoxide detectors, housekeeping and utilities. Airport transfers can be arranged on request. Confirm the details and inclusions for your dates when enquiring.'],
      ['Your Mombasa stay, arranged around you', 'Whether you are visiting for a few nights or considering a monthly stay, contact us with your dates, number of guests and requirements for current availability and a tailored rate.']
    ],
    faqs: [['How far is House of Amelia Nyali from the beach?', 'The residence is just a two-minute walk from the beach.'], ['Does the Nyali residence have a swimming pool?', 'Yes, swimming pool access is available.'], ['Can I book a monthly stay in Nyali?', 'Yes. Monthly and longer-stay enquiries are welcome, subject to availability and agreed terms.']]
  }
};

function SeoLandingPage({ page, onEnquire }) {
  useEffect(() => {
    document.title = page.title;
    const setMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let node = document.head.querySelector(selector);
      if (!node) { node = document.createElement('meta'); node.setAttribute(property ? 'property' : 'name', name); document.head.appendChild(node); }
      node.setAttribute('content', content);
    };
    setMeta('description', page.description);
    setMeta('og:title', page.title, true);
    setMeta('og:description', page.description, true);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `https://www.houseofamelia.co.ke${window.location.pathname}`;
    const schema = [{ '@context':'https://schema.org', '@type':'WebPage', name:page.title, description:page.description, url:`https://www.houseofamelia.co.ke${window.location.pathname}`, isPartOf:{'@type':'WebSite',name:'House of Amelia',url:'https://www.houseofamelia.co.ke/'} }, { '@context':'https://schema.org', '@type':'FAQPage', mainEntity:page.faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}})) }];
    let script = document.getElementById('seo-page-schema');
    if (!script) { script = document.createElement('script'); script.id = 'seo-page-schema'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(schema);
    return () => { document.title = 'House of Amelia | Premium Serviced Apartments in Nairobi & Mombasa'; };
  }, [page]);
  return <div id="top"><Header onEnquire={() => onEnquire()}/><main className="seo-page">
    <section className="seo-hero"><span className="eyebrow">{page.eyebrow}</span><h1>{page.heading}</h1><p>{page.intro}</p><div className="hero-actions"><button className="button button-gold" onClick={() => onEnquire()}>Enquire about a stay <ArrowUpRight size={17}/></button><a className="text-link light" href="/">Explore House of Amelia <ArrowRight size={15}/></a></div></section>
    <section className="seo-content section-pad"><div className="seo-content-intro"><span className="eyebrow">EXECUTIVE LIVING. EXCEPTIONAL STAYS.</span><h2>Find the right space<br/><em>for your next chapter.</em></h2></div>
      {page.sections.map(([heading, body]) => <article className="seo-copy-block" key={heading}><h2>{heading}</h2><p>{body}</p></article>)}
    </section>
    <section className="seo-properties section-pad"><span className="eyebrow">THE HOUSE OF AMELIA COLLECTION</span><h2>Explore our <em>residences.</em></h2><div className="seo-property-grid">
      {residences.map(r => <article key={r.id}><img src={r.image} alt={r.name} loading="lazy"/><div><span className="location"><MapPin size={13}/>{r.location}</span><h3>{r.name}</h3><p>{r.description}</p><p className="seo-nightly-rate">From <strong>US$ {r.nightlyRate}</strong> / night <span>· Monthly quotation on request</span></p><button className="text-link" onClick={() => onEnquire(r.id)}>Enquire about this residence <ArrowRight size={14}/></button></div></article>)}
    </div></section>
    <section className="seo-related section-pad"><span className="eyebrow">EXPLORE MORE</span><h2>More ways to <em>stay with us.</em></h2><div><a href="/serviced-apartments-nairobi/">Serviced apartments in Nairobi <ArrowUpRight size={14}/></a><a href="/executive-serviced-apartments-nairobi/">Executive serviced apartments <ArrowUpRight size={14}/></a><a href="/furnished-apartments-kileleshwa/">Furnished apartments in Kileleshwa <ArrowUpRight size={14}/></a><a href="/corporate-accommodation-nairobi/">Corporate accommodation <ArrowUpRight size={14}/></a><a href="/long-term-serviced-apartments-nairobi/">Long-term stays in Nairobi <ArrowUpRight size={14}/></a><a href="/serviced-apartments-nyali/">Serviced apartments in Nyali <ArrowUpRight size={14}/></a></div></section>
    <section className="seo-faq section-pad"><span className="eyebrow">GOOD TO KNOW</span><h2>Frequently asked <em>questions.</em></h2>{page.faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown size={17}/></summary><p>{a}</p></details>)}</section>
    <section className="seo-cta"><span className="eyebrow">LET’S PLAN YOUR STAY</span><h2>Tell us what you <em>need.</em></h2><p>Share your dates and requirements. We’ll help you explore availability and a suitable rate.</p><button className="button button-gold" onClick={() => onEnquire()}>Make an enquiry <ArrowUpRight size={17}/></button></section>
  </main><footer className="footer"><div className="footer-bottom"><a href="/">House of Amelia</a><span>NAIROBI · MOMBASA · KENYA</span></div></footer></div>;
}


const residencePages = {
  '/residences/gemland-executive-residence/': {
    id:'gemland-2br', title:'Gemland Executive Residence', subtitle:'A refined two-bedroom base in Kileleshwa, Nairobi.', location:'Kileleshwa, Nairobi', rate:90,
    intro:'A fully furnished two-bedroom apartment for professionals, relocating guests, couples and families seeking a comfortable Nairobi base for a short visit or an extended assignment.',
    images:[['/assets/images/living.webp','Living area'],['/assets/images/bedroom2.webp','Bedroom'],['/assets/images/kitchen.webp','Kitchen'],['/assets/images/pool.webp','Swimming pool'],['/assets/images/dinning.webp','Dining area']],
    features:['Two-bedroom furnished apartment','Swimming pool access','Wi-Fi and Smart TV','Washer and dryer','Smoke and carbon monoxide detectors','Housekeeping and utilities'],
    note:'Monthly and corporate rates are available on request. Confirm exact inclusions and availability for your dates.'
  },
  '/residences/the-marquis/': {
    id:'marquis-3br', title:'The Marquis by House of Amelia', subtitle:'Executive living with a dedicated workspace.', location:'Kileleshwa / Riverside, Nairobi', rate:250,
    intro:'A spacious three-bedroom executive residence designed for guests who value privacy, room to settle in and a dedicated office or workspace for working while in Nairobi.',
    images:[['/assets/images/hero-living.webp','Living area'],['/assets/images/bedroom.webp','Bedroom'],['/assets/images/dinning.webp','Dining area'],['/assets/images/kitchen.webp','Kitchen'],['/assets/images/pool.webp','Swimming pool']],
    features:['Three-bedroom executive residence','Dedicated office / workspace','Swimming pool access','Wi-Fi and Smart TV','Washer and dryer','Housekeeping, utilities and corporate invoicing'],
    note:'Monthly and corporate rates are available on request. Confirm exact inclusions and availability for your dates.'
  },
  '/residences/house-of-amelia-nyali/': {
    id:'nyali-house', title:'House of Amelia Nyali', subtitle:'A coastal stay, just a two-minute walk from the beach.', location:'Nyali, Mombasa', rate:120,
    intro:'A furnished coastal residence for family holidays, business visits and longer stays in Mombasa. Enjoy the convenience of being just a two-minute walk from the beach.',
    images:[['/assets/images/balcony.jpg','Balcony'],['/assets/images/bedroom.jpg','Bedroom'],['/assets/images/kitchen.jpg','Kitchen'],['/assets/images/pool.jpg','Swimming pool'],['/assets/images/journal-nyali.jpg','Nyali coastline']],
    features:['Just a two-minute walk to the beach','Swimming pool access','Air conditioning','Wi-Fi and Smart TV','Smoke and carbon monoxide detectors','Housekeeping, utilities and airport transfers on request'],
    note:'Monthly and longer-stay rates are available on request. Confirm exact inclusions and availability for your dates.'
  }
};

function ResidenceDetailPage({page,onEnquire}) {
  useEffect(()=>{document.title=`${page.title} | House of Amelia`;const desc=`Explore ${page.title} in ${page.location}. Indicative nightly rates from US$ ${page.rate}; monthly and extended stays on request.`;let meta=document.querySelector('meta[name="description"]');if(meta)meta.content=desc;let canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href=`https://www.houseofamelia.co.ke${window.location.pathname}`;},[page]);
  return <div id="top"><Header onEnquire={()=>onEnquire(page.id)}/><main className="residence-detail">
    <section className="detail-hero"><div><span className="eyebrow">HOUSE OF AMELIA RESIDENCE COLLECTION</span><span className="location"><MapPin size={14}/>{page.location}</span><h1>{page.title}</h1><p>{page.subtitle}</p><div className="detail-price"><span>Indicative nightly rate</span><strong>US$ {page.rate}</strong><small>Monthly quotation on request</small></div><button className="button button-gold" onClick={()=>onEnquire(page.id)}>Enquire about this residence <ArrowUpRight size={16}/></button></div><img src={page.images[0][0]} alt={`${page.title} illustrative property image`}/></section>
    <section className="detail-gallery section-pad"><div className="section-heading"><div><span className="eyebrow">A CLOSER LOOK</span><h2>Explore the <em>residence.</em></h2></div><p>These are temporary illustrative images to show the gallery layout. Replace them with photographs of this exact residence before publishing.</p></div><div className="detail-gallery-grid">{page.images.map(([src,label],i)=><figure key={src}><img src={src} alt={`${page.title} – ${label} (illustrative placeholder)`} loading="lazy"/><figcaption>{label} <span>Illustrative placeholder</span></figcaption></figure>)}</div></section>
    <section className="detail-information section-pad"><div><span className="eyebrow">THE DETAILS</span><h2>Comfort for the way<br/><em>you stay.</em></h2><p>{page.intro}</p><ul>{page.features.map(f=><li key={f}><Check size={15}/>{f}</li>)}</ul><p className="detail-note">{page.note}</p></div><aside><span className="eyebrow">PLAN YOUR STAY</span><h3>{page.title}</h3><p>Share your dates, number of guests and expected length of stay. We will confirm availability and provide a tailored quotation.</p><div className="detail-aside-rate">From <strong>US$ {page.rate}</strong> / night</div><button className="button button-dark button-wide" onClick={()=>onEnquire(page.id)}>Check availability <ArrowUpRight size={16}/></button><a href="/#residences" className="text-link">Explore all residences <ArrowRight size={15}/></a></aside></section>
    <section className="detail-more"><span className="eyebrow">MORE FROM HOUSE OF AMELIA</span><h2>Explore our other <em>residences.</em></h2><div><a href="/residences/gemland-executive-residence/">Gemland Executive Residence <ArrowUpRight size={15}/></a><a href="/residences/the-marquis/">The Marquis <ArrowUpRight size={15}/></a><a href="/residences/house-of-amelia-nyali/">House of Amelia Nyali <ArrowUpRight size={15}/></a></div></section>
  </main><footer className="footer"><div className="footer-bottom"><a href="/">House of Amelia</a><span>NAIROBI · MOMBASA · KENYA</span></div></footer></div>;
}

export default function App() {
  const [modal,setModal]=useState(false),[selected,setSelected]=useState(null);
  const enquire=id=>{setSelected(id||'gemland-2br');setModal(true)};
  const page = seoPages[window.location.pathname];
  const residencePage = residencePages[window.location.pathname];
  if (residencePage) return <><ResidenceDetailPage page={residencePage} onEnquire={enquire}/><EnquiryModal open={modal} onClose={()=>setModal(false)} selected={selected}/></>;
  if (page) return <><SeoLandingPage page={page} onEnquire={enquire}/><EnquiryModal open={modal} onClose={()=>setModal(false)} selected={selected}/></>;
  return <div id="top">
    <Header onEnquire={()=>enquire()}/>
    <main>
      <section className="hero">
        <img className="hero-image" src="/assets/images/hero-living.webp" alt="Elegant furnished residence interior"/>
        <div className="hero-shade"/>
        <div className="hero-content">
          <span className="hero-kicker"><span/> A MORE CONSIDERED WAY TO STAY IN KENYA</span>
          <h1>Feel at home.<br/><em>Wherever life takes you.</em></h1>
          <p>Thoughtfully furnished serviced residences for executives, expatriates, corporate travellers and extended stays in Nairobi and Mombasa.</p>
          <div className="hero-actions"><button className="button button-gold" onClick={()=>enquire()}>Find your residence <ArrowUpRight size={17}/></button><a className="text-link light" href="#residences">Explore our residences <span>↓</span></a></div>
        </div>
        <div className="hero-bottom"><span>NAIROBI&nbsp; · &nbsp;MOMBASA</span><span>STAYS FROM A FEW NIGHTS TO A YEAR+</span></div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="intro-label"><span className="eyebrow">THE HOUSE OF AMELIA DIFFERENCE</span><span className="intro-line"/></div>
        <div className="intro-copy"><h2>More than a place to stay.<br/><em>A place to settle in.</em></h2><p>Whether you are arriving for a new role, managing a project, relocating with family or taking time by the coast, we make the transition feel effortless. Enjoy the privacy of your own furnished residence with the thoughtful support of a hospitality team.</p><a className="text-link" href="#experience">Discover the experience <ArrowUpRight size={16}/></a></div>
      </section>

      <section className="residences section-pad" id="residences">
        <div className="section-heading"><div><span className="eyebrow">THE RESIDENCE COLLECTION</span><h2>Find your place<br/><em>in Kenya.</em></h2></div><p>Distinctive homes in two sought-after destinations, each designed to make everyday living feel considered and comfortable.</p></div>
        <div className="residence-grid">{residences.map((r,i)=><article className={`residence-card ${i===0?'featured':''}`} key={r.id}>
          <div className="residence-photo"><img src={r.image} alt={`Illustrative furnished residence interior for ${r.name}`} loading="lazy"/><span className="photo-tag">ILLUSTRATIVE IMAGE · {r.tag}</span></div>
          <div className="residence-info"><div className="location"><MapPin size={14}/>{r.location}</div><h3>{r.name}</h3><div className="residence-type">{r.type}</div><p>{r.description}</p><div className="feature-list">{r.features.map(f=><span key={f}><Check size={13}/>{f}</span>)}</div><div className="rate-row"><div><small>FROM · PER NIGHT</small><strong>US$ {r.nightlyRate}</strong><span className="monthly-note">Monthly: request a quotation</span></div><button className="arrow-button" onClick={()=>enquire(r.id)} aria-label={`Enquire about ${r.name}`}><ArrowUpRight/></button></div><div className="residence-card-actions"><a className="text-link card-link" href={`/residences/${r.id === 'gemland-2br' ? 'gemland-executive-residence' : r.id === 'marquis-3br' ? 'the-marquis' : 'house-of-amelia-nyali'}/`}>View residence <ArrowRight size={15}/></a><button className="text-link card-link" onClick={()=>enquire(r.id)}>Enquire now <ArrowUpRight size={15}/></button></div></div>
        </article>)}</div>
        <p className="rate-disclaimer">Displayed nightly rates are indicative starting rates in US dollars. Final rates depend on dates, occupancy and length of stay. Monthly and corporate rates are available on request.</p>
      </section>

      <section className="corporate" id="corporate">
        <div className="corporate-image"><img src="/assets/images/sittingroom.webp" alt="Comfortable furnished apartment living area" loading="lazy"/><div className="image-caption">YOUR OWN SPACE. OUR THOUGHTFUL SUPPORT.</div></div>
        <div className="corporate-copy"><span className="eyebrow">FOR BUSINESS & RELOCATION</span><h2>Make room for<br/><em>what matters.</em></h2><p>Accommodation should be the easiest part of a work assignment or relocation. We support organisations and individuals with furnished residences and practical services for stays from one month to a year and beyond.</p>
          <div className="corporate-points"><div><Building2/><span><b>Corporate accommodation</b><small>Practical stays for teams, consultants and visiting executives.</small></span></div><div><Globe2/><span><b>Relocation & expatriate stays</b><small>A comfortable landing place while you make Kenya home.</small></span></div><div><CalendarDays/><span><b>Flexible durations</b><small>Nightly, monthly and longer-term arrangements.</small></span></div></div>
          <button className="button button-dark" onClick={()=>enquire()}>Discuss corporate accommodation <ArrowUpRight size={17}/></button>
        </div>
      </section>

      <section className="experience section-pad" id="experience">
        <div className="section-heading"><div><span className="eyebrow">THE DETAILS THAT MAKE A DIFFERENCE</span><h2>Comfort, with<br/><em>care built in.</em></h2></div><p>Settle into a residence that feels ready for real life, with useful services and a responsive point of contact throughout your stay.</p></div>
        <div className="service-grid">
          <div><Wifi/><h3>Connected living</h3><p>Wi-Fi to help you stay productive, connected and comfortable.</p></div>
          <div><Sparkles/><h3>Housekeeping</h3><p>Housekeeping support to help keep your home feeling fresh.</p></div>
          <div><CheckCircle2/><h3>Utilities</h3><p>Utilities included as part of the agreed accommodation arrangement.</p></div>
          <div><Plane/><h3>Airport transfers</h3><p>Airport transfer arrangements available on request.</p></div>
          <div><BriefcaseBusiness/><h3>Corporate invoicing</h3><p>Business-friendly invoicing for eligible corporate bookings.</p></div>
          <div><Clock3/><h3>Flexible stay durations</h3><p>Nightly, monthly and longer-term arrangements to suit your plans.</p></div>
        </div>
      </section>

      <section className="longstay">
        <div className="longstay-inner"><span className="eyebrow">STAY A LITTLE LONGER</span><h2>One month. Six months.<br/><em>A year or more.</em></h2><p>For longer assignments and new beginnings, discover a furnished home with the flexibility and support to make an extended stay feel natural.</p><button className="button button-gold" onClick={()=>enquire()}>Request a monthly rate <ArrowUpRight size={17}/></button></div>
        <div className="longstay-note"><Clock3/><span>Flexible stay arrangements<br/>tailored to your requirements</span></div>
      </section>

      <section className="process section-pad">
        <span className="eyebrow">A SIMPLE WAY TO ARRIVE</span><h2>From first enquiry<br/><em>to feeling at home.</em></h2>
        <div className="steps"><div><b>01</b><h3>Tell us what you need</h3><p>Share your destination, dates, length of stay and any special requirements.</p></div><div><b>02</b><h3>Receive your options</h3><p>We confirm availability and provide the appropriate nightly or monthly rate.</p></div><div><b>03</b><h3>Settle in</h3><p>Once arrangements are confirmed, we help coordinate your arrival.</p></div></div>
      </section>

      <section className="closing">
        <img src="/assets/images/balcony1.webp" alt="A welcoming residence setting" loading="lazy"/><div className="closing-overlay"/>
        <div><span className="eyebrow">HOUSE OF AMELIA</span><h2>Your next chapter<br/><em>starts here.</em></h2><p>Tell us where life is taking you. We’ll help you find a place to land.</p><button className="button button-gold" onClick={()=>enquire()}>Make an enquiry <ArrowUpRight size={17}/></button></div>
      </section>
    </main>
    <footer className="footer">
      <div className="footer-main"><div className="footer-brand"><a className="brand brand-footer" href="#top"><img className="brand-logo" src="/assets/hoa-logo.png" alt="House of Amelia logo"/><span>HOUSE <i>of</i> AMELIA</span><small>PREMIUM SERVICED ACCOMMODATION</small></a><p>Thoughtfully furnished residences for nightly, monthly and extended stays in Nairobi and Mombasa.</p></div>
        <div><h4>Explore</h4><a href="#residences">Our residences</a><a href="/serviced-apartments-nairobi/">Serviced apartments Nairobi</a><a href="/executive-serviced-apartments-nairobi/">Executive apartments</a><a href="/corporate-accommodation-nairobi/">Corporate accommodation</a><a href="/long-term-serviced-apartments-nairobi/">Long stays</a></div>
        <div><h4>Destinations</h4><a href="/serviced-apartments-nairobi/">Nairobi</a><a href="/furnished-apartments-kileleshwa/">Kileleshwa</a><a href="/serviced-apartments-nyali/">Nyali, Mombasa</a></div>
        <div><h4>Get in touch</h4><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp us</a><a href="tel:+254112415949"><Phone size={15}/> +254 112 415 949</a><button onClick={()=>enquire()}>Send an enquiry <ArrowUpRight size={15}/></button></div>
      </div><div className="footer-bottom"><span>© {new Date().getFullYear()} House of Amelia. All rights reserved.</span><span>NAIROBI · MOMBASA · KENYA</span></div>
    </footer>
    <a className="whatsapp-float" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello House of Amelia, I would like to enquire about a stay.')}`} target="_blank" rel="noreferrer" aria-label="Chat with House of Amelia on WhatsApp"><MessageCircle/></a>
    <EnquiryModal open={modal} onClose={()=>setModal(false)} selected={selected}/>
  </div>;
}
