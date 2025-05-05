import express from 'express';
import {
  createExtra,
  deleteExtra,
  getAllExtras,
  getExtraById,
  updateExtra,
} from '../controllers/extra.controller';

const router = express.Router();

router.get('/', getAllExtras);
router.get('/:id', getExtraById);
router.post('/', createExtra);
router.put('/:id', updateExtra);
router.delete('/:id', deleteExtra);

export default router;
