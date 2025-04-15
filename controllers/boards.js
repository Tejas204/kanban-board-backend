import jwt from "jsonwebtoken";
import { KanbanBoard } from "../models/boards.js";
import ErrorHandler from "../middlewares/error.js";

// Create a kanban board
export const newKanbanBoard = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = req.user;

    const newKanbanBoard = await KanbanBoard.create({
      name: name,
      createdBy: user._id,
    });

    res.status(200).json({
      message:
        "Kanban Board: " + newKanbanBoard.name + " created successfully!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch kanban boards created by logged in user
export const getMyKanbanBoards = async (req, res, next) => {
  try {
    const user = req.user;

    const myBoards = await KanbanBoard.find({ createdBy: user });

    if (!myBoards) {
      return next(new ErrorHandler("You don't have any kanban boards", 400));
    }

    res.status(200).json({
      boards: myBoards,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
