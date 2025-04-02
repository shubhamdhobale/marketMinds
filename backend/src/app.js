import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import tradeRouter from './routes/trade.route.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';
import paymentRoute from './routes/payment.route.js'

dotenv.config();
const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/trade', tradeRouter);
app.use('/api/payment' , paymentRoute)

app.get("/", (req, res) => {
  res.send("MarketMinds API is running...");
});

app.get("/api/payment/getkey" , (req , res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY})
})

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);


export default app;
