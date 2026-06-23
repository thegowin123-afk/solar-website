import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTABanner({
  title = 'Ready to Add Irish Solar Planning Capacity to Your Business?',
  subtitle = 'Partner with our India-based team in Mumbai and deliver more for your clients — without increasing your overheads. Get a tailored proposal within one business day.',
  primaryLabel = 'Start a Partnership',
  primaryTo = '/contact',
}) {
  return (
    <section className="py-16 bg-gradient-to-r from-forest-950 via-forest-900 to-forest-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/20 rounded-full blur-3xl" />
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link to={primaryTo} className="btn-primary text-base py-4 px-8">
              {primaryLabel}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+919082276147" className="btn-outline-white text-base py-4 px-8">
              <Phone className="w-5 h-5" />
              Call India Office
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
