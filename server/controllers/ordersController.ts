import { Request, Response } from "express";
import Order from "../models/Order.js";

// Get user orders
// GET /api/orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const query = { user: req.user._id };
    const orders = await Order.find(query)
      .populate("items.product", "name images")
      .sort("-createdAt");

    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
