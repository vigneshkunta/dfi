import { Router } from "express";
import { getLicenses, createLicense, updateLicense, deleteLicense, getLicenseById } from "../controllers/license.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getLicenses);
router.post("/", verifyJWT, createLicense);
router.put("/:id", verifyJWT, updateLicense);
router.delete("/:id", verifyJWT, deleteLicense);
router.get("/:id", getLicenseById);

export default router;
