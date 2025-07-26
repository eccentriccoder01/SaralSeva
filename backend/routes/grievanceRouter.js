import express from 'express'
import { applyGrievance, getAllGrievances, getSingleGrievance } from '../controllers/grievanceController.js';
import upload from '../middleware/multer.js';

const grievanceRouter = express.Router();

grievanceRouter.post('/apply',upload.single('document') , applyGrievance)
grievanceRouter.get('/getAllGrievance',getAllGrievances)
grievanceRouter.get('/getSingleGrievance/:id' , getSingleGrievance)

export default grievanceRouter