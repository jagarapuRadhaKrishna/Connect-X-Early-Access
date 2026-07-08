import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import {
  createCareerApplication,
  getAllCareerApplications,
  getCareerApplicationById,
  updateCareerApplicationStatus,
  deleteCareerApplication,
  getCareerDashboardStats,
  getCareerAnalytics,
  parseResume,
} from '../controllers/careerController'
import { authenticate, authorize } from '../middleware/auth'
import { validate } from '../middleware/validator'
import { careerApplicationSchema } from '../validations/careerValidation'

const router = Router()

// CORS middleware for parse-resume endpoint
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

// Configure multer storage for resumes
const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir)
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowedTypes.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('Only .pdf, .doc, and .docx files are allowed') as any)
    }
  }
})

// Middleware to parse FormData strings to correct types for Zod validation
const parseFormDataTypes = (req: any, _res: any, next: any) => {
  // Handle skills (string to array)
  if (typeof req.body.skills === 'string') {
    try {
      req.body.skills = JSON.parse(req.body.skills)
    } catch (e) {
      if (req.body.skills) {
        req.body.skills = req.body.skills.split(',').map((s: string) => s.trim())
      } else {
        req.body.skills = ['General']
      }
    }
  }

  // Handle startup_agreement (string to boolean)
  if (req.body.startup_agreement === 'true') {
    req.body.startup_agreement = true
  } else if (req.body.startup_agreement === 'false') {
    req.body.startup_agreement = false
  }

  // Handle graduation_year (string to number)
  if (req.body.graduation_year) {
    req.body.graduation_year = Number(req.body.graduation_year)
  }

  // Handle cgpa (string to number)
  if (req.body.cgpa) {
    req.body.cgpa = Number(req.body.cgpa)
  }

  // Handle gender - make it optional if empty
  if (!req.body.gender || req.body.gender === '') {
    delete req.body.gender
  }

  next()
}

// Public routes
router.options('/parse-resume', cors(corsOptions))
router.post('/parse-resume', cors(corsOptions), upload.single('resume'), parseResume)
router.post('/', upload.single('resume'), parseFormDataTypes, validate(careerApplicationSchema), createCareerApplication)

// Admin routes (protected)
router.get('/', authenticate, getAllCareerApplications)
router.get('/dashboard/stats', authenticate, getCareerDashboardStats)
router.get('/analytics/data', authenticate, getCareerAnalytics)
router.get('/:id', authenticate, getCareerApplicationById)
router.put('/:id/status', authenticate, authorize(['admin', 'super_admin']), updateCareerApplicationStatus)
router.delete('/:id', authenticate, authorize(['admin', 'super_admin']), deleteCareerApplication)

export default router
