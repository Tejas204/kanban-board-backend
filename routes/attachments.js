import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/uploadAttachment", isAuthenticated);

export default router;
