import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addAccessUsers,
  getMyKanbanBoards,
  newKanbanBoard,
  updateKanbanBoard,
} from "../controllers/boards.js";

// Define router
const router = express.Router();

// GET calls
// Fetch boards created by logged in user
router.get("/getMyKanbanBoards", isAuthenticated, getMyKanbanBoards);

// POST calls
// Create a new board
router.post("/newKanbanBoard", isAuthenticated, newKanbanBoard);

// PUT calls
// Update the name of the board
router.route("/updateBoard/:id").put(isAuthenticated, updateKanbanBoard);

// Update the access users
router.route("/updateAccess/:id").put(isAuthenticated, addAccessUsers);

export default router;
