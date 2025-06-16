import express from 'express';
import { 
  publishEvent, 
  editEvent, 
  deleteEvent 
} from '../controllers/event.controller.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin routes for event management
router.post('/publish-event', protect, admin, publishEvent);
router.put('/edit-event/:eventId', protect, admin, editEvent);
router.delete('/delete-event/:eventId', protect, admin, deleteEvent);

export default router;
