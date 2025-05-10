import express from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
