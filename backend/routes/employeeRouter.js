import express from 'express'
import { editEmployee, empChangeStatus, empGrievanceChangeStatus, employeeGrievancePerformance, employeePerformance, getAllEmployee, getSingleEmployee, login_employee, register_employee } from '../controllers/employeeController.js';
import upload from '../middleware/multer.js';
import multerErrorhandle from '../middleware/multerErrorHandle.js';
import { requireEmployee, requireAdmin, requireAnyRole } from '../middleware/rbac.js';

const employeeRouter = express.Router();

// Public routes - no authentication required
employeeRouter.post('/register', register_employee)
employeeRouter.post('/login', login_employee)

// Protected routes - employee role required
employeeRouter.get('/getSingleEmployee/:id', ...requireEmployee, getSingleEmployee)
employeeRouter.post('/employeePerformance', ...requireEmployee, employeePerformance)
employeeRouter.post('/employeeGrievancePerformance', ...requireEmployee, employeeGrievancePerformance)
employeeRouter.post('/editEmployee', ...requireEmployee, multerErrorhandle(upload.single('profilePic')), editEmployee)

// Protected routes - admin role required
employeeRouter.get('/getEmployees', ...requireAdmin, getAllEmployee)
employeeRouter.post('/changeStatus', ...requireAdmin, empChangeStatus)
employeeRouter.post('/changeGrievanceStatus', ...requireAdmin, empGrievanceChangeStatus)

export default employeeRouter;

