import jwt from "jsonwebtoken";
import { KanbanBoard } from "../models/boards.js";

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
      message: "Kanban Board " + newKanbanBoard.name + " created successfully!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
