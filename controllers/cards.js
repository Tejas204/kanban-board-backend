import { Cards } from "../models/cards.js";
import jwt from "jsonwebtoken";

// Create a card
export const createCard = async (req, res, next) => {
  try {
    const { name, shortDescription, priority, state } = req.body;
    const token = req.cookies.token;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const card = await Cards.create({
      name: name,
      shortDescription: shortDescription,
      assignedTo: user._id,
      priority: priority,
      state: state,
    });

    res.status(200).json({
      success: true,
      message: "Card created successfully",
    });
  } catch (error) {
    next(error);
  }
};
