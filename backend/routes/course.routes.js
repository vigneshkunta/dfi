import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from Course Routes!");
});

export default router;
