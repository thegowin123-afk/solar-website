import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Lazy-load all pages for optimal code splitting
const Home         = lazy(() => import('./pages/Home'));
const Services     = lazy(() => import('./pages/Services'));
const ServiceDetail= lazy(() => import('./pages/ServiceDetail'));
const About        = lazy(() => import('./pages/About'));
const CaseStudies  = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Blog         = lazy(() => import('./pages/Blog'));
const BlogPost     = lazy(() => import('./pages/BlogPost'));
const Contact      = lazy(() => import('./pages/Contact'));
const Pricing      = lazy(() => import('./pages/Pricing'));
const CountyPage   = lazy(() => import('./pages/CountyPage'));
const NotFound     = lazy(() => import('./pages/NotFound'));

// Minimal full-page loading spinner shown between route transitions
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-gold-200 border-t-gold-500 animate-spin" />
        <p className="text-sm text-gray-400 font-medium">Loading…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                       element={<Home />} />
          <Route path="/services"               element={<Services />} />
          <Route path="/services/:slug"         element={<ServiceDetail />} />
          <Route path="/about"                  element={<About />} />
          <Route path="/case-studies"           element={<CaseStudies />} />
          <Route path="/case-studies/:slug"     element={<CaseStudyDetail />} />
          <Route path="/blog"                   element={<Blog />} />
          <Route path="/blog/:slug"             element={<BlogPost />} />
          <Route path="/contact"                element={<Contact />} />
          <Route path="/pricing"                element={<Pricing />} />
          <Route path="/solar-planning-:county" element={<CountyPage />} />
          <Route path="*"                       element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
