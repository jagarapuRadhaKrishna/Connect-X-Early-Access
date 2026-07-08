import { z } from 'zod'

export const careerApplicationSchema = z.object({
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
  graduation_year: z.coerce.number().int().min(2020).max(2030),
  cgpa: z.coerce.number().min(0).max(10).optional(),
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
  resume_path: z.string().optional(),
})

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>
