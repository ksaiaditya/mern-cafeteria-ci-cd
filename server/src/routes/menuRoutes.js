import express from "express";
import {
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route (anyone can see menu)
router.get("/", getMenuItems);

// Admin-only routes
router.post("/", protect, adminOnly, addMenuItem);
router.put("/:id", protect, adminOnly, updateMenuItem);
router.delete("/:id", protect, adminOnly, deleteMenuItem);

export default router;
