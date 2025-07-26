import express from "express";
import {  getMesagesFromSender, getMessages, getNewMessage, getUniqueReciepents, getUniqueRecipientsWithLatestMessage, getUniqueRecipientsWithLatestMessageForEmployee, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post('/sendMessage',  sendMessage)
messageRouter.post('/getMessages',  getMessages)
messageRouter.post('/getNewMessages',  getNewMessage)
messageRouter.get('/getMessagesFromSender',  getMesagesFromSender)
messageRouter.get('/getUniqueReciepents',  getUniqueReciepents)
messageRouter.post('/getUniqueRecipientsWithLatestMessage',  getUniqueRecipientsWithLatestMessage)
messageRouter.post('/getUniqueRecipientsWithLatestMessageForEmployee',  getUniqueRecipientsWithLatestMessageForEmployee)

export default messageRouter