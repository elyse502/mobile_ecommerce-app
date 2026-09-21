import { Request, Response } from "express";
import Product from "../models/Products.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const query: any = { isActive: true };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
