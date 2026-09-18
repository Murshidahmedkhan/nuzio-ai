import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getNewsById,
  getPersonalizedNews,
  recordPlay,
} from "../controllers/newsController.js";

const router = Router();

router.use(protect);
router.get("/personalized", getPersonalizedNews);
router.get("/:id", getNewsById);
router.post("/:id/play", recordPlay);

export default router;
