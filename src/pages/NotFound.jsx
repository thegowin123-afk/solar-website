import { Link } from 'react-router-dom';
import { Sun, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-2xl bg-gold-100 flex items-center justify-center mx-auto mb-6">
          <Sun className="w-10 h-10 text-gold-500" />
        </div>
        <h1 className="text-6xl font-heading font-bold text-forest-900 mb-3">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-forest-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          Sorry, the page you're looking for doesn't exist or has moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
