import express from 'express'
import { adminChangeStatus, getAdmin, getSingleAdmin, loginAdmin, registerAdmin } from '../controllers/adminController.js';
import { 
    validateAdminRegistration, 
    validateAdminLogin, 
    validateObjectId, 
    validateAdminChangeStatus 
} from '../middleware/adminValidation.js';

const adminRouter = express.Router();

adminRouter.post('/registerAdmin', validateAdminRegistration, registerAdmin)
adminRouter.post('/loginAdmin', validateAdminLogin, loginAdmin)
adminRouter.get('/getAdmin', getAdmin)
adminRouter.get('/getSingleAdmin/:id', validateObjectId, getSingleAdmin)
adminRouter.post('/changeStatus', validateAdminChangeStatus, adminChangeStatus)


export default adminRouter