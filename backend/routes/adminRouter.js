import express from 'express'
import { adminChangeStatus, getAdmin, getSingleAdmin, loginAdmin, registerAdmin } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/registerAdmin' , registerAdmin)
adminRouter.post('/loginAdmin',loginAdmin)
adminRouter.get('/getAdmin',getAdmin)
adminRouter.get('/getSingleAdmin/:id',getSingleAdmin)
adminRouter.post('/changeStatus', adminChangeStatus)


export default adminRouter