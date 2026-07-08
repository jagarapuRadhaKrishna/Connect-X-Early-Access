import { Router } from 'express';
import { exportToExcel, exportToCSV, exportToPDF } from '../controllers/exportController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/excel', authenticate, authorize(['admin', 'super_admin']), exportToExcel);
router.get('/csv', authenticate, authorize(['admin', 'super_admin']), exportToCSV);
router.get('/pdf', authenticate, authorize(['admin', 'super_admin']), exportToPDF);

export default router;
