import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import tradeRouter from './routes/trade.route.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';

dotenv.config();
const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(cors({
  origin: "https://trade-mitra-frontend.onrender.com", // Replace with your frontend URL
  credentials: true
}));

app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/trade', tradeRouter);

app.get("/", (req, res) => {
  res.send("MarketMinds API is running...");
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
