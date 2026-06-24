import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, Eye, Layout, TreePine, ArrowRight, CheckCircle } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import CTABanner from '../components/sections/CTABanner';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const PAGE_URL = `${SITE_URL}/portfolio`;

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Portfolio — Sample Solar Planning Deliverables | SolarPlan Ireland',
  description: 'Examples of the planning drawings, glint and glare reports, and landscape plans we produce for solar PV projects across Ireland.',
  url: PAGE_URL,
  provider: {
    '@type': 'Organization',
    name: 'SolarPlan Ireland',
    url: SITE_URL,
  },
};

const deliverableTypes = [
  {
    icon: FileText,
    title: 'Solar Farm Site Layout Plans',
    description:
      'Our site layout plans show the complete array layout, panel row spacing, perimeter fence alignment, access tracks, substation positions, and proposed landscape planting. Produced in AutoCAD at scales from 1:500 to 1:2,500 and delivered as both PDF and DWG.',
    details: [
      'AutoCAD DWG + PDF',
      'Scales: 1:500 to 1:2,500',
      'Panel array layout with dimensions',
      'Fence, access, and infrastructure',
      'Landscape planting shown',
      'Title block to client standard',
    ],
    color: 'forest',
    service: { label: 'PV Planning Drawings', to: '/services/pv-planning-drawings' },
  },
  {
    icon: Eye,
    title: 'Glint & Glare Assessment Reports',
    description:
      'Our ForgeSolar-based glint and glare reports identify all sensitive receptors within the study area, run site-specific reflectance modelling, and present results as green/yellow glare classifications with clear conclusions and mitigation recommendations where needed.',
    details: [
      'ForgeSolar methodology',
      'Green/yellow glare classification',
      'All receptor types covered',
      'Mitigation recommendations included',
      'Aviation assessment where required',
      'Planning-ready PDF report',
    ],
    color: 'gold',
    service: { label: 'Glint & Glare Analysis', to: '/services/glint-glare-analysis' },
  },
  {
    icon: TreePine,
    title: 'Landscape Plans & Planting Schedules',
    description:
      'Our Landscape Plans translate LVIA recommendations into clear AutoCAD drawings showing native planting schemes, hedgerow reinforcement, habitat creation zones, and phased establishment programmes. Accompanied by a full planting schedule with species, sizes, and spacing.',
    details: [
      'AutoCAD DWG + PDF',
      'Native Irish species',
      'Planting schedule included',
      'Phased establishment plan',
      'Consistent with LVIA findings',
      'Planning condition-ready',
    ],
    color: 'forest',
    service: { label: 'Landscape Plans', to: '/services/landscape-plans' },
  },
  {
    icon: Layout,
    title: 'Panel Elevations & Cross-Sections',
    description:
      'Elevation drawings show panel dimensions, tilt angles, ground clearance, and mounting structure design to planning authority standard. Cross-sections through the site demonstrate how panels relate to topography and surrounding land — essential for LVIA photomontage reference.',
    details: [
      'Front, side, and rear elevations',
      'Tilt angle and ground clearance shown',
      'Mounting structure detail',
      'Topographic cross-sections',
      'Scales: 1:20 to 1:500',
      'AutoCAD DWG + PDF',
    ],
    color: 'gold',
    service: { label: 'PV Planning Drawings', to: '/services/pv-planning-drawings' },
  },
];

const projectTypes = [
  {
    title: 'Commercial Rooftop Solar',
    description:
      'Warehouse and distribution centre rooftop installations from 100kW to 5MW. We produce structural assessment reports, planning drawings, and planning exemption reviews for commercial rooftop clients across Ireland.',
    capacity: '100kW – 5MW',
    turnaround: '2–3 weeks',
    typicalDocs: ['Structural assessment report', 'Roof layout drawings', 'Planning exemption review', 'Elevation drawings'],
  },
  {
    title: 'Ground-Mounted Solar Farm',
    description:
      'Utility-scale ground-mounted solar farms from 1MW to 100MW+. Our most common project type. We prepare the full planning drawing set, glint and glare assessment, and Landscape Plan for farm-scale solar developments across all 31 Irish counties.',
    capacity: '1MW – 100MW+',
    turnaround: '4–10 weeks',
    typicalDocs: ['Site layout plans (AutoCAD)', 'Glint & glare assessment', 'Landscape Plan + planting schedule', 'Panel elevations and sections'],
  },
  {
    title: 'Quarry & Brownfield Solar',
    description:
      'Disused quarries and brownfield sites present excellent solar development opportunities — often with fewer visual impact concerns than greenfield sites. We have experience with the specific planning considerations for quarry solar including existing infrastructure reuse and landform screening.',
    capacity: '5MW – 50MW+',
    turnaround: '4–8 weeks',
    typicalDocs: ['Site layout plans', 'Photomontages from agreed viewpoints', 'Landscape Plan', 'Glint & glare assessment'],
  },
  {
    title: 'Business Park & Retail Solar',
    description:
      'Multi-building business park and retail solar programmes, typically involving a combination of rooftop and car park canopy systems. We provide consistent drawing packages across entire portfolios for energy contractors and facilities managers.',
    capacity: '500kW – 10MW (portfolio)',
    turnaround: '2–4 weeks per building',
    typicalDocs: ['Roof layout drawings', 'Structural assessment reports', 'Planning exemption reviews', 'Single-line diagrams'],
  },
  {
    title: 'Agri-voltaic Solar Farm',
    description:
      'Dual land-use solar installations that allow continued grazing or arable use beneath elevated panel arrays. We design elevated mounting structures for Irish wind loading, prepare all planning drawings, and assist with the farm management plan documentation required for planning.',
    capacity: '1MW – 50MW',
    turnaround: '6–10 weeks',
    typicalDocs: ['Site layout with grazing zones', 'Elevated panel elevation drawings', 'Landscape Plan', 'Glint & glare assessment'],
  },
  {
    title: 'An Bord Pleanála SID Applications',
    description:
      'Strategic Infrastructure Development applications directly to An Bord Pleanála for large solar farms. We prepare the higher-standard technical documentation package required for SID applications, coordinating with your planning consultant and specialist advisors.',
    capacity: '50MW+',
    turnaround: '8–16 weeks',
    typicalDocs: ['Full AutoCAD drawing package', 'ForgeSolar glare assessment', 'Landscape Plan to ABP standard', 'BESS and grid connection drawings'],
  },
];

const confidentialityNote = {
  title: 'A Note on Confidentiality',
  body: 'We do not publish client project details, application drawings, or report extracts without explicit client permission. The descriptions and sample deliverable types shown here reflect the scope and nature of work we produce — not specific client projects. If you would like to discuss our methodology in more detail, or speak to a reference client, please contact us.',
};

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio — Sample Solar Planning Deliverables | SolarPlan Ireland</title>
        <meta
          name="description"
          content="See the types of solar planning deliverables we produce — site layout plans, glint and glare assessments, landscape plans, and more — for solar PV projects across Ireland."
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Portfolio — Sample Solar Planning Deliverables | SolarPlan Ireland" />
        <meta property="og:description" content="Types of solar planning deliverables we produce for projects across Ireland." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio — Sample Solar Planning Deliverables | SolarPlan Ireland" />
        <meta name="twitter:description" content="Types of solar planning deliverables we produce for projects across Ireland." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <PageHero
        title="Our Deliverables"
        subtitle="The types of planning documents, drawings, and reports we produce for solar PV projects across Ireland"
        breadcrumbs={[{ label: 'Portfolio' }]}
      />

      {/* Sample Deliverables Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">What We Produce</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-forest-900 mb-4">Sample Deliverables</h2>
            <p className="text-gray-600 leading-relaxed">
              Every project we deliver includes planning-ready documents produced to the specific requirements of the receiving authority. Here is what each deliverable type includes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {deliverableTypes.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.color === 'gold' ? 'bg-gold-100' : 'bg-forest-100'}`}>
                    <Icon className={`w-6 h-6 ${item.color === 'gold' ? 'text-gold-700' : 'text-forest-700'}`} />
                  </div>
                  <h3 className="font-heading font-bold text-forest-900 text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{item.description}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {item.details.map((d) => (
                      <li key={d} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-gold-500 mt-0.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={item.service.to}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-gold-700"
                  >
                    {item.service.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Confidentiality note */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="font-heading font-semibold text-forest-900 mb-2">{confidentialityNote.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{confidentialityNote.body}</p>
          </div>
        </div>
      </section>

      {/* Types of Projects */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Project Types</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-forest-900 mb-4">Types of Projects We Support</h2>
            <p className="text-gray-600 leading-relaxed">
              We work on solar projects at every scale — from single commercial rooftops to 100MW+ utility-scale solar farms and An Bord Pleanála SID applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTypes.map((pt) => (
              <div key={pt.title} className="bg-gray-50 rounded-2xl p-7 flex flex-col">
                <h3 className="font-heading font-bold text-forest-900 text-lg mb-2">{pt.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{pt.description}</p>
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Typical capacity</span>
                    <span className="font-semibold text-forest-900">{pt.capacity}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Typical turnaround</span>
                    <span className="font-semibold text-forest-900">{pt.turnaround}</span>
                  </div>
                  <div className="pt-1">
                    <p className="text-xs text-gray-500 mb-2">Typical documents:</p>
                    <ul className="space-y-1">
                      {pt.typicalDocs.map((doc) => (
                        <li key={doc} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <span className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / how we work */}
      <section className="py-20 bg-forest-950 text-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">How We Work</p>
            <h2 className="text-3xl font-heading font-bold mb-4">From Brief to Submission-Ready in Days</h2>
            <p className="text-gray-300 leading-relaxed">
              Our India-based team works to Irish planning standards on a fast, reliable basis. Here is how a typical project flows from first contact to delivered documents.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Send Us a Brief', desc: 'Project location, scale, and which reports you need. We respond within one business day.' },
              { step: '02', title: 'Fixed-Fee Proposal', desc: 'A clear scope and fixed fee, no hidden extras. Most partners are onboarded within 48 hours.' },
              { step: '03', title: 'We Deliver', desc: 'Standard turnaround 2–4 weeks. Expedited delivery available for urgent programmes.' },
              { step: '04', title: 'Revision & Support', desc: 'Revisions included. We support any planning authority queries on our reports.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gold-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{step}</div>
                <h3 className="font-heading font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary py-3 px-8">Get a Free Quote</Link>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-xl font-heading font-bold text-forest-900 mb-6">Our Services</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Glint & Glare Analysis', to: '/services/glint-glare-analysis' },
              { label: 'PV Planning Drawings', to: '/services/pv-planning-drawings' },
              { label: 'Ground-Mounted Solar Design', to: '/services/ground-mounted-solar-design' },
              { label: 'Landscape Plans', to: '/services/landscape-plans' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between gap-2 p-4 border border-gray-200 rounded-xl hover:border-gold-300 hover:bg-gold-50 transition-colors text-sm font-medium text-forest-900"
              >
                {label}
                <ArrowRight className="w-4 h-4 text-gold-500 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
