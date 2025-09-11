import express from 'express';
import { 
  getAllUser, 
  getSingleUser, 
  googleLogin, 
  completeGoogleRegistration, 
  loginUser, 
  registerUser, 
  updateUser 
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/registerUser', registerUser);
userRouter.post('/loginUser', loginUser);
userRouter.post('/google', googleLogin);
userRouter.post('/google/complete', completeGoogleRegistration);
userRouter.get('/getAllUser', getAllUser);
userRouter.get('/getSingleUser/:id', getSingleUser);
userRouter.put('/updateUser/:id', updateUser);

export default userRouter;
