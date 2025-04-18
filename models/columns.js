import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  index: {
    type: Number,
    required: true,
  },
});

export const Columns = mongoose.model("States", columnSchema);
