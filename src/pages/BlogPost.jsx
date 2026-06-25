import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';
import ContactForm from '../components/ui/ContactForm';
import NewsletterSignup from '../components/ui/NewsletterSignup';
import { getBlogPostBySlug, blogPosts } from '../data/blog';

function renderContent(content) {
  return content
    .trim()
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-heading font-bold text-forest-900 mt-10 mb-4">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-heading font-semibold text-forest-900 mt-8 mb-3">{line.replace('### ', '')}</h3>;
      if (line.startsWith('#### ')) return <h4 key={i} className="text-lg font-heading font-semibold text-forest-900 mt-6 mb-2">{line.replace('#### ', '')}</h4>;
      if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-1 text-gray-700 list-disc">{line.replace('- ', '')}</li>;
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-forest-900 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return <p key={i} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
    });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: pageUrl,
    datePublished: post.publishDate,
    author: {
      '@type': 'Organization',
      name: 'SolarPlan Ireland',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SolarPlan Ireland',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    keywords: post.tags.join(', '),
  };

  const faqSchema = post.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{post.title} | Solar Planning Ireland | SolarPlan Ireland</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      {/* Article hero */}
      <div className="relative pt-32 pb-16 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        <div className="container-custom relative z-10 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="badge bg-gold-500 text-white text-xs">{post.category}</span>
            <span className="text-gray-400 text-sm flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />{post.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4 text-balance">{post.title}</h1>
          <p className="text-gray-300 text-lg mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{post.author} · {post.authorRole}</span>
            <span>·</span>
            <span>{new Date(post.publishDate).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article body */}
            <article className="lg:col-span-2">
              <div className="prose-custom">
                {renderContent(post.content)}
              </div>

              {/* Related services — internal links */}
              {post.relatedServices?.length > 0 && (
                <div className="mt-10 p-5 bg-forest-50 border border-forest-100 rounded-2xl">
                  <p className="text-xs font-bold text-forest-700 uppercase tracking-wide mb-3">Related Services</p>
                  <div className="flex flex-wrap gap-2">
                    {post.relatedServices.map(({ label, href }) => (
                      <Link key={href} to={href}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-800 bg-white border border-forest-200 hover:border-gold-400 hover:text-gold-700 rounded-lg px-3 py-1.5 transition-colors">
                        {label} <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {post.faqs?.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-heading font-bold text-forest-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {post.faqs.map(({ q, a }) => (
                      <details key={q} className="group border border-gray-200 rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer font-semibold text-forest-900 text-sm select-none list-none hover:bg-gray-50">
                          {q}
                          <span className="text-gold-500 text-lg leading-none group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                        </summary>
                        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{a}</div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
                {post.tags.map((tag) => (
                  <span key={tag} className="badge bg-gray-100 text-gray-600">{tag}</span>
                ))}
              </div>
              {/* Related posts */}
              {related.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-heading font-bold text-forest-900 text-xl mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {related.map((p) => (
                      <Link key={p.id} to={`/blog/${p.slug}`} className="p-5 rounded-2xl border border-gray-200 hover:border-gold-300 hover:bg-gold-50 transition-all group">
                        <span className="text-xs badge bg-gold-100 text-gold-700 mb-2">{p.category}</span>
                        <h4 className="font-semibold text-forest-900 text-sm leading-snug group-hover:text-gold-700 transition-colors">{p.title}</h4>
                        <span className="text-xs text-gold-600 flex items-center gap-1 mt-2">Read more <ArrowRight className="w-3 h-3" /></span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
                  <h3 className="font-heading font-bold text-forest-900 text-lg mb-2">Have a Solar Project?</h3>
                  <p className="text-sm text-gray-500 mb-5">Get a free, no-obligation quote from our planning specialists.</p>
                  <ContactForm compact />
                </div>
                <div className="p-5 bg-forest-50 rounded-2xl">
                  <h3 className="font-heading font-semibold text-forest-900 mb-3">Other Articles</h3>
                  <div className="space-y-3">
                    {blogPosts.filter((p) => p.id !== post.id).map((p) => (
                      <Link key={p.id} to={`/blog/${p.slug}`} className="block text-sm text-gray-600 hover:text-gold-700 transition-colors leading-snug">
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <NewsletterSignup />
    </>
  );
}
