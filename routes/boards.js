import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  getMyKanbanBoards,
  newKanbanBoard,
  updateKanbanBoard,
} from "../controllers/boards.js";

// Define router
const router = express.Router();

// GET calls
router.get("/getMyKanbanBoards", isAuthenticated, getMyKanbanBoards);

// POST calls
router.post("/newKanbanBoard", isAuthenticated, newKanbanBoard);

// PUT calls
router.route("/updateBoard/:id").put(isAuthenticated, updateKanbanBoard);

export default router;
