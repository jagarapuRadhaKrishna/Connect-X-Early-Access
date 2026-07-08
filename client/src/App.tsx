import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import LandingPage from './pages/landing/LandingPage'
import RegistrationForm from './pages/registration/RegistrationForm'
import RegistrationSuccess from './pages/registration/RegistrationSuccess'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLayout from './layouts/AdminLayout'
import CareersLanding from './pages/careers/CareersLanding'
import CareerApplicationForm from './pages/careers/CareerApplicationForm'
import CareerApplicationSuccess from './pages/careers/CareerApplicationSuccess'
import CareersDashboard from './pages/admin/CareersDashboard'
import FeaturesPage from './pages/features/FeaturesPage'
import RolesPage from './pages/careers/RolesPage'
import CreatorsPage from './pages/creators/CreatorsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/success" element={<RegistrationSuccess />} />
          <Route path="/creators" element={<CreatorsPage />} />
          
          {/* Careers Routes */}
          <Route path="/careers" element={<CareersLanding />} />
          <Route path="/careers/roles/:department" element={<RolesPage />} />
          <Route path="/careers/apply" element={<CareerApplicationForm />} />
          <Route path="/careers/success" element={<CareerApplicationSuccess />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="registrations" element={<AdminDashboard />} />
            <Route path="careers" element={<CareersDashboard />} />
            <Route path="analytics" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: '#151A28',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F8FAFC',
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
