import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../../assets/images/logo.png'
import { 
  ArrowRight, Users, Briefcase, Award, Code, Laptop, Cpu, Activity, 
  Share2, Sparkles, ShieldAlert, CheckCircle, Mail, Phone, MapPin, 
  BrainCircuit
} from 'lucide-react'

// AI Avatars mapping to SVG components for futuristic high-end look
const AIAvatar = ({ id }: { id: string }) => {
  const baseSvgClass = "w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse"
  
  // Custom futuristic designs for each agent
  switch (id) {
    case 'candidate':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-candidate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad-candidate)" strokeWidth="1.5" strokeDasharray="5,3" />
          <circle cx="50" cy="50" r="38" fill="rgba(59, 130, 246, 0.05)" />
          <path d="M50 25 C40 25 35 32 35 40 C35 52 50 65 50 65 C50 65 65 52 65 40 C65 32 60 25 50 25 Z" fill="url(#grad-candidate)" opacity="0.8" />
          <circle cx="50" cy="40" r="6" fill="#111827" />
          <circle cx="50" cy="50" r="2" fill="#FFF" />
          <path d="M30 75 C30 65 40 60 50 60 C60 60 70 65 70 75" fill="none" stroke="url(#grad-candidate)" strokeWidth="2" />
        </svg>
      )
    case 'company':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-company" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad-company)" strokeWidth="1.5" />
          <rect x="28" y="35" width="44" height="34" rx="4" fill="rgba(99, 102, 241, 0.05)" stroke="url(#grad-company)" strokeWidth="2" />
          <path d="M40 35 V28 C40 26 42 24 44 24 H56 C58 24 60 26 60 28 V35" fill="none" stroke="url(#grad-company)" strokeWidth="2" />
          <circle cx="50" cy="52" r="6" fill="url(#grad-company)" />
          <path d="M40 52 H60" stroke="url(#grad-company)" strokeWidth="1.5" />
        </svg>
      )
    case 'institute':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-institute" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
          <polygon points="50,15 90,50 50,85 10,50" fill="rgba(236, 72, 153, 0.05)" stroke="url(#grad-institute)" strokeWidth="1.5" />
          <path d="M50 30 L80 50 L50 70 L20 50 Z" fill="url(#grad-institute)" opacity="0.7" />
          <circle cx="50" cy="50" r="10" fill="#111827" stroke="url(#grad-institute)" strokeWidth="2" />
          <circle cx="50" cy="50" r="4" fill="url(#grad-institute)" />
          <line x1="50" y1="60" x2="50" y2="80" stroke="url(#grad-institute)" strokeWidth="2" />
        </svg>
      )
    case 'coding':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-coding" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <rect x="15" y="20" width="70" height="60" rx="6" fill="rgba(245, 158, 11, 0.05)" stroke="url(#grad-coding)" strokeWidth="2" />
          <path d="M30 40 L20 50 L30 60" fill="none" stroke="url(#grad-coding)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M70 40 L80 50 L70 60" fill="none" stroke="url(#grad-coding)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="55" y1="35" x2="45" y2="65" stroke="url(#grad-coding)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="73" r="2" fill="url(#grad-coding)" />
        </svg>
      )
    case 'interview':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-interview" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad-interview)" strokeWidth="1.5" />
          <rect x="25" y="32" width="36" height="36" rx="4" fill="rgba(16, 185, 129, 0.05)" stroke="url(#grad-interview)" strokeWidth="2" />
          <polygon points="61,42 80,32 80,68 61,58" fill="url(#grad-interview)" opacity="0.8" stroke="url(#grad-interview)" strokeWidth="1.5" />
          <circle cx="43" cy="50" r="5" fill="#111827" stroke="url(#grad-interview)" strokeWidth="1.5" />
        </svg>
      )
    case 'engine':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-engine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>
          <rect x="25" y="25" width="50" height="50" rx="8" fill="rgba(244, 63, 94, 0.05)" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="25" y1="35" x2="15" y2="35" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="25" y1="50" x2="15" y2="50" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="25" y1="65" x2="15" y2="65" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="75" y1="35" x2="85" y2="35" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="75" y1="50" x2="85" y2="50" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="75" y1="65" x2="85" y2="65" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="35" y1="25" x2="35" y2="15" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="50" y1="25" x2="50" y2="15" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="65" y1="25" x2="65" y2="15" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="35" y1="75" x2="35" y2="85" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="50" y1="75" x2="50" y2="85" stroke="url(#grad-engine)" strokeWidth="2" />
          <line x1="65" y1="75" x2="65" y2="85" stroke="url(#grad-engine)" strokeWidth="2" />
          <circle cx="50" cy="50" r="12" fill="url(#grad-engine)" />
        </svg>
      )
    case 'automation':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-automation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad-automation)" strokeWidth="1.5" />
          <path d="M50 20 A30 30 0 0 1 80 50 A30 30 0 0 1 50 80 A30 30 0 0 1 20 50" fill="none" stroke="url(#grad-automation)" strokeWidth="3" strokeDasharray="40,10" />
          <polygon points="50,35 65,55 52,55 52,70 38,50 48,50" fill="url(#grad-automation)" />
        </svg>
      )
    case 'network':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-network" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="30" r="6" fill="url(#grad-network)" />
          <circle cx="30" cy="65" r="6" fill="url(#grad-network)" />
          <circle cx="70" cy="65" r="6" fill="url(#grad-network)" />
          <line x1="50" y1="30" x2="30" y2="65" stroke="url(#grad-network)" strokeWidth="2" />
          <line x1="50" y1="30" x2="70" y2="65" stroke="url(#grad-network)" strokeWidth="2" />
          <line x1="30" y1="65" x2="70" y2="65" stroke="url(#grad-network)" strokeWidth="2" />
          <circle cx="50" cy="54" r="3" fill="#FFF" />
          <circle cx="50" cy="54" r="16" fill="none" stroke="url(#grad-network)" strokeWidth="1" strokeDasharray="3,3" />
        </svg>
      )
    case 'copilot':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-copilot" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad-copilot)" strokeWidth="1.5" />
          <path d="M50 20 L60 40 L80 50 L60 60 L50 80 L40 60 L20 50 L40 40 Z" fill="rgba(16, 185, 129, 0.1)" stroke="url(#grad-copilot)" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="url(#grad-copilot)" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="url(#grad-copilot)" strokeWidth="1" />
        </svg>
      )
    case 'admin':
      return (
        <svg viewBox="0 0 100 100" className={baseSvgClass}>
          <defs>
            <linearGradient id="grad-admin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
          <path d="M50 15 L80 25 V55 C80 70 50 85 50 85 C50 85 20 70 20 55 V25 Z" fill="rgba(244, 63, 94, 0.05)" stroke="url(#grad-admin)" strokeWidth="2" />
          <circle cx="50" cy="45" r="8" fill="url(#grad-admin)" />
          <path d="M38 65 C38 56 42 53 50 53 C58 53 62 56 62 65" fill="none" stroke="url(#grad-admin)" strokeWidth="2.5" />
        </svg>
      )
    default:
      return null
  }
}

const FeaturesPage = () => {
  const [searchParams] = useSearchParams()
  const moduleParam = searchParams.get('module')
  const [activeTab, setActiveTab] = useState(moduleParam || 'candidate')

  useEffect(() => {
    if (moduleParam) {
      setActiveTab(moduleParam)
    }
  }, [moduleParam])

  const platformModules = [
    {
      id: 'candidate',
      num: '01',
      title: 'Candidate Platform',
      agentName: 'Alex',
      agentTitle: 'AI Candidate Agent & Profile Builder',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
      desc: 'Alex acts as a personal career assistant for candidates. From smart profile parsing to automated ATS resume optimization, Alex guides students step-by-step to match recruiter requirements.',
      features: [
        'Smart Registration & Dynamic Profile Creation',
        'AI Career Profile Builder & Completeness Advisor',
        'AI Resume Builder with ATS-optimizing feedback',
        'Automatic Resume Tailoring to specific job descriptions',
        'ATS Score Check & keywords improvement tips',
        'AI Cover Letter Generator tailored to roles',
        'Interactive Portfolio & Projects Showcase',
        'Verified Skills & Peer/Mentor Endorsements',
        'AI Job Matching Recommendations based on skill tags',
        'Easy Apply & Quick application pipelines',
        'Application Status & Progression Tracking',
        'Recruiter Messaging & Gmail Calendar integration'
      ]
    },
    {
      id: 'company',
      num: '02',
      title: 'Company / HR Platform',
      agentName: 'Sarah',
      agentTitle: 'AI Recruitment & HR Coordinator',
      icon: Briefcase,
      color: 'from-indigo-500 to-purple-500',
      textColor: 'text-indigo-400',
      borderColor: 'border-indigo-500/30',
      bgColor: 'bg-indigo-500/10',
      desc: 'Sarah manages HR workflows, team permissions, job distributions, and auto-filters candidates based on AI matching matrices, significantly reducing screening workload.',
      features: [
        'Premium Company Branding & Profile Editor',
        'HR Sub-Accounts & Recruiter Permissions Dashboard',
        'Job Posting Editor & AI Job Description (JD) Generator',
        'Bulk Requisitions & Job Distribution management',
        'AI Resume Screening & Automated Match scoring',
        'Multi-Slot Interview Scheduling with calendar synchronization',
        'Virtual Interview Room Management & notes archive',
        'Recruitment CRM, Custom Tags & candidate lists',
        'Auto-Email Trigger workflows & candidate notifications',
        'Recruitment Funnel analytics & acceptance rate tracker'
      ]
    },
    {
      id: 'institute',
      num: '03',
      title: 'Training Institute Platform',
      agentName: 'Prof. Marcus',
      agentTitle: 'AI Student Placement & Batch Manager',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/10',
      desc: 'Professor Marcus facilitates placement drives, student tracking, batches organization, coding challenges, and mock exams specifically for universities and bootcamps.',
      features: [
        'Institute Branding & Placement Portal',
        'Multi-Batch Handling & Students roster manager',
        'Consolidated Attendance & placement eligibility checklists',
        'Coding challenges & customized internal assessments',
        'Assignments, grading sheets & student code reviews',
        'Student performance dashboards & analytics summaries',
        'Placement Drive coordinator & automated announcement system',
        'Direct Integration pipelines with hiring companies',
        'Custom Roles (Supervisors, Instructors, Placement Officers)',
        'Enterprise analytics & statistics on student hiring rates'
      ]
    },
    {
      id: 'coding',
      num: '04',
      title: 'AI Coding Assessment Platform',
      agentName: 'Byte',
      agentTitle: 'AI Coding & Tech Assessment Evaluator',
      icon: Code,
      color: 'from-orange-500 to-amber-500',
      textColor: 'text-orange-400',
      borderColor: 'border-orange-500/30',
      bgColor: 'bg-orange-500/10',
      desc: 'Byte coordinates programming assessments, grading execution, and live proctoring checks. Byte supports SQL, frontend, and backend environments in over 20 programming languages.',
      features: [
        'Coding Challenges Editor (multi-language compiler)',
        'Relational SQL Assessments with output assertions',
        'Frontend rendering sandboxes (React/HTML/JS environments)',
        'Backend sandboxes & API integration test environments',
        'Aptitude, reasoning, and multiple-choice tests constructor',
        'Timed tests, adaptive question grids, and custom assessments',
        'Hackathons Host Management & live leaderboard',
        'AI Code Quality & Complexity Evaluation (Big-O analysis)',
        'Tab-lock, web-cam proctoring & cheat prevention checks',
        'Detailed performance scorecard & student submission replay'
      ]
    },
    {
      id: 'interview',
      num: '05',
      title: 'Virtual Interview Platform',
      agentName: 'Clara',
      agentTitle: 'AI Interactive Interviewer & Transcriber',
      icon: Laptop,
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/30',
      bgColor: 'bg-yellow-500/10',
      desc: 'Clara conducts, records, and transcribes virtual panel interviews. Clara features an integrated live whiteboard, shared code editors, and real-time candidate emotion/sentiment indicators.',
      features: [
        'One-Click browser virtual meetings (No installation required)',
        'HD video streaming & audio channels with screen sharing',
        'Integrated Collaborative Code Editor & drawing Whiteboard',
        'File sharing, live messaging & panel discussion tools',
        'High-fidelity cloud recording & AI-driven transcription',
        'Speech-to-Text translation & searchable transcripts',
        'AI Sentiment Analysis & engagement metrics',
        'Integrated assessment forms & scorecards for interviewers',
        'Multi-round panel workflows & candidate queues',
        'Automated reminders, links, and calendar invites'
      ]
    },
    {
      id: 'engine',
      num: '06',
      title: 'AI Engine',
      agentName: 'Cortex',
      agentTitle: 'Core AI Matching & Parsing Brain',
      icon: Cpu,
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-400',
      borderColor: 'border-pink-500/30',
      bgColor: 'bg-pink-500/10',
      desc: 'Cortex is the primary deep-learning engine of the Talent Cloud. Cortex parses resumes, analyzes skill gaps, provides personalized learning recommendations, and auto-rates candidate profiles.',
      features: [
        'High-speed Resume Parser (PDF to JSON entities extraction)',
        'AI Cover Letter & tailored resume bullets generator',
        'Vector job matching & contextual profile scanning',
        'Interactive Skill Gap Analyzer & learning path recommender',
        'Automatic candidate match score ranking for recruiters',
        'AI Code complexity analysis & efficiency metrics evaluator',
        'Natural Language Processing for interview answers scoring',
        'Predictive analytics on candidate retention & job performance',
        'Daily insights generator for personal growth tips'
      ]
    },
    {
      id: 'automation',
      num: '07',
      title: 'Automation System',
      agentName: 'Geary',
      agentTitle: 'Automated Operations & Mail Scheduler',
      icon: Activity,
      color: 'from-red-500 to-rose-600',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/10',
      desc: 'Geary automates system alerts, emails, confirmations, results distribution, and status updates, keeping stakeholders updated without manual intervention.',
      features: [
        'Event-triggered email pipelines & custom templates editor',
        'Verification codes, password resets, and account logs',
        'Resume review, shortlisting, and final selection notifications',
        'Tech test credentials & coding assessment invites',
        'Interview link deliveries & rescheduling alerts',
        'Job offer letters & onboarding packets delivery',
        'Automated course certificate deliveries',
        'Custom workflow triggers (e.g. status changes)',
        'Recruiter tasks reminders & calendar scheduler'
      ]
    },
    {
      id: 'network',
      num: '08',
      title: 'Professional Network',
      agentName: 'Nova',
      agentTitle: 'AI Social Network & Community Manager',
      icon: Share2,
      color: 'from-teal-500 to-emerald-500',
      textColor: 'text-teal-400',
      borderColor: 'border-teal-500/30',
      bgColor: 'bg-teal-500/10',
      desc: 'Nova coordinates the professional networking community. Nova creates user feeds, manages posts, suggests relevant peer connections, and lists student events and webinars.',
      features: [
        'Personal feeds, posts, images, and project links share',
        'Company & Recruiter follower list structures',
        'AI connection recommendations ("People you may know")',
        'Real-time messages chat with media sharing',
        'Project portfolio showrooms & verified skill badges',
        'Long-form articles publisher with comments feed',
        'Polls, surveys, and interactive community questions',
        'Hashtag trending lists & search parameters',
        'Private communities, batches groups, & webinar setups',
        'Recruiter posting boards & networking event calendars'
      ]
    },
    {
      id: 'copilot',
      num: '09',
      title: 'AI Career Copilot',
      agentName: 'Aria',
      agentTitle: 'AI Student Mentor & Career Advisor',
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/10',
      desc: 'Aria provides interactive, real-time guidance to students. Aria maps learning tracks, provides daily briefs, reviews resume layouts, and runs mock audio chat interviews.',
      features: [
        'Personal Career Advisor chat interface (always active)',
        'ATS resume check & feedback recommendations checklist',
        'AI Mock Interview sessions (role-specific Q&A)',
        'Personalized coding & learning roadmap planner',
        'Local salary statistics, company insights & trends',
        'Mock behavior tests & feedback reports',
        'Dynamic daily brief (industry news & tailored opportunities)',
        'Weekly goals tracker & progress scoring report'
      ]
    },
    {
      id: 'admin',
      num: '10',
      title: 'Super Admin Panel',
      agentName: 'Nexus',
      agentTitle: 'Core Control & Security Administrator',
      icon: ShieldAlert,
      color: 'from-rose-500 to-red-500',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      bgColor: 'bg-rose-500/10',
      desc: 'Nexus keeps the platform secure, monitors system uptime, manages subscription tiers, runs audits, verifies companies/institutes, and toggles feature settings across the platform.',
      features: [
        'Platform stats console & user/permission tables',
        'Company, recruiter, and institute document verification',
        'Job listings approval queue & audits logs',
        'Subscription tier payment dashboards & reports',
        'System-wide revenue & registration analytics data',
        'AI model prompts & billing API settings dashboard',
        'CMS management boards (blogs, FAQ, legal files)',
        'Security access records & role-based settings',
        'Features toggles & database maintenance controls'
      ]
    }
  ]

  const activeModule = platformModules.find(m => m.id === activeTab) || platformModules[0]
  const ActiveIcon = activeModule.icon

  return (
    <div className="min-h-screen bg-background pt-24 text-text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="ConnectX Logo" className="h-[75px] md:h-[85px] w-auto max-w-[300px] object-contain" />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-text-secondary hover:text-text-primary transition-colors">Home</Link>
              <Link to="/careers" className="text-text-secondary hover:text-text-primary transition-colors">Careers</Link>
              <Link to="/creators" className="text-text-secondary hover:text-text-primary transition-colors">Creators</Link>
              <Link to="/register" className="btn-primary">Join Early Access</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Features Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <BrainCircuit className="w-4 h-4 animate-spin-slow" />
            ConnectX AI Agents & Modules
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI Avatars</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            ConnectX is powered by specialized AI avatars and modules acting together as a unified Talent Ecosystem. Discover the full details and capabilities of each agent below.
          </p>
        </div>

        {/* Tabs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {platformModules.map((module) => {
            const isSelected = activeTab === module.id
            return (
              <button
                key={module.id}
                onClick={() => setActiveTab(module.id)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  isSelected 
                    ? 'border-primary bg-primary/10 text-white shadow-[0_0_20px_rgba(239,68,68,0.15)] scale-[1.03]'
                    : 'border-white/5 bg-surface text-text-secondary hover:border-white/10 hover:bg-background/80'
                }`}
              >
                <module.icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-text-secondary'}`} />
                <div className="text-[10px] font-bold text-primary tracking-wider">{module.num}</div>
                <div className="font-semibold text-xs md:text-sm">{module.title}</div>
              </button>
            )
          })}
        </div>

        {/* Selected Module Detail Section */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left Column: Avatar & AI Profile */}
          <motion.div
            key={`avatar-${activeModule.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8 text-center border-primary/20 flex flex-col items-center justify-center md:col-span-1"
          >
            <div className="mb-6 p-4 bg-background/50 rounded-full border border-white/5 relative">
              <AIAvatar id={activeModule.id} />
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-success rounded-full border-2 border-surface animate-ping" />
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-success rounded-full border-2 border-surface" />
            </div>

            <div className="text-[10px] font-black text-primary tracking-widest uppercase mb-1">
              SYSTEM AGENT {activeModule.num}
            </div>
            <h2 className="text-3xl font-black text-white mb-2">{activeModule.agentName}</h2>
            <div className="text-xs font-semibold text-accent mb-4 px-3 py-1 bg-accent/10 rounded-full inline-block">
              {activeModule.agentTitle}
            </div>
            
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              "{activeModule.desc}"
            </p>

            <div className="w-full pt-6 border-t border-white/5 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary">Agent Status:</span>
                <span className="text-success font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Online & Active
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary">Core Service:</span>
                <span className="text-text-primary font-medium">{activeModule.title}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Detailed Features List */}
          <motion.div
            key={`features-${activeModule.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8 md:col-span-2 border-primary/20 flex flex-col h-full"
          >
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-text-secondary font-medium">CAPABILITIES & SPECIFICATIONS</div>
                <h3 className="text-2xl font-bold text-white">{activeModule.title} Detailed Features</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {activeModule.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="flex items-start gap-3 p-3 bg-surface/30 hover:bg-surface/50 border border-white/5 hover:border-white/10 rounded-xl transition-all"
                >
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-text-primary text-sm lg:text-base leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center sm:text-right">
              <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                Join Early Access Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-surface border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex flex-col items-start leading-none mb-2">
                <img src={logo} alt="ConnectX Logo" className="h-14 md:h-16 object-contain" />
                <span className="text-[9px] font-bold tracking-[0.18em] text-primary uppercase mt-1">
                  AI Talent Cloud Platform
                </span>
              </div>
              <p className="text-text-secondary text-sm">AI-Powered Talent Ecosystem</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><Link to="/" className="hover:text-text-primary transition-colors">Home</Link></li>
                <li><Link to="/careers" className="hover:text-text-primary transition-colors">Careers</Link></li>
                <li><Link to="/creators" className="hover:text-text-primary transition-colors">Creators</Link></li>
                <li><Link to="/register" className="hover:text-text-primary transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Contact</h4>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> connectxhelpsupport@gmail.com</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 95508 97539</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Hyderabad, India</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-text-secondary">
            <p>&copy; 2026 ConnectX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FeaturesPage
