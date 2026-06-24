import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../../lib/seo';
import { CTABlock, FAQSection, InternalLinks } from '../../components/ui/SEOServiceLayout';

const PAGE_URL = `${SITE_URL}/rooftop-solar-planning-application-ireland`;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Rooftop Solar Planning Application Ireland',
  description: 'Planning drawings and support for commercial and industrial rooftop solar PV planning applications in Ireland.',
  areaServed: { '@type': 'Country', name: 'Ireland' },
  provider: { '@type': 'Organization', name: 'SolarPlan Ireland', url: SITE_URL },
};

const faqs = [
  { q: 'Does a commercial rooftop solar installation require planning permission in Ireland?', a: 'It depends on the size of the installation and the type of building. Many commercial and industrial rooftop solar systems above certain thresholds require a planning application. We recommend checking with your planning consultant or local authority.' },
  { q: 'What drawings are needed for a rooftop solar planning application?', a: 'Typical drawings include a site location plan, existing and proposed roof plans, elevation drawings showing panel layout, section drawings, and equipment layout drawings for inverters and associated infrastructure.' },
  { q: 'Do you work on portfolio-wide rooftop solar programmes?', a: 'Yes. We support clients with multiple rooftop solar projects, delivering consistent drawing standards across a portfolio under agreed programmes.' },
];

const relatedLinks = [
  { label: 'Solar PV Planning Drawings Ireland', to: '/solar-pv-planning-drawings-ireland' },
  { label: 'Glint and Glare Assessment Ireland', to: '/glint-and-glare-assessment-ireland' },
  { label: 'Ground-Mounted Solar Planning Ireland', to: '/ground-mounted-solar-planning-ireland' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function RooftopSolarPlanningApplication() {
  return (
    <>
      <Helmet>
        <title>Rooftop Solar Planning Application Ireland | Commercial PV Drawings</title>
        <meta name="description" content="Planning drawings and support for commercial and industrial rooftop solar PV planning applications in Ireland. Roof plans, elevations, sections and council-ready packs." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Rooftop Solar Planning Application Ireland | Commercial PV Drawings" />
        <meta property="og:description" content="Planning drawings and support for commercial and industrial rooftop solar PV planning applications in Ireland." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rooftop Solar Planning Application Ireland" />
        <meta name="twitter:description" content="Commercial and industrial rooftop solar PV planning drawings for Ireland." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="bg-forest-950 text-white pt-32 pb-16">
        <div className="container-custom max-w-4xl">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">Rooftop Solar Planning Application Ireland</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Rooftop Solar Planning Application Ireland</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            We prepare planning drawings for commercial and industrial rooftop solar PV installations across Ireland — from single warehouse roofs to portfolio-wide programmes — ensuring your application is safe, compliant and planning-approved.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/solar-pv-planning-drawings-ireland" className="btn-outline-white py-3 px-7">All PV Drawing Services</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-6">What We Provide for Rooftop Solar</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            {['Site location plans', 'Existing and proposed roof plans', 'Elevation drawings showing panel layout', 'Section drawings', 'Equipment layout drawings', 'Inverter and plant room layouts', 'Council-ready planning packs', 'PDF and CAD deliverables'].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
          <div className="mt-8">
            <h2 className="text-2xl font-heading font-bold text-forest-900 mb-4">Project Types We Support</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
              {['Commercial warehouse rooftop PV', 'Industrial energy centre PV', 'Business park rooftop solar', 'Portfolio-wide rooftop programmes', 'Public sector and institutional buildings', 'Agricultural building rooftop PV'].map(item => (
                <li key={item} className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABlock />
      <FAQSection faqs={faqs} />
      <InternalLinks links={relatedLinks} />
    </>
  );
}
