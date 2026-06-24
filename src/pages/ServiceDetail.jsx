import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Clock, FileText, ArrowRight, Eye, Layout, TreePine, Home, Users, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import PageHero from '../components/ui/PageHero';
import ContactForm from '../components/ui/ContactForm';
import ServiceCard from '../components/ui/ServiceCard';
import CTABanner from '../components/sections/CTABanner';
import { getServiceBySlug, services } from '../data/services';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const iconMap = { Eye, FileText, Layout, TreePine, Home };

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 ${open ? 'shadow-md border-gold-200' : 'hover:border-gray-300'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-4 p-6"
      >
        <span className="font-semibold text-forest-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <p className="text-gray-600 leading-relaxed px-6 pb-6">{answer}</p>
      </div>
    </div>
  );
}

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

  const faqSchema = service.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{service.seoTitle}</title>
        <meta name="description" content={service.seoDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={service.seoTitle} />
        <meta property="og:description" content={service.seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service.seoTitle} />
        <meta name="twitter:description" content={service.seoDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
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
            <div className="lg:col-span-2 space-y-12">

              {/* Overview */}
              <div>
                <div className="flex items-center gap-4 mb-6">
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
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
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
              </div>

              {/* What's Included */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="font-heading font-bold text-forest-900 text-xl mb-5">What We Provide</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable For */}
              {service.suitableFor && (
                <div>
                  <h3 className="font-heading font-bold text-forest-900 text-xl mb-5">
                    <Users className="inline w-5 h-5 text-gold-500 mr-2 -mt-1" />
                    Suitable For
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.suitableFor.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 bg-white border border-gray-100 rounded-xl p-4">
                        <ArrowRight className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables + Timeline */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-heading font-semibold text-forest-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold-500" />
                    Typical Deliverables
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
                  <p className="text-sm text-gray-500">From receipt of complete site information to final delivery. Expedited delivery available — contact us to discuss your programme.</p>
                </div>
              </div>

              {/* Why It Matters */}
              {service.whyItMatters && (
                <div className={`rounded-2xl p-8 ${service.color === 'gold' ? 'bg-gold-50 border border-gold-200' : 'bg-forest-50 border border-forest-200'}`}>
                  <h3 className="font-heading font-bold text-forest-900 text-xl mb-3">Why It Matters</h3>
                  <p className="text-gray-700 leading-relaxed">{service.whyItMatters}</p>
                </div>
              )}

              {/* Process Steps */}
              {service.processSteps && (
                <div>
                  <h3 className="font-heading font-bold text-forest-900 text-xl mb-6">How It Works</h3>
                  <div className="space-y-4">
                    {service.processSteps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gold-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-forest-900 mb-1">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA mid-page */}
              <div className="bg-forest-900 text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-heading font-bold text-xl mb-1">Ready to get started?</h3>
                  <p className="text-gray-300 text-sm">Send us your project details for a fixed-fee proposal within one business day.</p>
                </div>
                <Link to="/contact" className="btn-primary flex-shrink-0">
                  Get a Free Quote
                </Link>
              </div>

              {/* FAQ */}
              {service.faqs && service.faqs.length > 0 && (
                <div>
                  <h3 className="font-heading font-bold text-forest-900 text-xl mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    {service.faqs.map((faq, i) => (
                      <FAQItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              )}

              {/* Internal links / Related services */}
              <div>
                <h3 className="font-heading font-bold text-forest-900 text-xl mb-5">Related Services</h3>
                <div className="grid grid-cols-1 gap-3">
                  {related.map((s) => (
                    <ServiceCard key={s.id} service={s} variant="compact" />
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-7">
                  <h3 className="font-heading font-bold text-forest-900 text-xl mb-2">Get a Free Quote</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Tell us about your project and we'll provide a tailored proposal within one business day.
                  </p>
                  <ContactForm preselectedService={service.id} compact />
                </div>

                <div className="p-5 bg-gold-50 border border-gold-200 rounded-2xl">
                  <p className="text-sm font-semibold text-forest-900 mb-1">Need to talk it through?</p>
                  <p className="text-xs text-gray-600 mb-3">Our consultants are happy to discuss your project before you commit to anything.</p>
                  <a href="tel:+919082276147" className="btn-primary text-sm py-2.5 px-4 w-full justify-center">
                    Call +91 90822 76147
                  </a>
                </div>

                <div className="p-5 bg-white border border-gray-200 rounded-2xl">
                  <p className="text-sm font-semibold text-forest-900 mb-3">See sample work</p>
                  <Link to="/portfolio" className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700 font-medium">
                    View our portfolio
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
