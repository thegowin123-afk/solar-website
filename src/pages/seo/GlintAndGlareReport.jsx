import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../../lib/seo';
import { CTABlock, FAQSection, InternalLinks } from '../../components/ui/SEOServiceLayout';

const PAGE_URL = `${SITE_URL}/glint-and-glare-report-ireland`;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Glint and Glare Report Ireland',
  description: 'Council-ready glint and glare reports for solar PV planning applications in Ireland, including ForgeSolar modelling, receptor assessment, results and mitigation advice.',
  areaServed: { '@type': 'Country', name: 'Ireland' },
  provider: { '@type': 'Organization', name: 'SolarPlan Ireland', url: SITE_URL },
};

const faqs = [
  { q: 'What is included in a glint and glare report?', a: 'Our reports include an executive summary, site description, proposed development description, planning and policy context, methodology, receptor identification, ForgeSolar modelling assumptions, road receptor assessment, residential receptor assessment, aviation receptor assessment, rail receptor assessment, results tables, mitigation recommendations, conclusion and appendices.' },
  { q: 'What inputs do you need to prepare the report?', a: 'We need site location and layout information, proposed panel tilt and azimuth, panel height above ground, approximate array dimensions, and details of nearby receptors such as roads, dwellings and aviation infrastructure. We can work from CAD, PDF, or site layout drawings.' },
  { q: 'How is a glint and glare report used by planning authorities?', a: 'Planning authorities in Ireland use the report to assess whether the proposed solar development will cause unacceptable glare impacts on surrounding receptors. A well-prepared ForgeSolar-based report demonstrating acceptable or mitigated glare results supports a planning application.' },
  { q: 'What is the typical delivery timeframe?', a: 'Turnaround is typically 2–4 weeks from receipt of all required site inputs. We can agree a programme at the outset of the commission.' },
];

const relatedLinks = [
  { label: 'Glint and Glare Assessment Ireland', to: '/glint-and-glare-assessment-ireland' },
  { label: 'Solar Glare Pre-Simulation', to: '/solar-glare-pre-simulation' },
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

export default function GlintAndGlareReport() {
  return (
    <>
      <Helmet>
        <title>Glint and Glare Report Ireland | Council-Ready Solar PV Reports</title>
        <meta name="description" content="Council-ready glint and glare reports for solar PV planning applications in Ireland, including receptor review, modelling results and mitigation advice." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Glint and Glare Report Ireland | Council-Ready Solar PV Reports" />
        <meta property="og:description" content="Council-ready glint and glare reports for solar PV planning applications in Ireland, including ForgeSolar modelling, receptor assessment, results and mitigation advice." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Glint and Glare Report Ireland" />
        <meta name="twitter:description" content="Council-ready glint and glare reports for solar PV planning applications in Ireland." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="bg-forest-950 text-white pt-32 pb-16">
        <div className="container-custom max-w-4xl">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">Glint and Glare Report Ireland</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Council-Ready Glint and Glare Reports for Solar PV Planning Applications</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            We prepare comprehensive ForgeSolar-based glint and glare reports for solar PV planning applications across Ireland — structured to meet planning authority requirements and submitted as part of your planning pack.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/glint-and-glare-assessment-ireland" className="btn-outline-white py-3 px-7">About Our Assessments</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-6">Typical Report Contents</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            {['Executive summary', 'Site description', 'Proposed development description', 'Planning and policy context', 'Methodology', 'Receptor identification', 'ForgeSolar modelling assumptions', 'Road receptor assessment', 'Residential receptor assessment', 'Aviation receptor assessment', 'Rail receptor assessment', 'Results tables', 'Mitigation recommendations', 'Conclusion and appendices'].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-forest-900 mb-4">Mitigation and Design Optimisation</h2>
          <p className="text-gray-600 leading-relaxed">Where ForgeSolar modelling identifies glare risk at sensitive receptors, we include practical mitigation recommendations. These may include adjustments to panel tilt angle or azimuth, anti-reflective coating specifications, or screening measures. We can also provide early-stage <Link to="/solar-glare-pre-simulation" className="text-gold-600 hover:underline">glare pre-simulation</Link> to test design options before final planning submission.</p>
        </div>
      </section>

      <CTABlock />
      <FAQSection faqs={faqs} />
      <InternalLinks links={relatedLinks} />
    </>
  );
}
