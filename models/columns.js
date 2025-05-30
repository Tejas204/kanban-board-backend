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
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KanbanBoards",
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
