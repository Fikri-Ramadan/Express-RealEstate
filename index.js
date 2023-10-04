import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRoutes } from './routes/user.routes.js';
import { residencyRoutes } from './routes/Residency.routes.js';
dotenv.config();

const app = express();
const BASE_API = '/api/v1';
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(`${BASE_API}/user`, userRoutes);
app.use(`${BASE_API}/residency`, residencyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
