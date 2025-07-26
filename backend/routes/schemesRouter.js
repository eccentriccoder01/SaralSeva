import express from 'express'
import { addSchemeController, getSingleSchemeController, listSchemeController } from '../controllers/schesmesController.js';
import upload from '../middleware/multer.js';

 const schemesRouter = express.Router();

schemesRouter.post('/add_scheme', upload.single('pdf'),addSchemeController)
schemesRouter.get('/list_scheme', listSchemeController)
schemesRouter.get('/single_scheme/:id', getSingleSchemeController)

export default schemesRouter;

