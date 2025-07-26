import express from  'express'
import { applyScheme, checkSchemeStatus, getAllSchemes, getAppliedSchemes, getSingleAppliedScheme } from '../controllers/schemeApplied.js';
import upload from '../middleware/multer.js';

const schemeAppliedRouter = express.Router()

schemeAppliedRouter.post('/schemeApplied' , upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadharPhoto', maxCount: 1 },
    { name: 'panPhoto', maxCount: 1 },
    { name: 'bank_passbook', maxCount: 1 }
  ]),  applyScheme)


schemeAppliedRouter.get('/getAppliedSchemes', getAppliedSchemes)
schemeAppliedRouter.get('/getAllSchemes', getAllSchemes)
schemeAppliedRouter.get('/getSingleScheme/:id', getSingleAppliedScheme)
schemeAppliedRouter.post('/checkSchemeStatus', checkSchemeStatus)

export default schemeAppliedRouter;