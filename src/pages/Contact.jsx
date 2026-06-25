import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar } from 'lucide-react';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const PAGE_URL = `${SITE_URL}/contact`;
import PageHero from '../components/ui/PageHero';
import ContactForm from '../components/ui/ContactForm';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone & WhatsApp',
    detail: '+91 90822 76147',
    sub: 'Call or WhatsApp — Mon–Fri, 9:00am–6:00pm IST',
    href: 'tel:+919082276147',
    whatsapp: 'https://wa.me/919082276147',
    color: 'gold',
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'info@solarplanningireland.com',
    sub: 'Reply within one business day',
    href: 'mailto:info@solarplanningireland.com',
    color: 'forest',
  },
  {
    icon: MapPin,
    title: 'Based In',
    detail: 'Mumbai, India',
    sub: 'Serving Ireland & Northern Ireland',
    href: null,
    color: 'gold',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    detail: 'Mon–Fri: 9:00–18:00 IST',
    sub: '13:30–22:30 Irish time (IST = GMT+5:30)',
    href: null,
    color: 'forest',
  },
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact SolarPlan Ireland | Solar PV Planning Support</title>
        <meta name="description" content="Contact SolarPlan Ireland for solar PV planning drawings, glint and glare reports, pre-simulation and landscape plan support across Ireland." />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Contact SolarPlan Ireland | Free Solar Planning Quote" />
        <meta property="og:description" content="Get a free solar planning application quote within one business day. Glint & glare, Landscape Plans, PV drawings for Irish solar projects." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact SolarPlan Ireland | Free Solar Planning Quote" />
        <meta name="twitter:description" content="Get a free solar planning application quote within one business day. Glint & glare, Landscape Plans, PV drawings for Irish solar projects." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <PageHero
        title="Let's Work Together"
        subtitle="Tell us about your pipeline and we'll come back with a fixed-fee proposal within one business day — no obligation, no jargon."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-20">
        <div className="container-custom">
          {/* Contact method cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactMethods.map(({ icon: Icon, title, detail, sub, href, whatsapp, color }) => {
              return href || whatsapp ? (
                <div key={title} className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md hover:border-gold-300 transition-all duration-200 text-center h-full">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${color === 'gold' ? 'bg-gold-100' : 'bg-forest-100'}`}>
                    <Icon className={`w-5 h-5 ${color === 'gold' ? 'text-gold-600' : 'text-forest-600'}`} />
                  </div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{title}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-forest-900 text-sm mb-0.5 hover:text-gold-600 block">{detail}</a>
                  ) : (
                    <p className="font-semibold text-forest-900 text-sm mb-0.5">{detail}</p>
                  )}
                  <p className="text-xs text-gray-500">{sub}</p>
                  {whatsapp && (
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs font-semibold text-green-600 hover:text-green-700">
                      💬 WhatsApp
                    </a>
                  )}
                </div>
              ) : (
                <div key={title} className="p-6 rounded-2xl border border-gray-100 bg-white text-center h-full">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${color === 'gold' ? 'bg-gold-100' : 'bg-forest-100'}`}>
                    <Icon className={`w-5 h-5 ${color === 'gold' ? 'text-gold-600' : 'text-forest-600'}`} />
                  </div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{title}</p>
                  <p className="font-semibold text-forest-900 text-sm mb-0.5">{detail}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              );
            })}
          </div>

          {/* Main grid: form + sidebar */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-forest-900 text-xl">Send an Enquiry</h2>
                    <p className="text-sm text-gray-500">We'll respond within one business day</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Google Calendar CTA */}
              <div className="bg-forest-950 rounded-2xl p-7 text-white">
                <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Book a Consultation Call</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  Prefer to talk? Book a free 30-minute consultation call directly in our Google Calendar — no back-and-forth emails.
                </p>
                <a
                  href="https://calendar.app.google/BCEiSqyDwbG3ycWG9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Book via Google Calendar
                </a>
              </div>

              {/* What to expect */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-heading font-semibold text-forest-900 mb-4">What Happens Next?</h3>
                <ol className="space-y-4">
                  {[
                    { step: '1', text: 'We review your enquiry and assess the scope of work needed.' },
                    { step: '2', text: 'We respond within one business day with a tailored proposal and fixed fee.' },
                    { step: '3', text: 'You accept the proposal, we assign a consultant, and we kick off within 48 hours.' },
                  ].map(({ step, text }) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-gold-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step}
                      </span>
                      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Trust signals */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Why clients choose us</p>
                {[
                  'Council-ready solar planning documentation',
                  'India-based team (Mumbai) — 30–50% cheaper than Dublin agencies',
                  'Dedicated named consultant on every project',
                  'Fixed fees — no surprise invoices',
                  'Irish planning expertise across all 31 counties',
                  'Work progresses overnight — faster delivery',
                ].map((item) => (
                  <p key={item} className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                    {item}
                  </p>
                ))}
              </div>

              {/* Timezone note */}
              <div className="bg-gold-50 border border-gold-100 rounded-2xl p-5 text-sm text-gray-600">
                <p className="font-semibold text-forest-900 mb-1">🕐 Timezone Note</p>
                <p>Our India office (Mumbai) operates <strong>9:00am–6:00pm IST</strong>, which is <strong>3:30am–12:30pm Irish time</strong>. Email enquiries sent outside these hours will be answered at the start of the next IST business day — usually before your Irish afternoon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
