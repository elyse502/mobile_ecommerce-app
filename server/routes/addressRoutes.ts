import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../controllers/addressController.js";

const AddressRouter = express.Router();

AddressRouter.get("/", protect, getAddresses);
AddressRouter.post("/", protect, addAddress);
AddressRouter.put("/:id", protect, updateAddress);
AddressRouter.delete("/:id", protect, deleteAddress);

export default AddressRouter;
