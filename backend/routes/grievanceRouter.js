import express from 'express'
import { applyGrievance, getAllGrievances, getSingleGrievance } from '../controllers/grievanceController.js';
import upload from '../middleware/multer.js';
import MulterErrorHandle  from '../middleware/multerErrorHandle.js';

const grievanceRouter = express.Router();

grievanceRouter.post('/apply',MulterErrorHandle(upload.single('document')) , applyGrievance)
grievanceRouter.get('/getAllGrievance',getAllGrievances)
grievanceRouter.get('/getSingleGrievance/:id' , getSingleGrievance)

export default grievanceRouter