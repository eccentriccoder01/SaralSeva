import express from 'express'
import { adminChangeStatus, getAdmin, getSingleAdmin, loginAdmin, registerAdmin } from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/rbac.js';

const adminRouter = express.Router();

// Public routes - no authentication required
adminRouter.post('/registerAdmin', registerAdmin)
adminRouter.post('/loginAdmin', loginAdmin)

// Protected routes - admin role required
adminRouter.get('/getAdmin', ...requireAdmin, getAdmin)
adminRouter.get('/getSingleAdmin/:id', ...requireAdmin, getSingleAdmin)
adminRouter.post('/changeStatus', ...requireAdmin, adminChangeStatus)

export default adminRouter