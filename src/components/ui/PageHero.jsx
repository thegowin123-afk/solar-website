import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHero({ title, subtitle, breadcrumbs = [], bgClass = '' }) {
  return (
    <section className={`relative pt-32 pb-20 overflow-hidden ${bgClass || 'bg-gradient-to-br from-forest-950 via-forest-800 to-gold-700'}`}>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-400/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-gold-400 transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-gold-400">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-5 text-balance leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
