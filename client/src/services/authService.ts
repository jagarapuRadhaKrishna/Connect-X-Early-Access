import api from './api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface Admin {
  id: number
  email: string
  full_name: string
  role: 'super_admin' | 'admin'
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  logout: async () => {
    await api.post('/auth/logout')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('admin')
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh')
    return response.data
  },
}
