import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import ClientLogos from '../components/sections/ClientLogos';
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
  description: 'Expert solar planning application services across Ireland. Glint & glare analysis, Landscape Plans, PV planning drawings and solar farm planning permission specialists.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_OG_IMAGE,
  telephone: '+919082276147',
  email: 'info@solarplanningireland.com',
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
    'Landscape Plans',
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
      name: 'What is a Landscape Plan and do I need one for my solar application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Landscape Plan shows proposed planting, screening, and mitigation measures for a solar development. It is almost always required for ground-mounted solar farms in Ireland. We produce Landscape Plans based on your LVIA or arboriculture report.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does solar planning documentation cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A glint and glare assessment for a medium-scale solar farm typically starts from €3,000–€5,000. A Landscape Plan starts from €2,000–€4,000. A planning drawing package starts from €2,500. Contact us for a free tailored quote.',
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
        <meta name="description" content="B2B solar planning outsourcing partner for Ireland. Glint & glare reports, Landscape Plans, PV drawings — delivered to your standard, on your timeline. Trusted by planning consultants and developers." />
        <meta name="keywords" content="solar planning outsourcing ireland, solar planning partner ireland, glint glare analysis ireland, solar farm planning ireland, landscape plan solar ireland, planning consultant outsourcing" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Solar Planning Application Ireland | Expert Consultants | SolarPlan Ireland" />
        <meta property="og:description" content="Ireland's specialist solar planning application consultants. Glint & glare analysis, Landscape Plans, PV planning drawings — 94% first-application approval rate." />
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
      <ClientLogos />
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
