import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import { blogPosts } from '../data/blog';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <Link to="/blog" className="text-red-600 hover:text-red-700">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const content = `
    <h2>Introduction to Buddhist Meditation</h2>
    <p>
      In today's fast-paced world, finding inner peace and mental clarity has become more important than ever. 
      Buddhist meditation, with its rich history spanning over two millennia, offers profound techniques for 
      achieving this peace and understanding of oneself.
    </p>

    <h3>Understanding the Basics</h3>
    <p>
      Buddhist meditation is not just about sitting quietly; it's a comprehensive approach to understanding 
      the nature of mind and reality. The practice begins with developing mindfulness (Sati) and concentration 
      (Samadhi), which serve as foundations for deeper insights.
    </p>

    <h3>Key Meditation Techniques</h3>
    <ul>
      <li>
        <strong>Anapanasati (Mindfulness of Breathing)</strong>
        <p>
          This fundamental technique involves focusing on the natural rhythm of breath. It helps calm the mind 
          and develop concentration, serving as a gateway to deeper meditation practices.
        </p>
      </li>
      <li>
        <strong>Metta Bhavana (Loving-Kindness Meditation)</strong>
        <p>
          This practice cultivates universal love and compassion, starting with oneself and gradually extending 
          to all beings. It helps overcome negative emotions and develop positive mental states.
        </p>
      </li>
      <li>
        <strong>Vipassana (Insight Meditation)</strong>
        <p>
          Building upon the foundation of concentration, Vipassana helps develop wisdom through direct 
          observation of physical and mental phenomena.
        </p>
      </li>
    </ul>

    <h3>Benefits of Regular Practice</h3>
    <p>
      Scientific research has shown that regular meditation practice can lead to:
    </p>
    <ul>
      <li>Reduced stress and anxiety</li>
      <li>Improved emotional regulation</li>
      <li>Better concentration and memory</li>
      <li>Enhanced self-awareness</li>
      <li>Greater sense of well-being</li>
    </ul>

    <h3>Integrating Meditation into Daily Life</h3>
    <p>
      While formal sitting meditation is important, Buddhist practice emphasizes integrating mindfulness 
      into all aspects of life. This includes:
    </p>
    <ul>
      <li>Mindful walking and movement</li>
      <li>Conscious eating and drinking</li>
      <li>Mindful communication</li>
      <li>Awareness during daily activities</li>
    </ul>

    <h3>Common Challenges and Solutions</h3>
    <p>
      Many beginners face challenges such as:
    </p>
    <ul>
      <li>Restless mind - Solution: Start with shorter sessions and gradually increase duration</li>
      <li>Physical discomfort - Solution: Use proper posture and supports</li>
      <li>Lack of time - Solution: Start with just 5-10 minutes daily</li>
      <li>Difficulty concentrating - Solution: Use guided meditations initially</li>
    </ul>

    <h3>Conclusion</h3>
    <p>
      Buddhist meditation is a transformative practice that can lead to profound changes in how we experience 
      life. Whether you're seeking stress relief, emotional balance, or deeper spiritual insights, these 
      time-tested techniques offer a path to greater peace and understanding.
    </p>
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="relative h-[60vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-white">
            <Link
              to="/blog"
              className="inline-flex items-center text-white mb-6 hover:text-red-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Link>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {post.title}
            </motion.h1>
            <motion.div
              className="flex flex-wrap items-center gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                <span>{post.category}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Author Info - Left Sidebar */}
          <div className="md:col-span-3">
            <div className="sticky top-8">
              <div className="flex flex-col items-center text-center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="font-semibold">{post.author.name}</h3>
                <p className="text-gray-600 text-sm">{post.author.role}</p>
              </div>
              
              <div className="mt-8 space-y-4">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <ThumbsUp className="w-4 h-4" />
                  Like
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <motion.article
            className="md:col-span-9 prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;