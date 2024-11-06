import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createCard,
  deleteCard,
  myCards,
  updateCard,
} from "../controllers/cards.js";

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
router
  .route("/:id")
  .put(isAuthenticated, updateCard)
  .delete(isAuthenticated, deleteCard);

export default router;
