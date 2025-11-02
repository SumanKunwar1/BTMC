import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Grid, Maximize2 } from 'lucide-react';
import { galleryImages } from '../data/gallery';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [visibleImages, setVisibleImages] = useState(6);

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (index: number, mode: 'single' | 'grid' = 'single') => {
    setSelectedImage(index);
    setViewMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
    setViewMode('single');
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'prev'
      ? (selectedImage - 1 + filteredImages.length) % filteredImages.length
      : (selectedImage + 1) % filteredImages.length;
    
    setSelectedImage(newIndex);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (viewMode === 'single') {
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    }
    if (e.key === 'Escape') closeModal();
  };

  const loadMore = () => {
    setVisibleImages(prev => Math.min(prev + 6, filteredImages.length));
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, viewMode]);

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="bg-gradient-to-r from-red-600 to-red-800 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-red-100">Moments captured at BTMC Foundation</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-red-50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.slice(0, visibleImages).map((image, index) => (
            <motion.div
              key={image.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(index, 'single');
                    }}
                    className="text-white bg-red-600 p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(index, 'grid');
                    }}
                    className="text-white bg-red-600 p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{image.title}</h2>
                <p className="text-gray-600 mb-4">{image.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{image.date}</span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleImages < filteredImages.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-red-500 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {viewMode === 'single' ? (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 text-white hover:text-red-500"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 text-white hover:text-red-500"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                <motion.div
                  className="relative max-w-5xl w-full"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <img
                    src={filteredImages[selectedImage].image}
                    alt={filteredImages[selectedImage].title}
                    className="w-full h-[80vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="text-xl font-bold mb-2">
                      {filteredImages[selectedImage].title}
                    </h3>
                    <p className="text-gray-300">
                      {filteredImages[selectedImage].description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                className="w-full h-full overflow-auto p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      className="relative aspect-square cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setSelectedImage(index);
                        setViewMode('single');
                      }}
                    >
                      <img
                        src={image.image}
                        alt={image.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 rounded-lg" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <button
              onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
              className="absolute top-4 left-4 text-white hover:text-red-500 z-10"
            >
              {viewMode === 'single' ? (
                <Grid className="w-6 h-6" />
              ) : (
                <Maximize2 className="w-6 h-6" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;