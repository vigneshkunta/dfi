import express from 'express';
import { 
  publishCourse, 
  editCourse, 
  deleteCourse
} from '../controllers/course.controller.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin routes for course management
router.post('/publish-course', protect, admin, publishCourse);
router.put('/edit-course/:courseId', protect, admin, editCourse);
router.delete('/delete-course/:courseId', protect, admin, deleteCourse);

export default router;
