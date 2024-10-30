import express from "express";
import { getAllUsers, getUserDetails, login, registerUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// GET calls
// API: Get all users
router.get("/all", getAllUsers);

// API: Get user details
router.get("/myProfile", isAuthenticated, getUserDetails);


// POST Calls
// API: Create only new user records and redirect to login page
router.post("/register", registerUser);

// API: Log in existing users
router.post("/login", login);


export default router;