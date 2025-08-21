import express from 'express'
import { addSchemeController, getSingleSchemeController, listSchemeController } from '../controllers/schesmesController.js';
import upload from '../middleware/multer.js';
import multerErrorHandle from '../middleware/multerErrorHandle.js';


 const schemesRouter = express.Router();

schemesRouter.post('/add_scheme', multerErrorHandle(upload.single('pdf')),addSchemeController)
schemesRouter.get('/list_scheme', listSchemeController)
schemesRouter.get('/single_scheme/:id', getSingleSchemeController)

export default schemesRouter;

