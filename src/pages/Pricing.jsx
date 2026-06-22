import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, X, ArrowRight, Phone, HelpCircle } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import FAQ from '../components/sections/FAQ';
import CTABanner from '../components/sections/CTABanner';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const PAGE_URL = `${SITE_URL}/pricing`;

const packages = [
  {
    name: 'Starter',
    tagline: 'Small commercial & domestic',
    price: 'From €1,500',
    period: 'per project',
    color: 'gray',
    popular: false,
    description: 'Ideal for individual rooftop systems and small commercial installations not requiring full planning permission.',
    features: [
      { text: 'Planning exemption review', included: true },
      { text: 'Basic site layout drawings', included: true },
      { text: 'Structural loading assessment', included: true },
      { text: 'Building regulations compliance check', included: true },
      { text: 'Email support', included: true },
      { text: 'Glint & glare assessment', included: false },
      { text: 'LVIA report', included: false },
      { text: 'Planning application management', included: false },
    ],
    cta: 'Get a Quote',
    to: '/contact',
  },
  {
    name: 'Planning',
    tagline: 'Ground-mounted & commercial solar',
    price: 'From €4,500',
    period: 'per project',
    color: 'gold',
    popular: true,
    description: 'The complete planning documentation package for ground-mounted solar farms and commercial rooftop systems requiring full planning permission.',
    features: [
      { text: 'Full planning drawing package', included: true },
      { text: 'Glint & glare assessment', included: true },
      { text: 'Planning & design statement', included: true },
      { text: 'Pre-application consultation support', included: true },
      { text: 'Further information response', included: true },
      { text: 'Dedicated project consultant', included: true },
      { text: 'LVIA report', included: false },
      { text: 'EIAR coordination', included: false },
    ],
    cta: 'Get a Quote',
    to: '/contact',
  },
  {
    name: 'Full LVIA',
    tagline: 'Landscape-sensitive solar farms',
    price: 'From €9,500',
    period: 'per project',
    color: 'forest',
    popular: false,
    description: 'Everything in Planning, plus a full Landscape and Visual Impact Assessment — ideal for sites with landscape sensitivity, scenic routes, or protected areas nearby.',
    features: [
      { text: 'Full planning drawing package', included: true },
      { text: 'Glint & glare assessment', included: true },
      { text: 'LVIA report (up to 10 viewpoints)', included: true },
      { text: 'ZTV mapping & photomontages', included: true },
      { text: 'Landscape mitigation plan', included: true },
      { text: 'Planning & design statement', included: true },
      { text: 'Dedicated project consultant', included: true },
      { text: 'EIAR coordination', included: false },
    ],
    cta: 'Get a Quote',
    to: '/contact',
  },
  {
    name: 'EIAR / SID',
    tagline: 'Utility-scale & An Bord Pleanála',
    price: 'POA',
    period: 'contact us',
    color: 'dark',
    popular: false,
    description: 'Multi-disciplinary project coordination for large solar farms requiring Environmental Impact Assessment or Strategic Infrastructure Development consent.',
    features: [
      { text: 'Full EIAR chapter coordination', included: true },
      { text: 'Multi-disciplinary team management', included: true },
      { text: 'An Bord Pleanála pre-application', included: true },
      { text: 'LVIA (unlimited viewpoints)', included: true },
      { text: 'Glint & glare (full aviation protocol)', included: true },
      { text: 'Natura Impact Statement', included: true },
      { text: 'Oral hearing technical support', included: true },
      { text: 'All specialist sub-consultants included', included: true },
    ],
    cta: 'Talk to Us',
    to: '/contact',
  },
];

const addOns = [
  { name: 'Additional LVIA viewpoints', price: '€350 each' },
  { name: 'Photomontage (single viewpoint)', price: 'From €600' },
  { name: 'Aviation glint assessment (IAA protocol)', price: 'From €1,800' },
  { name: 'County council pre-application meeting support', price: 'From €850' },
  { name: 'Further information response (per FI)', price: 'From €500' },
  { name: 'Expert witness statement', price: 'From €1,500' },
  { name: 'Expedited delivery (7–10 working days)', price: '+30% surcharge' },
  { name: 'PDF planning checklist download', price: 'Free' },
];

const pricingFaqs = [
  {
    question: 'Are your prices fixed or can they change during a project?',
    answer: 'We quote fixed fees at the outset — you know exactly what you\'ll pay before work begins. The only exception is if the project scope changes materially after instruction (e.g. additional viewpoints requested by the planning authority), which we\'d discuss and agree with you before proceeding.',
  },
  {
    question: 'Do you charge VAT on top of quoted prices?',
    answer: 'Yes, all prices are exclusive of VAT at the standard Irish rate (currently 23%). VAT-registered businesses can reclaim this in the normal way.',
  },
  {
    question: 'What are your payment terms?',
    answer: 'For most projects: 50% deposit on instruction, 50% on delivery of the final report. For larger EIAR projects, we agree a milestone-based payment schedule at the outset.',
  },
  {
    question: 'Can I get a report for just one element — e.g. glint and glare only?',
    answer: 'Absolutely. All of our services can be commissioned individually. Many clients come to us for a specific report to complement their wider planning application prepared by another consultant.',
  },
  {
    question: 'Do you offer discounts for multiple projects?',
    answer: 'Yes — clients with ongoing or portfolio work receive preferential rates. If you\'re a developer, contractor, or planning consultant with a regular pipeline of projects, contact us to discuss a framework agreement.',
  },
];

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Solar Planning Application Costs Ireland | Pricing | SolarPlan Ireland</title>
        <meta
          name="description"
          content="Transparent pricing for solar planning application documentation in Ireland. Fixed-fee glint & glare, LVIA, planning drawings — from €1,500. Free quote today."
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Solar Planning Application Costs Ireland | SolarPlan Ireland Pricing" />
        <meta property="og:description" content="Transparent pricing for solar planning documentation in Ireland. Fixed-fee glint & glare, LVIA, planning drawings — from €1,500." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <PageHero
        title="Transparent, Fixed-Fee Pricing"
        subtitle="No surprise invoices. Every project starts with a fixed-fee proposal so you know exactly what you're committing to before we begin."
        breadcrumbs={[{ label: 'Pricing' }]}
      />

      {/* Packages */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-gold-100 text-gold-700">Pricing Packages</span>
            <h2 className="section-title">Choose the Right Package</h2>
            <p className="section-subtitle">
              Most projects fit one of our standard packages. Not sure which applies? Contact us and we'll advise — no charge for the initial assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl border-2 flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-xl ${
                  pkg.popular
                    ? 'border-gold-500 shadow-lg shadow-gold-100'
                    : pkg.color === 'dark'
                    ? 'border-forest-800 bg-forest-950'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gold-500 text-white text-xs font-bold text-center py-1.5 tracking-wider">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-7 flex flex-col flex-grow">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className={`font-heading font-bold text-2xl mb-0.5 ${pkg.color === 'dark' ? 'text-white' : 'text-forest-900'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-sm mb-4 ${pkg.color === 'dark' ? 'text-gold-400' : 'text-gold-600'}`}>{pkg.tagline}</p>
                    <div className={`text-3xl font-heading font-bold ${pkg.color === 'dark' ? 'text-white' : 'text-forest-900'}`}>
                      {pkg.price}
                    </div>
                    <p className={`text-xs mt-0.5 ${pkg.color === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{pkg.period} · excl. VAT</p>
                  </div>

                  <p className={`text-sm leading-relaxed mb-6 ${pkg.color === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-grow mb-7">
                    {pkg.features.map(({ text, included }) => (
                      <li key={text} className="flex items-start gap-2.5">
                        {included ? (
                          <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${included
                          ? pkg.color === 'dark' ? 'text-gray-200' : 'text-gray-700'
                          : 'text-gray-400 line-through'}`}>
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={pkg.to}
                    className={`w-full justify-center ${pkg.popular ? 'btn-primary' : pkg.color === 'dark' ? 'btn-outline-white' : 'btn-secondary'}`}
                  >
                    {pkg.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            All prices are indicative. Final fee depends on project scale and complexity.{' '}
            <Link to="/contact" className="text-gold-600 hover:underline">Get a free fixed-fee quote →</Link>
          </p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-gold-100 text-gold-700">Add-On Services</span>
            <h2 className="section-title">Optional Extras</h2>
            <p className="section-subtitle">Bolt these on to any package or commission them standalone.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addOns.map(({ name, price }) => (
              <div key={name} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-gold-200 transition-colors">
                <span className="text-sm text-gray-700 font-medium">{name}</span>
                <span className="text-sm font-bold text-gold-600 flex-shrink-0 ml-4">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold-50 border-y border-gold-100">
        <div className="container-custom text-center max-w-2xl">
          <h2 className="section-title">Not Sure Which Package You Need?</h2>
          <p className="text-gray-600 mb-8">
            Tell us about your project and we'll confirm which reports are required and provide a tailored fixed-fee proposal — at no charge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary py-4 px-8">
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+912212345678" className="btn-secondary py-4 px-8">
              <Phone className="w-5 h-5" /> Call Mumbai Office
            </a>
          </div>
        </div>
      </section>

      <FAQ
        items={pricingFaqs}
        title="Pricing Questions Answered"
        subtitle="Straightforward answers to the most common questions about our fees and payment terms."
      />

      <CTABanner />
    </>
  );
}
