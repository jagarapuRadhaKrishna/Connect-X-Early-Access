import { Request, Response } from 'express';
import { Student, RegistrationLog, EmailLog } from '../models';
import { generateRegistrationId } from '../utils/registrationId';
import { sendEarlyAccessEmail } from '../services/emailService';
import { Op } from 'sequelize';

export const createRegistration = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      full_name,
      email,
      phone,
      whatsapp,
      gender,
      date_of_birth,
      current_city,
      state,
      college_name,
      degree,
      branch,
      graduation_year,
      cgpa,
      looking_for,
      preferred_job_role,
      preferred_job_location,
      feature_interests,
      campus_ambassador,
      suggestions
    } = req.body;

    // Check for duplicate email
    const existingEmail = await Student.findOne({ where: { email } });
    if (existingEmail) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    // Check for duplicate phone
    const existingPhone = await Student.findOne({ where: { phone } });
    if (existingPhone) {
      res.status(400).json({ error: 'Phone number already registered' });
      return;
    }

    // Get current registration count
    const count = await Student.count();

    // Generate registration ID
    const registration_id = await generateRegistrationId(count + 1);

    // Create student
    const student = await Student.create({
      registration_id,
      full_name,
      email,
      phone,
      whatsapp,
      gender,
      date_of_birth,
      current_city,
      state,
      college_name,
      degree,
      branch,
      graduation_year,
      cgpa,
      looking_for,
      preferred_job_role,
      preferred_job_location,
      feature_interests,
      campus_ambassador,
      suggestions,
      registration_source: 'website',
      registration_status: 'pending',
      early_access_approved: false,
      email_verified: false,
      phone_verified: false
    });

    // Log registration
    await RegistrationLog.create({
      student_id: student.id,
      action: 'registration_created',
      details: 'New registration submitted',
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });

    // Send Early Access confirmation email (non-blocking)
    const emailResult = await sendEarlyAccessEmail(student.full_name, student.email);
    console.log('Email result:', emailResult);

    res.status(201).json({
      message: 'Registration successful',
      registration_id: student.registration_id,
      student: {
        id: student.id,
        registration_id: student.registration_id,
        full_name: student.full_name,
        email: student.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRegistrationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const student = await Student.findOne({
      where: { registration_id: id },
      include: [
        {
          model: RegistrationLog,
          as: 'logs',
          order: [['created_at', 'DESC']]
        },
        {
          model: EmailLog,
          as: 'emailLogs',
          order: [['created_at', 'DESC']]
        }
      ]
    });

    if (!student) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }

    res.json({ student });
  } catch (error) {
    console.error('Get registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllRegistrations = async (req: any, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status,
      college,
      graduation_year,
      degree,
      role,
      campus_ambassador,
      sort_by = 'created_at',
      order = 'DESC'
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    const where: any = {};

    // Search filter
    if (search) {
      where[Op.or] = [
        { registration_id: { [Op.like]: `%${search}%` } },
        { full_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { college_name: { [Op.like]: `%${search}%` } }
      ];
    }

    // Status filter
    if (status) {
      where.registration_status = status;
    }

    // College filter
    if (college) {
      where.college_name = { [Op.like]: `%${college}%` };
    }

    // Graduation year filter
    if (graduation_year) {
      where.graduation_year = graduation_year;
    }

    // Degree filter
    if (degree) {
      where.degree = { [Op.like]: `%${degree}%` };
    }

    // Role filter
    if (role) {
      where.preferred_job_role = { [Op.like]: `%${role}%` };
    }

    // Campus ambassador filter
    if (campus_ambassador) {
      where.campus_ambassador = campus_ambassador;
    }

    const { count, rows } = await Student.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [[sort_by as string, order]],
      include: [
        {
          model: RegistrationLog,
          as: 'logs',
          limit: 1,
          order: [['created_at', 'DESC']]
        }
      ]
    });

    res.json({
      registrations: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(count / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateRegistration = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }

    await student.update(updates);

    // Log the update
    await RegistrationLog.create({
      student_id: student.id,
      action: 'registration_updated',
      details: `Registration updated by admin ${req.admin.id}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });

    res.json({
      message: 'Registration updated successfully',
      student
    });
  } catch (error) {
    console.error('Update registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const approveRegistration = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }

    if (student.registration_status === 'approved') {
      res.status(400).json({ error: 'Registration already approved' });
      return;
    }

    await student.update({
      registration_status: 'approved',
      early_access_approved: true
    });

    // Log approval
    await RegistrationLog.create({
      student_id: student.id,
      action: 'registration_approved',
      details: `Registration approved by admin ${req.admin.id}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });

    // Send approval email
    try {
      const { sendApprovalEmail } = await import('../services/emailService');
      await sendApprovalEmail(student);
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
    }

    res.json({
      message: 'Registration approved successfully',
      student
    });
  } catch (error) {
    console.error('Approve registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rejectRegistration = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      res.status(400).json({ error: 'Rejection reason is required' });
      return;
    }

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }

    if (student.registration_status === 'rejected') {
      res.status(400).json({ error: 'Registration already rejected' });
      return;
    }

    await student.update({
      registration_status: 'rejected',
      early_access_approved: false,
      rejection_reason: reason
    });

    // Log rejection
    await RegistrationLog.create({
      student_id: student.id,
      action: 'registration_rejected',
      details: `Registration rejected by admin ${req.admin.id}. Reason: ${reason}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });

    // Send rejection email
    try {
      const { sendRejectionEmail } = await import('../services/emailService');
      await sendRejectionEmail(student, reason);
    } catch (emailError) {
      console.error('Failed to send rejection email:', emailError);
    }

    res.json({
      message: 'Registration rejected successfully',
      student
    });
  } catch (error) {
    console.error('Reject registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteRegistration = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }

    await student.destroy();

    // Log deletion
    await RegistrationLog.create({
      student_id: student.id,
      action: 'registration_deleted',
      details: `Registration deleted by admin ${req.admin.id}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });

    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Delete registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const total = await Student.count();
    const pending = await Student.count({ where: { registration_status: 'pending' } });
    const approved = await Student.count({ where: { registration_status: 'approved' } });
    const rejected = await Student.count({ where: { registration_status: 'rejected' } });

    // Today's registrations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayRegistrations = await Student.count({
      where: {
        created_at: { [Op.gte]: today }
      }
    });

    // Campus ambassadors
    const campusAmbassadors = await Student.count({
      where: { campus_ambassador: 'yes' }
    });

    // Top colleges
    const topColleges = await Student.findAll({
      attributes: ['college_name', [Student.sequelize!.fn('COUNT', Student.sequelize!.col('id')), 'count']],
      group: ['college_name'],
      order: [[Student.sequelize!.fn('COUNT', Student.sequelize!.col('id')), 'DESC']],
      limit: 10,
      raw: true
    });

    // Top cities
    const topCities = await Student.findAll({
      attributes: ['current_city', [Student.sequelize!.fn('COUNT', Student.sequelize!.col('id')), 'count']],
      group: ['current_city'],
      order: [[Student.sequelize!.fn('COUNT', Student.sequelize!.col('id')), 'DESC']],
      limit: 10,
      raw: true
    });

    res.json({
      stats: {
        total,
        pending,
        approved,
        rejected,
        today: todayRegistrations,
        campus_ambassadors: campusAmbassadors
      },
      top_colleges: topColleges,
      top_cities: topCities
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAnalytics = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Registration trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const registrationTrends = await Student.findAll({
      attributes: [
        [Student.sequelize!.fn('DATE', Student.sequelize!.col('created_at')), 'date'],
        [Student.sequelize!.fn('COUNT', Student.sequelize!.col('id')), 'count']
      ],
      where: {
        created_at: { [Op.gte]: thirtyDaysAgo }
      },
      group: [Student.sequelize!.fn('DATE', Student.sequelize!.col('created_at'))],
      order: [[Student.sequelize!.fn('DATE', Student.sequelize!.col('created_at')), 'ASC']],
      raw: true
    });

    // Most selected roles
    const topRoles = await Student.findAll({
      attributes: ['preferred_job_role', [Student.sequelize!.fn('COUNT', Student.sequelize!.col('id')), 'count']],
      group: ['preferred_job_role'],
      order: [[Student.sequelize!.fn('COUNT', Student.sequelize!.col('id')), 'DESC']],
      limit: 10,
      raw: true
    });

    // Interest distribution
    const allStudents = await Student.findAll({ attributes: ['feature_interests'], raw: true });
    const interestCounts: any = {};
    
    allStudents.forEach((student: any) => {
      const interests = student.feature_interests || [];
      interests.forEach((interest: string) => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1;
      });
    });

    const interestDistribution = Object.entries(interestCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a: any, b: any) => b.count - a.count);

    // Campus ambassador distribution
    const ambassadorStats = await Student.findAll({
      attributes: ['campus_ambassador', [Student.sequelize!.fn('COUNT', Student.sequelize!.col('id')), 'count']],
      group: ['campus_ambassador'],
      raw: true
    });

    res.json({
      registration_trends: registrationTrends,
      top_roles: topRoles,
      interest_distribution: interestDistribution,
      campus_ambassador_distribution: ambassadorStats
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
