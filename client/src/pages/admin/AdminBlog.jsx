import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import AdminTopBar from '../../components/admin/AdminTopBar';
import ImageUploader from '../../components/admin/ImageUploader';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/public/SEOHead';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Aninta Wellness Team',
    seoTitle: '',
    seoDescription: '',
    status: 'DRAFT'
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setPosts(data.data || []);
    } catch (err) {
      console.error(err);
      addToast('Failed to load blog posts.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const handleOpenNew = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      author: 'Aninta Wellness Team',
      seoTitle: '',
      seoDescription: '',
      status: 'DRAFT'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage || '',
      author: post.author || 'Aninta Wellness Team',
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      status: post.status || 'DRAFT'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPost ? `/api/admin/blog/${editingPost.id}` : '/api/admin/blog';
      const method = editingPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save blog post');
      }

      addToast(`Article ${editingPost ? 'updated' : 'created'}!`, 'success');
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      addToast(err.message || 'Error saving article.', 'error');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        addToast('Article deleted.', 'info');
        fetchPosts();
      }
    } catch (err) {
      addToast('Failed to delete article.', 'error');
    }
  };

  return (
    <>
      <SEOHead title="Manage Blog - Admin" />
      <AdminTopBar title="Blog & Article Editor" />

      <main className="p-6 max-w-content mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-brand-text-muted">Create, edit, draft, and publish educational articles.</p>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark-green hover:bg-brand-med-green text-white text-sm font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-semibold text-brand-dark-green max-w-xs truncate">{p.title}</td>
                  <td className="py-3 px-4 text-gray-600">{p.author}</td>
                  <td className="py-3 px-4">
                    {p.status === 'PUBLISHED' ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium text-xs">Published</span>
                    ) : (
                      <span className="text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full font-medium text-xs">Draft</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs">
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(p)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id, p.title)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-serif text-2xl font-bold text-brand-dark-green">
                  {editingPost ? 'Edit Blog Article' : 'Draft New Article'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Excerpt *</label>
                  <textarea
                    rows="2"
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Article Body Content *</label>
                  <textarea
                    rows="8"
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono focus:ring-2 focus:ring-brand-earth"
                  ></textarea>
                </div>

                <ImageUploader
                  value={formData.featuredImage}
                  onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                  label="Featured Image"
                  folder="blog"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border text-sm font-semibold">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 rounded-xl bg-brand-dark-green text-white text-sm font-semibold">Save Article</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
