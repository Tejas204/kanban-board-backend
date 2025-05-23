import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createComment,
  deleteMyComment,
  getMyComments,
} from "../controllers/comments.js";

const router = express.Router();

// ============================== POST calls ===========================================
// API: To create a comment posted by the user
router.post("/createComment", isAuthenticated, createComment);

// ============================== GET calls ===========================================
// API: To fetch all my comments
router.get("/getMyComments", isAuthenticated, getMyComments);

// ============================== DEL calls ===========================================
// API: to delete my comments
router.route("/deleteMyComment/:id").delete(isAuthenticated, deleteMyComment);

export default router;
