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

// Fetch the kanban boards shared with me
export const sharedBoards = async (req, res, next) => {
  try {
    const user = req.user;

    const sharedBoards = await KanbanBoard.find({ accessUsers: user._id });

    if (!sharedBoards) {
      new ErrorHandler("You don't have any boards shared with you.");
    }

    res.status(200).json({
      success: true,
      boards: sharedBoards,
      message: "Retrieved boards shared with you",
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

// Update the access users
export const addAccessUsers = async (req, res, next) => {
  try {
    const user = req.user;
    const { userArray } = req.body;
    const id = req.params.id;

    const board = await KanbanBoard.findById(id);

    if (!board) {
      return next(
        new ErrorHandler("The board you wish to update does not exist", 400)
      );
    }

    for (var i = 0; i < userArray.length; i++) {
      board.accessUsers.push(userArray[i]);
    }

    await board.save();

    res.status(200).json({
      message: "Users added successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Remove users so that they can no longer access a board
export const deleteUserAccess = async (req, res, next) => {
  try {
    const userId = req.params.id;
  } catch (error) {
    next(error);
  }
};
