import express from 'express';
import {
  register,
  bookVisit,
  getAllBookedVisits,
  cancelBookedVisits,
  toggleFavorite,
  getAllFavorites,
} from '../controller/user.controller.js';

const router = express.Router();

router.post('/', register);

router.get('/bookVisit', getAllBookedVisits);
router.post('/bookVisit/:id', bookVisit);
router.delete('/bookVisit/:id', cancelBookedVisits);

router.get('/favorites', getAllFavorites);
router.put('/togglefavorite/:id', toggleFavorite);

export { router as userRoutes };
