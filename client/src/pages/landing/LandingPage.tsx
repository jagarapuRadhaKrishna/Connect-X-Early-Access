import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../../assets/images/logo.png'
import { ArrowRight, Zap, Users, CheckCircle, Mail, Phone, MapPin, Sparkles, Code, Briefcase, Laptop, Cpu, Activity, Share2, Award, ShieldAlert, Eye, Star, Building, Rocket, MessageSquare, Instagram, Linkedin, Twitter, Menu, X as CloseIcon } from 'lucide-react'

const LandingPage = () => {

  const platformModules = [
    {
      id: 'candidate',
      num: '01',
      title: 'Candidate Platform',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
      features: [
        'Smart Registration & Profile',
        'AI Career Profile Builder',
        'AI Resume Builder & Parser',
        'AI Resume Tailoring',
        'ATS Score & Optimization',
        'AI Cover Letter Generator',
        'Portfolio & Projects Showcase',
        'Skills & Endorsements',
        'AI Job Recommendations',
        'Easy Apply & Quick Apply',
        'Application Tracking',
        'Recruiter Messaging & Gmail Integration'
      ]
    },
    {
      id: 'company',
      num: '02',
      title: 'Company / HR Platform',
      icon: Briefcase,
      color: 'from-indigo-500 to-purple-500',
      textColor: 'text-indigo-400',
      borderColor: 'border-indigo-500/30',
      bgColor: 'bg-indigo-500/10',
      features: [
        'Company Profile & Branding',
        'HR & Recruiter Team Management',
        'Job Posting & AI JD Generator',
        'Bulk Job Posting & Requisition Management',
        'AI Resume Screening & Candidate Ranking',
        'Interview Scheduling & Calendar Integration',
        'Virtual Interview Management & Insights',
        'Talent Pool & Tags, Recruitment CRM',
        'Automatic Email Workflows & Templates',
        'Offer Acceptance Rate Tracker'
      ]
    },
    {
      id: 'institute',
      num: '03',
      title: 'Training Institute Platform',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/10',
      features: [
        'Institute Registration & Profile',
        'Batch & Student Management',
        'Multi-Batch Handling',
        'Attendance & Course Management',
        'Coding Tests & Aptitude Tests',
        'Assignments & Mock Interviews',
        'Student Performance Analytics',
        'Placement Drive Management & Communication',
        'Integration with Hiring Companies',
        'Role Management (Sub-Admins & Instructors)'
      ]
    },
    {
      id: 'coding',
      num: '04',
      title: 'AI Coding Assessment Platform',
      icon: Code,
      color: 'from-orange-500 to-amber-500',
      textColor: 'text-orange-400',
      borderColor: 'border-orange-500/30',
      bgColor: 'bg-orange-500/10',
      features: [
        'Coding Challenges (Multiple Languages)',
        'SQL Assessments',
        'Frontend & Backend Assessments',
        'Full Stack Assessments',
        'Aptitude & Logical Tests',
        'Timed & Custom Assessments',
        'Hackathons Host Management',
        'AI Code Evaluation & Quality Analysis',
        'Cheat Prevention & Live Proctoring',
        'Leaderboard & Rankings, Performance Reports'
      ]
    },
    {
      id: 'interview',
      num: '05',
      title: 'Virtual Interview Platform',
      icon: Laptop,
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/30',
      bgColor: 'bg-yellow-500/10',
      features: [
        'One-Click Join (No Downloads)',
        'HD Video & Audio with Screen Sharing',
        'Live Coding Panel & Interactive Whiteboard',
        'Document Sharing & Chat During Interview',
        'Interview Recording & AI Transcription',
        'AI Interview Summary & Notes',
        'AI Interview Feedback & Ratings',
        'Multi-Round & Panel Interviews',
        'Calendar Integration & Rescheduling',
        'Timezone Management & Reminders'
      ]
    },
    {
      id: 'engine',
      num: '06',
      title: 'AI Engine',
      icon: Cpu,
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-400',
      borderColor: 'border-pink-500/30',
      bgColor: 'bg-pink-500/10',
      features: [
        'AI Resume Parsing & Tailoring',
        'AI Cover Letter Generation',
        'AI Job Matching & Skill Extraction',
        'AI Skill Gap Analysis',
        'AI Candidate Ranking & Shortlisting',
        'AI Hiring & Coding Recommendations',
        'AI Email Analysis & Interview Analysis',
        'AI Code Evaluation & Quality Scoring',
        'AI Learning Recommendations & Daily Insights'
      ]
    },
    {
      id: 'automation',
      num: '07',
      title: 'Automation System',
      icon: Activity,
      color: 'from-red-500 to-rose-600',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/10',
      features: [
        'Automatic Email Triggers & Templates',
        'Verification Emails & Confirms',
        'Resume Shortlisted & Rejection Emails',
        'Coding Test & Interview Invitations',
        'Interview Reminders & Results Notification',
        'Offer Letters & Joining Instructions',
        'Certificate Delivery Emails',
        'Custom Workflow Automation',
        'Status Update & Task Reminders'
      ]
    },
    {
      id: 'network',
      num: '08',
      title: 'Professional Network',
      icon: Share2,
      color: 'from-teal-500 to-emerald-500',
      textColor: 'text-teal-400',
      borderColor: 'border-teal-500/30',
      bgColor: 'bg-teal-500/10',
      features: [
        'Connect with Professionals & Peers',
        'Follow Companies & Recruiters',
        'AI People You May Know Recommendations',
        'Messaging & Real-time Chat',
        'Create & Share Posts, Projects, & Media',
        'Share Verified Certificates & Portfolios',
        'Write Articles, Upload Videos, Polls & Surveys',
        'Hashtags & Trending Topics',
        'Groups & Communities, Events & Webinars',
        'Personalized News Feed'
      ]
    },
    {
      id: 'copilot',
      num: '09',
      title: 'AI Career Copilot',
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/10',
      features: [
        'Career Guidance & Path Suggestions',
        'Resume Improvement Tips & Daily Brief',
        'Interview Preparation & Mock Interviews',
        'Skill Improvement Roadmap & Learning Suggestions',
        'Job Search Strategies & Industry Insights',
        'Company & Salary Insights, Market Trends',
        'Personalized Mentorship (AI-driven)',
        'Goal Setting & Progress Tracking'
      ]
    },
    {
      id: 'admin',
      num: '10',
      title: 'Super Admin Panel',
      icon: ShieldAlert,
      color: 'from-rose-500 to-red-500',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      bgColor: 'bg-rose-500/10',
      features: [
        'Platform Overview Dashboard & User Management',
        'Company & Institute Verification Management',
        'Job Management & Approval Workflows',
        'Subscription & Payment Management',
        'Revenue Analytics & Reports',
        'AI Model & System Configurations',
        'CMS Management (Blogs, Content)',
        'Audit Logs, Security & Role Management',
        'Feature Toggle & System Monitoring'
      ]
    }
  ]

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Careers', href: '/careers', isLink: true },
    { label: 'Creators', href: '/creators', isLink: true },
  ]

  return (
    <div className="min-h-screen bg-[#07090E] text-white">
      {/* Navigation — Premium frosted-glass 84px navbar (same structure as CareersLanding) */}
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[84px] flex items-center transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#07090E]/82 backdrop-blur-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.35)] border-white/5' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-85 transition-opacity duration-200">
            <img src={logo} alt="ConnectX Logo" className="h-[170px] md:h-[190px] w-auto max-w-[640px] object-contain" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
            {navLinks.map((link, idx) => (
              link.isLink 
                ? <Link key={idx} to={link.href} className="group relative py-3 text-[15px] font-medium tracking-[0.02em] text-white/70 hover:text-white transition-colors duration-200">{link.label}<span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#EF4444] to-[#8B5CF6] w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-300" /></Link>
                : <a key={idx} href={link.href} className="group relative py-3 text-[15px] font-medium tracking-[0.02em] text-white/70 hover:text-white transition-colors duration-200">{link.label}<span className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#EF4444] to-[#8B5CF6] transition-all duration-300 ${idx === 0 ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100'}`} /></a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link to="/register" className="h-[46px] px-6 rounded-[14px] bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white text-[15px] font-semibold flex items-center gap-2.5 shadow-[0_12px_30px_rgba(239,68,68,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(239,68,68,0.5)] transition-all duration-200 active:scale-[0.98]">
              Join Early Access <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button type="button" aria-label="Open navigation menu" onClick={() => setMobileMenuOpen(true)} className="md:hidden w-11 h-11 rounded-[14px] border border-white/10 bg-white/[0.04] text-white flex items-center justify-center focus:outline-none">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile slide-out drawer */}
      <div className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)} />
      <aside className={`fixed right-0 top-0 z-[70] h-screen w-[min(340px,calc(100vw-24px))] rounded-l-[28px] border-l border-white/10 bg-[#0B1120] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)] transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} aria-hidden={!mobileMenuOpen}>
        <div className="flex items-center justify-between">
          <img src={logo} alt="ConnectX Logo" className="h-[45px] w-auto object-contain" />
          <button type="button" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} className="w-11 h-11 rounded-[14px] border border-white/10 bg-white/[0.04] text-white flex items-center justify-center">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-10 space-y-5">
          {navLinks.map((link) => (
            link.isLink
              ? <Link key={link.label} to={link.href} onClick={() => setMobileMenuOpen(false)} className="flex h-[52px] items-center rounded-2xl px-1 text-lg font-semibold text-white/80 hover:text-white transition-colors">{link.label}</Link>
              : <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="flex h-[52px] items-center rounded-2xl px-1 text-lg font-semibold text-white/80 hover:text-white transition-colors">{link.label}</a>
          ))}
        </div>
        <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="absolute bottom-8 left-8 right-8 h-[50px] rounded-[14px] bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 shadow-[0_12px_30px_rgba(239,68,68,0.35)]">
          Join Early Access <ArrowRight className="w-[18px] h-[18px]" />
        </Link>
      </aside>

      {/* Hero Section */}
      <section className="pt-[110px] pb-[60px] px-6 sm:px-12 lg:px-[72px] relative z-20 flex items-center min-h-[500px] overflow-hidden">
        {/* Full-width right-bleeding Background Hero Image */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] z-0 pointer-events-none select-none">
          {/* Ambient gradient overlay for text readability on smaller screens */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090E] via-[#07090E]/80 to-transparent lg:from-[#07090E] lg:via-[#07090E]/40 lg:to-transparent z-10" />
          <img
            src="/src/assets/images/hero-home.png"
            alt="ConnectX AI Career Platform"
            className="w-full h-full object-cover object-center lg:object-right"
          />
        </div>

        <div className="max-w-[1320px] w-full mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 text-left space-y-6 relative z-10"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
                AI-Powered<br />
                <span className="text-primary">Career</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
                  Cloud
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                ConnectX is revolutionizing how students connect with opportunities using AI. Join our early access program and be among the first to experience the future of career development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/register"
                  className="h-[56px] px-8 rounded-[14px] bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(239,68,68,0.35)] hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] transition-all duration-200"
                >
                  Get Early Access <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#about"
                  className="h-[56px] px-8 rounded-[14px] border border-white/12 hover:bg-white/5 text-white font-medium flex items-center justify-center transition-all duration-200"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>


          {/* Stats section redesigned to match second image style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {[
              { icon: Users, label: 'Students Interested', value: '100+' },
              { icon: Zap, label: 'Companies Onboarding', value: '3' },
              { icon: Award, label: 'Training Institutes', value: '5' },
              { icon: Briefcase, label: 'Future Jobs', value: '10K+' },
            ].map((stat, index) => (
              <div key={index} className="card p-6 border-white/5 bg-background/30 hover:border-primary/30 transition-all flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white leading-none mb-1">{stat.value}</div>
                  <div className="text-xs text-text-secondary font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">About ConnectX</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              ConnectX is an AI Talent Cloud designed to bridge the gap between talented students and their dream careers. Our platform uses cutting-edge AI technology to provide personalized career guidance, resume optimization, and direct connections with top companies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8 border-white/5 bg-background/45"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.25)] border border-primary/20">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">Our Vision</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    To create a world where every student has equal access to career opportunities, regardless of their background or location. We believe in leveraging AI to democratize career development and help students unlock their full potential.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8 border-white/5 bg-background/45"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.25)] border border-purple-500/20">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">Why Early Access?</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Early access members get exclusive benefits including priority onboarding, free premium features for the first year, and the opportunity to shape the platform's development through feedback and suggestions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">Built for Every Stakeholder</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              ConnectX is an all-in-one AI ecosystem designed to bring students, companies, recruiters, and training institutes together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Job Seekers & Students */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-5 md:p-6 flex flex-col justify-between border-white/5 hover:border-primary/30 transition-all bg-background/45 rounded-[20px]"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-primary/20">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Job Seekers & Students</h3>
                </div>
                <p className="text-xs md:text-sm text-text-secondary mb-4 leading-relaxed">
                  Unlock your career potential with our AI Career Copilot. Generate tailored resumes, practice with AI mock interviews, check your ATS score, and apply directly to matching opportunities.
                </p>
              </div>
              <Link to="/register" className="btn-primary text-center inline-flex items-center justify-center gap-2 py-2 px-5 rounded-[12px] text-sm font-semibold shadow-[0_4px_15px_rgba(239,68,68,0.18)]">
                Join Candidate Early Access <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Join The ConnectX Team */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-5 md:p-6 flex flex-col justify-between border-white/5 hover:border-purple-500/30 transition-all bg-background/45 rounded-[20px]"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.2)] border border-purple-500/20">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Join The ConnectX Team</h3>
                </div>
                <p className="text-xs md:text-sm text-text-secondary mb-4 leading-relaxed">
                  Help us build the next generation AI Talent Cloud. We are hiring developers, designers, and marketers for our founding team to develop cutting-edge recruitment products.
                </p>
              </div>
              <Link to="/careers" className="btn-secondary text-center inline-flex items-center justify-center gap-2 py-2 px-5 rounded-[12px] text-sm font-semibold border border-white/10 hover:bg-white/5 transition-all">
                Explore Careers & Open Roles <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Companies & HR */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-5 md:p-6 flex flex-col justify-between border-white/5 bg-background/45 rounded-[20px] relative"
            >
              <div className="absolute top-4 right-4 bg-white/5 border border-white/10 text-text-secondary text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Coming Soon
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-blue-500/20">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Companies & HR</h3>
                </div>
                <p className="text-xs md:text-sm text-text-secondary mb-4 leading-relaxed">
                  Hire the best talent faster and smarter. Leverage advanced AI resume screening, candidate ranking, structured virtual interviews, and custom automation to reduce time-to-hire.
                </p>
              </div>
              <button disabled className="btn-secondary opacity-50 cursor-not-allowed text-center py-2 px-5 rounded-[12px] text-sm font-semibold border border-white/5">
                Employer Dashboard (Soon)
              </button>
            </motion.div>

            {/* Training & Placement Institutes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-5 md:p-6 flex flex-col justify-between border-white/5 bg-background/45 rounded-[20px] relative"
            >
              <div className="absolute top-4 right-4 bg-white/5 border border-white/10 text-text-secondary text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Coming Soon
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-amber-500/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Training & Placement Institutes</h3>
                </div>
                <p className="text-xs md:text-sm text-text-secondary mb-4 leading-relaxed">
                  Equip your students for placements. Manage batches, assignments, coding assessments, schedule mock placement drives, and connect directly with hiring corporations.
                </p>
              </div>
              <button disabled className="btn-secondary opacity-50 cursor-not-allowed text-center py-2 px-5 rounded-[12px] text-sm font-semibold border border-white/5">
                Institute Portal (Soon)
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">Platform Features In-Depth</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Explore the 10 core modules powering the ConnectX AI Talent ecosystem. Click any module to view its full capabilities, AI agent avatars, and detailed features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {platformModules.map((module) => {
              const IconComponent = module.icon
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="card p-6 border-white/5 bg-background/40 hover:border-primary/50 transition-all flex flex-col justify-between h-64 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-white/10 tracking-widest">{module.num}</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                      {module.id === 'candidate' && "AI personal career assistant helping students build ATS optimized resumes, prepare cover letters, and track applications."}
                      {module.id === 'company' && "AI recruiting engine managing job posts, automated screening, candidate ranking, and schedule automation."}
                      {module.id === 'institute' && "Placement portal and tracking system managing student rosters, batches, internal test compilation, and mock exam results."}
                      {module.id === 'coding' && "Code evaluation compiling engine supporting multi-language sandboxes, SQL assertions, and live proctoring checks."}
                      {module.id === 'interview' && "HD panel video workspace featuring collaborative code editors, digital whiteboards, and transcript analytics."}
                      {module.id === 'engine' && "Core deep learning vectors parsing student profiles, matching skills, recommending paths, and ranking candidates."}
                      {module.id === 'automation' && "Automated operational trigger workflows scheduling mail campaigns, interview dates, and certificates delivery."}
                      {module.id === 'network' && "AI professional social feed supporting connections recommendations, project showrooms, and event webinars."}
                      {module.id === 'copilot' && "Personal chat assistant advising student pathways, running mock interview audio queries, and checking ATS scores."}
                      {module.id === 'admin' && "Nexus system monitoring platform status, verification requests, payment tiers, and global system configurations."}
                    </p>
                  </div>
                  
                  <Link
                    to={`/features?module=${module.id}`}
                    className="flex items-center gap-1.5 text-xs text-primary font-bold hover:underline mt-4 group-hover:text-accent transition-colors"
                  >
                    Explore Capabilities <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">Why Join Early Access?</h2>
            <p className="text-xl text-text-secondary">
              Exclusive benefits for early adopters
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { icon: Award, text: 'Free premium features for the first year' },
              { icon: Zap, text: 'Priority onboarding and support' },
              { icon: MessageSquare, text: 'Influence platform development with feedback' },
              { icon: Rocket, text: 'Early access to new features and tools' },
              { icon: Share2, text: 'Exclusive networking opportunities' },
              { icon: CheckCircle, text: 'Certificate of early adoption' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary flex items-center justify-center shadow-[0_8px_24px_rgba(239,68,68,0.15)] border border-primary/20 hover:border-primary/45 hover:shadow-[0_12px_28px_rgba(239,68,68,0.25)] transition-all duration-300">
                  <benefit.icon className="w-7 h-7 group-hover:scale-1.1 transition-transform duration-300" />
                </div>
                <span className="text-xs text-text-secondary leading-normal max-w-[140px] font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      {/* Red CTA Banner Section */}
      <section className="py-[40px] px-6 sm:px-12 lg:px-[48px] relative z-20">
        <div className="max-w-[1150px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full min-h-[120px] rounded-[14px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.55),0_0_48px_rgba(220,20,40,0.22)] bg-gradient-to-r from-[#7B111A] via-[#9E1A24] to-[#C92231]"
          >
            {/* ── Background image with object-contain to prevent X from being cropped ── */}
            <img
              src="/src/assets/images/cta-banner-bg.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none z-0 scale-[1.08]"
            />

            {/* ── Dark vignette on left so text stays readable ── */}
            <div className="absolute inset-y-0 left-0 w-full md:w-[70%] bg-gradient-to-r from-[#7B111A] via-[#7B111A]/80 to-transparent pointer-events-none z-10" />

            {/* ── Content row ── */}
            <div className="relative z-20 flex flex-col md:flex-row md:items-center gap-8 px-10 py-5 md:px-14 lg:px-16 min-h-[120px]">

              {/* Left: headline + description + button — max 55% width so it doesn't touch the X */}
              <div className="flex-1 max-w-[620px] space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                  className="text-[28px] md:text-[36px] lg:text-[40px] font-extrabold leading-[1.1] tracking-[-0.035em] text-white"
                >
                  Ready to Transform Your Career?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
                  className="text-[14px] md:text-[16px] leading-[1.6] text-white/80 max-w-[460px]"
                >
                  Join thousands of students already registered for early access.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.27, ease: 'easeOut' }}
                >
                  <Link
                    to="/register"
                    className="inline-flex h-[52px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[14px] bg-white px-7 text-[15px] font-bold text-[#EF4444] shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#FFF1F2] active:scale-[0.97] group"
                  >
                    Register Now
                    <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>
              </div>

              {/* Right: intentionally empty — X + streaks are in the background image */}
              <div className="hidden md:block flex-shrink-0 w-[30%]" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-surface border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex flex-col items-start">
                <img src={logo} alt="ConnectX Logo" className="h-28 md:h-32 object-contain" />
              </div>
              <p className="text-text-secondary text-sm">AI-Powered Talent Ecosystem</p>
              {/* Social links */}
              <div className="flex items-center gap-4">
                {[
                  { icon: MessageSquare, url: '#' },
                  { icon: Linkedin, url: '#' },
                  { icon: Twitter, url: '#' },
                  { icon: Instagram, url: '#' }
                ].map((s, idx) => (
                  <a key={idx} href={s.url} className="w-8 h-8 rounded-lg bg-background border border-white/5 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/30 transition-all">
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#about" className="hover:text-text-primary transition-colors text-sm">About</a></li>
                <li><a href="#features" className="hover:text-text-primary transition-colors text-sm">Features</a></li>
                <li><a href="#benefits" className="hover:text-text-primary transition-colors text-sm">Benefits</a></li>
                <li><Link to="/creators" className="hover:text-text-primary transition-colors text-sm">Creators</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Contact</h4>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" /> connectxhelpsupport@gmail.com</li>
                <li className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4" /> +91 95508 97539</li>
                <li className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" /> Hyderabad, India</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#" className="hover:text-text-primary transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-text-secondary text-xs gap-4">
            <p>&copy; 2026 ConnectX. All rights reserved.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/30 transition-all shadow-md cursor-pointer"
            >
              ▲
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
