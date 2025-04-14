import express from 'express';
import { registerUser, authUser, googleSignIn, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import cors from 'cors';

const router = express.Router();


router.use(cors({
  origin: "https://market-minds-seven.vercel.app",
  credentials: true
}));


// Validation chain for signup
router.post(
  '/signup',
  [
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  registerUser
);

router.post('/signin', authUser);
router.post('/google', googleSignIn);
router.post('/forgot-password' , forgotPassword)
router.post('/reset-password/:token' , resetPassword)

export default router;
