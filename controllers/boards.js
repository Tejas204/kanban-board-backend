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
      accessUsers: [user._id],
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

// Update name of the kanban board
export const updateKanbanBoard = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const { name } = req.body;

    const board = await KanbanBoard.findById(id);

    if (!board) {
      return next(
        new ErrorHandler("The board you wish to update does not exist", 400)
      );
    }

    board.name = name;
    await board.save();

    res.status(200).json({
      message: "Board updated successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
