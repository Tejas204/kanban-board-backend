import { GridFsStorage } from "multer-gridfs-storage";
import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import crypto from "node:crypto";
import path from "node:path";
import multer from "multer";

// DB Connection
connectDB();

//Server port
app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on PORT ${process.env.PORT} on ${process.env.NODE_ENV} instance`
  );
});
