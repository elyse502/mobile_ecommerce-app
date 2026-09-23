import { Request, Response } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Products.js";

// Get user cart
// GET /api/cart
export const getCart = async (req: Request, res: Response) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name images price stock",
    );

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json({ success: true, data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add item to cart
// POST /api/cart/add
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity = 1, size } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient stock" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Find items with same product and size
    const existingItem = cart.items.find((item) => {
      return item.product.toString() === productId && item.size === size;
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = product.price;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        size,
      });
    }

    cart.calculateTotal();
    await cart.save();

    await cart.populate("items.product", "name images price stock");

    res.json({ success: true, data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart item quantity
// PUT /api/cart/item:productId
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { quantity, size } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size,
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId,
      );
    } else {
      const product = await Product.findById(productId);

      if (product!.stock < quantity) {
        return res
          .status(400)
          .json({ success: false, message: "Insufficient stock" });
      }

      item.quantity = quantity;
    }

    cart.calculateTotal();
    await cart.save();
    await cart.populate("items.product", "name images price stock");

    res.json({ success: true, data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
