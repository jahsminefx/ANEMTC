import React, { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function ImageUploader({ value, onChange, label = 'Image URL / Upload', folder = 'products' }) {
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();
  const { addToast } = useToast();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      addToast('File size exceeds 5MB max limit.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    setUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Image upload failed');
      }

      onChange(data.url);
      addToast('Image uploaded successfully!', 'success');
    } catch (err) {
      console.error('Image upload error:', err);
      addToast(err.message || 'Image upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-dark">
        {label}
      </label>

      {value ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition opacity-90 group-hover:opacity-100"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="url"
            placeholder="Paste image URL (https://...)"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="flex-grow px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth"
          />
          <span className="text-xs font-semibold text-gray-400">OR</span>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-light-green text-brand-dark-green text-xs font-semibold hover:bg-brand-med-green hover:text-white transition shrink-0">
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload File</span>
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}
