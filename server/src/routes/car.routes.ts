import express from 'express';
import {
  createCar,
  deleteCar,
  getAllCars,
  getCarById,
  updateCar,
} from '../controllers/car.controller';

const router = express.Router();

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;
