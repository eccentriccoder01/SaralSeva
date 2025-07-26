import express from 'express'
import { getAllUser, getSingleUser, loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/registerUser' , registerUser)
userRouter.post('/loginUser',loginUser)
userRouter.get('/getAllUser',getAllUser)
userRouter.get('/getSingleUser/:id',getSingleUser)

export default userRouter