import express from 'express';
import { create, getAll, getById } from '../controller/residency.controller.js';

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);

export { router as residencyRoutes };
