import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Clock, FileText, ArrowRight, Eye, Layout, TreePine, Home } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import ContactForm from '../components/ui/ContactForm';
import ServiceCard from '../components/ui/ServiceCard';
import CTABanner from '../components/sections/CTABanner';
import { getServiceBySlug, services } from '../data/services';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const iconMap = { Eye, FileText, Layout, TreePine, Home };

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = iconMap[service.icon] || Eye;
  const related = services.filter((s) => s.id !== service.id).slice(0, 3);
  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    url: pageUrl,
    provider: {
      '@type': 'ProfessionalService',
      name: 'SolarPlan Ireland',
      url: SITE_URL,
    },
    areaServed: { '@type': 'Country', name: 'Ireland' },
    serviceType: 'Solar Planning Consultancy',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: service.shortTitle, item: pageUrl },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{service.seoTitle}</title>
        <meta name="description" content={service.seoDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={service.seoTitle} />
        <meta property="og:description" content={service.seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageHero
        title={service.title}
        subtitle={service.tagline}
        breadcrumbs={[{ label: 'Services', to: '/services' }, { label: service.shortTitle }]}
      />

      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  service.color === 'gold' ? 'bg-gold-100' : 'bg-forest-100'
                }`}>
                  <Icon className={`w-7 h-7 ${service.color === 'gold' ? 'text-gold-700' : 'text-forest-700'}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-forest-900">{service.title}</h2>
                  <p className="text-gold-600 font-medium">{service.tagline}</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-10">
                {service.longDescription.split('\n\n').map((para, i) => {
                  if (para.startsWith('- ')) {
                    const items = para.split('\n').filter(l => l.startsWith('- '));
                    return (
                      <ul key={i} className="space-y-2 my-4">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                            <span>{item.replace('- ', '')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="mb-4">{para}</p>;
                })}
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h3 className="font-heading font-bold text-forest-900 text-xl mb-5">What's Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                <div className="border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-heading font-semibold text-forest-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold-500" />
                    Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-heading font-semibold text-forest-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gold-500" />
                    Timeline
                  </h3>
                  <p className="text-3xl font-heading font-bold text-gold-600 mb-2">{service.timeframe}</p>
                  <p className="text-sm text-gray-500">From receipt of complete site information to final report delivery. Expedited delivery available — contact us to discuss.</p>
                </div>
              </div>

              {/* Related services */}
              <div>
                <h3 className="font-heading font-bold text-forest-900 text-xl mb-5">Related Services</h3>
                <div className="grid grid-cols-1 gap-3">
                  {related.map((s) => (
                    <ServiceCard key={s.id} service={s} variant="compact" />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — enquiry form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-7">
                  <h3 className="font-heading font-bold text-forest-900 text-xl mb-2">Get a Free Quote</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Tell us about your project and we'll provide a tailored proposal within one business day.
                  </p>
                  <ContactForm preselectedService={service.id} compact />
                </div>

                <div className="mt-4 p-5 bg-gold-50 border border-gold-200 rounded-2xl">
                  <p className="text-sm font-semibold text-forest-900 mb-1">Need to talk it through?</p>
                  <p className="text-xs text-gray-600 mb-3">Our consultants are happy to discuss your project by phone before you commit to anything.</p>
                  <a href="tel:+912212345678" className="btn-primary text-sm py-2.5 px-4 w-full justify-center">
                    Call +91 22 1234 5678
                  </a>
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
