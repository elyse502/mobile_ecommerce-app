import express from "express";
import { authorize, protect } from "../middlewares/auth.js";
import { getDashboardStats } from "../controllers/adminController.js";

const AdminRouter = express.Router();

// Get dashboard stats
AdminRouter.get("/stats", protect, authorize("admin"), getDashboardStats);

export default AdminRouter;
