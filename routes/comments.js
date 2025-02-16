import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createComment } from "../controllers/comments.js";

const router = express.Router();

// POST calls
// API: To create a comment posted by the user
router.post("/createComment", isAuthenticated, createComment);

export default router;
