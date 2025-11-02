import React, { useState } from 'react';
import { Editor } from "@tinymce/tinymce-react";

interface PageFormProps {
  initialData?: {
    title: string;
    slug: string;
    location: 'header' | 'footer';
    parentPage?: string;
    content: string;
    status: 'draft' | 'published';
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
  };
  pages: Array<{ id: string; title: string }>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const PageForm: React.FC<PageFormProps> = ({ initialData, pages, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    location: initialData?.location || 'header',
    parentPage: initialData?.parentPage || '',
    content: initialData?.content || '',
    status: initialData?.status || 'draft',
    metaTitle: initialData?.metaTitle || '',
    metaKeywords: initialData?.metaKeywords || '',
    metaDescription: initialData?.metaDescription || '',
  });

  const handleEditorChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Title
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Slug
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value as 'header' | 'footer' })}
          >
            <option value="header">Header</option>
            <option value="footer">Footer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent Page
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.parentPage}
            onChange={(e) => setFormData({ ...formData, parentPage: e.target.value })}
          >
            <option value="">None</option>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>{page.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <Editor
          apiKey="your-api-key-here"
          initialValue={formData.content}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | forecolor backcolor | " +
              "fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | " +
              "outdent indent | numlist bullist | link image | removeformat | code",
            content_style: "body { font-family: Arial, sans-serif; font-size: 14px; }",
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Keywords
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.metaKeywords}
            onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            rows={3}
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          {initialData ? 'Update Page' : 'Create Page'}
        </button>
      </div>
    </form>
  );
};

export default PageForm;