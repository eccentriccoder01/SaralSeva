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
import { requireUser, requireAdmin, requireAuth } from '../middleware/rbac.js';

const userRouter = express.Router();

// Public routes - no authentication required
userRouter.post('/registerUser', registerUser);
userRouter.post('/loginUser', loginUser);
userRouter.post('/google', googleLogin);
userRouter.post('/google/complete', completeGoogleRegistration);

// Protected routes - user role required
userRouter.get('/getSingleUser/:id', ...requireUser, getSingleUser);
userRouter.put('/updateUser/:id', ...requireUser, updateUser);

// Protected routes - admin role required
userRouter.get('/getAllUser', ...requireAdmin, getAllUser);

export default userRouter;
