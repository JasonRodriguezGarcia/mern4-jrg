import express from 'express';
import { createEventController, getEventsController, getEventController, deleteEventController, updateEventController } from '../controllers/eventController.js';

const router = express.Router();

// Route to create a new Event
router.post('/events', createEventController);

// Route to get all Events
router.get('/events', getEventsController);

// Route to get ONE Event
router.get('/events/:id', getEventController);

// Route to DELETE ONE Event
router.delete('/events/:id', deleteEventController);

// Route to UPDATE ONE Event
router.put('/events/:id', updateEventController);


export default router;