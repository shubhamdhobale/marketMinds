import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

app.get('/' , (req , res) =>{
  res.send('TradeMitra Backend');
})

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('error', err));

app.listen(5000 , () => console.log('server is running on port 5000'));
