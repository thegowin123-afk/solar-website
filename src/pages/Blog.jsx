import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

const PAGE_URL = `${SITE_URL}/blog`;
import PageHero from '../components/ui/PageHero';
import NewsletterSignup from '../components/ui/NewsletterSignup';
import { blogPosts } from '../data/blog';

function BlogCard({ post, featured = false }) {
  return (
    <article className={`card flex flex-col h-full group ${featured ? 'md:flex-row' : ''}`}>
      <div className={`relative bg-gradient-to-br from-forest-800 to-forest-600 overflow-hidden flex-shrink-0 ${
        featured ? 'md:w-80 h-56 md:h-auto' : 'h-48'
      }`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="grid grid-cols-8 gap-1 p-3 w-full h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="bg-gold-300 rounded-sm" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="badge bg-gold-500 text-white text-xs">Featured</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="badge bg-white/20 backdrop-blur-sm text-white text-xs">{post.category}</span>
        </div>
      </div>
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span>{new Date(post.publishDate).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
        </div>
        <h2 className={`font-heading font-bold text-forest-900 mb-3 group-hover:text-gold-700 transition-colors leading-snug ${featured ? 'text-2xl' : 'text-xl'}`}>
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-5 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
          <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-700 group/link flex-shrink-0">
            Read more <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      <Helmet>
        <title>Solar Planning Application Ireland Blog | Guides & Resources | SolarPlan Ireland</title>
        <meta name="description" content="Expert guides on solar planning applications in Ireland. Planning permission, Landscape Plans, glint & glare, EIAR — practical advice from Ireland's specialist solar planning consultants." />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Solar Planning Ireland Blog | SolarPlan Ireland Resources" />
        <meta property="og:description" content="Expert guides on solar planning applications in Ireland. Planning permission, Landscape Plans, glint & glare, EIAR." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <PageHero
        title="Blog & Planning Resources"
        subtitle="Practical guides, policy updates, and technical insights for solar developers, farmers, and contractors navigating the Irish planning system."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          {/* Featured post */}
          {featured && (
            <div className="mb-10">
              <h2 className="text-sm font-bold tracking-widest uppercase text-gold-600 mb-5">Featured Article</h2>
              <BlogCard post={featured} featured />
            </div>
          )}

          {/* All posts */}
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {rest.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
