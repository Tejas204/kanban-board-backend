import { Cards } from "../models/cards.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";

// Create a card
export const createCard = async (req, res, next) => {
  try {
    const { name, shortDescription, priority, state, dueDate } = req.body;
    const token = req.cookies.token;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const card = await Cards.create({
      name: name,
      shortDescription: shortDescription,
      assignedTo: user._id,
      priority: priority,
      state: state,
      createdBy: user._id,
      dueDate: new Date(dueDate),
    });

    res.status(200).json({
      success: true,
      message: "Card created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Fetch all cards of the logged in user
export const myCards = async (req, res, next) => {
  try {
    const user = req.user;

    const cards = await Cards.find({ createdBy: user });

    if (!cards) {
      return next(new ErrorHandler("You don't have any cards", 400));
    }

    res.status(200).json({
      success: true,
      message: "Here are your cards",
      cards: cards,
    });
  } catch (error) {
    next(error);
  }
};

// Update a card
export const updateCard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, shortDescription, priority, assignedTo, dueDate } = req.body;

    let card = await Cards.findById(id);

    if (!card) {
      return next(new ErrorHandler("No card found", 400));
    }

    if (new Date(dueDate) < new Date()) {
      return next(new ErrorHandler("Due date cannot be in the past", 400));
    }

    card.name = name ? name : card.name;
    card.shortDescription = shortDescription
      ? shortDescription
      : card.shortDescription;
    card.priority = priority ? priority : card.priority;
    card.assignedTo = assignedTo ? assignedTo : card.assignedTo;
    card.dueDate = dueDate ? new Date(dueDate) : card.dueDate;
    await card.save();

    res.status(200).json({
      success: true,
      message: "Card updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete cards based on ID
export const deleteCard = async (req, res, next) => {
  try {
    const id = req.params.id;

    let card = await Cards.findById(id);

    if (!card) {
      return next(new ErrorHandler("Invalid card id", 400));
    }

    await card.deleteOne();

    res.status(200).json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update state of the card if the card is dropped in another state
export const changeCardState = async (req, res, next) => {
  try {
    const { state } = req.body;

    let card = await Cards.findById(req.params.id);

    if (!card) {
      return next(new ErrorHandler("Invalid card id", 400));
    }

    card.state = state ? state : card.state;

    await card.save();

    res.status(200).json({
      success: true,
      message: "Card state changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
