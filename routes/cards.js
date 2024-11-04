import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createCard, myCards } from "../controllers/cards.js";

// Define router
const router = express.Router();

// GET calls
// API: Fetch all cards
router.get("/myCards", isAuthenticated, myCards);

// POST calls
router.post("/createCard", isAuthenticated, createCard);

export default router;
