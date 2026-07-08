import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../../assets/images/logo.png'
import heroCareers from '../../assets/images/hero-careers.png'
import ctaBannerBg from '../../assets/images/cta-banner-bg.png'
import { 
  ArrowRight, 
  Rocket,
  Target,
  Users, 
  Award, 
  Briefcase, 
  Code, 
  Palette, 
  Megaphone, 
  Settings,
  CheckCircle,
  AlertTriangle,
  Zap,
  Globe,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Instagram,
  Linkedin,
  Twitter,
  Smartphone,
  Mail,
  Menu,
  X as CloseIcon,
  Star
} from 'lucide-react'

const CareersLanding = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const roles: Record<string, { name: string; icon: any }[]> = {
    engineering: [
      { name: 'React Frontend Developer', icon: Code },
      { name: 'Node.js Backend Developer', icon: Code },
      { name: 'Full Stack Developer', icon: Code },
      { name: 'API Integration Engineer', icon: Code },
      { name: 'DevOps Engineer', icon: Settings },
    ],
    mobile: [
      { name: 'React Native Developer', icon: Smartphone },
      { name: 'Flutter Developer', icon: Smartphone },
    ],
    design: [
      { name: 'UI Designer', icon: Palette },
      { name: 'UX Designer', icon: Palette },
      { name: 'Product Designer', icon: Palette },
      { name: 'Motion Graphics Designer', icon: Palette },
      { name: 'Graphic Designer', icon: Palette },
      { name: 'Logo Designer', icon: Palette },
    ],
    marketing: [
      { name: 'Social Media Manager', icon: Megaphone },
      { name: 'Content Writer', icon: BookOpen },
      { name: 'SEO Executive', icon: TrendingUp },
      { name: 'Digital Marketing', icon: Megaphone },
    ],
    operations: [
      { name: 'HR', icon: Users },
      { name: 'Recruitment Coordinator', icon: Users },
      { name: 'Business Development', icon: Briefcase },
      { name: 'Customer Success', icon: Users },
      { name: 'Operations Manager', icon: Settings },
    ],
  }

  const benefits = [
    { icon: Rocket, title: 'Real Startup Experience', desc: 'Work in a fast-paced environment building from ground up' },
    { icon: Award, title: 'Enterprise Product Development', desc: 'Build production systems used by thousands' },
    { icon: Code, title: 'Build Production Systems', desc: 'Work on scalable, real-world applications' },
    { icon: Users, title: 'Work Directly With Founders', desc: 'Learn directly from experienced entrepreneurs' },
    { icon: Briefcase, title: 'Portfolio Projects', desc: 'Build impressive projects for your portfolio' },
    { icon: BookOpen, title: 'Internship Experience', desc: 'Gain valuable industry experience' },
    { icon: TrendingUp, title: 'Leadership Opportunities', desc: 'Lead projects and teams as you grow' },
    { icon: Award, title: 'Recommendation Letter', desc: 'Get strong recommendations from founders' },
    { icon: CheckCircle, title: 'Experience Certificate', desc: 'Official documentation of your contributions' },
    { icon: Zap, title: 'Future Paid Opportunities', desc: 'First consideration when we scale with funding' },
    { icon: Globe, title: 'Career Growth', desc: 'Accelerate your career trajectory' },
    { icon: Users, title: 'Networking', desc: 'Connect with industry professionals and peers' },
  ]

  const filteredCategories = selectedCategory === 'all' 
    ? Object.keys(roles) 
    : [selectedCategory]

  const navLinks = [
    { label: 'About', href: '#mission' },
    { label: 'Features', href: '#benefits' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Careers', href: '#roles' },
    { label: 'Creators', href: '/creators', isRoute: true },
    { label: 'Contact', href: '#contact' },
  ]

  const categoryThemes: Record<string, {
    color: string
    card: string
    iconBox: string
    btnBorder: string
    icon: any
    roleCount: string
  }> = {
    engineering: {
      color: '#EF4444',
      card: 'border-red-500/35 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.16),transparent_42%),#111827] hover:border-red-500/60 hover:shadow-[0_0_28px_rgba(239,68,68,0.18)]',
      iconBox: 'border-red-500/20 bg-red-500/16 text-red-400 shadow-[0_0_18px_rgba(239,68,68,0.16)]',
      btnBorder: 'border-red-500/45 hover:bg-red-500/10 text-white hover:text-white',
      icon: Code,
      roleCount: '9 Open Roles',
    },
    mobile: {
      color: '#8B5CF6',
      card: 'border-purple-500/30 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_42%),#111827] hover:border-purple-500/55 hover:shadow-[0_0_28px_rgba(139,92,246,0.18)]',
      iconBox: 'border-purple-500/20 bg-purple-500/16 text-purple-400 shadow-[0_0_18px_rgba(139,92,246,0.16)]',
      btnBorder: 'border-purple-500/45 hover:bg-purple-500/10 text-white hover:text-white',
      icon: Smartphone,
      roleCount: '2 Open Roles',
    },
    design: {
      color: '#EC4899',
      card: 'border-pink-500/35 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.16),transparent_42%),#111827] hover:border-pink-500/60 hover:shadow-[0_0_28px_rgba(236,72,153,0.18)]',
      iconBox: 'border-pink-500/20 bg-pink-500/16 text-pink-400 shadow-[0_0_18px_rgba(236,72,153,0.16)]',
      btnBorder: 'border-pink-500/45 hover:bg-pink-500/10 text-white hover:text-white',
      icon: Palette,
      roleCount: '6 Open Roles',
    },
    marketing: {
      color: '#10B981',
      card: 'border-emerald-500/35 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_42%),#111827] hover:border-emerald-500/60 hover:shadow-[0_0_28px_rgba(16,185,129,0.18)]',
      iconBox: 'border-emerald-500/20 bg-emerald-500/16 text-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.16)]',
      btnBorder: 'border-emerald-500/45 hover:bg-emerald-500/10 text-white hover:text-white',
      icon: Megaphone,
      roleCount: '4 Open Roles',
    },
    operations: {
      color: '#F97316',
      card: 'border-orange-500/35 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_42%),#111827] hover:border-orange-500/60 hover:shadow-[0_0_28px_rgba(249,115,22,0.18)]',
      iconBox: 'border-orange-500/20 bg-orange-500/16 text-orange-400 shadow-[0_0_18px_rgba(249,115,22,0.16)]',
      btnBorder: 'border-orange-500/45 hover:bg-orange-500/10 text-white hover:text-white',
      icon: Briefcase,
      roleCount: '5 Open Roles',
    },
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-white font-sans relative overflow-hidden selection:bg-primary/30">
      {/* Background ambient lighting */}
      <div className="absolute top-0 inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[55%] h-[65%] rounded-full bg-primary/5 blur-[130px] opacity-70" />
        <div className="absolute bottom-[10%] left-[5%] w-[45%] h-[55%] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] z-10" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} 
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[84px] flex items-center transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#070B14]/82 backdrop-blur-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.35)] border-white/5' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-85 transition-opacity duration-200">
            <img src={logo} alt="ConnectX Logo" className="h-[170px] md:h-[190px] w-auto max-w-[640px] object-contain" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
            {navLinks.map((link, idx) => (
              link.isRoute ? (
                <Link
                  key={idx}
                  to={link.href}
                  className="group relative py-3 text-[15px] font-medium tracking-[0.02em] text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#EF4444] to-[#8B5CF6] transition-all duration-300 w-0 opacity-0 group-hover:w-6 group-hover:opacity-100" />
                </Link>
              ) : (
                <a 
                  key={idx} 
                  href={link.href} 
                  className="group relative py-3 text-[15px] font-medium tracking-[0.02em] text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#EF4444] to-[#8B5CF6] transition-all duration-300 ${
                    idx === 0 ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100'
                  }`} />
                </a>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a 
              href="#roles" 
              className="h-[46px] px-6 rounded-[14px] bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white text-[15px] font-semibold flex items-center gap-2.5 shadow-[0_12px_30px_rgba(239,68,68,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(239,68,68,0.5)] transition-all duration-200 active:scale-[0.98]"
            >
              Apply Now <ArrowRight className="w-[18px] h-[18px]" />
            </a>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-11 h-11 rounded-[14px] border border-white/10 bg-white/[0.04] text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/70"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] h-screen w-[min(340px,calc(100vw-24px))] rounded-l-[28px] border-l border-white/10 bg-[#0B1120] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)] transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between">
          <img src={logo} alt="ConnectX Logo" className="h-[45px] w-auto object-contain" />
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
            className="w-11 h-11 rounded-[14px] border border-white/10 bg-white/[0.04] text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/70"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-10 space-y-5">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-[52px] items-center rounded-2xl border border-transparent px-1 text-lg font-semibold text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-[52px] items-center rounded-2xl border border-transparent px-1 text-lg font-semibold text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            )
          ))}
        </div>
        <a
          href="#roles"
          onClick={() => setMobileMenuOpen(false)}
          className="absolute bottom-8 left-8 right-8 h-[50px] rounded-[14px] bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 shadow-[0_12px_30px_rgba(239,68,68,0.35)] active:scale-[0.98]"
        >
          Apply Now <ArrowRight className="w-[18px] h-[18px]" />
        </a>
      </aside>

      {/* Hero Section */}
      <section className="pt-[100px] pb-[40px] px-6 sm:px-12 lg:px-[72px] relative z-20 flex items-center min-h-[440px] overflow-hidden">
        {/* Full-width Background Hero Image */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          {/* Ambient gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/90 to-[#070B14]/40 z-10" />
          <img
            src={heroCareers}
            alt="ConnectX founding team"
            className="w-full h-full object-cover object-center lg:object-right"
          />
        </div>

        <div className="max-w-[1320px] w-full mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-6 space-y-6 text-left relative z-10"
            >
              {/* Hiring Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                We Are Hiring
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-[68px] font-extrabold tracking-tight text-white leading-[1.05] max-w-[620px]">
                Join The <br />
                <span className="text-primary font-black">ConnectX</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400 font-black">
                  Founding Team
                </span>
              </h1>

              {/* Paragraph description */}
              <p className="text-lg md:text-[22px] text-[#94A3B8] leading-[1.8] max-w-[560px]">
                Help us build the future of AI Hiring, Professional Networking, Career Growth and Recruitment Technology.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a 
                  href="#roles" 
                  className="h-[56px] px-8 rounded-[14px] bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white font-semibold flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(239,68,68,0.35)] hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] transition-all duration-200"
                >
                  Apply Now <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#roles" 
                  className="h-[56px] px-8 rounded-[14px] border border-white/12 hover:bg-white/5 text-white font-medium flex items-center justify-center transition-all duration-200"
                >
                  Explore Roles
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before You Apply Warning Card */}
      <section className="py-12 px-6 sm:px-12 lg:px-[72px] relative z-20">
        <div className="max-w-[1320px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 md:p-6 border border-red-500/20 bg-[#0C1220]/90 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_30px_rgba(239,68,68,0.08)] max-w-[1100px] mx-auto"
          >
            {/* Warning Details */}
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.2)] border border-red-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-left space-y-2.5">
                <h2 className="text-xl font-bold text-white tracking-tight">Before You Apply</h2>
                <div className="space-y-1.5 text-xs md:text-sm text-[#94A3B8] leading-relaxed">
                  <p>ConnectX is currently in the <strong className="text-red-500">Building & Development Stage</strong>.</p>
                  <p>At this stage we are building the product and forming our founding team.</p>
<p className="text-red-500 font-semibold">After 3 months there is a fixed stipend. After launching the product, you get a best-in-industry full-time package based on your role (based on performance and contribution only).</p>
                  <p>We are looking for passionate contributors who want to learn, build, grow and become part of this journey.</p>
                  <p>As ConnectX grows, funding and paid opportunities will be explored.</p>
                  <p className="font-bold text-white pt-1 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    Please apply only if you understand and agree with this.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Glowing Star Circle */}
            <div className="hidden md:flex items-center justify-center w-24 h-24 relative flex-shrink-0">
              <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl animate-pulse" />
              <div className="w-16 h-16 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <Star className="w-7 h-7 text-red-500 animate-pulse" fill="#EF4444" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-6 sm:px-12 lg:px-[72px] relative z-20">
        <div className="max-w-[1320px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
              ConnectX exists to democratize career opportunities using AI. We're building an AI Talent Cloud that connects talented individuals with their dream careers, regardless of their background or location.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-[#111827] border-0 hover:border-primary/30 transition-all rounded-[24px] shadow-lg flex flex-col items-start text-left relative overflow-hidden h-full"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-primary/20">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Our Vision</h3>
              <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-2">
                To create a world where every person has equal access to career opportunities. We believe AI can level the playing field and help people unlock their full potential.
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#EF4444] to-transparent rounded-full shadow-[0_0_12px_#EF4444]" />
            </motion.div>

            {/* What We're Building */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-[#111827] border-0 hover:border-purple-500/30 transition-all rounded-[24px] shadow-lg flex flex-col items-start text-left relative overflow-hidden h-full self-center"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(139,92,246,0.2)] border border-purple-500/20">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">What We're Building</h3>
              <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-2">
                An AI-powered platform that provides personalized career guidance, resume optimization, skill development, and direct connections with top companies and opportunities.
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent rounded-full shadow-[0_0_12px_#8B5CF6]" />
            </motion.div>

            {/* Future Roadmap */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-[#111827] border-0 hover:border-green-500/30 transition-all rounded-[24px] shadow-lg flex flex-col items-start text-left relative overflow-hidden h-full"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)] border border-green-500/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Future Roadmap</h3>
              <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-2">
                From early access to a global platform. We're starting with student registrations and will expand to become the go-to destination for career growth and professional networking.
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent rounded-full shadow-[0_0_12px_#10B981]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join ConnectX Feature Grid */}
      <section id="benefits" className="py-20 px-6 sm:px-12 lg:px-[72px] relative z-20">
        <div className="max-w-[1320px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Join ConnectX?</h2>
            <p className="text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
              Be part of something meaningful from day one
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#111827] border border-white/8 hover:border-primary/30 transition-all rounded-[18px] p-6 hover:-translate-y-1 shadow-md text-left flex flex-col justify-between h-44"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.15)] border border-primary/20">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[15px] font-bold text-white">{benefit.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-normal">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Dynamic Tab Lists */}
      <section id="roles" className="py-20 px-6 sm:px-12 lg:px-[72px] relative z-20 bg-[#0C1220]/40 border-t border-b border-white/5">
        <div className="max-w-[1320px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-lg text-[#94A3B8]">
              Find your perfect role in our founding team
            </p>
          </motion.div>

          {/* Department Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'All Departments' },
              { id: 'engineering', label: 'Engineering' },
              { id: 'mobile', label: 'Mobile' },
              { id: 'design', label: 'Design' },
              { id: 'marketing', label: 'Marketing' },
              { id: 'operations', label: 'Operations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all duration-200 uppercase tracking-wider ${
                  selectedCategory === tab.id 
                    ? 'bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white border-transparent shadow-[0_4px_15px_rgba(239,68,68,0.25)]' 
                    : 'bg-[#111827] border-white/8 text-[#94A3B8] hover:text-white hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Roles Grid — responsive layout with 5 cards per row on desktop (all in one row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-[1320px] mx-auto">
            {filteredCategories.map((category) => {
              const theme = categoryThemes[category]

              return (
                <div 
                  key={category} 
                  className={`border rounded-[16px] p-6 flex flex-col justify-between min-h-[320px] w-full h-full transition-all duration-300 hover:-translate-y-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] ${theme.card}`}
                >
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-12 h-12 rounded-[12px] border flex items-center justify-center flex-shrink-0 ${theme.iconBox}`}>
                        <theme.icon className="w-6 h-6" style={{ color: theme.color }} />
                      </div>
                      <div className="leading-tight pt-0.5">
                        <h3 className="text-[18px] font-extrabold text-white capitalize tracking-[-0.01em]">{category}</h3>
                        <span className="text-[11px] font-bold block mt-0.5" style={{ color: theme.color }}>
                          {theme.roleCount}
                        </span>
                      </div>
                    </div>

                    {/* Bulleted list of roles */}
                    <div className="space-y-3 text-left">
                      {roles[category].map((role: { name: string; icon: any }, idx: number) => (
                        <Link
                          key={idx}
                          to={`/careers/apply?role=${encodeURIComponent(role.name)}`}
                          className="flex items-start text-[13px] xl:text-[14px] text-[#CBD5E1] hover:text-white transition-colors duration-200 group"
                        >
                          <span className="mr-2 text-[16px] font-black leading-none" style={{ color: theme.color }}>•</span>
                          <span className="group-hover:underline leading-relaxed">{role.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Outlined Action Button at bottom */}
                  <div className="mt-6">
                    <Link
                      to={`/careers/roles/${category}`}
                      className={`w-full h-[40px] px-4 rounded-[10px] text-[12px] font-bold bg-transparent border ${theme.btnBorder} transition-all duration-200 flex items-center justify-center gap-1.5 hover:scale-[1.02]`}
                    >
                      View {category.charAt(0).toUpperCase() + category.slice(1)} Roles 
                      <ArrowRight className="w-4 h-4" style={{ color: theme.color }} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Red CTA Banner Section */}
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
              src={ctaBannerBg}
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
                  Ready to Build Something Amazing?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
                  className="text-[14px] md:text-[16px] leading-[1.6] text-white/80 max-w-[460px]"
                >
                  Join our founding team and help shape the future of career technology.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.27, ease: 'easeOut' }}
                >
                  <Link
                    to="/careers/apply"
                    className="inline-flex h-[52px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[14px] bg-white px-7 text-[15px] font-bold text-[#EF4444] shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#FFF1F2] active:scale-[0.97] group"
                  >
                    Start Your Application
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
      <footer id="contact" className="py-16 px-6 sm:px-12 lg:px-[72px] bg-[#070B14] border-t border-white/10 relative z-20">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4 text-left">
              <img src={logo} alt="ConnectX Logo" className="h-28 md:h-32 object-contain" />
              <p className="text-[#94A3B8] text-sm leading-relaxed max-w-[240px]">
                Building the future of AI Hiring, Professional Networking, and Career Growth.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: MessageSquare, url: '#' },
                  { icon: Linkedin, url: '#' },
                  { icon: Twitter, url: '#' },
                  { icon: Instagram, url: '#' }
                ].map((s, idx) => (
                  <a key={idx} href={s.url} className="w-8 h-8 rounded-lg bg-[#111827] border border-white/5 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 transition-all">
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-left">
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-[#94A3B8] text-sm">
                <li><a href="#mission" className="hover:text-white transition-colors">Mission</a></li>
                <li><a href="#roles" className="hover:text-white transition-colors">Open Roles</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><Link to="/creators" className="hover:text-white transition-colors">Creators</Link></li>
                <li><a href="#mission" className="hover:text-white transition-colors">Our Culture</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div className="text-left">
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-[#94A3B8] text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div className="text-left">
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-[#94A3B8] text-sm">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> connectx.talent@gmail.com</li>
                <li className="flex items-center gap-2"><Globe className="w-4 h-4" /> +91 95508 97539</li>
                <li className="flex items-center gap-2 text-slate-400 text-xs">Hyderabad, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[#94A3B8] text-xs gap-4">
            <p>&copy; 2026 ConnectX. All rights reserved.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full bg-[#111827] border border-white/5 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-md cursor-pointer"
            >
              ▲
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CareersLanding
