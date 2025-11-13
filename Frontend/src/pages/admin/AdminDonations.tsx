import type React from "react"
import { useState, useEffect } from "react"
import { Search, Download, Eye, X, FileText, User, DollarSign, Filter } from "lucide-react"

// Define types for our support submissions
interface SupportSubmission {
  id: string
  type: "One-time Donation" | "Monthly Giving" | "Volunteer" | "In-Kind Donation"
  name: string
  email: string
  amount?: string
  frequency?: "one-time" | "monthly"
  screenshot?: string // URL or base64 string
  submittedAt: Date
  status: "pending" | "verified" | "rejected"
}

const AdminSupportUser: React.FC = () => {
  const [submissions, setSubmissions] = useState<SupportSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<SupportSubmission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<SupportSubmission | null>(null)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate fetching data
    const mockSubmissions: SupportSubmission[] = [
      {
        id: "1",
        type: "One-time Donation",
        name: "John Doe",
        email: "john@example.com",
        amount: "100.00",
        frequency: "one-time",
        screenshot: "https://via.placeholder.com/300x200?text=Payment+Screenshot",
        submittedAt: new Date(2023, 10, 15),
        status: "verified"
      },
      {
        id: "2",
        type: "Monthly Giving",
        name: "Jane Smith",
        email: "jane@example.com",
        amount: "50.00",
        frequency: "monthly",
        screenshot: "https://via.placeholder.com/300x200?text=Payment+Screenshot",
        submittedAt: new Date(2023, 10, 14),
        status: "pending"
      },
      {
        id: "3",
        type: "Volunteer",
        name: "Robert Johnson",
        email: "robert@example.com",
        submittedAt: new Date(2023, 10, 13),
        status: "pending"
      },
      {
        id: "4",
        type: "In-Kind Donation",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        submittedAt: new Date(2023, 10, 12),
        status: "verified"
      },
      {
        id: "5",
        type: "One-time Donation",
        name: "Michael Brown",
        email: "michael@example.com",
        amount: "200.00",
        frequency: "one-time",
        screenshot: "https://via.placeholder.com/300x200?text=Payment+Screenshot",
        submittedAt: new Date(2023, 10, 11),
        status: "rejected"
      }
    ]
    
    setSubmissions(mockSubmissions)
    setFilteredSubmissions(mockSubmissions)
  }, [])

  // Filter submissions based on search and filters
  useEffect(() => {
    let result = submissions
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase()
      result = result.filter(submission => 
        submission.name.toLowerCase().includes(lowercasedSearch) ||
        submission.email.toLowerCase().includes(lowercasedSearch) ||
        submission.type.toLowerCase().includes(lowercasedSearch)
      )
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter(submission => submission.type === typeFilter)
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(submission => submission.status === statusFilter)
    }
    
    setFilteredSubmissions(result)
  }, [searchTerm, typeFilter, statusFilter, submissions])

  const handleViewDetails = (submission: SupportSubmission) => {
    setSelectedSubmission(submission)
  }

  const handleCloseDetails = () => {
    setSelectedSubmission(null)
  }

  const handleViewScreenshot = (submission: SupportSubmission) => {
    setSelectedSubmission(submission)
    setIsImageViewerOpen(true)
  }

  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false)
  }

  const handleStatusChange = (id: string, newStatus: "pending" | "verified" | "rejected") => {
    setSubmissions(prev => 
      prev.map(submission => 
        submission.id === id ? { ...submission, status: newStatus } : submission
      )
    )
  }

  const exportToExcel = () => {
    // In a real app, you would use a library like xlsx to create an Excel file
    // For this example, we'll create a CSV format
    
    const headers = ["ID", "Type", "Name", "Email", "Amount", "Frequency", "Submitted At", "Status"]
    
    const csvContent = [
      headers.join(","),
      ...filteredSubmissions.map(submission => [
        submission.id,
        submission.type,
        `"${submission.name}"`,
        submission.email,
        submission.amount || "N/A",
        submission.frequency || "N/A",
        submission.submittedAt.toLocaleDateString(),
        submission.status
      ].join(","))
    ].join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "support-submissions.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "One-time Donation":
      case "Monthly Giving":
        return <DollarSign className="w-4 h-4" />
      case "Volunteer":
        return <User className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Support Submissions</h1>
          <p className="text-gray-600">Manage donations, volunteer applications, and other support submissions</p>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or type..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Type Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 w-4 h-4" />
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="One-time Donation">One-time Donation</option>
                  <option value="Monthly Giving">Monthly Giving</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="In-Kind Donation">In-Kind Donation</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={exportToExcel}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export to Excel</span>
            </button>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTypeIcon(submission.type)}
                          <span className="ml-2 text-sm font-medium text-gray-900">{submission.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {submission.amount ? `$${submission.amount}` : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {submission.submittedAt.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(submission.status)} border-0 focus:ring-2 focus:ring-red-500`}
                          value={submission.status}
                          onChange={(e) => handleStatusChange(submission.id, e.target.value as "pending" | "verified" | "rejected")}
                        >
                          <option value="pending">Pending</option>
                          <option value="verified">Verified</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(submission)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </button>
                          {submission.screenshot && (
                            <button
                              onClick={() => handleViewScreenshot(submission)}
                              className="text-purple-600 hover:text-purple-900 flex items-center"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              Screenshot
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No submissions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submission Details Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b flex items-center justify-between p-6">
                <h2 className="text-2xl font-bold text-gray-800">Submission Details</h2>
                <button onClick={handleCloseDetails} className="text-gray-500 hover:text-gray-700 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Type</h3>
                    <p className="text-lg font-semibold">{selectedSubmission.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedSubmission.status)}`}>
                      {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="text-lg">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-lg">{selectedSubmission.email}</p>
                  </div>
                  {selectedSubmission.amount && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                      <p className="text-lg">${selectedSubmission.amount}</p>
                    </div>
                  )}
                  {selectedSubmission.frequency && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Frequency</h3>
                      <p className="text-lg">{selectedSubmission.frequency}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Submitted At</h3>
                    <p className="text-lg">{selectedSubmission.submittedAt.toLocaleString()}</p>
                  </div>
                </div>

                {selectedSubmission.screenshot && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Screenshot</h3>
                    <img 
                      src={selectedSubmission.screenshot} 
                      alt="Payment screenshot" 
                      className="max-w-full h-auto rounded-lg border border-gray-200"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={handleCloseDetails}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <select
                    className={`px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-red-500 ${getStatusColor(selectedSubmission.status)}`}
                    value={selectedSubmission.status}
                    onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value as "pending" | "verified" | "rejected")}
                  >
                    <option value="pending">Mark as Pending</option>
                    <option value="verified">Mark as Verified</option>
                    <option value="rejected">Mark as Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Viewer Modal */}
        {isImageViewerOpen && selectedSubmission && selectedSubmission.screenshot && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full">
              <div className="sticky top-0 bg-white border-b flex items-center justify-between p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Payment Screenshot - {selectedSubmission.name}
                </h3>
                <button onClick={handleCloseImageViewer} className="text-gray-500 hover:text-gray-700 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4 flex justify-center">
                <img 
                  src={selectedSubmission.screenshot} 
                  alt="Payment screenshot" 
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              <div className="border-t p-4 flex justify-end">
                <button
                  onClick={handleCloseImageViewer}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSupportUser