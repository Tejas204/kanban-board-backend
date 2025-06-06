import { name } from "ejs";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import stateRouter from "./routes/columns.js";
import cardRouter from "./routes/cards.js";
import commentRouter from "./routes/comments.js";
import kanbanBoardRouter from "./routes/boards.js";
import { config } from "dotenv";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";

// Set up server
export const app = express();

// Config
config({
  path: "./data/config.env",
});

// Using middleware: CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), "public")));
app.use(cookieParser());

// Using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/states", stateRouter);
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/boards", kanbanBoardRouter);

// Set up View engine
app.set("view engine", "ejs");

// Using error middlewares
app.use(errorMiddleWare);
