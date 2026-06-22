import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Zap, CheckCircle, ArrowLeft } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import ContactForm from '../components/ui/ContactForm';
import CTABanner from '../components/sections/CTABanner';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return <Navigate to="/case-studies" replace />;

  return (
    <>
      <Helmet>
        <title>{cs.title} | SolarPlan Ireland Case Study</title>
        <meta name="description" content={`Solar planning case study: ${cs.title}. ${cs.capacity} in Co. ${cs.county}.`} />
      </Helmet>

      <PageHero
        title={cs.title}
        subtitle={`${cs.capacity} · Co. ${cs.county} · ${cs.year}`}
        breadcrumbs={[{ label: 'Case Studies', to: '/case-studies' }, { label: cs.county }]}
      />

      <section className="py-20">
        <div className="container-custom">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gold-600 mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {cs.tags.map((tag) => (
                  <span key={tag} className="badge bg-gold-50 text-gold-700">{tag}</span>
                ))}
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(cs.stats).map(([key, val]) => (
                  <div key={key} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-heading font-bold text-forest-900">{val}</p>
                    <p className="text-xs text-gray-500 capitalize mt-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  </div>
                ))}
              </div>

              {/* Challenge */}
              <div>
                <h2 className="text-xl font-heading font-bold text-forest-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-xs">1</span>
                  The Challenge
                </h2>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-2xl">{cs.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-xl font-heading font-bold text-forest-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 font-bold text-xs">2</span>
                  Our Solution
                </h2>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-2xl">{cs.solution}</p>
              </div>

              {/* Outcome */}
              <div>
                <h2 className="text-xl font-heading font-bold text-forest-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-xs">3</span>
                  The Outcome
                </h2>
                <div className="bg-forest-950 text-white p-6 rounded-2xl">
                  <p className="leading-relaxed text-gray-200">{cs.outcome}</p>
                </div>
              </div>

              {/* Services used */}
              <div>
                <h3 className="font-heading font-semibold text-forest-900 mb-3">Services Provided</h3>
                <div className="flex flex-wrap gap-2">
                  {cs.services.map((s) => (
                    <span key={s} className="flex items-center gap-1.5 bg-forest-50 text-forest-800 px-3 py-1.5 rounded-lg text-sm font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-forest-500" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-5">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-7">
                  <h3 className="font-heading font-bold text-forest-900 text-lg mb-2">Similar Project?</h3>
                  <p className="text-sm text-gray-500 mb-5">Tell us about your project and we'll outline what documentation you need.</p>
                  <ContactForm compact />
                </div>
                <div className="p-5 bg-gold-50 border border-gold-200 rounded-2xl text-sm">
                  <p className="font-semibold text-forest-900 mb-1">Project Location</p>
                  <p className="text-gray-600 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gold-500" /> Co. {cs.county}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
