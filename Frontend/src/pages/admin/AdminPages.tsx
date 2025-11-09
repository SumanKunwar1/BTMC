import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageList from '../../components/admin/pages/PageList';
import PageForm from '../../components/admin/pages/PageForm';
import Modal from '../../components/shared/Modal';

// Mock data for demonstration
const mockPages = [
  {
    id: '1',
    title: 'About Us',
    slug: 'about',
    location: 'header' as const,
    status: 'published' as const,
    lastModified: '2024-03-15',
  },
  {
    id: '2',
    title: 'Contact',
    slug: 'contact',
    location: 'footer' as const,
    status: 'published' as const,
    lastModified: '2024-03-14',
  },
];

const Pages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<any>(null);

  const handleCreatePage = (data: any) => {
    console.log('Create page:', data);
    setIsFormOpen(false);
  };

  const handleEditPage = (data: any) => {
    console.log('Edit page:', data);
    setEditingPage(null);
  };

  const handleDeletePage = (id: string) => {
    console.log('Delete page:', id);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Pages
          </motion.h1>
          <motion.button
            onClick={() => setIsFormOpen(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Page
          </motion.button>
        </div>

        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search pages..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <PageList
              pages={mockPages}
              onEdit={setEditingPage}
              onDelete={handleDeletePage}
            />
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Create New Page"
      >
        <PageForm
          pages={mockPages}
          onSubmit={handleCreatePage}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingPage}
        onClose={() => setEditingPage(null)}
        title="Edit Page"
      >
        <PageForm
          initialData={editingPage}
          pages={mockPages}
          onSubmit={handleEditPage}
          onCancel={() => setEditingPage(null)}
        />
      </Modal>
    </AdminLayout>
  );
};

export default Pages;