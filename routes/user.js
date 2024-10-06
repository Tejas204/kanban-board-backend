import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken"
import { getAllUsers, getUserDetails, registerUser } from "../controllers/user.js";

const router = express.Router();

// GET calls
// API: Get all users
router.get("/users/all", getAllUsers);

// API: Get user details
router.get("/user/userid", getUserDetails);

// POST Calls
// API: Fetch user details, create only new user records and redirect to login page
router.post("/register", registerUser);


export default router;