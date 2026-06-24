import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../../lib/seo';
import { CTABlock, FAQSection, InternalLinks } from '../../components/ui/SEOServiceLayout';

const PAGE_URL = `${SITE_URL}/glint-and-glare-assessment-ireland`;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Glint and Glare Assessment Ireland',
  description: 'ForgeSolar-based glint and glare assessments for solar PV planning applications in Ireland.',
  areaServed: { '@type': 'Country', name: 'Ireland' },
  provider: { '@type': 'Organization', name: 'SolarPlan Ireland', url: SITE_URL },
};

const faqs = [
  { q: 'When is a glint and glare assessment required in Ireland?', a: 'A glint and glare assessment is typically required for ground-mounted solar farms, commercial rooftop PV near roads or airports, sites near dwellings, sites near rail or transport corridors, and whenever a planning authority requests one. Requirements vary by local authority and site context.' },
  { q: 'What is ForgeSolar?', a: 'ForgeSolar is specialist software used to model potential glint and glare impacts from solar PV arrays. It analyses panel tilt, azimuth, array geometry and receptor locations to predict when and where glare may occur, outputting green and yellow glare results under worst-case clear-sky conditions.' },
  { q: 'What is green glare?', a: 'Green glare is a temporary, low-impact solar reflection that does not cause significant discomfort. ForgeSolar categorises glare results, and green glare is generally acceptable to Irish planning authorities.' },
  { q: 'What is yellow glare?', a: 'Yellow glare indicates a higher intensity reflection that may require assessment and potentially mitigation. Where yellow glare is identified at sensitive receptors, we provide mitigation recommendations in our report.' },
  { q: 'Can panel tilt and orientation reduce glare?', a: 'Yes. Panel tilt angle and azimuth (orientation) directly affect glare risk. Our glare pre-simulation service allows early-stage testing of different configurations to minimise glare before finalising your planning layout.' },
  { q: 'Do you provide mitigation recommendations?', a: 'Yes. Where our assessment identifies glare risk at sensitive receptors, we include practical mitigation recommendations such as adjusted panel angles, anti-reflective coatings or screening measures.' },
];

const relatedLinks = [
  { label: 'Glint and Glare Report Ireland', to: '/glint-and-glare-report-ireland' },
  { label: 'Solar Glare Pre-Simulation', to: '/solar-glare-pre-simulation' },
  { label: 'Solar PV Planning Drawings Ireland', to: '/solar-pv-planning-drawings-ireland' },
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

export default function GlintAndGlareAssessment() {
  return (
    <>
      <Helmet>
        <title>Glint and Glare Assessment Ireland | Solar PV ForgeSolar Reports</title>
        <meta name="description" content="Glint and glare assessments for solar PV planning applications in Ireland using ForgeSolar modelling for roads, dwellings, aviation, rail and sensitive receptors." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Glint and Glare Assessment Ireland | Solar PV ForgeSolar Reports" />
        <meta property="og:description" content="Glint and glare assessments for solar PV planning applications in Ireland using ForgeSolar modelling for roads, dwellings, aviation, rail and sensitive receptors." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Glint and Glare Assessment Ireland" />
        <meta name="twitter:description" content="ForgeSolar glint and glare assessments for solar PV planning applications in Ireland." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="bg-forest-950 text-white pt-32 pb-16">
        <div className="container-custom max-w-4xl">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">Glint and Glare Assessment Ireland</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Glint and Glare Assessments for Solar PV Projects in Ireland</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            We carry out ForgeSolar-based glint and glare assessments for solar PV planning applications across Ireland, covering roads, residential receptors, aviation, rail corridors and other sensitive viewpoints.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/solar-glare-pre-simulation" className="btn-outline-white py-3 px-7">Glare Pre-Simulation</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-4">What Is a Glint and Glare Assessment?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">A glint and glare assessment is a reflected sunlight impact assessment that identifies whether solar panels will cause problematic reflections affecting nearby receptors. It is produced using ForgeSolar modelling software, which analyses panel geometry, tilt, orientation and the location of surrounding receptors to predict glare occurrence under worst-case clear-sky conditions.</p>
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-4 mt-10">Receptors We Assess</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            {['Public roads and transport routes', 'Residential receptors', 'Rail receptors', 'Aviation flight paths', 'Air traffic control tower receptors', 'Commercial and sensitive receptors', 'Public viewpoints where relevant'].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-4">Our Methodology</h2>
          <p className="text-gray-600 leading-relaxed">We use ForgeSolar modelling with site-specific inputs including PV array geometry, tilt angle, azimuth orientation, panel height and receptor identification. Results are presented as green and yellow glare classifications under worst-case clear-sky conditions. Where glare risk is identified, we include mitigation recommendations in the assessment report.</p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-4">When Is an Assessment Required?</h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            {['Ground-mounted solar farms near roads, dwellings or railways', 'Commercial rooftop PV near roads or airports', 'Sites near aviation-sensitive areas', 'Sites where the planning authority has requested an assessment', 'Projects near rail or transport corridors'].map(item => (
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
