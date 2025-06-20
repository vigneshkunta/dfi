import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadMediaController } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadMediaController);

export default router;