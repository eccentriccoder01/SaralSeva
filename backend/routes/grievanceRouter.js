import express from 'express'
import { applyGrievance, getAllGrievances, getSingleGrievance } from '../controllers/grievanceController.js';
import upload from '../middleware/multer.js';
import MulterErrorHandle from '../middleware/multerErrorHandle.js';
import { requireUser, requireAdmin, requireAnyRole } from '../middleware/rbac.js';

const grievanceRouter = express.Router();

// Protected routes - user/employee role required to apply grievance
grievanceRouter.post('/apply', ...requireAnyRole(['user', 'employee']), MulterErrorHandle(upload.single('document')), applyGrievance)

// Protected routes - admin role required
grievanceRouter.get('/getAllGrievance', ...requireAdmin, getAllGrievances)

// Protected routes - user/employee/admin roles required
grievanceRouter.get('/getSingleGrievance/:id', ...requireAnyRole(['user', 'employee', 'admin']), getSingleGrievance)

export default grievanceRouter