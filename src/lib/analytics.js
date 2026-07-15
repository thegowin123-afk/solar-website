/**
 * Google Analytics 4 — loaded only when VITE_GA_MEASUREMENT_ID is a real
 * measurement ID (G-XXXXXXXXXX placeholder is ignored), so dev builds and
 * misconfigured deploys never load the tag or emit errors.
 *
 * SPA note: automatic page_view is disabled and sent manually on every
 * route change by <AnalyticsTracker /> in App.jsx.
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const enabled =
  typeof GA_ID === 'string' &&
  /^G-[A-Z0-9]{6,}$/.test(GA_ID) &&
  GA_ID !== 'G-XXXXXXXXXX';

export function initAnalytics() {
  if (!enabled || window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageview(path) {
  if (!enabled || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * Track a business event, e.g. trackEvent('enquiry_submitted', { service: 'glint-glare' }).
 */
export function trackEvent(name, params = {}) {
  if (!enabled || !window.gtag) return;
  window.gtag('event', name, params);
}
