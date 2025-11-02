import React from 'react';
import { FileText, Link as LinkIcon } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  location: 'header' | 'footer';
  parentPage?: string;
  status: 'published' | 'draft';
  lastModified: string;
}

interface PageListProps {
  pages: Page[];
  onEdit: (page: Page) => void;
  onDelete: (id: string) => void;
}

const PageList: React.FC<PageListProps> = ({ pages, onEdit, onDelete }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left border-b">
          <th className="pb-3 font-semibold text-gray-600">Title</th>
          <th className="pb-3 font-semibold text-gray-600">URL</th>
          <th className="pb-3 font-semibold text-gray-600">Location</th>
          <th className="pb-3 font-semibold text-gray-600">Parent Page</th>
          <th className="pb-3 font-semibold text-gray-600">Status</th>
          <th className="pb-3 font-semibold text-gray-600">Last Modified</th>
          <th className="pb-3 font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {pages.map((page) => (
          <tr key={page.id} className="border-b">
            <td className="py-4">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-lg mr-3">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <span className="font-medium">{page.title}</span>
              </div>
            </td>
            <td className="py-4">
              <div className="flex items-center text-gray-600">
                <LinkIcon className="w-4 h-4 mr-2" />
                <span>/{page.slug}</span>
              </div>
            </td>
            <td className="py-4">
              <span className="capitalize text-gray-600">{page.location}</span>
            </td>
            <td className="py-4">
              <span className="text-gray-600">{page.parentPage || 'None'}</span>
            </td>
            <td className="py-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                page.status === 'published' 
                  ? 'bg-green-100 text-green-600'
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                {page.status}
              </span>
            </td>
            <td className="py-4">
              <span className="text-gray-600">{page.lastModified}</span>
            </td>
            <td className="py-4">
              <div className="flex space-x-2">
                <button 
                  onClick={() => onEdit(page)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Edit
                </button>
                <button className="text-gray-600 hover:text-gray-700">View</button>
                <button 
                  onClick={() => onDelete(page.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PageList;