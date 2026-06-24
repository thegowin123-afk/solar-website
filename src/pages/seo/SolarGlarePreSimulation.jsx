import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../../lib/seo';
import { CTABlock, FAQSection, InternalLinks } from '../../components/ui/SEOServiceLayout';

const PAGE_URL = `${SITE_URL}/solar-glare-pre-simulation`;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Solar Glare Pre-Simulation',
  description: 'Early-stage solar glare pre-simulation to test PV array tilt and orientation before finalising planning layouts, helping reduce glint and glare risk.',
  areaServed: { '@type': 'Country', name: 'Ireland' },
  provider: { '@type': 'Organization', name: 'SolarPlan Ireland', url: SITE_URL },
};

const faqs = [
  { q: 'What is a solar glare pre-simulation?', a: 'A solar glare pre-simulation is an early-stage ForgeSolar test run that screens your proposed PV array for glare risk before you finalise your planning layout. It allows you to compare tilt angles, azimuth orientations and array configurations to identify the lowest-risk design option.' },
  { q: 'At what stage should I commission a pre-simulation?', a: 'A pre-simulation is most useful during design development, before your planning drawings are finalised. It gives you evidence to support design decisions and reduces the risk of the full glint and glare assessment identifying issues that require redesign.' },
  { q: 'What information do I need to provide?', a: 'We need your site location, proposed panel layout, panel tilt angle(s), azimuth orientation, panel height above ground, and the location of any nearby roads, dwellings, railways or aviation infrastructure.' },
  { q: 'Is a pre-simulation the same as the full glint and glare report?', a: 'No. A pre-simulation is a screening exercise to support design decisions. The full glint and glare report is a comprehensive assessment report prepared for submission with your planning application.' },
];

const relatedLinks = [
  { label: 'Glint and Glare Assessment Ireland', to: '/glint-and-glare-assessment-ireland' },
  { label: 'Glint and Glare Report Ireland', to: '/glint-and-glare-report-ireland' },
  { label: 'Solar PV Planning Drawings Ireland', to: '/solar-pv-planning-drawings-ireland' },
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

export default function SolarGlarePreSimulation() {
  return (
    <>
      <Helmet>
        <title>Solar Glare Pre-Simulation | PV Tilt &amp; Orientation Optimisation</title>
        <meta name="description" content="Early-stage solar glare pre-simulation to test PV array tilt and orientation before finalising planning layouts, helping reduce glint and glare risk." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Solar Glare Pre-Simulation | PV Tilt &amp; Orientation Optimisation" />
        <meta property="og:description" content="Early-stage solar glare pre-simulation to test PV array tilt and orientation before finalising planning layouts, helping reduce glint and glare risk." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Solar Glare Pre-Simulation Ireland" />
        <meta name="twitter:description" content="Early-stage glare risk screening for solar PV projects before planning submission." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="bg-forest-950 text-white pt-32 pb-16">
        <div className="container-custom max-w-4xl">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">Solar Glare Pre-Simulation</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Solar Glare Pre-Simulation Before Planning Submission</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            An early-stage glare risk screening service that tests your PV array tilt and orientation options using ForgeSolar before you finalise your planning layout — reducing the risk of glare issues at the formal assessment stage.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Pre-Simulation</Link>
            <Link to="/glint-and-glare-assessment-ireland" className="btn-outline-white py-3 px-7">Full Glare Assessment</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-4">What We Include</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            {['Early ForgeSolar test modelling', 'Tilt and azimuth comparison', 'Glare risk screening results', 'Layout optimisation recommendations', 'Planning risk reduction advice'].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
          <div className="mt-8 p-6 bg-gold-50 border border-gold-200 rounded-xl">
            <p className="text-sm font-semibold text-forest-900 mb-2">What to send us</p>
            <p className="text-sm text-gray-600">Send us your site layout, proposed panel tilt, azimuth orientation, panel height above ground, and nearby receptor information (roads, dwellings, aviation). We will run the pre-simulation and advise on the best design approach before you commit to a final layout.</p>
          </div>
        </div>
      </section>

      <CTABlock />
      <FAQSection faqs={faqs} />
      <InternalLinks links={relatedLinks} />
    </>
  );
}
