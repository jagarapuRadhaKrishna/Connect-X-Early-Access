import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, User, GraduationCap, Briefcase, Sparkles, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { registrationService, type RegistrationData } from '../../services/registrationService'

const registrationSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters').max(255),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  whatsapp: z.string().regex(/^[0-9]{10}$/, 'WhatsApp number must be 10 digits'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  date_of_birth: z.string().refine((date) => {
    const dob = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - dob.getFullYear()
    return age >= 16 && age <= 35
  }, 'Age must be between 16 and 35'),
  current_city: z.string().min(2, 'City must be at least 2 characters').max(100),
  state: z.string().min(2, 'State must be at least 2 characters').max(100),
  college_name: z.string().min(2, 'College name must be at least 2 characters').max(255),
  degree: z.string().min(2, 'Degree must be at least 2 characters').max(100),
  branch: z.string().min(2, 'Branch must be at least 2 characters').max(100),
  graduation_year: z.number().int().min(2024).max(2030),
  cgpa: z.number().min(0).max(10).optional(),
  looking_for: z.array(z.string()).min(1, 'Select at least one option'),
  preferred_job_role: z.string().min(2, 'Job role must be at least 2 characters').max(100),
  preferred_job_location: z.string().min(2, 'Location must be at least 2 characters').max(100),
  feature_interests: z.array(z.string()).min(1, 'Select at least one feature'),
  campus_ambassador: z.enum(['yes', 'no', 'maybe']).default('no'),
  suggestions: z.string().max(1000).optional(),
})

type FormData = z.infer<typeof registrationSchema>

const degrees = [
  'B.Tech/B.E.',
  'B.Sc',
  'B.Com',
  'B.A',
  'BCA',
  'BBA',
  'M.Tech/M.E.',
  'M.Sc',
  'M.Com',
  'M.A',
  'MCA',
  'MBA',
  'PhD',
  'Diploma',
  'Other'
]

const branches = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Aerospace Engineering',
  'Data Science',
  'Artificial Intelligence',
  'Business Administration',
  'Commerce',
  'Arts',
  'Science',
  'Other'
]

const jobRoles = [
  'React Frontend Developer',
  'Node.js Developer',
  'Full Stack Developer',
  'UI Designer',
  'UX Designer',
  'AI Engineer',
  'Prompt Engineer',
  'Cloud Engineer',
  'DevOps Engineer',
  'Database Engineer',
  'QA Engineer',
  'React Native Developer',
  'Flutter Developer',
  'Social Media Manager',
  'Content Writer',
  'SEO Executive',
  'Digital Marketing',
  'Community Manager',
  'HR',
  'Recruitment Coordinator',
  'Business Development',
  'Customer Success',
  'Software Engineer',
  'Data Analyst',
  'Product Manager',
  'Other'
]

const jobLocations = [
  'Hyderabad',
  'Bengaluru',
  'Chennai',
  'Mumbai',
  'Delhi',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Remote',
  'Other'
]

const indianStates = [
  'ANDHRA PRADESH',
  'ARUNACHAL PRADESH',
  'ASSAM',
  'BIHAR',
  'CHHATTISGARH',
  'GOA',
  'GUJARAT',
  'HARYANA',
  'HIMACHAL PRADESH',
  'JHARKHAND',
  'KARNATAKA',
  'KERALA',
  'MADHYA PRADESH',
  'MAHARASHTRA',
  'MANIPUR',
  'MEGHALAYA',
  'MIZORAM',
  'NAGALAND',
  'ODISHA',
  'PUNJAB',
  'RAJASTHAN',
  'SIKKIM',
  'TAMIL NADU',
  'TELENGANA',
  'TRIPURA',
  'UTTAR PRADESH',
  'UTTARAKHAND',
  'WEST BENGAL',
  'ANDAMAN AND NICOBAR ISLANDS',
  'CHANDIGARH',
  'DADRA AND NAGAR HAVELI AND DAMAN AND DIU',
  'DELHI',
  'JAMMU AND KASHMIR',
  'LADAKH',
  'LAKSHADWEEP',
  'PUDUCHERRY'
]

const steps = [
  { id: 1, title: 'Personal Information', icon: User },
  { id: 2, title: 'Education', icon: GraduationCap },
  { id: 3, title: 'Career Interests', icon: Briefcase },
  { id: 4, title: 'ConnectX Features', icon: Sparkles },
  { id: 5, title: 'Suggestions', icon: Send },
  { id: 6, title: 'Terms & Submit', icon: Check },
]

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      campus_ambassador: 'no',
      looking_for: [],
      feature_interests: [],
      suggestions: ''
    }
  })

  const lookingFor = watch('looking_for') || []
  const featureInterests = watch('feature_interests') || []

  const onSubmit = async (data: FormData) => {
    try {
      await registrationService.createRegistration(data as RegistrationData)
      navigate('/success')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed. Please try again.')
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const toggleLookingFor = (value: string) => {
    const current = lookingFor || []
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]
    setValue('looking_for', updated)
  }

  const toggleFeatureInterests = (value: string) => {
    const current = featureInterests || []
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]
    setValue('feature_interests', updated)
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="ConnectX Logo" className="h-[52px] md:h-[62px] w-auto max-w-[240px] object-contain" />
            </Link>
            <div>
              <Link to="/" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.id
                        ? 'bg-primary text-white'
                        : 'bg-surface text-text-secondary'
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <span className="text-xs mt-2 text-text-secondary hidden sm:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-surface'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Full Name *</label>
                    <input
                      {...register('full_name')}
                      type="text"
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                    {errors.full_name && <p className="text-error text-sm mt-1">{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Email *</label>
                    <input
                      {...register('email')}
                      type="email"
                      className="input-field"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Phone Number *</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="input-field"
                        placeholder="10 digit number"
                      />
                      {errors.phone && <p className="text-error text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">WhatsApp Number *</label>
                      <input
                        {...register('whatsapp')}
                        type="tel"
                        className="input-field"
                        placeholder="10 digit number"
                      />
                      {errors.whatsapp && <p className="text-error text-sm mt-1">{errors.whatsapp.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Gender *</label>
                      <select {...register('gender')} className="select-field">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                      {errors.gender && <p className="text-error text-sm mt-1">{errors.gender.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Date of Birth *</label>
                      <input
                        {...register('date_of_birth')}
                        type="date"
                        className="input-field"
                      />
                      {errors.date_of_birth && <p className="text-error text-sm mt-1">{errors.date_of_birth.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Current City *</label>
                      <input
                        {...register('current_city')}
                        type="text"
                        className="input-field"
                        placeholder="City"
                      />
                      {errors.current_city && <p className="text-error text-sm mt-1">{errors.current_city.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">State *</label>
                      <select {...register('state')} className="select-field">
                        <option value="">Select state</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-error text-sm mt-1">{errors.state.message}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Education */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Education</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">College Name *</label>
                    <input
                      {...register('college_name')}
                      type="text"
                      className="input-field"
                      placeholder="Your college/university"
                    />
                    {errors.college_name && <p className="text-error text-sm mt-1">{errors.college_name.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Degree *</label>
                      <select {...register('degree')} className="select-field">
                        <option value="">Select degree</option>
                        {degrees.map(degree => (
                          <option key={degree} value={degree}>{degree}</option>
                        ))}
                      </select>
                      {errors.degree && <p className="text-error text-sm mt-1">{errors.degree.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Branch *</label>
                      <select {...register('branch')} className="select-field">
                        <option value="">Select branch</option>
                        {branches.map(branch => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
                      {errors.branch && <p className="text-error text-sm mt-1">{errors.branch.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Graduation Year *</label>
                      <select {...register('graduation_year', { valueAsNumber: true })} className="select-field">
                        <option value="">Select year</option>
                        {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.graduation_year && <p className="text-error text-sm mt-1">{errors.graduation_year.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">CGPA (Optional)</label>
                      <input
                        {...register('cgpa', { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        className="input-field"
                        placeholder="0.00 - 10.00"
                      />
                      {errors.cgpa && <p className="text-error text-sm mt-1">{errors.cgpa.message}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Career Interests */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Career Interests</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">What are you looking for? *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Internship', 'Full Time', 'Placement Assistance', 'Career Guidance'].map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleLookingFor(option)}
                          className={`p-3 rounded-xl border-2 transition-all text-left flex items-center ${
                            lookingFor.includes(option)
                              ? 'border-primary bg-primary text-white font-bold shadow-xl shadow-primary/50'
                              : 'border-white/10 bg-surface text-text-secondary hover:border-white/30'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-2 flex-shrink-0 ${
                            lookingFor.includes(option) ? 'bg-white border-white' : 'border-white/30'
                          }`}>
                            {lookingFor.includes(option) && <Check className="w-4 h-4 text-primary" strokeWidth={3} />}
                          </div>
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.looking_for && <p className="text-error text-sm mt-1">{errors.looking_for.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Preferred Job Role *</label>
                    <select {...register('preferred_job_role')} className="select-field">
                      <option value="">Select role</option>
                      {jobRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    {errors.preferred_job_role && <p className="text-error text-sm mt-1">{errors.preferred_job_role.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Preferred Job Location *</label>
                    <select {...register('preferred_job_location')} className="select-field">
                      <option value="">Select location</option>
                      {jobLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                    {errors.preferred_job_location && <p className="text-error text-sm mt-1">{errors.preferred_job_location.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: ConnectX Features */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-2">ConnectX Features</h2>
                <p className="text-text-secondary mb-6">Select all features you're interested in exploring: *</p>
                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                  {[
                    {
                      category: 'Candidate Platform & AI Engine',
                      items: ['AI Resume Builder', 'Resume Parsing & Tailoring', 'ATS Score Optimization', 'AI Cover Letter Generator', 'Smart Profile & Easy Apply']
                    },
                    {
                      category: 'AI Career Copilot',
                      items: ['AI Mock Interviews', 'AI Career Guidance', 'Skill Roadmaps & Suggestions', 'Goal & Progress Tracking']
                    },
                    {
                      category: 'Assessments & Interviews',
                      items: ['Coding Challenges', 'SQL & Full Stack Tests', 'HD Video Virtual Interviews', 'AI Interview Feedback']
                    },
                    {
                      category: 'Professional Network',
                      items: ['Connect with Peers/Recruiters', 'Share Projects & Portfolios', 'Verify Certificates', 'Communities & Webinars']
                    }
                  ].map(group => (
                    <div key={group.category} className="space-y-3">
                      <h3 className="text-sm font-bold text-primary tracking-wider uppercase border-b border-white/5 pb-1">{group.category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {group.items.map(feature => (
                          <button
                            key={feature}
                            type="button"
                            onClick={() => toggleFeatureInterests(feature)}
                            className={`p-3 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                              featureInterests.includes(feature)
                                ? 'border-primary bg-primary text-white font-bold shadow-xl shadow-primary/50'
                                : 'border-white/10 bg-surface text-text-secondary hover:border-white/30'
                            }`}
                          >
                            <span className="text-sm">{feature}</span>
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              featureInterests.includes(feature) ? 'bg-white border-white' : 'border-white/30'
                            }`}>
                              {featureInterests.includes(feature) && <Check className="w-4 h-4 text-primary" strokeWidth={3} />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.feature_interests && <p className="text-error text-sm mt-3">{errors.feature_interests.message}</p>}
              </motion.div>
            )}

            {/* Step 5: Suggestions */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Suggestions</h2>
                <p className="text-text-secondary mb-4">Any suggestions or feedback for ConnectX? (Optional)</p>
                <textarea
                  {...register('suggestions')}
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Share your thoughts..."
                  maxLength={1000}
                />
                <p className="text-text-secondary text-sm mt-1">{watch('suggestions')?.length || 0}/1000</p>
              </motion.div>
            )}

            {/* Step 6: Terms & Submit */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Terms & Conditions</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-surface rounded-xl border border-white/10">
                    <p className="text-text-secondary text-sm">
                      By registering for ConnectX Early Access, you agree to our Privacy Policy and Terms of Service. 
                      Your information will be used to provide you with updates about ConnectX and improve our services.
                    </p>
                  </div>
                  <div className="checkbox-wrapper">
                    <input type="checkbox" required id="terms_agreement" className="mt-1" />
                    <label htmlFor="terms_agreement">
                      <div className="checkbox-custom">
                        <Check className="checkbox-custom-icon w-3 h-3" />
                      </div>
                      <span className="text-text-secondary text-sm">
                        I have read and agree to the Privacy Policy and Terms of Service *
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="inline mr-2" />
              Previous
            </button>
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next
                <ChevronRight className="inline ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="btn-primary"
              >
                Submit Registration
                <Check className="inline ml-2" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegistrationForm
