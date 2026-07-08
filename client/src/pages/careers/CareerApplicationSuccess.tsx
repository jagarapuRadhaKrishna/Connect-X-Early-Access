import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Home, Mail, ArrowRight } from 'lucide-react'

const CareerApplicationSuccess = () => {
  const [searchParams] = useSearchParams()
  const applicationId = searchParams.get('id') || 'N/A'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="card p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-16 h-16 text-success" />
          </motion.div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Application Submitted Successfully!
          </h1>

          <div className="bg-surface p-4 rounded-xl mb-6">
            <p className="text-text-secondary text-sm mb-2">Your Application ID</p>
            <p className="text-2xl font-bold text-primary">{applicationId}</p>
          </div>

          <p className="text-text-secondary mb-8">
            Thank you for your interest in joining the ConnectX founding team. We've sent a confirmation email to your registered email address.
          </p>

          <div className="space-y-4 mb-8 text-left">
            <h3 className="font-semibold text-text-primary mb-3">Next Steps</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-text-secondary text-sm">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">1</span>
                </div>
                <span>Our team will review your application</span>
              </div>
              <div className="flex items-start gap-3 text-text-secondary text-sm">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">2</span>
                </div>
                <span>Shortlisted candidates will be contacted for interviews</span>
              </div>
              <div className="flex items-start gap-3 text-text-secondary text-sm">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">3</span>
                </div>
                <span>Selected candidates will join our founding team</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/careers" className="btn-primary w-full inline-block">
              <Home className="inline mr-2" />
              Back to Careers
            </Link>
            <Link to="/" className="btn-secondary w-full inline-block">
              Explore ConnectX
              <ArrowRight className="inline ml-2" />
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-text-secondary text-sm space-y-2"
        >
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            <span>connectx.talent@gmail.com</span>
          </div>
          <p>We'll be in touch soon!</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CareerApplicationSuccess
