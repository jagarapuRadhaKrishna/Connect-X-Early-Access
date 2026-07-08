import { Request, Response } from 'express'
import CareerApplication from '../models/CareerApplication'
import { generateCareerApplicationId } from '../utils/careerApplicationId'
import { sendCandidateApplicationEmail, sendCareerHRNotificationEmail } from '../services/emailService'
import { ResumeParser } from '../services/resumeParser'
import { Op } from 'sequelize'
import fs from 'fs'

// Parse resume endpoint
export const parseResume = async (_req: Request, res: Response) => {
  try {
    const file = (_req as any).file
    if (!file) {
      console.error('No file uploaded')
      res.status(400).json({ error: 'No file uploaded' })
      return
    }

    console.log('File received:', file.originalname, 'MIME type:', file.mimetype, 'Size:', file.size)

    const filePath = file.path
    const buffer = fs.readFileSync(filePath)
    const mimeType = file.mimetype

    console.log('Buffer size:', buffer.length, 'MIME type:', mimeType)

    const parsedData = await ResumeParser.parseResume(buffer, mimeType)

    console.log('Parsed data:', parsedData)

    // Clean up the uploaded file after parsing
    fs.unlinkSync(filePath)

    res.json({ parsedData })
  } catch (error: any) {
    console.error('Error parsing resume:', error)
    console.error('Error stack:', error.stack)
    res.status(500).json({ error: 'Failed to parse resume', details: error.message })
  }
}

// Create career application
export const createCareerApplication = async (_req: Request, res: Response) => {
  try {
    console.log('Received career application submission')
    console.log('Request body keys:', Object.keys(_req.body))
    console.log('Request file:', (_req as any).file ? 'File present' : 'No file')

    const {
      full_name,
      email,
      phone,
      whatsapp,
      gender,
      date_of_birth,
      city,
      state,
      country,
      college_name,
      degree,
      branch,
      graduation_year,
      cgpa,
      role_applying_for,
      experience_level,
      current_status,
      availability,
      skills,
      github,
      linkedin,
      portfolio_website,
      behance,
      dribbble,
      figma,
      why_join,
      why_select,
      achievements,
      projects,
      contribution,
      startup_agreement,
      resume_path,
    } = _req.body

    console.log('Email:', email)
    console.log('Phone:', phone)

    const final_resume_path = (_req as any).file
      ? `/uploads/${(_req as any).file.filename}`
      : (resume_path || null)

    // Check for duplicate email
    console.log('Checking for duplicate email...')
    const existingEmail = await CareerApplication.findOne({ where: { email } })
    if (existingEmail) {
      console.log('Duplicate email found:', email)
      res.status(400).json({ error: 'Email already registered' })
      return
    }

    // Check for duplicate phone
    console.log('Checking for duplicate phone...')
    const existingPhone = await CareerApplication.findOne({ where: { phone } })
    if (existingPhone) {
      console.log('Duplicate phone found:', phone)
      res.status(400).json({ error: 'Phone number already registered' })
      return
    }

    // Generate application ID
    const application_id = await generateCareerApplicationId()

    // Create application
    const application = await CareerApplication.create({
      application_id,
      full_name,
      email,
      phone,
      whatsapp,
      gender: gender || 'prefer_not_to_say',
      date_of_birth,
      city,
      state,
      country,
      college_name,
      degree,
      branch,
      graduation_year,
      cgpa,
      role_applying_for,
      experience_level,
      current_status,
      availability,
      skills: JSON.stringify(skills),
      github: github || null,
      linkedin: linkedin || null,
      portfolio_website: portfolio_website || null,
      behance: behance || null,
      dribbble: dribbble || null,
      figma: figma || null,
      resume_path: final_resume_path,
      why_join,
      why_select,
      achievements,
      projects,
      contribution,
      startup_agreement,
      application_status: 'applied',
      created_at: new Date(),
      updated_at: new Date(),
    } as any)

    // Send confirmation and notification emails (non-blocking)
    const emailResult = await sendCandidateApplicationEmail(
      application.full_name,
      application.email,
      application.role_applying_for,
      application.application_id,
      new Date().toLocaleDateString()
    )
    console.log('Email result:', emailResult)

    // Send HR notification email (non-blocking)
    try {
      const hostUrl = _req.protocol + '://' + _req.get('host')
      const resumeUrl = application.resume_path ? `${hostUrl}${application.resume_path}` : 'No resume uploaded'

      await sendCareerHRNotificationEmail({
        candidateName: application.full_name,
        email: application.email,
        phone: application.phone,
        jobTitle: application.role_applying_for,
        experience: application.experience_level,
        location: `${application.city}, ${application.state}`,
        resumeUrl,
        date: new Date().toLocaleString()
      })
    } catch (emailErr) {
      console.error('Failed to send HR notification email:', emailErr)
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      application_id: application.application_id,
      application,
    })
  } catch (error: any) {
    console.error('Error creating career application:', error)
    res.status(500).json({ error: 'Failed to submit application' })
  }
}

// Get all career applications (admin)
export const getAllCareerApplications = async (_req: Request, res: Response) => {
  try {
    const { status, role, search, page = 1, limit = 20 } = _req.query

    const where: any = {}

    if (status && status !== 'all') {
      where.application_status = status
    }

    if (role && role !== 'all') {
      where.role_applying_for = role
    }

    if (search) {
      where[Op.or] = [
        { full_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { college_name: { [Op.like]: `%${search}%` } },
      ]
    }

    const { count, rows } = await CareerApplication.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    })

    res.json({
      applications: rows,
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
    })
  } catch (error: any) {
    console.error('Error fetching career applications:', error)
    res.status(500).json({ error: 'Failed to fetch applications' })
  }
}

// Get single career application by ID
export const getCareerApplicationById = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { id } = _req.params
    const application = await CareerApplication.findByPk(id)

    if (!application) {
      res.status(404).json({ error: 'Application not found' })
      return
    }

    res.json(application)
  } catch (error: any) {
    console.error('Error fetching career application:', error)
    res.status(500).json({ error: 'Failed to fetch application' })
  }
}

// Update career application status
export const updateCareerApplicationStatus = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { id } = _req.params
    const { application_status, interview_date, notes } = _req.body

    const application = await CareerApplication.findByPk(id)
    if (!application) {
      res.status(404).json({ error: 'Application not found' })
      return
    }

    const updateData: any = { application_status }

    if (interview_date) {
      updateData.interview_date = interview_date
    }

    if (notes !== undefined) {
      updateData.notes = notes
    }

    if (application_status === 'selected') {
      updateData.selected = true
    }

    if (application_status === 'rejected') {
      updateData.rejected = true
    }

    await application.update(updateData)

    res.json({
      message: 'Application status updated successfully',
      application,
    })
  } catch (error: any) {
    console.error('Error updating career application:', error)
    res.status(500).json({ error: 'Failed to update application' })
  }
}

// Delete career application
export const deleteCareerApplication = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { id } = _req.params
    const application = await CareerApplication.findByPk(id)

    if (!application) {
      res.status(404).json({ error: 'Application not found' })
      return
    }

    await application.destroy()

    res.json({ message: 'Application deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting career application:', error)
    res.status(500).json({ error: 'Failed to delete application' })
  }
}

// Get dashboard statistics
export const getCareerDashboardStats = async (_req: Request, res: Response) => {
  try {
    const total = await CareerApplication.count()
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayCount = await CareerApplication.count({
      where: {
        created_at: { [Op.gte]: today }
      }
    })

    const pending = await CareerApplication.count({
      where: { application_status: 'applied' }
    })

    const interviewScheduled = await CareerApplication.count({
      where: { application_status: 'technical_interview' }
    })

    const selected = await CareerApplication.count({
      where: { selected: true }
    })

    const rejected = await CareerApplication.count({
      where: { rejected: true }
    })

    res.json({
      total,
      today: todayCount,
      pending,
      interview_scheduled: interviewScheduled,
      selected,
      rejected,
    })
  } catch (error: any) {
    console.error('Error fetching career dashboard stats:', error)
    res.status(500).json({ error: 'Failed to fetch statistics' })
  }
}

// Get analytics data
export const getCareerAnalytics = async (_req: Request, res: Response) => {
  try {
    const roleCounts = await CareerApplication.findAll({
      attributes: ['role_applying_for', [require('sequelize').fn('COUNT', 'role_applying_for'), 'count']],
      group: ['role_applying_for'],
      order: [[require('sequelize').literal('count'), 'DESC']],
      limit: 10,
      raw: true,
    })

    // Top colleges
    const collegeCounts = await CareerApplication.findAll({
      attributes: ['college_name', [require('sequelize').fn('COUNT', 'college_name'), 'count']],
      group: ['college_name'],
      order: [[require('sequelize').literal('count'), 'DESC']],
      limit: 10,
      raw: true,
    })

    // Experience distribution
    const experienceCounts = await CareerApplication.findAll({
      attributes: ['experience_level', [require('sequelize').fn('COUNT', 'experience_level'), 'count']],
      group: ['experience_level'],
      raw: true,
    })

    // Status distribution
    const statusCounts = await CareerApplication.findAll({
      attributes: ['application_status', [require('sequelize').fn('COUNT', 'application_status'), 'count']],
      group: ['application_status'],
      raw: true,
    })

    // Monthly applications
    const monthlyApplications = await CareerApplication.findAll({
      attributes: [
        [require('sequelize').fn('YEAR', require('sequelize').col('created_at')), 'year'],
        [require('sequelize').fn('MONTH', require('sequelize').col('created_at')), 'month'],
        [require('sequelize').fn('COUNT', 'id'), 'count'],
      ],
      group: ['year', 'month'],
      order: [[require('sequelize').literal('year'), 'DESC'], [require('sequelize').literal('month'), 'DESC']],
      limit: 12,
      raw: true,
    })

    res.json({
      top_roles: roleCounts.map((r: any) => ({ name: r.role_applying_for, count: parseInt(r.count) })),
      top_colleges: collegeCounts.map((c: any) => ({ college: c.college_name, count: parseInt(c.count) })),
      experience_distribution: experienceCounts.map((e: any) => ({ name: e.experience_level, count: parseInt(e.count) })),
      status_distribution: statusCounts.map((s: any) => ({ name: s.application_status, count: parseInt(s.count) })),
      monthly_applications: monthlyApplications.map((m: any) => ({
        year: m.year,
        month: m.month,
        count: parseInt(m.count),
      })),
    })
  } catch (error: any) {
    console.error('Error fetching career analytics:', error)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
}
