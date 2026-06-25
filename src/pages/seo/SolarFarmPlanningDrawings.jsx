import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../../lib/seo';
import { CTABlock, FAQSection, InternalLinks } from '../../components/ui/SEOServiceLayout';

const PAGE_URL = `${SITE_URL}/solar-farm-planning-drawings-ireland`;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Solar Farm Planning Drawings Ireland',
  description: 'Planning drawings for solar farm planning applications in Ireland, including site layouts, PV array plans, elevations, sections and full council-ready drawing packs.',
  areaServed: { '@type': 'Country', name: 'Ireland' },
  provider: { '@type': 'Organization', name: 'SolarPlan Ireland', url: SITE_URL },
};

const faqs = [
  { q: 'What drawings does a solar farm planning application need in Ireland?', a: 'A solar farm planning application in Ireland typically requires a site location plan, existing site layout, proposed site layout with PV array arrangement, elevations, sections, equipment layout drawings for inverters, transformers, RMUs and ancillary structures, site notice drawings and a planning pack coordinating all documents.' },
  { q: 'Can you prepare drawings for large-scale solar farms?', a: 'Yes. We have experience preparing planning drawings for solar farms ranging from small community projects to utility-scale developments. We work with renewable energy developers, EPC companies and planning consultants.' },
  { q: 'Do you coordinate with other consultants on the planning pack?', a: 'Yes. We regularly coordinate with LVIA consultants, ecologists, civil engineers, structural engineers and planning consultants to ensure drawing references, notes and layouts are consistent across the full planning submission.' },
];

const relatedLinks = [
  { label: 'Solar PV Planning Drawings Ireland', to: '/solar-pv-planning-drawings-ireland' },
  { label: 'Glint and Glare Assessment Ireland', to: '/glint-and-glare-assessment-ireland' },
  { label: 'Ground-Mounted Solar Planning Ireland', to: '/ground-mounted-solar-planning-ireland' },
  { label: 'Landscape Plan Solar PV Ireland', to: '/landscape-plan-solar-pv-ireland' },
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

export default function SolarFarmPlanningDrawings() {
  return (
    <>
      <Helmet>
        <title>Solar Farm Planning Drawings Ireland | Planning Packs</title>
        <meta name="description" content="Solar farm planning drawings for Ireland, including PV array layouts, site plans, access, equipment locations and planning submission drawings." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Solar Farm Planning Drawings Ireland | Council-Ready Drawing Packs" />
        <meta property="og:description" content="Solar farm planning drawings for planning applications in Ireland. Site layouts, PV array plans, elevations, sections, equipment layouts and full council-ready drawing packs." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Solar Farm Planning Drawings Ireland" />
        <meta name="twitter:description" content="Council-ready planning drawings for solar farm planning applications in Ireland." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="bg-forest-950 text-white pt-32 pb-16">
        <div className="container-custom max-w-4xl">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">Solar Farm Planning Drawings Ireland</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Solar Farm Planning Drawings Ireland</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            We prepare full planning drawing packs for solar farm planning applications in Ireland — from utility-scale developments to smaller community solar projects — coordinated to planning authority standard.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/glint-and-glare-assessment-ireland" className="btn-outline-white py-3 px-7">Glint &amp; Glare Assessments</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-6">Solar Farm Drawing Pack Contents</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            {['Site location plan', 'Existing site layout', 'Proposed site layout with PV array arrangement', 'PV array layout drawings', 'Elevation drawings', 'Section drawings', 'Inverter and transformer layout drawings', 'RMU and spare parts container drawings', 'Site notice drawing', 'Planning pack coordination'].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <CTABlock />
      <FAQSection faqs={faqs} />
      <InternalLinks links={relatedLinks} />
    </>
  );
}
