import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../../lib/seo';
import { CTABlock, FAQSection, InternalLinks } from '../../components/ui/SEOServiceLayout';

const PAGE_URL = `${SITE_URL}/solar-pv-planning-drawings-ireland`;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Solar PV Planning Drawings Ireland',
  description: 'Solar PV planning application drawings for rooftop and ground-mounted projects in Ireland. Site layouts, elevations, sections, notices, and council-ready planning packs.',
  areaServed: { '@type': 'Country', name: 'Ireland' },
  provider: { '@type': 'Organization', name: 'SolarPlan Ireland', url: SITE_URL },
};

const faqs = [
  { q: 'What drawings are required for a solar PV planning application in Ireland?', a: 'A typical solar PV planning application requires a site location plan, existing and proposed site layout, PV array layout drawings, elevations, sections, equipment layout drawings, and a site notice drawing. We coordinate all of these into a council-ready planning pack.' },
  { q: 'Do you prepare rooftop and ground-mounted solar drawings?', a: 'Yes. We prepare planning drawings for both commercial and industrial rooftop solar PV installations and ground-mounted solar farms across Ireland, at all scales.' },
  { q: 'Can you revise drawings after planner comments?', a: 'Yes. We accommodate planner feedback and revise drawings as required. Revision scope and timelines are agreed at the outset.' },
  { q: 'Can you work from CAD, PDF, drone survey or site layout files?', a: 'Yes. We work from CAD files, PDFs, drone survey outputs, OS maps, and site layout information provided by your team or your civil/structural engineers.' },
  { q: 'How quickly can a solar planning drawing pack be prepared?', a: 'Turnaround is typically 1–3 weeks depending on project complexity and the information we receive. We agree a programme at project start.' },
];

const relatedLinks = [
  { label: 'Glint and Glare Assessment Ireland', to: '/glint-and-glare-assessment-ireland' },
  { label: 'Landscape Plan Solar PV Ireland', to: '/landscape-plan-solar-pv-ireland' },
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

export default function SolarPVPlanningDrawings() {
  return (
    <>
      <Helmet>
        <title>Solar PV Planning Drawings Ireland | Council-Ready Packs</title>
        <meta name="description" content="Council-ready solar PV planning drawings for Ireland, including site layouts, elevations, sections, equipment plans and planning application packs." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Solar PV Planning Drawings Ireland | Council-Ready Packs" />
        <meta property="og:description" content="Council-ready solar PV planning drawings for Ireland, including site layouts, elevations, sections, equipment plans and planning application packs." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Solar PV Planning Drawings Ireland | Council-Ready Packs" />
        <meta name="twitter:description" content="Council-ready solar PV planning drawings for Ireland, including site layouts, elevations, sections, equipment plans and planning application packs." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-forest-950 text-white pt-32 pb-16">
        <div className="container-custom max-w-4xl">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">Solar PV Planning Drawings Ireland</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Solar PV Planning Drawings for Planning Applications in Ireland</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            We prepare council-ready solar PV planning drawing packs for rooftop and ground-mounted projects across Ireland — delivered to Irish planning authority standard, on your programme, at outsourcing rates.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/glint-and-glare-assessment-ireland" className="btn-outline-white py-3 px-7">Glint &amp; Glare Assessments</Link>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-6">What We Provide</h2>
          <p className="text-gray-600 mb-6">Our solar PV planning drawing packs include all documents required for a complete planning submission to an Irish local authority or An Bord Pleanála:</p>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            {['Site location plans', 'Existing and proposed site layout drawings', 'PV array layout drawings', 'Elevation drawings', 'Section drawings', 'Equipment layout drawings', 'Transformer, inverter, RMU and spare parts container labels', 'Site notice drawings', 'Planning pack coordination', 'PDF and CAD deliverables'].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Suitable For */}
      <section className="py-14 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-6">Suitable For</h2>
          <p className="text-gray-600 mb-4">We support planning consultants, renewable energy developers, EPC companies and architects working on:</p>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            {['Ground-mounted solar farms', 'Commercial rooftop PV', 'Industrial solar projects', 'Agricultural sites', 'Quarry sites', 'Business park solar PV', 'Renewable energy developers', 'Planning consultants'].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Accurate Drawings Matter */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-4">Why Accurate Drawings Matter</h2>
          <p className="text-gray-600 leading-relaxed">Planning authorities in Ireland expect consistent labelling, correct equipment naming, clear site boundaries, scale-accurate layouts and finished floor level (FFL) information where applicable. Poorly prepared drawings are a common cause of further information requests that delay planning decisions. Our team prepares drawings to the standard expected by Irish local authorities and An Bord Pleanála, reducing the risk of unnecessary delays.</p>
        </div>
      </section>

      <CTABlock />
      <FAQSection faqs={faqs} />
      <InternalLinks links={relatedLinks} />
    </>
  );
}
