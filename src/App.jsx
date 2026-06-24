import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
const CountyPage   = lazy(() => import('./pages/CountyPage'));
const Portfolio    = lazy(() => import('./pages/Portfolio'));
const NotFound     = lazy(() => import('./pages/NotFound'));

// SEO service pages
const SolarPVPlanningDrawings       = lazy(() => import('./pages/seo/SolarPVPlanningDrawings'));
const GlintAndGlareAssessment       = lazy(() => import('./pages/seo/GlintAndGlareAssessment'));
const GlintAndGlareReport           = lazy(() => import('./pages/seo/GlintAndGlareReport'));
const SolarGlarePreSimulation       = lazy(() => import('./pages/seo/SolarGlarePreSimulation'));
const GroundMountedSolarPlanning    = lazy(() => import('./pages/seo/GroundMountedSolarPlanning'));
const RooftopSolarPlanningApplication = lazy(() => import('./pages/seo/RooftopSolarPlanningApplication'));
const SolarFarmPlanningDrawings     = lazy(() => import('./pages/seo/SolarFarmPlanningDrawings'));
const LandscapePlanSolarPV         = lazy(() => import('./pages/seo/LandscapePlanSolarPV'));

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
          <Route path="/portfolio"              element={<Portfolio />} />
          <Route path="/pricing"                element={<Navigate to="/contact" replace />} />
          <Route path="/solar-planning/:county" element={<CountyPage />} />

          {/* Redirects for old/short service URLs */}
          <Route path="/pv-planning-drawings"     element={<Navigate to="/solar-pv-planning-drawings-ireland" replace />} />
          <Route path="/glint-and-glare"          element={<Navigate to="/glint-and-glare-assessment-ireland" replace />} />
          <Route path="/landscape-plans"          element={<Navigate to="/landscape-plan-solar-pv-ireland" replace />} />
          <Route path="/upload"                   element={<Navigate to="/contact" replace />} />
          <Route path="/upload-pv-layout"         element={<Navigate to="/contact" replace />} />

          {/* SEO service pages */}
          <Route path="/solar-pv-planning-drawings-ireland"        element={<SolarPVPlanningDrawings />} />
          <Route path="/glint-and-glare-assessment-ireland"        element={<GlintAndGlareAssessment />} />
          <Route path="/glint-and-glare-report-ireland"            element={<GlintAndGlareReport />} />
          <Route path="/solar-glare-pre-simulation"                element={<SolarGlarePreSimulation />} />
          <Route path="/ground-mounted-solar-planning-ireland"     element={<GroundMountedSolarPlanning />} />
          <Route path="/rooftop-solar-planning-application-ireland" element={<RooftopSolarPlanningApplication />} />
          <Route path="/solar-farm-planning-drawings-ireland"      element={<SolarFarmPlanningDrawings />} />
          <Route path="/landscape-plan-solar-pv-ireland"          element={<LandscapePlanSolarPV />} />

          {/* Legal pages — redirect to home until dedicated pages exist */}
          <Route path="/privacy"                element={<Navigate to="/" replace />} />
          <Route path="/terms"                  element={<Navigate to="/" replace />} />
          <Route path="/sitemap"                element={<Navigate to="/sitemap.xml" replace />} />

          <Route path="*"                       element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
