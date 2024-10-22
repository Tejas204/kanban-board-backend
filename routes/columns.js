import express from "express";
import { Columns } from "../models/columns.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { createNewState, fetchAllStates } from "../controllers/columns.js";

const router = express.Router();

// GET calls
// API: Get all states
router.get("/states/allStates", fetchAllStates);

router.post("/states/createState", createNewState);

export default router;