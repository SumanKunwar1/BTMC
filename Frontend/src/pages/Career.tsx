import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { jobPostings } from '../data/careers';

const Career = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="bg-gradient-to-r from-red-600 to-red-800 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Careers</h1>
          <p className="text-red-100">Join our team and make a difference</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {jobPostings.map((job) => (
            <motion.div
              key={job.id}
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Apply by {job.deadline}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Apply Now
                </button>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600 mb-6">{job.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;