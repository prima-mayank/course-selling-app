import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import lectureRoutes from './routes/lecture.route.js';

import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import cookieParser from "cookie-parser";


dotenv.config();




const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);


(async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Database connection failed:', err.message || err);
    process.exit(1);
  }
})();

app.get('/', (_, res) => res.send('Hello from the backend!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));