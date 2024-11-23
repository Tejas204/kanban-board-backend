import mongoose from "mongoose";

//DB Connection
export const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "KanbanBoardDB",
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((e) => console.log(e));
};
