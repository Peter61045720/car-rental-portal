import express from 'express';
import {
  createRental,
  deleteRental,
  getAllRentals,
  getRentalById,
  getRentalsByUserId,
  updateRental,
} from '../controllers/rental.controller';

const router = express.Router();

router.get('/', getAllRentals);
router.get('/user/:userId', getRentalsByUserId);
router.get('/:id', getRentalById);
router.post('/', createRental);
router.put('/:id', updateRental);
router.delete('/:id', deleteRental);

export default router;
