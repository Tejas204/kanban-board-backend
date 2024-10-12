import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Columns = mongoose.model("Columns", columnSchema);