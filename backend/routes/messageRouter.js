import express from "express";
import { getMesagesFromSender, getMessages, getNewMessage, getUniqueReciepents, getUniqueRecipientsWithLatestMessage, getUniqueRecipientsWithLatestMessageForEmployee, sendMessage } from "../controllers/messageController.js";
import { requireAnyRole, requireAuth } from '../middleware/rbac.js';

const messageRouter = express.Router();

// Protected routes - any authenticated user
messageRouter.post('/sendMessage', ...requireAuth, sendMessage)
messageRouter.post('/getMessages', ...requireAuth, getMessages)
messageRouter.post('/getNewMessages', ...requireAuth, getNewMessage)
messageRouter.get('/getMessagesFromSender', ...requireAuth, getMesagesFromSender)

// Protected routes - admin/employee roles
messageRouter.get('/getUniqueReciepents', ...requireAnyRole(['admin', 'employee']), getUniqueReciepents)
messageRouter.post('/getUniqueRecipientsWithLatestMessage', ...requireAnyRole(['admin', 'employee']), getUniqueRecipientsWithLatestMessage)
messageRouter.post('/getUniqueRecipientsWithLatestMessageForEmployee', ...requireAnyRole(['admin', 'employee']), getUniqueRecipientsWithLatestMessageForEmployee)

export default messageRouter