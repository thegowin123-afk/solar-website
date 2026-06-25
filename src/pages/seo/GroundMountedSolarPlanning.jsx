import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../../lib/seo';
import { CTABlock, FAQSection, InternalLinks } from '../../components/ui/SEOServiceLayout';

const PAGE_URL = `${SITE_URL}/ground-mounted-solar-planning-ireland`;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Ground-Mounted Solar Planning Ireland',
  description: 'End-to-end planning drawing and report support for ground-mounted solar farms in Ireland, from initial feasibility through to full planning submission.',
  areaServed: { '@type': 'Country', name: 'Ireland' },
  provider: { '@type': 'Organization', name: 'SolarPlan Ireland', url: SITE_URL },
};

const faqs = [
  { q: 'Do ground-mounted solar farms require planning permission in Ireland?', a: 'Yes. Ground-mounted solar farms almost always require full planning permission from the relevant local authority or, for larger Strategic Infrastructure Developments, from An Bord Pleanála. Smaller agricultural installations may qualify for exemptions depending on size and location.' },
  { q: 'What planning documents does a ground-mounted solar farm need?', a: 'A typical ground-mounted solar farm planning application requires PV planning drawings, a glint and glare assessment, a landscape plan, an ecological assessment, and depending on site context, visual impact assessments, traffic assessments and additional technical reports.' },
  { q: 'What is the turnaround for ground-mounted solar planning drawings?', a: 'Timelines depend on project size and complexity. A drawing package for a typical ground-mounted solar farm takes 4–10 weeks from receipt of site information.' },
];

const relatedLinks = [
  { label: 'Solar PV Planning Drawings Ireland', to: '/solar-pv-planning-drawings-ireland' },
  { label: 'Glint and Glare Assessment Ireland', to: '/glint-and-glare-assessment-ireland' },
  { label: 'Solar Farm Planning Drawings Ireland', to: '/solar-farm-planning-drawings-ireland' },
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

export default function GroundMountedSolarPlanning() {
  return (
    <>
      <Helmet>
        <title>Ground-Mounted Solar Planning Ireland | PV Planning Drawings &amp; Reports</title>
        <meta name="description" content="Planning support for ground-mounted solar PV projects in Ireland, including drawings, glare review, landscape coordination and submission documents." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Ground-Mounted Solar Planning Ireland | PV Planning Drawings &amp; Reports" />
        <meta property="og:description" content="Planning drawing and report support for ground-mounted solar PV farms in Ireland. Site layouts, glint and glare assessments, landscape plans and planning pack coordination." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ground-Mounted Solar Planning Ireland" />
        <meta name="twitter:description" content="Planning drawing and report support for ground-mounted solar PV farms in Ireland." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="bg-forest-950 text-white pt-32 pb-16">
        <div className="container-custom max-w-4xl">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">Ground-Mounted Solar Planning Ireland</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ground-Mounted Solar Planning Ireland</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            We support renewable energy developers, EPC companies and planning consultants with planning drawings, glint and glare assessments and landscape plans for ground-mounted solar PV farms across Ireland.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/solar-pv-planning-drawings-ireland" className="btn-outline-white py-3 px-7">PV Planning Drawings</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-6">Services for Ground-Mounted Solar Projects</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'PV Planning Drawings', desc: 'Site layouts, PV array plans, elevations, sections, equipment layouts and site notice plans.', link: '/solar-pv-planning-drawings-ireland' },
              { title: 'Glint and Glare Assessment', desc: 'ForgeSolar-based assessment of glare impacts on roads, dwellings, railways and aviation receptors.', link: '/glint-and-glare-assessment-ireland' },
              { title: 'Glare Pre-Simulation', desc: 'Early-stage tilt and orientation testing to minimise glare risk before finalising layouts.', link: '/solar-glare-pre-simulation' },
              { title: 'Landscape Plans', desc: 'Vegetation removal, mitigation planting, screening and planning drawing coordination.', link: '/landscape-plan-solar-pv-ireland' },
            ].map(({ title, desc, link }) => (
              <Link key={title} to={link} className="block p-5 border border-gray-200 rounded-xl hover:border-gold-400 transition-colors">
                <h3 className="font-semibold text-forest-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
      <FAQSection faqs={faqs} />
      <InternalLinks links={relatedLinks} />
    </>
  );
}
