import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Copy, Check, MessageCircle, Facebook } from 'lucide-react';
import SEOHead from '../../components/public/SEOHead';
import BlogCard from '../../components/public/BlogCard';
import NewsletterForm from '../../components/public/NewsletterForm';
import Disclaimer from '../../components/public/Disclaimer';
import { useToast } from '../../context/ToastContext';
import { Analytics } from '../../utils/analytics';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blog/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPost(data.data);
          setRelated(data.related || []);
          Analytics.viewArticle(data.data.id, data.data.title, data.data.category?.name);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-24 text-brand-text-muted">Loading article...</div>;
  if (!post) return <div className="text-center py-24 text-brand-text-muted">Article not found.</div>;

  const currentUrl = window.location.href;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this article from Aninta Wellness: "${post.title}" - ${currentUrl}`)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    addToast('Article link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <>
      <SEOHead title={post.seoTitle || post.title} description={post.seoDescription || post.excerpt} />

      {/* JSON-LD Article Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          'headline': post.title,
          'description': post.excerpt,
          'image': post.featuredImage,
          'author': {
            '@type': 'Organization',
            'name': post.author || 'Aninta Natural & Energy Medicine Therapy Center'
          },
          'datePublished': post.publishedAt
        })}
      </script>

      <article className="py-12 bg-white border-b border-brand-earth/10">
        <div className="max-w-article mx-auto px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-earth hover:text-brand-dark-green mb-8 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles Listing
          </Link>

          {post.category && (
            <span className="inline-block bg-brand-light-green text-brand-dark-green text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {post.category.name}
            </span>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark-green leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-100 text-xs sm:text-sm text-brand-text-muted">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-earth" />
                {post.author || 'Aninta Wellness Team'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-earth" />
                {formattedDate}
              </span>
            </div>

            {/* Social Share Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase text-brand-earth mr-1">Share:</span>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 transition"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-brand-text-dark transition"
                title="Copy Article Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="rounded-3xl overflow-hidden shadow-lg mb-10 border border-brand-earth/15">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-80 sm:h-[450px] object-cover"
              />
            </div>
          )}

          {/* Lead Excerpt */}
          <p className="text-lg font-medium text-brand-dark-green italic bg-brand-cream/60 p-6 rounded-2xl border-l-4 border-brand-earth mb-8 leading-relaxed">
            "{post.excerpt}"
          </p>

          {/* Body Content */}
          <div className="prose prose-emerald max-w-none text-brand-text-dark text-base leading-relaxed space-y-6 whitespace-pre-line mb-12">
            {post.content}
          </div>

          <Disclaimer className="mb-12" />

        </div>
      </article>

      {/* Newsletter & Related Section */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-serif text-3xl font-bold text-brand-dark-green mb-8 text-center">
                Related Educational Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map(rPost => (
                  <BlogCard key={rPost.id} post={rPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
