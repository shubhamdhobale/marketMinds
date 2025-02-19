import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';

const app = express();
dotenv.config();

connectDB();

app.listen(process.env.PORT , () => console.log('server is running on port 5000'));
