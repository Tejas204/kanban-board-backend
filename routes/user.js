import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken"
import { getAllUsers, getUserDetails } from "../controllers/user.js";

const router = express.Router();

router.get("/users/all", getAllUsers);

router.get("/user/userid", getUserDetails);


export default router;