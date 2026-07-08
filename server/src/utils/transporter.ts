import nodemailer from 'nodemailer'

/**
 * Creates and configures the Nodemailer transporter
 * Reads SMTP credentials from environment variables for security
 * Verifies connection during server startup
 */
export const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  return transporter
}

/**
 * Verifies the transporter connection
 * Used during server startup to ensure SMTP is configured correctly
 */
export const verifyTransporter = async (transporter: nodemailer.Transporter) => {
  try {
    await transporter.verify()
    console.log('✅ Email transporter verified successfully')
    return true
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error)
    return false
  }
}

export default createTransporter
