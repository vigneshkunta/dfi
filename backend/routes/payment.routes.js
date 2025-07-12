import express from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/create-order', verifyJWT,createOrder);
router.post('/verify', verifyJWT, verifyPayment);

export default router;
