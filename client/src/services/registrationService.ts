import api from './api'

export interface RegistrationData {
  full_name: string
  email: string
  phone: string
  whatsapp: string
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  date_of_birth: string
  current_city: string
  state: string
  college_name: string
  degree: string
  branch: string
  graduation_year: number
  cgpa?: number
  looking_for: string[]
  preferred_job_role: string
  preferred_job_location: string
  feature_interests: string[]
  campus_ambassador: 'yes' | 'no' | 'maybe'
  suggestions?: string
}

export const registrationService = {
  createRegistration: async (data: RegistrationData) => {
    const response = await api.post('/registrations', data)
    return response.data
  },

  getRegistrationById: async (id: string) => {
    const response = await api.get(`/registrations/${id}`)
    return response.data
  },

  getAllRegistrations: async (params?: any) => {
    const response = await api.get('/registrations', { params })
    return response.data
  },

  updateRegistration: async (id: number, data: Partial<RegistrationData>) => {
    const response = await api.put(`/registrations/${id}`, data)
    return response.data
  },

  approveRegistration: async (id: number) => {
    const response = await api.post(`/registrations/${id}/approve`)
    return response.data
  },

  rejectRegistration: async (id: number, reason: string) => {
    const response = await api.post(`/registrations/${id}/reject`, { reason })
    return response.data
  },

  deleteRegistration: async (id: number) => {
    const response = await api.delete(`/registrations/${id}`)
    return response.data
  },

  getDashboardStats: async () => {
    const response = await api.get('/registrations/dashboard/stats')
    return response.data
  },

  getAnalytics: async () => {
    const response = await api.get('/registrations/analytics/data')
    return response.data
  },
}
