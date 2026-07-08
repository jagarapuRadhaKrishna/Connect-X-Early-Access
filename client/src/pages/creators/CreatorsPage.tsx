import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../../assets/images/logo.png'
import rkPic from '../../assets/images/creator-radha.png'
import rishiPic from '../../assets/images/creator-rishi.png'
import sanjanaPic from '../../assets/images/creator-sanjana.png'
import { ArrowRight, Code, Palette, Cpu, CheckCircle, Mail, Phone, Menu, X as CloseIcon, Users, Sparkles, Database, Shield } from 'lucide-react'

const CreatorsPage = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '/#about', isLink: true },
    { label: 'Features', href: '/#features', isLink: true },
    { label: 'Benefits', href: '/#benefits', isLink: true },
    { label: 'Careers', href: '/careers', isLink: true },
    { label: 'Creators', href: '/creators', isLink: true },
  ]

  const creators = [
    {
      name: 'JAGARAPU RADHA KRISHNA',
      role: 'BACKEND • AUTOMATION • AI ARCHITECT',
      image: rkPic,
      color: '#EF4444',
      glow: 'shadow-[0_0_30px_rgba(239,68,68,0.22)]',
      borderGlow: 'hover:border-red-500/50',
      tagline: 'Architecting powerful backend systems, AI integrations and automation workflows that drive smart recommendations and seamless performance.',
      icon: Code,
      responsibilities: [
        'System Architecture',
        'Backend Development',
        'AI Integration',
        'Automation Engine',
        'Database Design',
        'Security & Performance',
      ]
    },
    {
      name: 'RISHI KUMAR METTA',
      role: 'CRM • DATA HANDLING • DEVOPS',
      image: rishiPic,
      color: '#8B5CF6',
      glow: 'shadow-[0_0_30px_rgba(139,92,246,0.22)]',
      borderGlow: 'hover:border-purple-500/50',
      tagline: 'Designing robust CRM systems, handling data pipelines and building scalable DevOps solutions for reliable deployments.',
      icon: Cpu,
      responsibilities: [
        'CRM Architecture',
        'Data Pipeline Engineering',
        'Documentation',
        'Containerization (Docker)',
        'CI/CD & Deployment',
        'Monitoring & Analytics',
      ]
    },
    {
      name: 'SANJANA KAKARLAMUDI',
      role: 'FRONTEND • UI/UX DESIGNER',
      image: sanjanaPic,
      color: '#EC4899',
      glow: 'shadow-[0_0_30px_rgba(236,72,153,0.22)]',
      borderGlow: 'hover:border-pink-500/50',
      tagline: 'Crafting intuitive user experiences and beautiful interfaces that make job searching simple, engaging and efficient.',
      icon: Palette,
      responsibilities: [
        'UI/UX Research & Design',
        'React Development',
        'Responsive Interfaces',
        'Design Systems',
        'User Experience',
        'Prototyping & Animation',
      ]
    }
  ]

  const badges = [
    { label: 'ONE TEAM', desc: 'United by purpose', icon: Users },
    { label: 'ONE VISION', desc: 'Empowering careers', icon: Sparkles },
    { label: 'ONE PLATFORM', desc: 'Endless possibilities', icon: Database },
    { label: 'ONE IMPACT', desc: 'Future ready', icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-sans relative overflow-hidden selection:bg-primary/30">
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
          ? 'bg-[#07090E]/82 backdrop-blur-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.35)] border-white/5' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-85 transition-opacity duration-200">
            <img src={logo} alt="ConnectX Logo" className="h-[85px] md:h-[95px] w-auto max-w-[320px] object-contain" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
            {navLinks.map((link, idx) => (
              <Link 
                key={idx} 
                to={link.href} 
                className="group relative py-3 text-[15px] font-medium tracking-[0.02em] text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
                <span className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#EF4444] to-[#8B5CF6] transition-all duration-300 ${
                  link.label === 'Creators' ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100'
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              to="/register" 
              className="h-[46px] px-6 rounded-[14px] bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white text-[15px] font-semibold flex items-center gap-2.5 shadow-[0_12px_30px_rgba(239,68,68,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(239,68,68,0.5)] transition-all duration-200 active:scale-[0.98]"
            >
              Join Early Access <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-11 h-11 rounded-[14px] border border-white/10 bg-white/[0.04] text-white flex items-center justify-center focus:outline-none"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
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
            className="w-11 h-11 rounded-[14px] border border-white/10 bg-white/[0.04] text-white flex items-center justify-center"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-10 space-y-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-[52px] items-center rounded-2xl px-1 text-lg font-semibold text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          to="/register"
          onClick={() => setMobileMenuOpen(false)}
          className="absolute bottom-8 left-8 right-8 h-[50px] rounded-[14px] bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 shadow-[0_12px_30px_rgba(239,68,68,0.35)]"
        >
          Join Early Access <ArrowRight className="w-[18px] h-[18px]" />
        </Link>
      </aside>

      {/* Main Content Header */}
      <section className="pt-[160px] pb-[40px] px-6 sm:px-12 lg:px-[72px] relative z-20">
        <div className="max-w-[1320px] mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[11px] font-semibold text-primary uppercase tracking-widest"
          >
            ConnectX Team
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight"
          >
            MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-black">CREATORS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed"
          >
            Three minds. Three strengths. One mission.<br />
            Building the future of <span className="text-primary font-semibold">career growth</span> and <span className="text-accent font-semibold">opportunity</span>.
          </motion.p>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="pb-[80px] px-6 sm:px-12 lg:px-[72px] relative z-20">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className={`bg-[#0B0F19]/60 border border-white/8 rounded-[24px] p-6 flex flex-col items-center justify-between text-center relative overflow-hidden transition-all duration-300 group ${creator.borderGlow} hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]`}
            >
              {/* Glow background */}
              <div className={`absolute -inset-px rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/[0.04] to-transparent z-0`} />

              <div className="w-full space-y-6 relative z-10 flex flex-col items-center">
                {/* Photo with glowing ring */}
                <div className={`w-[170px] h-[204px] rounded-[18px] overflow-hidden border border-white/10 ${creator.glow} transition-all duration-500 group-hover:scale-[1.03]`}>
                  <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-lg">
                    <creator.icon className="w-4 h-4" style={{ color: creator.color }} />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/80">{creator.role.split(' • ')[0]}</span>
                  </div>

                  <h2 className="text-xl font-black text-white tracking-wide">{creator.name}</h2>
                  <p className="text-[11px] font-bold tracking-widest" style={{ color: creator.color }}>
                    {creator.role}
                  </p>
                </div>

                <hr className="w-12 border-white/10" />

                {/* Tagline */}
                <p className="text-[13px] text-[#94A3B8] leading-relaxed px-2 font-medium">
                  {creator.tagline}
                </p>

                <hr className="w-full border-white/5" />

                {/* Responsibilities */}
                <div className="w-full text-left space-y-2.5 px-2">
                  <span className="text-[10px] font-bold text-white/40 tracking-wider block uppercase">Key Responsibilities</span>
                  <div className="grid grid-cols-1 gap-2">
                    {creator.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-[12px] text-white/80 hover:text-white transition-colors duration-200">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: creator.color }} />
                        <span className="font-semibold">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mid Statement */}
      <section className="py-[60px] px-6 sm:px-12 lg:px-[72px] relative z-20 border-t border-white/5 bg-[#0C1220]/20">
        <div className="max-w-[1320px] mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-1 bg-gradient-to-r from-primary to-accent rounded-full"
          >
            <div className="bg-[#07090E] px-8 py-5 rounded-full">
              <p className="text-base sm:text-xl font-bold tracking-wide text-white/90">
                We are not just building a platform. We are building <span className="text-primary font-black uppercase">Opportunities</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Badges Footer Section */}
      <section className="py-[40px] px-6 sm:px-12 lg:px-[72px] relative z-20 border-t border-white/5">
        <div className="max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-5 bg-[#0B0F19]/40 border border-white/5 rounded-[18px] text-left hover:border-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/70">
                <badge.icon className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <h3 className="text-[13px] font-bold text-white uppercase tracking-wider">{badge.label}</h3>
                <span className="text-[11px] text-[#94A3B8]">{badge.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#07090E] py-16 px-6 sm:px-12 lg:px-[72px] relative z-20">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          <div className="space-y-4 md:col-span-2">
            <img src={logo} alt="ConnectX Logo" className="h-14 md:h-16 object-contain" />
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              ConnectX is an AI-powered ecosystem that connects Candidates, Companies, Recruiters, and Training Institutes to build the future of work.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-[#94A3B8] hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-[#94A3B8]"><Mail className="w-4 h-4" /> connectxhelpsupport@gmail.com</li>
              <li className="flex items-center gap-2 text-sm text-[#94A3B8]"><Phone className="w-4 h-4" /> +91 95508 97539</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CreatorsPage
