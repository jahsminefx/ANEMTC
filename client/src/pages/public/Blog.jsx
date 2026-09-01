import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import BlogCard from '../../components/public/BlogCard';
import SEOHead from '../../components/public/SEOHead';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(post => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      (post.category?.name && post.category.name.toLowerCase().includes(q))
    );
  });

  const featuredPost = posts[0];
  const regularPosts = search ? filteredPosts : posts.slice(1);

  return (
    <>
      <SEOHead title="Wellness & Bio-Energy Blog" description="Read evidence-informed articles on energy medicine, natural daily habits, cellular hydration, and lifestyle balance." />

      <section className="bg-brand-dark-green text-white py-16 text-center">
        <div className="max-w-content mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-3 block">
            Educational Hub
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Wellness & Health Articles
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Practical knowledge, energy therapy guides, and lifestyle tips for your daily health journey.
          </p>
        </div>
      </section>

      <section className="py-12 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-12 relative">
            <input
              type="text"
              placeholder="Search health topics, articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-full bg-white border border-brand-earth/20 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth"
            />
            <Search className="w-4 h-4 text-brand-text-muted absolute left-4 top-4" />
          </div>

          {loading ? (
            <div className="text-center py-16 text-brand-text-muted">Loading articles...</div>
          ) : (
            <>
              {/* Featured Main Article */}
              {!search && featuredPost && (
                <div className="mb-12">
                  <BlogCard post={featuredPost} />
                </div>
              )}

              {/* Grid of Regular Posts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}

        </div>
      </section>
    </>
  );
}
