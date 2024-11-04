import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createCard, myCards } from "../controllers/cards.js";

// Define router
const router = express.Router();

// GET calls
// API: Fetch all cards
router.get("/myCards", isAuthenticated, myCards);

// POST calls
// API: Create a new card
router.post("/createCard", isAuthenticated, createCard);

// PUT & DELETE calls
// API: Update card or Delete card
router.route("/updateCard").put(isAuthenticated).delete(isAuthenticated);

export default router;
