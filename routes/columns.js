import express from "express";
import { Columns } from "../models/columns.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { createNewState, fetchAllColumns } from "../controllers/columns.js";

const router = express.Router();

router.get("/columns/allColumns", fetchAllColumns);

router.post("/columns/createColumn", createNewState);

export default router;