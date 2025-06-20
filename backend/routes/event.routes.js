import { Router } from "express";
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from "../controllers/event.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getEvents);
router.post("/", verifyJWT, createEvent);
router.put("/:id", verifyJWT, updateEvent);
router.delete("/:id", verifyJWT, deleteEvent);
router.get("/:id", getEventById);

export default router;
