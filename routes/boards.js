import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newKanbanBoard } from "../controllers/boards.js";

// Define router
const router = express.Router();

// GET calls

// POST calls
router.post("/newKanbanBoard", isAuthenticated, newKanbanBoard);

export default router;
