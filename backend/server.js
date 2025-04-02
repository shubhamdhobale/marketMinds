import connectDB from './src/db/index.js';
import app from './src/app.js';
import Razorpay from 'razorpay'

connectDB();

const PORT = 5000 || process.env.PORT;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
})

app.listen(PORT , () => console.log('server is running on port 5000'));
