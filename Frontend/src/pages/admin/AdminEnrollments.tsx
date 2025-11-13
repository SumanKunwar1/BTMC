import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Eye, Mail, Phone, MapPin, Calendar, User, Filter } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/shared/Modal';

// Types
interface Enrollment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  preferredLanguage: string;
  message: string;
  courseTitle: string;
  enrollmentDate: string;
  status: 'pending' | 'approved' | 'rejected';
  lastSeen?: string;
}

interface EnrollmentDetailsProps {
  enrollment: Enrollment;
  onClose: () => void;
}

// Mock data - in real app, this would come from API
const initialEnrollments: Enrollment[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+977 9841234567',
    address: 'Kathmandu, Nepal',
    preferredLanguage: 'English',
    message: 'Interested in learning meditation techniques.',
    courseTitle: 'Meditation Retreat',
    enrollmentDate: '2024-03-15T10:30:00',
    status: 'pending',
    lastSeen: '2024-03-20T14:25:00'
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+977 9851234567',
    address: 'Pokhara, Nepal',
    preferredLanguage: 'Nepali',
    message: 'Looking forward to joining the course.',
    courseTitle: 'Buddhist Philosophy Class',
    enrollmentDate: '2024-03-14T15:45:00',
    status: 'approved',
    lastSeen: '2024-03-19T09:15:00'
  },
  {
    id: '3',
    fullName: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+977 9861234567',
    address: 'Lalitpur, Nepal',
    preferredLanguage: 'English',
    message: '',
    courseTitle: 'Meditation Retreat',
    enrollmentDate: '2024-03-16T08:20:00',
    status: 'pending',
    lastSeen: '2024-03-18T16:40:00'
  },
  {
    id: '4',
    fullName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+977 9871234567',
    address: 'Bhaktapur, Nepal',
    preferredLanguage: 'Tibetan',
    message: 'Excited to learn about Buddhist philosophy.',
    courseTitle: 'Buddhist Philosophy Class',
    enrollmentDate: '2024-03-13T11:10:00',
    status: 'approved',
    lastSeen: '2024-03-20T11:30:00'
  }
];

const AdminEnrollments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | Enrollment['status']>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');

  // Get unique course titles for filter
  const courseTitles = useMemo(() => {
    const titles = enrollments.map(e => e.courseTitle);
    return ['all', ...Array.from(new Set(titles))];
  }, [enrollments]);

  // Filter enrollments based on search term and filters
  const filteredEnrollments = useMemo(() => {
    return enrollments.filter(enrollment => {
      const matchesSearch = 
        enrollment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.phone.includes(searchTerm) ||
        enrollment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter;
      const matchesCourse = courseFilter === 'all' || enrollment.courseTitle === courseFilter;
      
      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [enrollments, searchTerm, statusFilter, courseFilter]);

  const handleStatusUpdate = (id: string, newStatus: Enrollment['status']) => {
    setEnrollments(enrollments.map(enrollment =>
      enrollment.id === id ? { ...enrollment, status: newStatus } : enrollment
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: Enrollment['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-600';
      case 'rejected': return 'bg-red-100 text-red-600';
      default: return 'bg-yellow-100 text-yellow-600';
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Address', 'Preferred Language', 'Course', 'Enrollment Date', 'Status', 'Last Seen'];
    const csvData = filteredEnrollments.map(enrollment => [
      enrollment.fullName,
      enrollment.email,
      enrollment.phone,
      enrollment.address,
      enrollment.preferredLanguage,
      enrollment.courseTitle,
      formatDate(enrollment.enrollmentDate),
      enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1),
      enrollment.lastSeen ? formatDate(enrollment.lastSeen) : 'Never'
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `enrollments-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
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
            Student Enrollments
          </motion.h1>
          <motion.button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </motion.button>
        </div>

        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or course..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                >
                  {courseTitles.map(title => (
                    <option key={title} value={title}>
                      {title === 'all' ? 'All Courses' : title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Enrollments Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-semibold text-gray-600">Student</th>
                  <th className="pb-3 font-semibold text-gray-600">Contact</th>
                  <th className="pb-3 font-semibold text-gray-600">Course</th>
                  <th className="pb-3 font-semibold text-gray-600">Enrollment Date</th>
                  <th className="pb-3 font-semibold text-gray-600">Last Seen</th>
                  <th className="pb-3 font-semibold text-gray-600">Status</th>
                  <th className="pb-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">{enrollment.fullName}</p>
                          <p className="text-sm text-gray-500 capitalize">{enrollment.preferredLanguage}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="text-sm">{enrollment.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="text-sm">{enrollment.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-medium text-gray-700">{enrollment.courseTitle}</p>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{formatDate(enrollment.enrollmentDate)}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-600 text-sm">
                        {enrollment.lastSeen ? formatDate(enrollment.lastSeen) : 'Never'}
                      </div>
                    </td>
                    <td className="py-4">
                      <select
                        value={enrollment.status}
                        onChange={(e) => handleStatusUpdate(enrollment.id, e.target.value as Enrollment['status'])}
                        className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${getStatusColor(enrollment.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedEnrollment(enrollment)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredEnrollments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No enrollments found. {searchTerm && 'Try adjusting your search or filters.'}
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{enrollments.length}</div>
              <div className="text-sm text-blue-600">Total Enrollments</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {enrollments.filter(e => e.status === 'pending').length}
              </div>
              <div className="text-sm text-yellow-600">Pending</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {enrollments.filter(e => e.status === 'approved').length}
              </div>
              <div className="text-sm text-green-600">Approved</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {enrollments.filter(e => e.status === 'rejected').length}
              </div>
              <div className="text-sm text-red-600">Rejected</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enrollment Details Modal */}
      <Modal
        isOpen={!!selectedEnrollment}
        onClose={() => setSelectedEnrollment(null)}
        title="Enrollment Details"
      >
        {selectedEnrollment && (
          <EnrollmentDetails 
            enrollment={selectedEnrollment} 
            onClose={() => setSelectedEnrollment(null)} 
          />
        )}
      </Modal>
    </AdminLayout>
  );
};

// Enrollment Details Component
const EnrollmentDetails: React.FC<EnrollmentDetailsProps> = ({ enrollment, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: Enrollment['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-600 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-yellow-100 text-yellow-600 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with basic info */}
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{enrollment.fullName}</h3>
          <div className="flex items-center space-x-4 mt-1">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(enrollment.status)}`}>
              {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
            </span>
            <span className="text-gray-600 capitalize">{enrollment.preferredLanguage}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700 border-b pb-2">Contact Information</h4>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-3" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm">{enrollment.email}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-3" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm">{enrollment.phone}</p>
              </div>
            </div>
            <div className="flex items-start text-gray-600">
              <MapPin className="w-4 h-4 mr-3 mt-1" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm">{enrollment.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700 border-b pb-2">Course Information</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Course Title</p>
              <p className="font-medium">{enrollment.courseTitle}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-3" />
              <div>
                <p className="text-sm font-medium">Enrollment Date</p>
                <p className="text-sm">{formatDate(enrollment.enrollmentDate)}</p>
              </div>
            </div>
            {enrollment.lastSeen && (
              <div>
                <p className="text-sm font-medium text-gray-600">Last Seen</p>
                <p className="text-sm">{formatDate(enrollment.lastSeen)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Message */}
      {enrollment.message && (
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700">Additional Message</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{enrollment.message}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminEnrollments;