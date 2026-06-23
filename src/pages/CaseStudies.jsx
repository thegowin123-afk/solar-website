import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Zap, ArrowRight, Tag } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import CTABanner from '../components/sections/CTABanner';
import { caseStudies } from '../data/caseStudies';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const PAGE_URL = `${SITE_URL}/case-studies`;

function CaseStudyCard({ cs }) {
  return (
    <div className="card flex flex-col h-full overflow-hidden group">
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-forest-800 to-forest-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-6 gap-1 opacity-30 p-4 w-full h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="bg-gold-400 rounded-sm" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <span className="text-white font-bold text-xl">{cs.capacity}</span>
          <span className="flex items-center gap-1 text-gold-300 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            {cs.county}
          </span>
        </div>
      </div>

      <div className="p-7 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {cs.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge bg-gold-50 text-gold-700 text-xs">{tag}</span>
          ))}
        </div>
        <h3 className="font-heading font-bold text-forest-900 text-xl mb-3 group-hover:text-gold-700 transition-colors leading-snug">
          {cs.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-5 line-clamp-3">{cs.challenge}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50 rounded-xl mb-5 text-center">
          {Object.entries(cs.stats).slice(0, 3).map(([key, val]) => (
            <div key={key}>
              <p className="font-bold text-forest-900 text-sm">{val}</p>
              <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {cs.services.map((s) => (
            <span key={s} className="badge bg-forest-50 text-forest-700 text-xs">{s}</span>
          ))}
        </div>

        <Link to={`/case-studies/${cs.slug}`} className="flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-700 group/link mt-auto">
          Read Full Case Study
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <>
      <Helmet>
        <title>Solar Planning Application Case Studies Ireland | SolarPlan Ireland</title>
        <meta name="description" content="Real solar planning application success stories from SolarPlan Ireland. Ground-mounted solar farms, rooftop installations, and Landscape Plan cases across Ireland." />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Solar Planning Case Studies Ireland | SolarPlan Ireland" />
        <meta property="og:description" content="Real solar planning application success stories. Ground-mounted solar farms, rooftop installations, and Landscape Plan cases across Ireland." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <PageHero
        title="Case Studies"
        subtitle="Real projects, real outcomes. Here's how we've helped developers, farmers, and energy companies get their solar projects approved across Ireland."
        breadcrumbs={[{ label: 'Case Studies' }]}
      />

      {/* Stats strip */}
      <section className="py-12 bg-gold-500">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '150+', label: 'Projects Completed' },
              { value: '400MW+', label: 'Capacity Approved' },
              { value: '15+', label: 'Counties Served' },
              { value: '94%', label: 'First-Application Success' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-heading font-bold mb-1">{value}</p>
                <p className="text-gold-100 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} cs={cs} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Your Project Could Be Our Next Case Study"
        subtitle="Join the 150+ projects we've helped through Irish planning. Get a free consultation and let's start planning your approval."
      />
    </>
  );
}
