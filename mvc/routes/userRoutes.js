import express from 'express';
import { createUserController, getUsersController, getUserController, deleteUserController,
            updateUserController } from '../controllers/userController.js';

const router = express.Router();

// Route to create a new user
router.post('/users', createUserController);

// Route to get ALL users
router.get('/users', getUsersController);

// Route to get ONE user
router.get('/users/:id', getUserController);

// Route to DELETE ONE user
router.delete('/users/:id', deleteUserController);

// Route to UPDATE ONE user
router.put('/users/:id', updateUserController);

export default router;