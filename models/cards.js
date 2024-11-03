import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  priority: {
    type: Number,
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "States",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Cards = mongoose.model("Cards", cardSchema);
