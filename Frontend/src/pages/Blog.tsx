import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="bg-gradient-to-r from-red-600 to-red-800 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-red-100">Insights and teachings from our community</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-red-600 hover:text-red-700"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;