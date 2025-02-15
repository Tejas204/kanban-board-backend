import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cards",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Comments = mongoose.model("Comments", commentsSchema);
