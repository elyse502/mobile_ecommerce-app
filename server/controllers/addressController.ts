import { Request, Response } from "express";
import Address from "../models/Address.js";

// Get user addresses
// GET /api/addresses
export const getAddresses = async (req: Request, res: Response) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.json({ success: true, data: addresses });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
