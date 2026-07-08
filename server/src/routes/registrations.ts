import { Router } from 'express';
import {
  createRegistration,
  getRegistrationById,
  getAllRegistrations,
  updateRegistration,
  approveRegistration,
  rejectRegistration,
  deleteRegistration,
  getDashboardStats,
  getAnalytics
} from '../controllers/registrationController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/', createRegistration);
router.get('/:id', getRegistrationById);

// Admin routes
router.get('/', authenticate, getAllRegistrations);
router.get('/dashboard/stats', authenticate, getDashboardStats);
router.get('/analytics/data', authenticate, getAnalytics);
router.put('/:id', authenticate, updateRegistration);
router.post('/:id/approve', authenticate, authorize(['admin', 'super_admin']), approveRegistration);
router.post('/:id/reject', authenticate, authorize(['admin', 'super_admin']), rejectRegistration);
router.delete('/:id', authenticate, authorize(['admin', 'super_admin']), deleteRegistration);

export default router;
