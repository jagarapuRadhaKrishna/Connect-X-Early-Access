import { z } from 'zod';

export const registrationSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters').max(255),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  whatsapp: z.string().regex(/^[0-9]{10}$/, 'WhatsApp number must be 10 digits'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  date_of_birth: z.string().refine((date) => {
    const dob = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    return age >= 16 && age <= 35;
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
  suggestions: z.string().max(1000).optional()
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
