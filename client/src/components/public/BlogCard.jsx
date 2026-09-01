import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Recent';

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-earth/15 flex flex-col h-full">
      {/* Image */}
      {post.featuredImage && (
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-cream/40">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {post.category && (
            <span className="absolute top-3 left-3 bg-brand-earth text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
              {post.category.name}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-4 text-xs text-brand-text-muted mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-earth" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-brand-earth" />
              {post.author || 'Aninta Team'}
            </span>
          </div>

          <h3 className="font-serif text-xl font-bold text-brand-dark-green group-hover:text-brand-earth transition-colors line-clamp-2 mb-3">
            {post.title}
          </h3>

          <p className="text-xs sm:text-sm text-brand-text-muted line-clamp-3 leading-relaxed mb-6">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-med-green">Educational Article</span>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-dark-green hover:text-brand-earth transition"
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
