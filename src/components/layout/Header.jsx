import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, ChevronDown, Phone } from 'lucide-react';
import { services } from '../../data/services';

const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Services',
    to: '/services',
    children: services.map((s) => ({ label: s.shortTitle, to: `/services/${s.slug}` })),
  },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Blog', to: '/blog' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-heading font-bold text-forest-900 text-lg tracking-tight">SolarPlan</span>
              <span className="block text-xs text-gold-600 font-semibold tracking-wider -mt-1">IRELAND</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-gold-600'
                          : scrolled
                          ? 'text-gray-700 hover:text-gold-600'
                          : 'text-white hover:text-gold-300'
                      }`
                    }
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </NavLink>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 mt-1">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-gold-600'
                        : scrolled
                        ? 'text-gray-700 hover:text-gold-600'
                        : 'text-white hover:text-gold-300'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919082276147"
              className={`hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors ${
                scrolled ? 'text-gray-600 hover:text-gold-600' : 'text-white/80 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>+91 90822 76147</span>
            </a>
            <Link to="/contact" className="hidden md:block btn-primary py-2 px-4 text-sm">
              Free Consultation
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                scrolled || mobileOpen ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container-custom py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive ? 'text-gold-600 bg-gold-50' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg text-sm transition-colors ${
                            isActive ? 'text-gold-600 bg-gold-50' : 'text-gray-600 hover:bg-gray-50'
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a href="tel:+919082276147" className="flex items-center gap-2 px-4 py-3 text-gray-700">
                <Phone className="w-4 h-4 text-gold-500" />
                +91 90822 76147
              </a>
              <Link to="/contact" className="btn-primary text-center mx-4">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
