import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { addNewTrade } from '../controllers/trade.controller.js';

const router = express.Router();

router.post('/newtrade' , protect , addNewTrade);

export default router;