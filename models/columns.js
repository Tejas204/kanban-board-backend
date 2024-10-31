import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const Columns = mongoose.model("States", columnSchema);