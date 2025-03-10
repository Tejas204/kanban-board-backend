import mongoose from "mongoose";

//DB Connection
// Added variable here: const dbConnection
export const connectDB = () => {
  const dbConnection = mongoose
    .connect(process.env.DB_URL, {
      dbName: "KanbanBoardDB",
    })
    .then((c) => {
      console.log(`DB Connected with host ${c.connection.host}`);
    })
    .catch((e) => console.log(e));

  return dbConnection;
};
