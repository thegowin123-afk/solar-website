import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import ServicesOverview from '../components/sections/ServicesOverview';
import WhyUs from '../components/sections/WhyUs';
import ProcessSteps from '../components/sections/ProcessSteps';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import CTABanner from '../components/sections/CTABanner';
import NewsletterSignup from '../components/ui/NewsletterSignup';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'SolarPlan Ireland',
  description: 'Expert solar planning application services across Ireland. Glint & glare analysis, LVIA reports, PV planning drawings and solar farm planning permission specialists.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_OG_IMAGE,
  telephone: '+912212345678',
  email: 'info@solarplanireland.ie',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Ireland',
  },
  knowsAbout: [
    'Solar Planning Application Ireland',
    'Glint and Glare Analysis',
    'LVIA Reports',
    'PV Planning Drawings',
    'An Bord Pleanala',
    'Solar Farm Planning Permission Ireland',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need planning permission for solar panels in Ireland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the size and type of installation. Many domestic rooftop solar systems are exempt from planning permission under Schedule 2 of the Planning and Development Regulations. However, ground-mounted solar farms almost always require full planning permission, and commercial rooftop systems may require it depending on size and roof type.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a solar planning application take in Ireland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard local authority planning application has an 8-week determination period. Well-prepared applications with all required technical reports rarely receive further information requests. For Strategic Infrastructure Developments (large solar farms going directly to An Bord Pleanála), the process typically takes 12–24 months.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a glint and glare report and is it always needed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A glint and glare assessment uses computer modelling to predict whether solar panels will cause problematic reflections affecting neighbouring properties, road users, or aviation. Planning authorities in Ireland routinely request it for ground-mounted solar farms and some commercial rooftop systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an LVIA and when is it required for solar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Landscape and Visual Impact Assessment (LVIA) evaluates the visual impact of a development on the surrounding landscape. For ground-mounted solar farms in Ireland, it is almost always required by the planning authority.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does solar planning documentation cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A glint and glare assessment for a medium-scale solar farm typically starts from €3,000–€5,000. A full LVIA starts from €5,000–€8,000. A planning drawing package starts from €2,500. Contact us for a free tailored quote.',
      },
    },
  ],
};

const PAGE_URL = `${SITE_URL}/`;

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Solar Planning Application Ireland | Expert Consultants | SolarPlan Ireland</title>
        <meta name="description" content="Ireland's specialist solar planning application consultants. Glint & glare analysis, LVIA reports, PV planning drawings — 94% first-application approval rate. Free quote within 1 business day." />
        <meta name="keywords" content="solar planning application ireland, solar planning permission ireland, glint glare analysis ireland, solar farm planning ireland, LVIA solar ireland, An Bord Pleanala solar" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Solar Planning Application Ireland | Expert Consultants | SolarPlan Ireland" />
        <meta property="og:description" content="Ireland's specialist solar planning application consultants. Glint & glare analysis, LVIA reports, PV planning drawings — 94% first-application approval rate." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Solar Planning Application Ireland | SolarPlan Ireland" />
        <meta name="twitter:description" content="Ireland's specialist solar planning application consultants. 94% first-application approval rate." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Hero />
      <ServicesOverview />
      <WhyUs />
      <ProcessSteps />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <NewsletterSignup />
    </>
  );
}
