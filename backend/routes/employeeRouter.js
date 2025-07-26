import express from 'express'
import { editEmployee, empChangeStatus, empGrievanceChangeStatus, employeeGrievancePerformance, employeePerformance, getAllEmployee, getSingleEmployee, login_employee, register_employee } from '../controllers/employeeController.js';
import upload from '../middleware/multer.js';

const employeeRouter = express.Router();

employeeRouter.post('/register',register_employee)

employeeRouter.post('/login',login_employee)

employeeRouter.get('/getSingleEmployee/:id',getSingleEmployee)

employeeRouter.get('/getEmployees' , getAllEmployee)
employeeRouter.post('/changeStatus' , empChangeStatus)
employeeRouter.post('/employeePerformance' , employeePerformance)

employeeRouter.post('/employeeGrievancePerformance' , employeeGrievancePerformance)

employeeRouter.post('/editEmployee' , upload.single('profilePic') ,editEmployee)
employeeRouter.post('/changeGrievanceStatus' , empGrievanceChangeStatus)


export default employeeRouter;

