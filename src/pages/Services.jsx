import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import ServiceCard from '../components/ui/ServiceCard';
import CTABanner from '../components/sections/CTABanner';
import { services } from '../data/services';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const PAGE_URL = `${SITE_URL}/services`;

const targetMarkets = [
  { title: 'Planning Consultants', desc: 'Outsource technical solar reports to us and deliver a complete planning package to your clients — under your brand.' },
  { title: 'Solar Developers & Energy Companies', desc: 'We handle the technical documentation so your team can focus on land, grid, and finance — we deliver the planning pack.' },
  { title: 'EPC Contractors & Installers', desc: 'Need planning drawings fast? We integrate directly with your project team and turn around documentation to your programme.' },
  { title: 'Land Agents & Advisors', desc: 'Supporting landowners and farmers exploring solar options? We provide the technical reports your clients need to get planning.' },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Solar Planning Services Ireland | Glint & Glare, Landscape Plans, PV Drawings | SolarPlan Ireland</title>
        <meta name="description" content="Expert solar planning services across Ireland: glint & glare analysis, PV planning drawings, ground and roof-mounted solar design, and Landscape Plans. Accepted by An Bord Pleanála and all 31 county councils." />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Solar Planning Services Ireland | SolarPlan Ireland" />
        <meta property="og:description" content="Expert solar planning services across Ireland: glint & glare analysis, PV planning drawings, ground and roof-mounted solar design, and Landscape Plans." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <PageHero
        title="Solar Planning Services"
        subtitle="Every technical document your solar planning application needs — produced by specialist consultants who know the Irish planning system inside out."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-gold-100 text-gold-700">Our Expertise</span>
            <h2 className="section-title">Specialist Solar Planning Documentation</h2>
            <p className="section-subtitle">
              We focus exclusively on solar planning. That specialisation means deeper expertise, faster turnaround, and better outcomes for your project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-gold-100 text-gold-700">Our Clients</span>
              <h2 className="section-title text-left">Who We Work With</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                SolarPlan Ireland works with every type of client involved in the Irish solar planning process — from individual farmers applying for a single installation to multinational energy companies developing utility-scale solar farms.
              </p>
              <div className="space-y-4">
                {targetMarkets.map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-forest-900">{title}</p>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {services.map((s) => (
                <ServiceCard key={s.id} service={s} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
