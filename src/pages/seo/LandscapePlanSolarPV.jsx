import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../../lib/seo';
import { CTABlock, FAQSection, InternalLinks } from '../../components/ui/SEOServiceLayout';

const PAGE_URL = `${SITE_URL}/landscape-plan-solar-pv-ireland`;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Landscape Plan Solar PV Ireland',
  description: 'Landscape plan support for solar PV planning applications in Ireland, including vegetation removal, mitigation planting, screening and planning drawing coordination.',
  areaServed: { '@type': 'Country', name: 'Ireland' },
  provider: { '@type': 'Organization', name: 'SolarPlan Ireland', url: SITE_URL },
};

const faqs = [
  { q: 'What is a landscape plan for a solar PV project?', a: 'A landscape plan for a solar PV project shows proposed planting, screening, vegetation removal and mitigation measures for the development. It forms part of the planning application and demonstrates how the site will be managed to minimise visual and ecological impact.' },
  { q: 'Is a landscape plan required for a solar farm in Ireland?', a: 'A landscape plan is almost always required for ground-mounted solar farms in Ireland. Local authorities expect to see proposals for boundary hedgerow retention, mitigation planting and screening to reduce visual impact on the surrounding area.' },
  { q: 'Do you coordinate with LVIA consultants?', a: 'Yes. Where clients supply a Landscape and Visual Impact Assessment (LVIA) or arboriculture report, we use those findings to inform the landscape plan, ensuring consistency between the assessment and the planning drawings.' },
  { q: 'What information do you need to prepare a landscape plan?', a: 'We need the proposed site layout, existing boundary conditions, LVIA or arboriculture report where available, and any planning authority landscape requirements or conditions.' },
];

const relatedLinks = [
  { label: 'Solar PV Planning Drawings Ireland', to: '/solar-pv-planning-drawings-ireland' },
  { label: 'Ground-Mounted Solar Planning Ireland', to: '/ground-mounted-solar-planning-ireland' },
  { label: 'Solar Farm Planning Drawings Ireland', to: '/solar-farm-planning-drawings-ireland' },
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

export default function LandscapePlanSolarPV() {
  return (
    <>
      <Helmet>
        <title>Landscape Plan for Solar PV Ireland | Planning Application Support</title>
        <meta name="description" content="Landscape plan support for solar PV planning applications in Ireland, including vegetation removal, mitigation planting, screening and planning drawing coordination." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Landscape Plan for Solar PV Ireland | Planning Application Support" />
        <meta property="og:description" content="Landscape plan support for solar PV planning applications in Ireland, including vegetation removal, mitigation planting, screening and planning drawing coordination." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Landscape Plan for Solar PV Ireland" />
        <meta name="twitter:description" content="Landscape plan support for solar PV planning applications in Ireland." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="bg-forest-950 text-white pt-32 pb-16">
        <div className="container-custom max-w-4xl">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">Landscape Plan Solar PV Ireland</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Landscape Plan Support for Solar PV Planning Applications</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            We produce detailed landscape plans for solar PV planning applications across Ireland, coordinated with your LVIA, arboriculture and ecology inputs to present a clear, planning-authority-ready landscape proposal.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/solar-pv-planning-drawings-ireland" className="btn-outline-white py-3 px-7">PV Planning Drawings</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-6">What We Include</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            {['Vegetation removal plans', 'Mitigation planting plans', 'Screening proposals', 'Hedgerow and treeline coordination', 'Planning drawing notes', 'LVIA and arboriculture coordination', 'Biodiversity and ecological corridor considerations', 'Retained vegetation protection notes', 'Clear planting schedules', 'Planning-condition responses'].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
          <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
            <strong>Note:</strong> Landscape plans should be coordinated with ecology, arboriculture and LVIA inputs where required. We work from your consultant's reports to ensure the planning drawings are consistent with the written assessments.
          </div>
        </div>
      </section>

      <CTABlock />
      <FAQSection faqs={faqs} />
      <InternalLinks links={relatedLinks} />
    </>
  );
}
