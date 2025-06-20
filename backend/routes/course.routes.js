import { Router } from "express";
import { 
  getCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse, 
  getCourseById 
} from "../controllers/course.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getCourses);
router.post("/", verifyJWT, createCourse);
router.put("/:id", verifyJWT, updateCourse);
router.delete("/:id", verifyJWT, deleteCourse);
router.get("/:id", getCourseById);

export default router;
