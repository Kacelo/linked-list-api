import express from 'express';
import { registerUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/UserController';

// import {}

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/sign-up', registerUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
