import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";
import { authorize, protect } from "../middlewares/auth.js";

const ProductRouter = express.Router();

// Get all products
ProductRouter.get("/", getProducts);

// Get single product
ProductRouter.get("/:id", getProduct);

// Create product (Admin only)
ProductRouter.post(
  "/",
  upload.array("images", 5),
  protect,
  authorize("admin"),
  createProduct,
);

// Update product (Admin only)
ProductRouter.put(
  "/:id",
  upload.array("images", 5),
  protect,
  authorize("admin"),
  updateProduct,
);

// Delete product (Admin only)
ProductRouter.delete("/:id", protect, authorize("admin"), deleteProduct);

export default ProductRouter;
