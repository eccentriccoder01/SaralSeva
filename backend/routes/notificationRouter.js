import { deleteNotification, getAdminNotifications, getEmployeeNotifications, getLimitAdminNotifications, getLimitEmployeeNotifications, markAsRead } from "../controllers/notificationController.js"
import express from 'express'

const notificationRouter = express.Router()

notificationRouter.get('/getEmployeeNotifications', getEmployeeNotifications)
notificationRouter.post('/getAdminNotifications', getAdminNotifications)
notificationRouter.post('/markAsRead', markAsRead )
notificationRouter.get('/getLimitAdminNotifications', getLimitAdminNotifications )
notificationRouter.post('/getLimitEmployeeNotifications', getLimitEmployeeNotifications )
notificationRouter.post('/deleteNotification', deleteNotification )

export default notificationRouter