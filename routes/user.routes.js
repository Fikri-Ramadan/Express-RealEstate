import express from 'express';
import {
  register,
  bookVisit,
  getAllBookedVisits,
  cancelBookedVisits,
  toggleFavorite,
  getAllFavorites,
} from '../controller/user.controller.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router();

router.post('/', jwtCheck, register);

router.get('/bookVisit', getAllBookedVisits);
router.post('/bookVisit/:id', jwtCheck, bookVisit);
router.delete('/bookVisit/:id', jwtCheck, cancelBookedVisits);

router.get('/favorites', jwtCheck, getAllFavorites);
router.put('/togglefavorite/:id', jwtCheck, toggleFavorite);

export { router as userRoutes };
