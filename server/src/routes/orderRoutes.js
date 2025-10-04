import express from "express";
import {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect, adminOnly, kitchenOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);

// Kitchen & Admin
router.get("/", protect, getAllOrders);  // kitchen/admin can see all
router.put("/:id", protect, updateOrderStatus); // kitchen/admin update status

export default router;