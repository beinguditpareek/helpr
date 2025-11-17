import express from "express";
import {
  createHelp,
  getAllHelp,
  getMyHelp,
  updateHelp,
  deleteHelp,
} from "../controller/helpController.js";
import { protect } from "../middleware/userAuth.js";

const helpRouter = express.Router();

helpRouter.post("/create", protect, createHelp);          // Create help
helpRouter.get("/all", getAllHelp);                    // Public feed
helpRouter.get("/my", protect, getMyHelp);          // My help requests
helpRouter.put("/:id", protect, updateHelp);        // Update one
helpRouter.delete("/:id", protect, deleteHelp);     // Delete one

export default helpRouter;
