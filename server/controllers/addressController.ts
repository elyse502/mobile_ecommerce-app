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

// Add new address
// POST /api/addresses
export const addAddress = async (req: Request, res: Response) => {
  try {
    const { type, street, city, state, zipCode, country, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    const newAddress = await Address.create({
      user: req.user._id,
      type,
      street,
      city,
      state,
      zipCode,
      country,
      isDefault: isDefault || false,
    });

    res.status(201).json({ success: true, data: newAddress });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
