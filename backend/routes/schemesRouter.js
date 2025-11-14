import express from 'express'
import { addSchemeController, getSingleSchemeController, listSchemeController } from '../controllers/schemesController.js';
import upload from '../middleware/multer.js';
import multerErrorHandle from '../middleware/multerErrorHandle.js';
import { requireAdmin } from '../middleware/rbac.js';

const schemesRouter = express.Router();

// Public routes - no authentication required
schemesRouter.get('/list_scheme', listSchemeController)
schemesRouter.get('/single_scheme/:id', getSingleSchemeController)

// Protected routes - admin role required
schemesRouter.post('/add_scheme', ...requireAdmin, multerErrorHandle(upload.single('pdf')), addSchemeController)

export default schemesRouter;

