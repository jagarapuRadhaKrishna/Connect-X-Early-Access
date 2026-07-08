import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, User, GraduationCap, Briefcase, Link as LinkIcon, Send, AlertTriangle, Upload, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import api from '../../services/api'

const careerApplicationSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters').max(255),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  whatsapp: z.string().regex(/^[0-9]{10}$/, 'WhatsApp number must be exactly 10 digits'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  date_of_birth: z.string().refine((date) => {
    if (!date) return false
    const dob = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - dob.getFullYear()
    return age >= 16 && age <= 50
  }, 'Age must be between 16 and 50'),
  city: z.string().min(2, 'City must be at least 2 characters').max(100),
  state: z.string().min(2, 'State must be at least 2 characters').max(100),
  country: z.string().min(2, 'Country must be at least 2 characters').max(100),
  college_name: z.string().min(2, 'College name must be at least 2 characters').max(255),
  degree: z.string().min(2, 'Degree must be at least 2 characters').max(100),
  branch: z.string().min(2, 'Branch must be at least 2 characters').max(100),
  graduation_year: z.number().int().min(2020).max(2030),
  cgpa: z.number().min(0).max(10).optional(),
  role_applying_for: z.string().min(2, 'Role must be at least 2 characters').max(100),
  experience_level: z.enum(['fresher', '0-1', '1-3', '3-5', '5+']),
  current_status: z.enum(['student', 'fresher', 'intern', 'freelancer', 'working_professional']),
  availability: z.enum(['5_hours', '10_hours', '20_hours', 'full_time']),
  skills: z.array(z.string()).default(['General']),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  portfolio_website: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
  behance: z.string().url('Invalid Behance URL').optional().or(z.literal('')),
  dribbble: z.string().url('Invalid Dribbble URL').optional().or(z.literal('')),
  figma: z.string().url('Invalid Figma URL').optional().or(z.literal('')),
  why_join: z.string().default('Interested in joining ConnectX.'),
  why_select: z.string().default('Passionate about my domain.'),
  achievements: z.string().default('Provided resume details.'),
  projects: z.string().default('Provided project/resume details.'),
  contribution: z.string().default('Ready to collaborate and build.'),
  startup_agreement: z.boolean().refine((val) => val === true, 'You must agree to the startup terms'),
})

type FormData = z.infer<typeof careerApplicationSchema>

const steps = [
  { id: 1, title: 'Resume Upload', icon: Upload },
  { id: 2, title: 'Personal Information', icon: User },
  { id: 3, title: 'Education', icon: GraduationCap },
  { id: 4, title: 'Professional', icon: Briefcase },
  { id: 5, title: 'Portfolio', icon: LinkIcon },
  { id: 6, title: 'Startup Commitment', icon: AlertTriangle },
  { id: 7, title: 'Review Application', icon: Check },
  { id: 8, title: 'Terms & Submit', icon: Send },
]



const jobDetails: Record<string, { desc: string; responsibilities: string[] }> = {
  'React Frontend Developer': {
    desc: 'Build gorgeous, high-performance web applications using React and Tailwind CSS.',
    responsibilities: [
      'Implement pixel-perfect, responsive UI designs',
      'Optimize web components for maximum speed and scalability',
      'Collaborate with designers to deliver cutting-edge UX/UI',
      'Integrate RESTful and GraphQL APIs with React client applications'
    ]
  },
  'Node.js Developer': {
    desc: 'Develop secure, scalable backend services and APIs using Node.js and Express.',
    responsibilities: [
      'Design and build high-performance microservices and REST APIs',
      'Optimize database queries and schema designs (MySQL/PostgreSQL)',
      'Implement secure authentication, authorization, and rate limiting',
      'Integrate third-party APIs, email services, and analytics systems'
    ]
  },
  'Full Stack Developer': {
    desc: 'Build end-to-end features spanning React frontend and Node.js backend systems.',
    responsibilities: [
      'Build robust, reusable components across frontend and backend layers',
      'Manage end-to-end deployment workflows and server routing',
      'Design database structures and optimize server-side response times',
      'Ensure security, reliability, and responsiveness of user features'
    ]
  },
  'UI Designer': {
    desc: 'Create beautiful, premium visual interfaces and style guides for ConnectX.',
    responsibilities: [
      'Design wireframes, user flows, and interactive mockups in Figma',
      'Establish a cohesive design system (colors, typography, spacing)',
      'Design branding assets, marketing illustrations, and landing pages',
      'Collaborate with developers to ensure faithful layout implementation'
    ]
  },
  'UX Designer': {
    desc: 'Research, design, and optimize user journeys for an effortless product experience.',
    responsibilities: [
      'Conduct user research, interviews, and usability tests',
      'Map complex user flows and design intuitive layout structures',
      'Iterate on interactive prototypes to validate workflows',
      'Establish client-centric patterns across all product modules'
    ]
  },
  'AI Engineer': {
    desc: 'Develop and integrate advanced AI capabilities, models, and agents into ConnectX.',
    responsibilities: [
      'Design AI features like resume parsers, interview evaluators, and copilots',
      'Fine-tune, evaluate, and integrate LLM API models (OpenAI, Gemini, etc.)',
      'Optimize prompts and implement retrieval-augmented generation (RAG)',
      'Develop backend AI routing logic and quality metrics'
    ]
  },
  'Prompt Engineer': {
    desc: 'Optimize LLM system prompts and workflows for high quality, reliable AI agents.',
    responsibilities: [
      'Author and test robust instructions and system prompts for AI agents',
      'Evaluate model outputs for accuracy, bias, and adherence to safety rules',
      'Implement few-shot examples and optimize API usage and costs',
      'Collaborate with AI engineers to deploy automated workflow prompts'
    ]
  },
  'Cloud Engineer': {
    desc: 'Architect and manage our cloud infrastructure, ensuring uptime, scale, and speed.',
    responsibilities: [
      'Deploy and scale applications on cloud environments (AWS/GCP/Azure)',
      'Manage CI/CD deployment pipelines and automated build workflows',
      'Implement cluster security protocols, VPCs, and encryption-at-rest',
      'Monitor application health, logs, and server performance metrics'
    ]
  },
  'DevOps Engineer': {
    desc: 'Bridge development and operations, streamlining CI/CD, builds, and monitoring.',
    responsibilities: [
      'Automate deployment, testing, and container workflows (Docker/Kubernetes)',
      'Configure build infrastructure and version control automation rules',
      'Manage environment secrets, access logs, and load balancers',
      'Enhance development speed by eliminating infrastructure bottlenecks'
    ]
  },
  'Database Engineer': {
    desc: 'Optimize, scale, and secure our relational and non-relational database clusters.',
    responsibilities: [
      'Write optimized SQL queries, indexes, stored procedures, and triggers',
      'Ensure data integrity via relationships, backups, and failover architectures',
      'Design schemas and migrate relational tables with zero downtime',
      'Monitor database bottlenecks, connections, and lock frequencies'
    ]
  },
  'QA Engineer': {
    desc: 'Establish quality assurance frameworks, testing suites, and manual check procedures.',
    responsibilities: [
      'Write automated end-to-end, integration, and API tests',
      'Conduct thorough cross-browser and mobile compatibility testing',
      'Document bug reports, step-by-step reproductions, and regressions',
      'Ensure high code quality and test coverage across deployment releases'
    ]
  },
  'React Native Developer': {
    desc: 'Develop high-performance, native mobile application modules for iOS and Android.',
    responsibilities: [
      'Build native-performing screens and modules in React Native',
      'Integrate device-level APIs, notifications, cameras, and local storage',
      'Optimize rendering bottlenecks, bundle sizes, and memory usage',
      'Manage app store submission pipelines (Apple App Store / Google Play)'
    ]
  },
  'Flutter Developer': {
    desc: 'Develop compiled native mobile platforms using Dart and Flutter frameworks.',
    responsibilities: [
      'Build responsive, animation-rich components using Flutter SDK',
      'Manage app state and asynchronous data channels in Dart',
      'Ensure seamless cross-platform performance across iOS and Android',
      'Integrate REST APIs and offline-first database caches'
    ]
  },
  'Social Media Manager': {
    desc: 'Build our brand presence and direct marketing communications across social platforms.',
    responsibilities: [
      'Plan, schedule, and write daily posts on LinkedIn, Twitter, and YouTube',
      'Design engaging social graphics, product screenshots, and carousel decks',
      'Analyze reach metrics, follower growth, and campaign statistics',
      'Respond to user comments, build relationships, and promote features'
    ]
  },
  'Content Writer': {
    desc: 'Author high-quality documentation, blog posts, newsletters, and UI copy.',
    responsibilities: [
      'Write SEO-friendly blogs, newsletters, and feature release notes',
      'Review and refine UI microcopy, error alerts, and email notifications',
      'Design guides, whitepapers, and customer help-desk documents',
      'Align communication tone across marketing and product channels'
    ]
  },
  'SEO Executive': {
    desc: 'Optimize our web presence for organic discovery and high search rankings.',
    responsibilities: [
      'Perform keyword research, competitor analysis, and backlink outreach',
      'Optimize on-page HTML meta tags, headers, and site hierarchies',
      'Monitor core web vitals, crawl errors, and index statuses',
      'Improve organic click-through rates and placement visibility'
    ]
  },
  'Digital Marketing': {
    desc: 'Drive growth, acquisition, and conversion campaigns across paid and unpaid channels.',
    responsibilities: [
      'Manage digital campaigns, ad spend, and targeting structures',
      'Analyze click funnels, acquisition costs, and user retention metrics',
      'Optimize conversion pages, copy hooks, and promotional banners',
      'Coordinate search, social, and newsletter marketing initiatives'
    ]
  },
  'Community Manager': {
    desc: 'Moderate, coordinate, and nurture our online and offline community ecosystem.',
    responsibilities: [
      'Manage community platforms (Discord, Slack, Telegram groups)',
      'Organize virtual webinars, student code jams, and hackathons',
      'Gather community feedback, ideas, and feature requests for the product team',
      'Ensure a supportive, inclusive environment for all participants'
    ]
  },
  'HR': {
    desc: 'Direct core people operations, onboarding workflows, team events, and policies.',
    responsibilities: [
      'Coordinate interview schedules, offer updates, and candidate inquiries',
      'Establish team onboarding guidelines and performance review structures',
      'Promote healthy startup culture, feedback loops, and open sharing',
      'Maintain team directories, contracts, and contribution trackers'
    ]
  },
  'Recruitment Coordinator': {
    desc: 'Manage candidate screening, application flows, and recruitment communications.',
    responsibilities: [
      'Post new requisitions and filter early applications for fit',
      'Coordinate tech tests, virtual panel invites, and results',
      'Maintain our internal applicant tracking system (ATS)',
      'Interface with colleges and institutes for placement drives'
    ]
  },
  'Business Development': {
    desc: 'Form strategic partnerships, drive enterprise acquisitions, and coordinate sales.',
    responsibilities: [
      'Acquire partnership agreements with colleges and training institutes',
      'Pitch recruiter subscriptions and enterprise hiring features to HR heads',
      'Draft partnership contracts, SLAs, and subscription models',
      'Represent ConnectX at industry tech events and careers fairs'
    ]
  },
  'Customer Success': {
    desc: 'Support corporate clients, institutes, and job seekers on platform workflows.',
    responsibilities: [
      'Resolve user support inquiries, login errors, and billing reports',
      'Deliver walkthrough demos to newly onboarded companies and sub-admins',
      'Collate bug reports, feature requests, and workflow pain-points',
      'Optimize client onboarding time-to-first-hire metrics'
    ]
  }
}

const defaultJobDetails = {
  desc: 'Collaborate with the founding team to build and launch the ConnectX AI ecosystem.',
  responsibilities: [
    'Work alongside senior leaders to build production features',
    'Learn, adapt, and implement modern best practices in your domain',
    'Own projects end-to-end with full autonomy and ownership',
    'Contribute to design, coding, marketing, or operations strategies'
  ]
}

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

const jobRoles = Object.keys(jobDetails)

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

const CareerApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isParsing, setIsParsing] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const urlRole = searchParams.get('role') || ''

  const [selectedCity, setSelectedCity] = useState('Hyderabad')
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(careerApplicationSchema),
    mode: 'onChange',
    defaultValues: {
      role_applying_for: urlRole,
      skills: ['General'],
      why_join: 'Interested in joining ConnectX.',
      why_select: 'Passionate about my domain.',
      achievements: 'Provided resume details.',
      projects: 'Provided project/resume details.',
      contribution: 'Ready to collaborate and build.',
      city: 'Hyderabad',
      state: 'TELENGANA',
      country: 'INDIA',
    }
  })

  useEffect(() => {
    if (urlRole) {
      setValue('role_applying_for', urlRole)
    }
  }, [urlRole, setValue])

  const formData = watch()

  const handleResumeUpload = async (file: File) => {
    setResumeFile(file)
    setIsParsing(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('resume', file)

      const response = await api.post('/careers/parse-resume', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Parse response:', response.data)

      const parsedData = response.data.parsedData

      if (!parsedData) {
        console.error('No parsedData in response:', response.data)
        toast.error('No data extracted from resume. Please fill the form manually.')
        return
      }

      // Auto-fill form fields with parsed data
      if (parsedData.full_name) setValue('full_name', parsedData.full_name)
      if (parsedData.email) setValue('email', parsedData.email)
      if (parsedData.phone) setValue('phone', parsedData.phone)
      if (parsedData.city) setValue('city', parsedData.city)
      if (parsedData.state) setValue('state', parsedData.state)
      if (parsedData.country) setValue('country', parsedData.country)
      if (parsedData.college_name) setValue('college_name', parsedData.college_name)
      if (parsedData.degree) setValue('degree', parsedData.degree)
      if (parsedData.branch) setValue('branch', parsedData.branch)
      if (parsedData.graduation_year) setValue('graduation_year', parsedData.graduation_year)
      if (parsedData.skills && parsedData.skills.length > 0) setValue('skills', parsedData.skills)
      if (parsedData.github) setValue('github', parsedData.github)
      if (parsedData.linkedin) setValue('linkedin', parsedData.linkedin)
      if (parsedData.portfolio_website) setValue('portfolio_website', parsedData.portfolio_website)
      if (parsedData.achievements) setValue('achievements', parsedData.achievements)
      if (parsedData.projects) setValue('projects', parsedData.projects)

      toast.success('Resume parsed successfully! Form has been auto-filled.')
    } catch (error: any) {
      console.error('Error parsing resume:', error)
      console.error('Error response:', error.response?.data)
      toast.error('Failed to parse resume. Please fill the form manually.')
    } finally {
      setIsParsing(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Submitting form data:', data)

      const formData = new FormData()

      // Append text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'skills') {
          formData.append(key, JSON.stringify(value))
        } else if (value !== undefined && value !== null && value !== '') {
          formData.append(key, String(value))
        }
      })

      // Append resume file
      if (resumeFile) {
        formData.append('resume', resumeFile)
      } else {
        toast.error('Please upload your resume file first!')
        return
      }

      console.log('FormData entries:')
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
      }

      const response = await api.post('/careers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Application submitted successfully!')
      navigate(`/careers/success?id=${response.data.application_id}`)
    } catch (error: any) {
      console.error('Submission error:', error)
      console.error('Error response:', error.response?.data)
      toast.error(error.response?.data?.error || 'Application failed. Please try again.')
    }
  }

  const nextStep = async () => {
    // Validate current step before proceeding
    const fieldsToValidate: Record<number, (keyof FormData)[]> = {
      1: [], // Resume upload - no required fields
      2: ['full_name', 'email', 'phone', 'whatsapp', 'date_of_birth', 'city', 'state'],
      3: ['college_name', 'degree', 'branch', 'graduation_year'],
      4: ['role_applying_for', 'experience_level', 'current_status', 'availability'],
      5: [], // Portfolio - all optional
      6: [], // Startup commitment - no required fields
      7: [], // Review - no fields to validate
      8: ['startup_agreement'], // Terms - checkbox
    }

    const currentFields = fieldsToValidate[currentStep]
    if (currentFields && currentFields.length > 0) {
      let hasError = false
      for (const field of currentFields) {
        const value = formData[field]
        if (!value || (Array.isArray(value) && value.length === 0)) {
          toast.error(`Please fill in all required fields`)
          hasError = true
          break
        }
      }
      if (hasError) return
    }

    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Careers Link */}
        <div className="mb-6">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Open Positions
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step.id
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
                    className={`flex-1 h-1 mx-2 ${currentStep > step.id ? 'bg-primary' : 'bg-surface'
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
            {/* Step 1: Resume Upload */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Resume Upload</h2>
                <p className="text-text-secondary mb-6">Upload your resume to auto-fill the application form. Supported formats: PDF, DOC, DOCX (Max 5MB) *</p>

                <div className="border-2 border-dashed border-white/10 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-surface/30">
                  {isParsing ? (
                    <div className="space-y-3">
                      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                      <p className="text-text-primary font-semibold text-base">Parsing your resume...</p>
                      <p className="text-text-secondary text-xs">This may take a few seconds</p>
                    </div>
                  ) : resumeFile ? (
                    <div className="space-y-3">
                      <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-text-primary font-semibold text-base">{resumeFile.name}</p>
                      <p className="text-text-secondary text-xs">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <p className="text-success text-xs font-medium">Resume parsed successfully!</p>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="btn-secondary text-xs px-4 py-1.5 rounded-lg border border-error/20 text-error hover:bg-error/10 hover:border-error"
                      >
                        Remove & Upload Different
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label className="cursor-pointer inline-block">
                        <span className="btn-primary text-sm flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          Upload Resume to Auto-fill
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              handleResumeUpload(e.target.files[0])
                            }
                          }}
                        />
                      </label>
                      <p className="text-text-secondary text-xs mt-3">We'll automatically extract your information to fill the form</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Full Name *</label>
                    <input {...register('full_name')} type="text" className="input-field" placeholder="Enter your full name" />
                    {errors.full_name && <p className="text-error text-sm mt-1">{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Email *</label>
                    <input {...register('email')} type="email" className="input-field" placeholder="your.email@example.com" />
                    {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Phone *</label>
                      <input {...register('phone')} type="tel" className="input-field" placeholder="10 digit number" />
                      {errors.phone && <p className="text-error text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">WhatsApp *</label>
                      <input {...register('whatsapp')} type="tel" className="input-field" placeholder=" +91 10 digit number" />
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
                      <input {...register('date_of_birth')} type="date" className="input-field" />
                      {errors.date_of_birth && <p className="text-error text-sm mt-1">{errors.date_of_birth.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* City selection */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">City *</label>
                      <select 
                        value={selectedCity} 
                        onChange={(e) => {
                          const val = e.target.value
                          setSelectedCity(val)
                          setValue('city', val, { shouldValidate: true })
                        }}
                        className="select-field"
                      >
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Pune">Pune</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Remote">Remote</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.city && <p className="text-error text-sm mt-1">{errors.city.message}</p>}
                    </div>

                    {/* State Selection - Always visible as dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">State *</label>
                      <select 
                        {...register('state')}
                        onChange={(e) => {
                          setValue('state', e.target.value, { shouldValidate: true })
                        }}
                        className="select-field"
                      >
                        <option value="">Select state</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-error text-sm mt-1">{errors.state.message}</p>}
                    </div>

                    {/* Country Selection */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Country *</label>
                      <input 
                        {...register('country')} 
                        type="text" 
                        className="input-field bg-white/[0.02] border-white/5 text-text-muted cursor-not-allowed" 
                        placeholder="Country" 
                        readOnly 
                      />
                      {errors.country && <p className="text-error text-sm mt-1">{errors.country.message}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Education */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Education</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">College Name *</label>
                    <input {...register('college_name')} type="text" className="input-field" placeholder="Your college/university" />
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
                        {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.graduation_year && <p className="text-error text-sm mt-1">{errors.graduation_year.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">CGPA (Optional)</label>
                      <input {...register('cgpa', { valueAsNumber: true })} type="number" step="0.01" min="0" max="10" className="input-field" placeholder="0.00 - 10.00" />
                      {errors.cgpa && <p className="text-error text-sm mt-1">{errors.cgpa.message}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Professional */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Professional Information</h2>
                <div className="space-y-4">
                  {urlRole ? (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Applying For Position
                      </div>
                      <h3 className="text-xl font-bold text-text-primary mb-2">{urlRole}</h3>
                      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                        {jobDetails[urlRole]?.desc || defaultJobDetails.desc}
                      </p>

                      <div className="space-y-2 mb-4">
                        <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Key Responsibilities:</h4>
                        <ul className="list-disc list-inside space-y-1 text-xs text-text-secondary">
                          {(jobDetails[urlRole]?.responsibilities || defaultJobDetails.responsibilities).map((resp, idx) => (
                            <li key={idx} className="leading-relaxed">{resp}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-surface p-3 rounded-lg border border-white/5 flex items-start gap-2.5">
                        <span className="text-base">💡</span>
                        <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                          <strong>No experience? No worries! We will mentor you through everything.</strong> You do not need to worry about not knowing all responsibilities or tools. We look for raw passion and a willingness to learn!
                        </p>
                      </div>

                      <input {...register('role_applying_for')} type="hidden" />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Role Applying For *</label>
                      <select {...register('role_applying_for')} className="select-field">
                        <option value="">Select role</option>
                        {jobRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      {errors.role_applying_for && <p className="text-error text-sm mt-1">{errors.role_applying_for.message}</p>}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Experience Level *</label>
                      <select {...register('experience_level')} className="select-field">
                        <option value="">Select experience</option>
                        <option value="fresher">Fresher</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                      {errors.experience_level && <p className="text-error text-sm mt-1">{errors.experience_level.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Current Status *</label>
                      <select {...register('current_status')} className="select-field">
                        <option value="">Select status</option>
                        <option value="student">Student</option>
                        <option value="fresher">Fresher</option>
                        <option value="intern">Intern</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="working_professional">Working Professional</option>
                      </select>
                      {errors.current_status && <p className="text-error text-sm mt-1">{errors.current_status.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Availability *</label>
                    <select {...register('availability')} className="select-field">
                      <option value="">Select availability</option>
                      <option value="5_hours">5 hours/week</option>
                      <option value="10_hours">10 hours/week</option>
                      <option value="20_hours">20 hours/week</option>
                      <option value="full_time">Full Time</option>
                    </select>
                    {errors.availability && <p className="text-error text-sm mt-1">{errors.availability.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Preferred Job Location *</label>
                    <select {...register('city')} className="select-field">
                      <option value="">Select location</option>
                      {jobLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                    {errors.city && <p className="text-error text-sm mt-1">{errors.city.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Portfolio */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Portfolio Links</h2>
                <p className="text-text-secondary mb-4">Add your portfolio links (all optional):</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">GitHub</label>
                    <input {...register('github')} type="url" className="input-field" placeholder="https://github.com/username" />
                    {errors.github && <p className="text-error text-sm mt-1">{errors.github.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">LinkedIn</label>
                    <input {...register('linkedin')} type="url" className="input-field" placeholder="https://linkedin.com/in/username" />
                    {errors.linkedin && <p className="text-error text-sm mt-1">{errors.linkedin.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Portfolio Website</label>
                    <input {...register('portfolio_website')} type="url" className="input-field" placeholder="https://yourportfolio.com" />
                    {errors.portfolio_website && <p className="text-error text-sm mt-1">{errors.portfolio_website.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Behance</label>
                    <input {...register('behance')} type="url" className="input-field" placeholder="https://behance.net/username" />
                    {errors.behance && <p className="text-error text-sm mt-1">{errors.behance.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Dribbble</label>
                    <input {...register('dribbble')} type="url" className="input-field" placeholder="https://dribbble.com/username" />
                    {errors.dribbble && <p className="text-error text-sm mt-1">{errors.dribbble.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Figma</label>
                    <input {...register('figma')} type="url" className="input-field" placeholder="https://figma.com/username" />
                    {errors.figma && <p className="text-error text-sm mt-1">{errors.figma.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Startup Commitment */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Startup Commitment</h2>
                <div className="card p-6 border-l-4 border-warning bg-warning/5 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                    <div className="text-text-secondary text-sm">
                      <p className="font-medium text-text-primary mb-2">Important:</p>
                      <p>ConnectX is currently in the building stage. There is no guaranteed salary initially, but after 5 months there is a fixed stipend. Upon product launch, you get a best-in-industry full-time package based on your role (based on performance and contribution only). We're looking for passionate contributors who believe in the vision.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="checkbox-wrapper">
                    <input {...register('startup_agreement')} type="checkbox" id="startup_agreement" />
                    <label htmlFor="startup_agreement">
                      <div className="checkbox-custom">
                        <Check className="checkbox-custom-icon w-3 h-3" />
                      </div>
                      <span className="text-text-secondary text-sm">
                        I understand ConnectX is currently in development. There is no guaranteed salary initially, but after 3 months there is a fixed stipend, and a best-in-industry full-time package upon product launch based on performance and contribution only. I want to contribute because I believe in the vision. *
                      </span>
                    </label>
                  </div>
                  {errors.startup_agreement && <p className="text-error text-sm">{errors.startup_agreement.message}</p>}
                </div>
              </motion.div>
            )}

            {/* Step 7: Review Application */}
            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Review Your Application</h2>
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                  {/* Personal Information */}
                  <div className="p-4 bg-surface rounded-xl border border-white/10">
                    <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" /> Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-text-secondary">Name:</span> <span className="text-text-primary">{formData.full_name || '-'}</span></div>
                      <div><span className="text-text-secondary">Email:</span> <span className="text-text-primary">{formData.email || '-'}</span></div>
                      <div><span className="text-text-secondary">Phone:</span> <span className="text-text-primary">{formData.phone || '-'}</span></div>
                      <div><span className="text-text-secondary">WhatsApp:</span> <span className="text-text-primary">{formData.whatsapp || '-'}</span></div>
                      <div><span className="text-text-secondary">Gender:</span> <span className="text-text-primary">{formData.gender || '-'}</span></div>
                      <div><span className="text-text-secondary">DOB:</span> <span className="text-text-primary">{formData.date_of_birth || '-'}</span></div>
                      <div><span className="text-text-secondary">City:</span> <span className="text-text-primary">{formData.city || '-'}</span></div>
                      <div><span className="text-text-secondary">State:</span> <span className="text-text-primary">{formData.state || '-'}</span></div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="p-4 bg-surface rounded-xl border border-white/10">
                    <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Education
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-text-secondary">College:</span> <span className="text-text-primary">{formData.college_name || '-'}</span></div>
                      <div><span className="text-text-secondary">Degree:</span> <span className="text-text-primary">{formData.degree || '-'}</span></div>
                      <div><span className="text-text-secondary">Branch:</span> <span className="text-text-primary">{formData.branch || '-'}</span></div>
                      <div><span className="text-text-secondary">Grad Year:</span> <span className="text-text-primary">{formData.graduation_year || '-'}</span></div>
                      <div><span className="text-text-secondary">CGPA:</span> <span className="text-text-primary">{formData.cgpa || '-'}</span></div>
                    </div>
                  </div>

                  {/* Professional */}
                  <div className="p-4 bg-surface rounded-xl border border-white/10">
                    <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Professional
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-text-secondary">Role:</span> <span className="text-text-primary">{formData.role_applying_for || '-'}</span></div>
                      <div><span className="text-text-secondary">Experience:</span> <span className="text-text-primary">{formData.experience_level || '-'}</span></div>
                      <div><span className="text-text-secondary">Status:</span> <span className="text-text-primary">{formData.current_status || '-'}</span></div>
                      <div><span className="text-text-secondary">Availability:</span> <span className="text-text-primary">{formData.availability || '-'}</span></div>
                    </div>
                    <div className="mt-3">
                      <span className="text-text-secondary text-sm">Skills: </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.skills?.map((skill, idx) => (
                          <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div className="p-4 bg-surface rounded-xl border border-white/10">
                    <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" /> Portfolio
                    </h3>
                    <div className="space-y-2 text-sm">
                      {formData.github && <div><span className="text-text-secondary">GitHub:</span> <a href={formData.github} target="_blank" className="text-primary hover:underline">{formData.github}</a></div>}
                      {formData.linkedin && <div><span className="text-text-secondary">LinkedIn:</span> <a href={formData.linkedin} target="_blank" className="text-primary hover:underline">{formData.linkedin}</a></div>}
                      {formData.portfolio_website && <div><span className="text-text-secondary">Portfolio:</span> <a href={formData.portfolio_website} target="_blank" className="text-primary hover:underline">{formData.portfolio_website}</a></div>}
                    </div>
                  </div>

                  {/* Resume File */}
                  {resumeFile && (
                    <div className="p-4 bg-surface rounded-xl border border-white/10">
                      <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Resume
                      </h3>
                      <div className="text-sm">
                        <span className="text-text-secondary">File: </span>
                        <span className="text-text-primary">{resumeFile.name}</span>
                        <span className="text-text-secondary ml-3">Size: </span>
                        <span className="text-text-primary">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 8: Terms & Submit */}
            {currentStep === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Terms & Conditions</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-surface rounded-xl border border-white/10">
                    <p className="text-text-secondary text-sm">
                      By submitting this application, you agree to our Privacy Policy and Terms of Service. Your information will be used to evaluate your application and contact you regarding the position.
                    </p>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input {...register('startup_agreement')} type="checkbox" className="mt-1" />
                    <span className="text-text-secondary text-sm">
                      I have read and agree to the Privacy Policy and Terms of Service *
                    </span>
                  </label>
                  {errors.startup_agreement && <p className="text-error text-sm">{errors.startup_agreement.message}</p>}
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
                onClick={handleSubmit(onSubmit, (errors) => {
                  console.error('Validation errors:', errors);
                  const firstError = Object.values(errors)[0] as any;
                  if (firstError) {
                    toast.error(firstError.message || 'Please fill all required fields correctly.');
                  }
                })}
                className="btn-primary"
              >
                Submit Application
                <Send className="inline ml-2" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CareerApplicationForm
