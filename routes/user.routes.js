import express from 'express';
import {
  register,
  bookVisit,
  getAllBookedVisits,
  cancelBookedVisits,
} from '../controller/user.controller.js';

const router = express.Router();

router.post('/', register);
router.post('/bookVisit/:id', bookVisit);
router.get('/bookVisit', getAllBookedVisits);
router.delete('/bookVisit/:id', cancelBookedVisits);

export { router as userRoutes };
