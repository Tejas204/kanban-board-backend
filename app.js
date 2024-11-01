import { name } from 'ejs';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/user.js";
import stateRouter from "./routes/columns.js";
import { config } from 'dotenv';
import { errorMiddleWare } from './middlewares/error.js';

// Set up server
export const app = express();

// Config
config({
    path : "./data/config.env",
})

// Using middlewares
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Using error middleware
app.use(errorMiddleWare);

// Using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/states", stateRouter);


// Set up View engine
app.set("view engine", "ejs");