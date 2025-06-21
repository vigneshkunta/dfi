import { Router } from "express";
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  updateUser,
  getAllUsers,
} from '../controllers/user.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

// User authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// secured routes
router.post('/logout', logoutUser);
router.put('/update', verifyJWT, updateUser);
router.get("/all", verifyJWT, getAllUsers);

export default router;