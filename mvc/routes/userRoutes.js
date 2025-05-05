import express from 'express';
import { createUserController, getUsersController, getUserController } from '../controllers/userController.js';

const router = express.Router();

// Route to create a new user
router.post('/user', createUserController);

// Route to get all users
router.get('/users', getUsersController);
router.get('/users/:id', getUserController);

export default router;