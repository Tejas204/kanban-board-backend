import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addAccessUsers,
  getMyKanbanBoards,
  newKanbanBoard,
  sharedBoards,
  updateKanbanBoard,
} from "../controllers/boards.js";

// Define router
const router = express.Router();

// ============================== GET calls ===========================================
// Fetch boards created by logged in user
router.get("/getMyKanbanBoards", isAuthenticated, getMyKanbanBoards);

// Fetch the kanban boards shared with the logged in user
router.get("/sharedBoards", isAuthenticated, sharedBoards);

// ============================== POST calls ===========================================
// Create a new board
router.post("/newKanbanBoard", isAuthenticated, newKanbanBoard);

// Set the selected board
router.post("/selectBoard", isAuthenticated);

//============================== PUT calls ===========================================
// Update the name of the board
router.route("/updateBoard/:id").put(isAuthenticated, updateKanbanBoard);

// Update the access users
router
  .route("/updateAccess/:id")
  .put(isAuthenticated, addAccessUsers)
  .delete(isAuthenticated);

// ============================== DEL calls ===========================================
// Route to delete the kanban board
router.route("/deleteBoard/:id", isAuthenticated);
export default router;
