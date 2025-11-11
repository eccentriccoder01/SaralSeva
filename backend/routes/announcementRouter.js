import express from 'express'
import { add_announcement, getAnnouncement } from '../controllers/announcementController.js'
import { requireAdmin } from '../middleware/rbac.js'

const announcementRouter = express.Router()

// Public routes - no authentication required
announcementRouter.get('/get_announcement', getAnnouncement)

// Protected routes - admin role required
announcementRouter.post('/add_announcement', ...requireAdmin, add_announcement)

export default announcementRouter