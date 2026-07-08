import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Home, Mail } from 'lucide-react'

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="card p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-success" />
          </motion.div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Registration Successful!
          </h1>

          <p className="text-text-secondary mb-6">
            Thank you for registering for ConnectX Early Access. We've sent a confirmation email to your registered email address.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-text-secondary text-sm">
              <Mail className="w-5 h-5 text-primary" />
              <span>Check your inbox for confirmation</span>
            </div>
            <div className="flex items-center gap-3 text-text-secondary text-sm">
              <CheckCircle className="w-5 h-5 text-success" />
              <span>You'll receive updates about the launch</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/" className="btn-primary w-full inline-block">
              <Home className="inline mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-text-secondary text-sm"
        >
          <p>Need help? Contact us at connectxhelpsupport@gmail.com</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RegistrationSuccess
