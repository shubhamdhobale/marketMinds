import express from 'express';
import { registerUser, authUser, googleSignIn } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = express.Router();

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

export default router;
