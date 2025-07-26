import express from 'express'
import { add_announcement, getAnnouncement } from '../controllers/announcementController.js'

const announcementRouter = express.Router()

announcementRouter.post('/add_announcement' , add_announcement)
announcementRouter.get('/get_announcement' , getAnnouncement)

export default announcementRouter