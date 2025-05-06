import { createUser, getUsers, getUser, deleteUser, updateUser } from '../models/userModel.js';

// Controller to create a new user
const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);  // Call model function
    res.status(201).json(user);  // Send the created user back
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Controller to get all users
const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();  // Call model function
    res.status(200).json(users);  // Send users back
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Controller to get one user
const getUserController = async (req, res) => {
  try {
    const {id} = req.params
    const user = await getUser(id);  // Call model function
    res.status(200).json(user);  // Send user back
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

const deleteUserController = async (req, res) => {
    try {
        const {id} = req.params
        const user = await deleteUser(id);  // Call model function
        res.status(200).json(user);  // Send user back
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
      }
    
}

const updateUserController = async (req, res) => {
    try {
        const {id} = req.params
        const body = req.body
        const user = await updateUser(id, body);  // Call model function
        res.status(200).json(user);  // Send user back
      } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
      }
    
}

export { createUserController, getUsersController, getUserController, deleteUserController, updateUserController };