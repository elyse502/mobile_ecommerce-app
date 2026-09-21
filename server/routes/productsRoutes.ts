import express from "express";
import { getProduct, getProducts } from "../controllers/productController.js";

const ProductRouter = express.Router();

// Get all products
ProductRouter.get("/", getProducts);

// Get single product
ProductRouter.get("/:id", getProduct);
