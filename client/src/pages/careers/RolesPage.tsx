import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Code, Smartphone, Palette, Megaphone, Briefcase } from 'lucide-react'
import logo from '../../assets/images/logo.png'

const allRoles: Record<string, { name: string; desc: string }[]> = {
  engineering: [
    { name: 'React Frontend Developer', desc: 'Build beautiful, performant UIs with React, TypeScript and Tailwind.' },
    { name: 'Node.js Backend Developer', desc: 'Design and maintain RESTful APIs with Node.js, Express and PostgreSQL.' },
    { name: 'Full Stack Developer', desc: 'Own features end-to-end across the React + Node stack.' },
    { name: 'API Integration Engineer', desc: 'Integrate third-party services, payment gateways, and AI APIs.' },
    { name: 'DevOps Engineer', desc: 'Manage CI/CD pipelines, Docker deployments, and cloud infra.' },
  ],
  mobile: [
    { name: 'React Native Developer', desc: 'Build cross-platform mobile apps for iOS and Android.' },
    { name: 'Flutter Developer', desc: 'Create high-performance UIs using Flutter and Dart.' },
  ],
  design: [
    { name: 'UI Designer', desc: 'Craft pixel-perfect interfaces in Figma following our design system.' },
    { name: 'UX Designer', desc: 'Conduct user research and shape product experiences.' },
    { name: 'Product Designer', desc: 'Own the full design lifecycle from wireframe to high-fidelity.' },
    { name: 'Motion Graphics Designer', desc: 'Create animations, transitions and micro-interactions.' },
    { name: 'Graphic Designer', desc: 'Design marketing assets, banners, presentations and brand materials.' },
    { name: 'Logo Designer', desc: 'Create brand identities and logo systems.' },
  ],
  marketing: [
    { name: 'Social Media Manager', desc: 'Grow our presence across LinkedIn, Instagram and Twitter.' },
    { name: 'Content Writer', desc: 'Write blogs, email campaigns, product copy and long-form content.' },
    { name: 'SEO Executive', desc: 'Drive organic growth through technical and content SEO.' },
    { name: 'Digital Marketing', desc: 'Run paid campaigns on Google and Meta with measurable ROI.' },
  ],
  operations: [
    { name: 'HR', desc: 'Own recruitment pipelines, onboarding and people operations.' },
    { name: 'Recruitment Coordinator', desc: 'Source and screen candidates across all open roles.' },
    { name: 'Business Development', desc: 'Build partnerships with institutes and companies.' },
    { name: 'Customer Success', desc: 'Onboard and retain users, handle support and feedback.' },
    { name: 'Operations Manager', desc: 'Streamline internal processes and cross-team coordination.' },
  ],
}

const departmentMeta: Record<string, {
  label: string
  color: string
  icon: any
  iconBg: string
  headline: string
}> = {
  engineering: {
    label: 'Engineering',
    color: '#EF4444',
    icon: Code,
    iconBg: 'bg-red-500/15 border-red-500/25 text-red-400',
    headline: 'Build the infrastructure powering the future of careers.',
  },
  mobile: {
    label: 'Mobile',
    color: '#8B5CF6',
    icon: Smartphone,
    iconBg: 'bg-purple-500/15 border-purple-500/25 text-purple-400',
    headline: 'Ship delightful mobile experiences to millions of users.',
  },
  design: {
    label: 'Design',
    color: '#EC4899',
    icon: Palette,
    iconBg: 'bg-pink-500/15 border-pink-500/25 text-pink-400',
    headline: 'Shape the look and feel of an AI-driven career platform.',
  },
  marketing: {
    label: 'Marketing',
    color: '#10B981',
    icon: Megaphone,
    iconBg: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400',
    headline: 'Tell the ConnectX story and grow our community.',
  },
  operations: {
    label: 'Operations',
    color: '#F97316',
    icon: Briefcase,
    iconBg: 'bg-orange-500/15 border-orange-500/25 text-orange-400',
    headline: 'Build the systems and team behind ConnectX.',
  },
}

const RolesPage = () => {
  const { department = 'engineering' } = useParams<{ department: string }>()
  const meta = departmentMeta[department] ?? departmentMeta.engineering
  const roles = allRoles[department] ?? []
  const Icon = meta.icon

  return (
    <div className="min-h-screen bg-[#070B14] text-white font-sans relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full blur-[120px]" style={{ background: `${meta.color}08` }} />
        <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[55%] rounded-full blur-[130px]" style={{ background: `${meta.color}06` }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[84px] flex items-center bg-[#070B14]/82 backdrop-blur-[24px] border-b border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
        <div className="max-w-[1320px] w-full mx-auto px-6 sm:px-12 lg:px-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-85 transition-opacity">
            <img src={logo} alt="ConnectX Logo" className="h-[85px] md:h-[95px] w-auto max-w-[320px] object-contain" />
          </Link>
          <Link
            to="/careers"
            className="flex items-center gap-2 text-[14px] font-medium text-white/70 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <div className="pt-[120px] pb-[100px] px-6 sm:px-12 lg:px-[72px] relative z-10">
        <div className="max-w-[1320px] mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-left"
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white/80 mb-6 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Careers
            </Link>

            <div className="flex items-center gap-4 mb-5">
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center flex-shrink-0 ${meta.iconBg}`}>
                <Icon className="w-7 h-7" style={{ color: meta.color }} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: meta.color }}>
                  {meta.label} · {roles.length} Open Roles
                </div>
                <h1 className="text-[38px] md:text-[52px] font-extrabold tracking-tight text-white leading-[1.05]">
                  {meta.label} Roles
                </h1>
              </div>
            </div>
            <p className="text-[18px] text-white/60 max-w-[560px] leading-[1.7]">{meta.headline}</p>
          </motion.div>

          {/* Roles grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="group relative bg-[#0E1622] border border-white/8 rounded-[18px] p-7 flex flex-col justify-between gap-6 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                style={{ '--accent': meta.color } as React.CSSProperties}
              >
                {/* Role number */}
                <span
                  className="absolute top-5 right-6 text-[11px] font-bold opacity-30"
                  style={{ color: meta.color }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="space-y-3">
                  <h2 className="text-[20px] font-bold text-white leading-snug">{role.name}</h2>
                  <p className="text-[14px] text-white/55 leading-[1.65]">{role.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Internship', 'Remote', 'Founding Team'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                        style={{ color: meta.color, borderColor: `${meta.color}35`, background: `${meta.color}10` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/careers/apply?role=${encodeURIComponent(role.name)}&department=${department}`}
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[10px] text-[14px] font-semibold text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200 group-hover:shadow-md px-5"
                >
                  Apply for this Role
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" style={{ color: meta.color }} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mentor note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 p-8 rounded-[18px] border border-white/8 bg-white/[0.025] text-center"
          >
            <p className="text-[15px] text-white/60 max-w-[560px] mx-auto leading-[1.7]">
              🎓 <span className="text-white font-semibold">No experience required.</span> We mentor you through everything.
              Join the founding team and grow with us.
            </p>
            <Link
              to="/careers/apply"
              className="mt-5 inline-flex h-[52px] items-center gap-2.5 px-8 rounded-[12px] bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white text-[15px] font-semibold shadow-[0_12px_30px_rgba(239,68,68,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(239,68,68,0.5)] transition-all duration-200"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RolesPage
