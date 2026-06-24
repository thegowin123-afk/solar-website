import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

export function CTABlock() {
  return (
    <section className="bg-forest-950 text-white py-14">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">
          Need Solar PV Planning Drawings or a Glint and Glare Report?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Send us your site layout, panel details, planning comments or project brief. We can review the requirements and provide a fixed quotation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn-primary py-4 px-8 text-base">
            Request a Quote <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="tel:+919082276147" className="btn-outline-white py-4 px-8 text-base flex items-center gap-2 justify-center">
            <Phone className="w-5 h-5" /> +91 90822 76147
          </a>
        </div>
      </div>
    </section>
  );
}

export function FAQSection({ faqs }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom max-w-3xl">
        <h2 className="text-2xl font-heading font-bold text-forest-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-forest-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InternalLinks({ links }) {
  return (
    <section className="py-10 border-t border-gray-100">
      <div className="container-custom">
        <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Related Services</p>
        <div className="flex flex-wrap gap-3">
          {links.map(({ label, to }) => (
            <Link key={to} to={to} className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-gold-600 font-medium border border-forest-200 hover:border-gold-400 rounded-lg px-4 py-2 transition-colors">
              {label} <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
