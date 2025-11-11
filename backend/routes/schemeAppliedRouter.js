import express from 'express'
import { applyScheme, checkSchemeStatus, getAllSchemes, getAppliedSchemes, getSingleAppliedScheme } from '../controllers/schemeApplied.js';
import upload from '../middleware/multer.js';
import multerErrorHandle from '../middleware/multerErrorHandle.js';
import { requireUser, requireAdmin, requireAuth } from '../middleware/rbac.js';

const schemeAppliedRouter = express.Router()

// Protected routes - user role required to apply for schemes
schemeAppliedRouter.post('/schemeApplied', ...requireUser, multerErrorHandle(upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'aadharPhoto', maxCount: 1 },
  { name: 'panPhoto', maxCount: 1 },
  { name: 'bank_passbook', maxCount: 1 }
])), applyScheme)

// Protected routes - user/admin role required
schemeAppliedRouter.get('/getAppliedSchemes', ...requireAuth, getAppliedSchemes)
schemeAppliedRouter.get('/getSingleScheme/:id', ...requireAuth, getSingleAppliedScheme)
schemeAppliedRouter.post('/checkSchemeStatus', ...requireAuth, checkSchemeStatus)

// Protected routes - admin role required
schemeAppliedRouter.get('/getAllSchemes', ...requireAdmin, getAllSchemes)

export default schemeAppliedRouter;