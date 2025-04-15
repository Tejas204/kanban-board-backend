import mongoose from "mongoose";

const kanbanBoardSchema = mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  accessUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

export const KanbanBoard = mongoose.model("KanbanBoards", kanbanBoardSchema);
