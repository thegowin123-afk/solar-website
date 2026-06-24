import { Link } from 'react-router-dom';
import { Sun, Mail, Phone, MapPin } from 'lucide-react';
import { services } from '../../data/services';

// Inline SVG social icons (lucide-react doesn't ship branded icons)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-gray-300">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-heading font-bold text-white text-lg">SolarPlan</span>
                <span className="block text-xs text-gold-400 font-semibold tracking-wider -mt-1">IRELAND</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              SolarPlan Ireland is a specialist solar PV planning support service by SVAERO Cadetics LLP, providing planning drawings, glint and glare reports and solar planning documentation support for projects across Ireland.
            </p>
            <div className="flex gap-3">
              {[
                { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
                { icon: XIcon, href: '#', label: 'X (Twitter)' },
                { icon: FacebookIcon, href: '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-forest-800 hover:bg-gold-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'Solar PV Planning Drawings Ireland', to: '/solar-pv-planning-drawings-ireland' },
                { label: 'Glint and Glare Assessment Ireland', to: '/glint-and-glare-assessment-ireland' },
                { label: 'Glint and Glare Report Ireland', to: '/glint-and-glare-report-ireland' },
                { label: 'Solar Glare Pre-Simulation', to: '/solar-glare-pre-simulation' },
                { label: 'Ground-Mounted Solar Planning Ireland', to: '/ground-mounted-solar-planning-ireland' },
                { label: 'Rooftop Solar Planning Application Ireland', to: '/rooftop-solar-planning-application-ireland' },
                { label: 'Solar Farm Planning Drawings Ireland', to: '/solar-farm-planning-drawings-ireland' },
                { label: 'Landscape Plan Solar PV Ireland', to: '/landscape-plan-solar-pv-ireland' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Case Studies', to: '/case-studies' },
                { label: 'Blog & Resources', to: '/blog' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-heading font-semibold text-white mt-6 mb-4">County Planning Guides</h3>
            <ul className="space-y-2">
              {['Dublin', 'Cork', 'Kildare', 'Tipperary', 'Offaly'].map((county) => (
                <li key={county}>
                  <Link
                    to={`/solar-planning/${county.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    Solar Planning {county}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+919082276147" className="text-sm text-gray-400 hover:text-gold-400 transition-colors block">
                    +91 90822 76147
                  </a>
                  <a href="https://wa.me/919082276147" target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:text-green-300 transition-colors">
                    💬 WhatsApp
                  </a>
                  <span className="text-xs text-gray-500">Mon–Fri 9:00am–6:00pm IST</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@solarplanningireland.com" className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                  info@solarplanningireland.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Mumbai, Maharashtra, India<br />
                  <span className="text-gray-500">Serving Ireland & Northern Ireland</span>
                </span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-forest-900 rounded-xl">
              <p className="text-sm font-semibold text-white mb-1">Get a Free Quote</p>
              <p className="text-xs text-gray-400 mb-3">Tell us about your project for a tailored proposal.</p>
              <Link to="/contact" className="btn-primary text-sm py-2 px-4 w-full justify-center">
                Start Here
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SolarPlan Ireland. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold-400 transition-colors">Terms of Use</Link>
            <Link to="/sitemap" className="hover:text-gold-400 transition-colors">Sitemap</Link>
          </div>
          <p>Registered in India · Mumbai, Maharashtra</p>
        </div>
      </div>
    </footer>
  );
}
