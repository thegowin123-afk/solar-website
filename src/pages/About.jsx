import { Helmet } from 'react-helmet-async';
import { CheckCircle, Award, Globe, TrendingDown, Clock, Users } from 'lucide-react';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const PAGE_URL = `${SITE_URL}/about`;
import PageHero from '../components/ui/PageHero';
import TestimonialCard from '../components/ui/TestimonialCard';
import CTABanner from '../components/sections/CTABanner';
import { testimonials } from '../data/testimonials';

const team = [
  {
    name: 'Rohan Desai',
    role: 'Managing Director & Principal Consultant',
    bio: 'Solar planning specialist with 12 years\' experience serving the Irish and UK renewable energy markets. Deep expertise in An Bord Pleanála requirements, EIA/EIAR processes, and Irish planning law.',
    initials: 'RD',
    qualifications: ['MSc Environmental Planning', 'PMP Certified', 'Irish Planning Law Specialist'],
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Landscape Architect & LVIA Specialist',
    bio: 'Qualified landscape architect with specialist expertise in LVIA methodology for solar, wind, and infrastructure projects. Trained to Irish EPA and UK SNH guidelines.',
    initials: 'PS',
    qualifications: ['BLA (Hons)', 'LVIA Specialist', 'GIS & ZTV Modelling'],
  },
  {
    name: 'Ankit Mehta',
    role: 'Senior Solar Design Engineer',
    bio: 'Structural and electrical engineer specialising in solar PV design for the Irish and UK markets. Expert in AutoCAD production of planning-standard drawings to Irish local authority requirements.',
    initials: 'AM',
    qualifications: ['BEng Structural', 'AutoCAD Expert', 'IS EN 1991 Certified'],
  },
  {
    name: 'Sneha Patil',
    role: 'Glint & Glare Analyst',
    bio: 'Specialist in solar reflectance modelling, aviation impact assessment, and ZTV analysis. Developed glint and glare reports accepted by planning authorities across all 31 Irish counties.',
    initials: 'SP',
    qualifications: ['MSc Environmental Engineering', 'Ray-Tracing Modelling', 'IAA Protocol Specialist'],
  },
];

const qualifications = [
  'Irish Planning Law Trained',
  'An Bord Pleanála Process Expertise',
  'ISO 9001 Quality Management',
  'IAA Aviation Assessment Protocol',
  'EPA LVIA Guidelines Compliant',
  'AutoCAD & GIS Professionals',
];

const milestones = [
  { year: '2016', event: 'SolarPlan Ireland founded in Mumbai as an Irish planning outsourcing specialist' },
  { year: '2018', event: 'First utility-scale solar farm planning package delivered to Irish developer' },
  { year: '2020', event: '50 projects completed milestone across 20+ Irish counties' },
  { year: '2021', event: 'Expanded to full EIAR coordination and multi-disciplinary packages' },
  { year: '2022', event: 'First successful An Bord Pleanála oral hearing support delivered remotely' },
  { year: '2024', event: '150+ projects across all 31 Irish counties and Northern Ireland' },
];

const whyOutsource = [
  {
    icon: TrendingDown,
    title: '30–50% Cost Saving',
    desc: 'Our Mumbai-based team delivers the same quality of Irish planning documentation at significantly lower cost than Dublin-based consultancies — without cutting corners.',
  },
  {
    icon: Clock,
    title: 'Faster Turnaround',
    desc: 'Our team works across IST and IST+4.5 overlap with Irish business hours, meaning work progresses overnight and is often ready before your Irish working day begins.',
  },
  {
    icon: Globe,
    title: 'Deep Irish Planning Expertise',
    desc: 'We work exclusively on Irish planning projects. Our team is trained specifically in Irish planning law, An Bord Pleanála procedures, and the requirements of all 31 local authorities.',
  },
  {
    icon: Users,
    title: 'Dedicated Project Teams',
    desc: 'Every project gets a named lead consultant and dedicated team. You always know who you\'re working with and can reach them directly — no call centres, no junior handoffs.',
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About SolarPlan Ireland | Solar Planning Application Specialists Since 2016</title>
        <meta name="description" content="SolarPlan Ireland — Mumbai-based solar planning application specialists. Expert glint & glare, LVIA, and PV planning drawings for Irish solar projects. 150+ projects, 94% approval rate." />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="About SolarPlan Ireland | Solar Planning Application Specialists" />
        <meta property="og:description" content="Mumbai-based solar planning specialists. Expert glint & glare, LVIA, and PV planning drawings for Irish solar projects, at outsourcing rates." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <PageHero
        title="About SolarPlan Ireland"
        subtitle="A specialist Irish solar planning outsourcing company, headquartered in Mumbai. World-class documentation, delivered at outsourcing rates — trusted by Irish developers since 2016."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-gold-100 text-gold-700">Our Story</span>
              <h2 className="section-title text-left">Mumbai Expertise, Irish Planning Results</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                SolarPlan Ireland was founded in Mumbai in 2016 with a clear purpose: to bring world-class solar planning documentation to the Irish market at outsourcing rates. Our founder had spent years working directly with Irish planning authorities and understood exactly what documentation was needed to get solar projects approved — and that this work could be done better and more affordably from India.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Our team is trained specifically in Irish planning law, An Bord Pleanála procedures, and the technical requirements of every county council in the Republic and Northern Ireland. We don't do generalist environmental consulting — every report we produce is designed and written for the Irish planning system.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Eight years and 150+ projects later, we're the outsourcing partner of choice for Irish solar developers, contractors, and planning consultants who want high-quality planning documentation without Dublin agency price tags.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '150+', label: 'Projects Completed' },
                  { value: '94%', label: 'First-Application Approval' },
                  { value: '30–50%', label: 'Client Cost Saving' },
                  { value: '31', label: 'Irish Counties Served' },
                ].map(({ value, label }) => (
                  <div key={label} className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-2xl font-heading font-bold text-gold-600">{value}</p>
                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Why outsource panel */}
              <div className="p-6 bg-forest-950 rounded-2xl text-white">
                <Globe className="w-8 h-8 text-gold-400 mb-3" />
                <h3 className="font-heading font-bold text-xl mb-2">Why Outsource to Mumbai?</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  India has one of the world's largest pools of engineering and planning talent. Our Mumbai team combines that deep technical capability with specialist training in Irish planning requirements — giving Irish clients the best of both worlds: premium quality at outsourcing rates.
                </p>
              </div>
              <div className="p-6 bg-gold-50 border border-gold-100 rounded-2xl">
                <h3 className="font-heading font-bold text-forest-900 text-xl mb-4">Our Timeline</h3>
                <div className="space-y-3">
                  {milestones.map(({ year, event }) => (
                    <div key={year} className="flex gap-4">
                      <span className="text-sm font-bold text-gold-600 w-10 flex-shrink-0">{year}</span>
                      <span className="text-sm text-gray-600">{event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why outsource section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-gold-100 text-gold-700">The Outsourcing Advantage</span>
            <h2 className="section-title">Why Irish Solar Developers Choose Us</h2>
            <p className="section-subtitle">Outsourcing your solar planning documentation to our Mumbai team means faster delivery, lower cost, and no compromise on quality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyOutsource.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-7">
                <div className="w-11 h-11 rounded-xl bg-gold-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold-700" />
                </div>
                <h3 className="font-heading font-bold text-forest-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-gold-100 text-gold-700">Our Mumbai Team</span>
            <h2 className="section-title">The SolarPlan Ireland Team</h2>
            <p className="section-subtitle">Engineers, landscape architects, and planning specialists — all trained specifically in Irish planning requirements and based in Mumbai.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card p-7 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest-700 to-forest-900 flex items-center justify-center mx-auto mb-5">
                  <span className="text-xl font-bold text-gold-300">{member.initials}</span>
                </div>
                <h3 className="font-heading font-bold text-forest-900 text-lg mb-1">{member.name}</h3>
                <p className="text-gold-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {member.qualifications.map((q) => (
                    <span key={q} className="text-xs bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full">{q}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            📍 Based in <strong>Mumbai, Maharashtra, India</strong> · Serving the Republic of Ireland &amp; Northern Ireland
          </p>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-gold-100 text-gold-700">Credentials</span>
            <h2 className="section-title">Professional Expertise &amp; Standards</h2>
            <p className="section-subtitle">Our team is trained to Irish and international planning standards — every report we produce meets the standard expected by Irish planning authorities.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {qualifications.map((q) => (
              <div key={q} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white">
                <Award className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span className="text-sm font-medium text-forest-900">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Irish Clients Say</h2>
            <p className="section-subtitle">Irish developers, farmers, and planning consultants on working with our Mumbai team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(3).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Cut Your Planning Costs Without Cutting Quality?"
        subtitle="Get a free quote from our Mumbai team. Same-quality reports as a Dublin agency — at outsourcing rates. Reply within one business day."
      />
    </>
  );
}
