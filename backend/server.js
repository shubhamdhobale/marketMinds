import connectDB from './src/db/index.js';
import app from './src/app.js';

connectDB();

app.listen(process.env.PORT , () => console.log('server is running on port 5000'));
