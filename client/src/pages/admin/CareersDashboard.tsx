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
  FileText,
  BarChart3,
  PieChart,
  ArrowRight,
  Briefcase,
  Code,
  Settings,
} from 'lucide-react'
import { toast } from 'sonner'
import api from '../../services/api'

const CareersDashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'pipeline' | 'analytics'>('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  
  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['careerDashboardStats'],
    queryFn: () => api.get('/careers/dashboard/stats').then(res => res.data),
  })

  // Fetch analytics data
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['careerAnalytics'],
    queryFn: () => api.get('/careers/analytics/data').then(res => res.data),
  })

  // Fetch applications
  const { data: applicationsData, isLoading: applicationsLoading } = useQuery({
    queryKey: ['careerApplications', statusFilter, searchTerm],
    queryFn: () => api.get('/careers', { 
      params: { status: statusFilter, search: searchTerm } 
    }).then(res => res.data),
  })

  const applications = applicationsData?.applications || []


  const handleExport = async (format: 'excel' | 'csv' | 'pdf') => {
    try {
      const response = await api.get(`/export/${format}`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `career-applications.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success(`Exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Export failed')
    }
  }

  const pipelineStages = [
    { id: 'applied', label: 'Applied', icon: Users, color: 'bg-blue-500' },
    { id: 'resume_review', label: 'Resume Review', icon: FileText, color: 'bg-purple-500' },
    { id: 'technical_assessment', label: 'Technical Assessment', icon: Code, color: 'bg-orange-500' },
    { id: 'technical_interview', label: 'Technical Interview', icon: Briefcase, color: 'bg-yellow-500' },
    { id: 'founder_discussion', label: 'Founder Discussion', icon: Settings, color: 'bg-pink-500' },
    { id: 'selected', label: 'Selected', icon: CheckCircle, color: 'bg-green-500' },
    { id: 'offer', label: 'Offer', icon: Briefcase, color: 'bg-teal-500' },
    { id: 'joined', label: 'Joined', icon: CheckCircle, color: 'bg-emerald-500' },
    { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'bg-red-500' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'selected': case 'offer': case 'joined': return 'text-success bg-success/10'
      case 'rejected': return 'text-error bg-error/10'
      case 'applied': return 'text-blue-400 bg-blue-400/10'
      case 'resume_review': return 'text-purple-400 bg-purple-400/10'
      case 'technical_assessment': return 'text-orange-400 bg-orange-400/10'
      case 'technical_interview': return 'text-yellow-400 bg-yellow-400/10'
      case 'founder_discussion': return 'text-pink-400 bg-pink-400/10'
      default: return 'text-text-secondary bg-surface'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Careers Dashboard</h1>
          <p className="text-text-secondary">Manage hiring pipeline and applications</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport('excel')} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </button>
          <button onClick={() => handleExport('csv')} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'applications', label: 'Applications', icon: Users },
          { id: 'pipeline', label: 'Pipeline', icon: ArrowRight },
          { id: 'analytics', label: 'Analytics', icon: PieChart },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsLoading ? (
              Array(4).fill(0).map((_, i) => <div key={i} className="card p-6 skeleton h-32" />)
            ) : (
              [
                { label: 'Total Applications', value: stats?.total || 0, icon: Users, color: 'text-primary' },
                { label: "Today's Applications", value: stats?.today || 0, icon: Calendar, color: 'text-accent' },
                { label: 'Pending Review', value: stats?.pending || 0, icon: Clock, color: 'text-warning' },
                { label: 'Selected', value: stats?.selected || 0, icon: CheckCircle, color: 'text-success' },
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

          {/* Recent Applications */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Recent Applications</h2>
            <div className="space-y-3">
              {applicationsLoading ? (
                Array(5).fill(0).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)
              ) : applications.slice(0, 5).length === 0 ? (
                <div className="text-center py-8 text-text-secondary">No applications yet</div>
              ) : (
                applications.slice(0, 5).map((app: any) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 bg-surface rounded-xl hover:bg-surface-light transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">{app.full_name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{app.full_name}</div>
                        <div className="text-sm text-text-secondary">{app.role_applying_for}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.application_status)}`}>
                        {app.application_status.replace('_', ' ')}
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

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
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
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field min-w-[150px]">
                  <option value="all">All Status</option>
                  {pipelineStages.map(stage => (
                    <option key={stage.id} value={stage.id}>{stage.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Applicant</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {applicationsLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i}><td colSpan={6} className="px-6 py-4"><div className="skeleton h-12 rounded" /></td></tr>
                    ))
                  ) : applications.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-text-secondary">No applications found</td></tr>
                  ) : (
                    applications.map((app: any) => (
                      <tr key={app.id} className="hover:bg-surface/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-primary font-semibold">{app.full_name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-medium text-text-primary">{app.full_name}</div>
                              <div className="text-sm text-text-secondary">{app.application_id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-primary">{app.role_applying_for}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary capitalize">{app.experience_level.replace('_', ' ')}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.application_status)}`}>
                            {app.application_status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{new Date(app.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
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

      {/* Pipeline Tab */}
      {activeTab === 'pipeline' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6">Hiring Pipeline</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {pipelineStages.map((stage) => (
                <div key={stage.id} className="flex-shrink-0 w-48">
                  <div className={`${stage.color} text-white p-4 rounded-xl mb-2`}>
                    <stage.icon className="w-6 h-6 mb-2" />
                    <h3 className="font-semibold">{stage.label}</h3>
                  </div>
                  <div className="text-center text-text-secondary text-sm">
                    {applications.filter((app: any) => app.application_status === stage.id).length} candidates
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {analyticsLoading ? (
            <div className="card p-6 skeleton h-96" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Top Roles</h3>
                <div className="space-y-3">
                  {analytics?.top_roles?.map((item: any) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="text-text-secondary">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${(item.count / (analytics?.top_roles?.[0]?.count || 1)) * 100}%` }} />
                        </div>
                        <span className="text-sm text-text-primary w-12 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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

              <div className="card p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Experience Distribution</h3>
                <div className="space-y-3">
                  {analytics?.experience_distribution?.map((item: any) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="text-text-secondary capitalize">{item.name.replace('_', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: `${(item.count / (analytics?.experience_distribution?.[0]?.count || 1)) * 100}%` }} />
                        </div>
                        <span className="text-sm text-text-primary w-12 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Status Distribution</h3>
                <div className="space-y-3">
                  {analytics?.status_distribution?.map((item: any) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="text-text-secondary capitalize">{item.name.replace('_', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                          <div className="h-full bg-success" style={{ width: `${(item.count / (analytics?.status_distribution?.[0]?.count || 1)) * 100}%` }} />
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
    </div>
  )
}

export default CareersDashboard
