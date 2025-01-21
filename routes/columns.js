import express from "express";
import {
  createNewState,
  deleteState,
  fetchAllStates,
  getMyStates,
  updateState,
  updateStateIndices,
} from "../controllers/columns.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { deleteCard } from "../controllers/cards.js";

const router = express.Router();

// GET calls
// API: Get all states
router.get("/allStates", fetchAllStates);

// API: Get all states created by user
router.get("/getMyStates", isAuthenticated, getMyStates);

// POST calls
// API: Create a new state
router.post("/createState", isAuthenticated, createNewState);

// API: Update the name of the state, delete state and corresponding cards
router
  .route("/:id")
  .put(isAuthenticated, updateState)
  .delete(isAuthenticated, deleteState);

// PUT calls
// API to update state indices
router.put("/updateStateIndices", isAuthenticated, updateStateIndices);

export default router;
