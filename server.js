import { GridFsStorage } from "multer-gridfs-storage";
import { app } from "./app.js";
import { connectDB } from "./data/database.js";

// DB Connection
// Added variable here: const connection
const connection = connectDB();

const storage = new GridFsStorage({ db: connection });

//Server port
app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on PORT ${process.env.PORT} on ${process.env.NODE_ENV} instance`
  );
});
