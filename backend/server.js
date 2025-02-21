import connectDB from './src/db/index.js';
import app from './src/app.js';

connectDB();

const PORT = 5000 || process.env.PORT;

app.listen(PORT , () => console.log('server is running on port 5000'));
