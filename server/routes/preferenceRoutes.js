import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getPreferences,
  updatePreferences,
} from "../controllers/preferenceController.js";

const router = Router();

router.use(protect);
router.get("/", getPreferences);
router.put("/", updatePreferences);

export default router;
