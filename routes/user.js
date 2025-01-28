import express from "express";
import {
  fetchAllUsers,
  getUserDetails,
  login,
  logout,
  registerUser,
  resetPassword,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// GET calls
// API: Get user details
router.get("/myProfile", isAuthenticated, getUserDetails);

//API: Logout
router.get("/logout", logout);

//API: get all users
router.get("/allUsers", isAuthenticated, fetchAllUsers);

// POST Calls
// API: Create only new user records and redirect to login page
router.post("/register", registerUser);

// API: Log in existing users
router.post("/login", login);

// PUT Calls
// API: reset user password
router.put("/resetPassword", resetPassword);

export default router;
