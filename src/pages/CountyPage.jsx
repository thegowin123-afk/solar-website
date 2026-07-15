import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';
import PageHero from '../components/ui/PageHero';
import ContactForm from '../components/ui/ContactForm';
import ServiceCard from '../components/ui/ServiceCard';
import CTABanner from '../components/sections/CTABanner';
import { countyPages } from '../data/counties';
import { services } from '../data/services';

export default function CountyPage() {
  const { county } = useParams();
  const page = countyPages.find(
    (p) => p.county.toLowerCase() === county?.toLowerCase()
  );
  if (!page) return <Navigate to="/" replace />;

  const pageUrl = `${SITE_URL}/solar-planning/${page.county.toLowerCase()}`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SolarPlan Ireland',
    description: `Solar planning application specialists for County ${page.county}, Ireland. Glint & glare analysis, Landscape Plans, and PV planning drawings.`,
    url: pageUrl,
    areaServed: [
      { '@type': 'AdministrativeArea', name: `County ${page.county}`, containedInPlace: { '@type': 'Country', name: 'Ireland' } },
    ],
    serviceType: 'Solar Planning Application Consultancy',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `Solar Planning ${page.county}`, item: pageUrl },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Solar Planning Application {page.county} | Solar Planning Permission Co. {page.county} | SolarPlan Ireland</title>
        <meta name="description" content={`Expert solar planning application consultancy in Co. ${page.county}. Glint & glare analysis, Landscape Plans, and PV planning drawings for ${page.county} solar projects. Accepted by ${page.county} County Council and An Bord Pleanála.`} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`Solar Planning Application ${page.county} | SolarPlan Ireland`} />
        <meta property="og:description" content={`Expert solar planning application consultancy in Co. ${page.county}. Glint & glare, Landscape Plans, PV drawings.`} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageHero
        title={`Solar Planning in Co. ${page.county}`}
        subtitle={`Specialist solar planning documentation for developers, farmers, and contractors in County ${page.county} — accepted by ${page.county} County Council and An Bord Pleanála.`}
        breadcrumbs={[{ label: `Solar Planning ${page.county}` }]}
      />

      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Local context */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-forest-900 mb-4">
                  Solar Planning in County {page.county}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">{page.snippet}</p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  SolarPlan Ireland has prepared planning documentation for solar projects across County {page.county}, working with local developers, planning consultants, and energy companies to navigate {page.county} County Council's planning requirements — and, where needed, An Bord Pleanála proceedings.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  For {page.county} solar projects we most often prepare a{' '}
                  <Link to="/glint-and-glare-assessment-ireland" className="text-gold-600 hover:underline font-medium">glint and glare assessment</Link>,{' '}
                  <Link to="/solar-pv-planning-drawings-ireland" className="text-gold-600 hover:underline font-medium">solar PV planning drawings</Link>{' '}
                  and, where landscape sensitivity requires it, a{' '}
                  <Link to="/landscape-plan-solar-pv-ireland" className="text-gold-600 hover:underline font-medium">landscape plan</Link>.
                </p>
              </div>

              {/* Planning authority */}
              {page.planningAuthority && (
                <div className="bg-forest-50 rounded-2xl p-6 border border-forest-100">
                  <h3 className="font-heading font-semibold text-forest-900 mb-2">Planning Authority</h3>
                  <p className="text-sm text-gray-700">{page.planningAuthority}</p>
                  {page.planningNotes && (
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{page.planningNotes}</p>
                  )}
                </div>
              )}

              {/* Common project types */}
              {page.commonProjects && (
                <div>
                  <h2 className="text-xl font-heading font-bold text-forest-900 mb-4">
                    Common Project Types in Co. {page.county}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {page.commonProjects.map((p) => (
                      <span key={p} className="text-sm bg-gold-50 text-gold-700 border border-gold-200 px-3 py-1.5 rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Services for this county */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-forest-900 mb-6">
                  Our Services in Co. {page.county}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {services.map((s) => (
                    <ServiceCard key={s.id} service={s} variant="compact" />
                  ))}
                </div>
              </div>

              {/* Key considerations */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-xl font-heading font-bold text-forest-900 mb-4">
                  Key Planning Considerations in Co. {page.county}
                </h2>
                <ul className="space-y-3">
                  {(page.keyConsiderations || [
                    `${page.county} County Council has specific solar energy policies in its current Development Plan — we know exactly what each planning officer looks for.`,
                    'Landscape sensitivities vary significantly within the county — we know which areas require a more detailed Landscape Plan.',
                    'We have built relationships with planning authorities across Ireland through years of consistent, high-quality submissions.',
                    `Pre-application consultation with ${page.county} planners is something we can manage on your behalf, saving you time and improving outcomes.`,
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other counties */}
              <div>
                <h3 className="font-heading font-semibold text-forest-900 mb-4">Other Counties We Serve</h3>
                <div className="flex flex-wrap gap-2">
                  {countyPages
                    .filter((p) => p.county !== page.county)
                    .map((p) => (
                      <Link
                        key={p.county}
                        to={`/solar-planning/${p.county.toLowerCase()}`}
                        className="text-sm text-gray-600 hover:text-gold-600 bg-gray-100 hover:bg-gold-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {p.county}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* Sidebar form */}
            <div>
              <div className="sticky top-28">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-7">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-gold-500" />
                    <h3 className="font-heading font-bold text-forest-900 text-xl">
                      Co. {page.county} Enquiry
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Tell us about your {page.county} solar project for a free, tailored proposal.
                  </p>
                  <ContactForm compact defaultCounty={page.county} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title={`Ready to Start Your Co. ${page.county} Solar Project?`}
        subtitle={`Our consultants know the ${page.county} planning system. Get a free consultation today.`}
      />
    </>
  );
}
