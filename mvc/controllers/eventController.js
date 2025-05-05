import { createEvent, getEvents, getEvent } from '../models/eventModel.js';

// Controller to create a new Event
const createEventController = async (req, res) => {
  try {
    const Event = await createEvent(req.body);  // Call model function
    res.status(201).json(Event);  // Send the created Event back
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Event' });
  }
};

// Controller to get all Events
const getEventsController = async (req, res) => {
  try {
    const Events = await getEvents();  // Call model function
    res.status(200).json(Events);  // Send Events back
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Events' });
  }
};

// Controller to get one user
const getEventController = async (req, res) => {
  try {
    const {id} = req.params
    const evento = await getEvent(id);  // Call model function
    res.status(200).json(evento);  // Send event back
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve event' });
  }
};

export { createEventController, getEventsController, getEventController };