import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Download,
  Eye,
  MoreVertical,
  Calendar,
  MapPin,
  GraduationCap,
  Mail,
  Phone,
  FileText,
  BarChart3,
  PieChart,
} from 'lucide-react'
import { toast } from 'sonner'
import { registrationService } from '../../services/registrationService'
import api from '../../services/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'registrations' | 'analytics'>('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => registrationService.getDashboardStats(),
  })

  // Fetch analytics data
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => registrationService.getAnalytics(),
  })

  // Fetch registrations
  const { data: registrationsData, isLoading: registrationsLoading, refetch } = useQuery({
    queryKey: ['registrations', statusFilter, searchTerm],
    queryFn: () => registrationService.getAllRegistrations({ status: statusFilter, search: searchTerm }),
  })

  const registrations = registrationsData?.registrations || []

  const handleApprove = async (id: number) => {
    try {
      await registrationService.approveRegistration(id)
      toast.success('Registration approved successfully')
      refetch()
      setIsModalOpen(false)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to approve registration')
    }
  }

  const handleReject = async (id: number, reason: string) => {
    try {
      await registrationService.rejectRegistration(id, reason)
      toast.success('Registration rejected successfully')
      refetch()
      setIsModalOpen(false)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to reject registration')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this registration?')) return
    try {
      await registrationService.deleteRegistration(id)
      toast.success('Registration deleted successfully')
      refetch()
      setIsModalOpen(false)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete registration')
    }
  }

  const handleExport = async (format: 'excel' | 'csv' | 'pdf') => {
    try {
      const response = await api.get(`/export/${format}`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `registrations.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success(`Exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Export failed')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-success bg-success/10'
      case 'rejected': return 'text-error bg-error/10'
      case 'pending': return 'text-warning bg-warning/10'
      default: return 'text-text-secondary bg-surface'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary">Manage student registrations</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('excel')}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'registrations', label: 'Registrations', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: PieChart },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-surface'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="card p-6 skeleton h-32" />
              ))
            ) : (
              [
                { label: 'Total Registrations', value: stats?.total || 0, icon: Users, color: 'text-primary' },
                { label: 'Pending', value: stats?.pending || 0, icon: Clock, color: 'text-warning' },
                { label: 'Approved', value: stats?.approved || 0, icon: CheckCircle, color: 'text-success' },
                { label: 'Rejected', value: stats?.rejected || 0, icon: XCircle, color: 'text-error' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <div className="text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </motion.div>
              ))
            )}
          </div>

          {/* Recent Registrations */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Recent Registrations</h2>
            <div className="space-y-3">
              {registrationsLoading ? (
                Array(5).fill(0).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)
              ) : registrations.slice(0, 5).length === 0 ? (
                <div className="text-center py-8 text-text-secondary">No registrations yet</div>
              ) : (
                registrations.slice(0, 5).map((reg: any) => (
                  <div
                    key={reg.id}
                    className="flex items-center justify-between p-4 bg-surface rounded-xl hover:bg-surface-light transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedRegistration(reg)
                      setIsModalOpen(true)
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">{reg.full_name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{reg.full_name}</div>
                        <div className="text-sm text-text-secondary">{reg.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}>
                        {reg.status}
                      </span>
                      <Eye className="w-5 h-5 text-text-muted" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Registrations Tab */}
      {activeTab === 'registrations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Filters */}
          <div className="card p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field min-w-[150px]"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Registrations Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      College
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {registrationsLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i}>
                        <td colSpan={6} className="px-6 py-4"><div className="skeleton h-12 rounded" /></td>
                      </tr>
                    ))
                  ) : registrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                        No registrations found
                      </td>
                    </tr>
                  ) : (
                    registrations.map((reg: any) => (
                      <tr key={reg.id} className="hover:bg-surface/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-primary font-semibold">{reg.full_name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-medium text-text-primary">{reg.full_name}</div>
                              <div className="text-sm text-text-secondary">{reg.registration_id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-text-primary">{reg.email}</div>
                          <div className="text-sm text-text-secondary">{reg.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-text-primary">{reg.college_name}</div>
                          <div className="text-sm text-text-secondary">{reg.degree} - {reg.branch}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}>
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedRegistration(reg)
                              setIsModalOpen(true)
                            }}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-5 h-5 text-text-muted" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {analyticsLoading ? (
            <div className="card p-6 skeleton h-96" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Looking For Distribution */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Looking For</h3>
                <div className="space-y-3">
                  {analytics?.looking_for?.map((item: any) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="text-text-secondary">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-text-primary w-12 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graduation Year Distribution */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Graduation Year</h3>
                <div className="space-y-3">
                  {analytics?.graduation_years?.map((item: any) => (
                    <div key={item.year} className="flex items-center justify-between">
                      <span className="text-text-secondary">{item.year}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-text-primary w-12 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Colleges */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Top Colleges</h3>
                <div className="space-y-3">
                  {analytics?.top_colleges?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-text-secondary truncate">{item.college}</span>
                      <span className="text-sm text-text-primary">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Interests */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Feature Interests</h3>
                <div className="space-y-3">
                  {analytics?.feature_interests?.map((item: any) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="text-text-secondary">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                          <div
                            className="h-full bg-success"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-text-primary w-12 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Registration Detail Modal */}
      {isModalOpen && selectedRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Registration Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" /> Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-secondary">Full Name</label>
                    <p className="text-text-primary">{selectedRegistration.full_name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">Registration ID</label>
                    <p className="text-text-primary">{selectedRegistration.registration_id}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email
                    </label>
                    <p className="text-text-primary">{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Phone
                    </label>
                    <p className="text-text-primary">{selectedRegistration.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">Gender</label>
                    <p className="text-text-primary capitalize">{selectedRegistration.gender}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> DOB
                    </label>
                    <p className="text-text-primary">{new Date(selectedRegistration.date_of_birth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> City
                    </label>
                    <p className="text-text-primary">{selectedRegistration.current_city}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">State</label>
                    <p className="text-text-primary">{selectedRegistration.state}</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" /> Education
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-secondary">College</label>
                    <p className="text-text-primary">{selectedRegistration.college_name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">Degree</label>
                    <p className="text-text-primary">{selectedRegistration.degree}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">Branch</label>
                    <p className="text-text-primary">{selectedRegistration.branch}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">Graduation Year</label>
                    <p className="text-text-primary">{selectedRegistration.graduation_year}</p>
                  </div>
                  {selectedRegistration.cgpa && (
                    <div>
                      <label className="text-xs text-text-secondary">CGPA</label>
                      <p className="text-text-primary">{selectedRegistration.cgpa}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Career Interests */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Career Interests
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-secondary">Looking For</label>
                    <p className="text-text-primary">{Array.isArray(selectedRegistration.looking_for) ? selectedRegistration.looking_for.join(', ') : selectedRegistration.looking_for}</p>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">Preferred Role</label>
                    <p className="text-text-primary">{selectedRegistration.preferred_job_role}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-text-secondary">Preferred Location</label>
                    <p className="text-text-primary">{selectedRegistration.preferred_job_location}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-xs text-text-secondary">Current Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRegistration.status)}`}>
                  {selectedRegistration.status}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-white/10 flex gap-3">
              {selectedRegistration.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleApprove(selectedRegistration.id)}
                    className="flex-1 btn-primary"
                  >
                    <CheckCircle className="inline mr-2 w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt('Enter rejection reason:')
                      if (reason) handleReject(selectedRegistration.id, reason)
                    }}
                    className="flex-1 bg-error hover:bg-error-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    <XCircle className="inline mr-2 w-4 h-4" />
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(selectedRegistration.id)}
                className="flex-1 btn-secondary text-error hover:bg-error/10"
              >
                <FileText className="inline mr-2 w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
