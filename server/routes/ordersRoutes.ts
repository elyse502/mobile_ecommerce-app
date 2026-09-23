import express from "express";
import { authorize, protect } from "../middlewares/auth.js";
import {
  createOrder,
  getAllOrders,
  getOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/ordersController.js";

const OrderRouter = express.Router();

// Get user orders
OrderRouter.get("/", protect, getOrders);

// Get single order
OrderRouter.get("/:id", protect, getOrder);

// Create order from cart
OrderRouter.post("/", protect, createOrder);

// Update order status (Admin only)
OrderRouter.put("/:id/status", protect, authorize("admin"), updateOrderStatus);

// Get all orders (Admin only)
OrderRouter.get("/admin/all", protect, authorize("admin"), getAllOrders);

export default OrderRouter;
