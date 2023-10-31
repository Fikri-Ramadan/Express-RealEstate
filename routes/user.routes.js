import express from 'express';
import {
  register,
  bookVisit,
  getAllBookedVisits,
  cancelBookedVisits,
  togglefavourite,
  getAllfavourites,
} from '../controller/user.controller.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router();

router.post('/', jwtCheck, register);

router.get('/bookvisit', getAllBookedVisits);
router.post('/bookvisit/:id', jwtCheck, bookVisit);
router.delete('/bookvisit/:id', jwtCheck, cancelBookedVisits);

router.get('/favourites', jwtCheck, getAllfavourites);
router.put('/togglefavourite/:id', jwtCheck, togglefavourite);

export { router as userRoutes };
