import { deleteNotification, getAdminNotifications, getEmployeeNotifications, getLimitAdminNotifications, getLimitEmployeeNotifications, markAsRead } from "../controllers/notificationController.js"
import express from 'express'
import { requireEmployee, requireAdmin, requireAuth } from '../middleware/rbac.js'

const notificationRouter = express.Router()

// Protected routes - employee role required
notificationRouter.get('/getEmployeeNotifications', ...requireEmployee, getEmployeeNotifications)
notificationRouter.post('/getLimitEmployeeNotifications', ...requireEmployee, getLimitEmployeeNotifications)

// Protected routes - admin role required
notificationRouter.post('/getAdminNotifications', ...requireAdmin, getAdminNotifications)
notificationRouter.get('/getLimitAdminNotifications', ...requireAdmin, getLimitAdminNotifications)

// Protected routes - any authenticated user
notificationRouter.post('/markAsRead', ...requireAuth, markAsRead)
notificationRouter.post('/deleteNotification', ...requireAuth, deleteNotification)

export default notificationRouter