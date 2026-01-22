import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;  

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});