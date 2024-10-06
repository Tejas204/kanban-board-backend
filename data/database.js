import mongoose from "mongoose";

//DB Connection
export const connectDB = () => {
        mongoose.connect("mongodb://localhost:27017/", {
        dbName : "SampleBackend"
    })
    .then(() => {console.log("DB Connected");})
    .catch((e) => console.log(e));
}