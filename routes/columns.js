import express from "express";
import { createNewState, fetchAllStates, getMyStates, updateState } from "../controllers/columns.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// GET calls
// API: Get all states
router.get("/allStates", fetchAllStates);

// API: Get all states created by user
router.get("/getMyStates", isAuthenticated, getMyStates);

// POST calls
// API: Create a new state
router.post("/createState", isAuthenticated, createNewState);

// API: Update the name of the state
router.post("/updateState", isAuthenticated, updateState);


export default router;