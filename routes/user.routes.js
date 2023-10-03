import express from 'express';
import { register } from '../controller/user.controller.js';

const router = express.Router();

router.post('/', register);

export { router as userRoutes };
