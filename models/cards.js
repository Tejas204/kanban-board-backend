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
    required: true,
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
});

export const Cards = mongoose.model("Cards", cardSchema);
