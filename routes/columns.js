import express from "express";
import { Columns } from "../models/columns.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { createNewState, fetchAllStates } from "../controllers/columns.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// GET calls
// API: Get all states
router.get("/allStates", fetchAllStates);

// POST calls
// API: Create a new state
router.post("/createState", isAuthenticated, createNewState);

export default router;