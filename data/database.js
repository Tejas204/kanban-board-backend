import mongoose from "mongoose";

//DB Connection
export const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "KanbanBoardDB",
    })
    .then((c) => {
      console.log(`DB Connected with host ${c.connection.host}`);
    })
    .catch((e) => console.log(e));
};
