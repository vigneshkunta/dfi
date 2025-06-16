import express from 'express';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  addToWishlist, 
  enrollCourse, 
  getOrderHistory, 
  updateProfile, 
  giveReview 
} from '../controllers/user.controller.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

// User profile and activity routes
router.post('/wishlist', protect, addToWishlist);
router.post('/enroll', protect, enrollCourse);
router.get('/order-history', protect, getOrderHistory);
router.put('/update-profile', protect, updateProfile);
router.post('/review', protect, giveReview);

export default router;