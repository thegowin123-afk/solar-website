import { Link } from 'react-router-dom';
import { ArrowRight, Eye, FileText, Layout, TreePine, Home } from 'lucide-react';

const iconMap = { Eye, FileText, Layout, TreePine, Home };

export default function ServiceCard({ service, variant = 'default' }) {
  const Icon = iconMap[service.icon] || Eye;

  if (variant === 'compact') {
    return (
      <Link
        to={`/services/${service.slug}`}
        className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gold-200 hover:bg-gold-50 transition-all duration-200"
      >
        <div className="w-10 h-10 rounded-xl bg-gold-100 group-hover:bg-gold-200 flex items-center justify-center flex-shrink-0 transition-colors">
          <Icon className="w-5 h-5 text-gold-700" />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-forest-900 text-sm mb-1">{service.shortTitle}</h3>
          <p className="text-xs text-gray-500 line-clamp-2">{service.tagline}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold-500 flex-shrink-0 transition-colors mt-1" />
      </Link>
    );
  }

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group card p-7 flex flex-col hover:border-gold-200 border border-transparent"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
        service.color === 'gold'
          ? 'bg-gold-100 group-hover:bg-gold-200'
          : 'bg-forest-100 group-hover:bg-forest-200'
      }`}>
        <Icon className={`w-6 h-6 ${service.color === 'gold' ? 'text-gold-700' : 'text-forest-700'}`} />
      </div>
      <h3 className="font-heading font-bold text-forest-900 text-xl mb-2 group-hover:text-gold-700 transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-gold-600 font-medium mb-3">{service.tagline}</p>
      <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-5">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
          {service.timeframe}
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-gold-600 group-hover:gap-2 transition-all">
          Learn more <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
