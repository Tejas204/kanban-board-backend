import { name } from "ejs";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import stateRouter from "./routes/columns.js";
import { config } from "dotenv";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";

// Set up server
export const app = express();

// Config
config({
  path: "./data/config.env",
});

// Using middlewares
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/states", stateRouter);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Set up View engine
app.set("view engine", "ejs");

// Using error middlewares
app.use(errorMiddleWare);
