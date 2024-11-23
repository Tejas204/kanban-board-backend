import { app } from "./app.js";
import { connectDB } from "./data/database.js";

//DB Connection
connectDB();

//Server port
app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on PORT ${process.env.PORT} on ${process.env.NODE_ENV} instance`
  );
});
