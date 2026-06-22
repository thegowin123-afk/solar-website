import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Shield, Clock, TrendingDown } from 'lucide-react';

const trustBadges = [
  { icon: CheckCircle, text: '150+ Irish Projects' },
  { icon: TrendingDown, text: '30–50% Cheaper Than Dublin' },
  { icon: Shield, text: 'An Bord Pleanála Accepted' },
  { icon: Clock, text: '2–4 Week Turnaround' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        {/* Solar panel pattern overlay */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 overflow-hidden">
          <div className="grid grid-cols-8 gap-1 h-full w-full p-4">
            {Array.from({ length: 128 }).map((_, i) => (
              <div key={i} className="bg-gold-400 rounded-sm aspect-[4/3]" />
            ))}
          </div>
        </div>
        {/* Gradient blobs */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-forest-400/10 rounded-full blur-3xl" />
      </div>

      {/* Irish landscape placeholder image */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-r from-forest-950 via-transparent to-transparent" />
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 rounded-full px-4 py-2 mb-7">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-300 text-sm font-medium">Mumbai-Based · Irish Solar Planning Specialists</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 text-balance">
            Expert Solar Planning{' '}
            <span className="text-gold-400">Documentation</span>{' '}
            That Gets Approved
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
            A Mumbai-based outsourcing company specialising exclusively in Irish solar planning. Glint &amp; glare analysis, LVIA reports, and PV planning drawings — at outsourcing rates, without compromising quality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/contact" className="btn-primary text-base py-4 px-8">
              Get a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/case-studies" className="btn-outline-white text-base py-4 px-8">
              View Our Projects
            </Link>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 border border-white/10">
                <Icon className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="text-xs text-gray-300 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-500 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-gold-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}
