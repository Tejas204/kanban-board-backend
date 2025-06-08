import jwt from "jsonwebtoken";
import { KanbanBoard } from "../models/boards.js";
import { Columns } from "../models/columns.js";
import { Cards } from "../models/cards.js";
import ErrorHandler from "../middlewares/error.js";
import { sendCookies } from "../utils/features.js";

// ============================== BOARD API's ===========================================

/*----------------------------------------------------------------------- 
* Controller: Create a kanban board, if board name is duplicate, show error message
-----------------------------------------------------------------------*/
export const newKanbanBoard = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = req.user;

    const existingBoard = await KanbanBoard.find({
      name: name,
      createdBy: user,
    });

    // Duplicate board detected, throw error
    if (Object.keys(existingBoard).length !== 0) {
      return next(
        new ErrorHandler(
          "A kanban board with this name already exists. Please use a different name",
          400
        )
      );
    }

    const firstBoard = await KanbanBoard.find({ createdBy: user });

    // Else create new board
    const newKanbanBoard = await KanbanBoard.create({
      name: name,
      createdBy: user._id,
      accessUsers: [user._id],
      default: Object.keys(firstBoard).length === 0 ? true : false,
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

/*-----------------------------------------------------------------------
* Controller: Fetch kanban boards created by logged in user
-----------------------------------------------------------------------*/
export const getMyKanbanBoards = async (req, res, next) => {
  try {
    const user = req.user;
    const selectedBoard = req.selectedBoard;

    const myBoards = await KanbanBoard.find({ createdBy: user });

    if (!myBoards) {
      return next(new ErrorHandler("You don't have any kanban boards", 400));
    }

    res.status(200).json({
      boards: myBoards,
      selectedBoard: selectedBoard,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

/*-----------------------------------------------------------------------
* Controller: Fetch the kanban boards shared with logged in user
-----------------------------------------------------------------------*/
export const sharedBoards = async (req, res, next) => {
  try {
    const user = req.user;

    const sharedBoards = await KanbanBoard.find({ accessUsers: user._id });

    if (!sharedBoards) {
      return next(
        new ErrorHandler("You don't have any boards shared with you.", 400)
      );
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

/* -----------------------------------------------------------------------
Controller: Update name of the kanban board
-----------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------
* Set the selected board and store in the cookie
-----------------------------------------------------------------------*/
export const setSelectedBoard = async (req, res, next) => {
  try {
    const { boardId } = req.body;

    const board = await KanbanBoard.findById(boardId);

    if (!board) {
      return next(
        new ErrorHandler(
          "The board you selected does not exist. Please select another board",
          400
        )
      );
    }

    sendCookies(req.user, res, board, `Let's get going`, 200);
  } catch (error) {
    next(error);
  }
};

/*----------------------------------------------------------------------- 
* Delete a board and its associated states and cards
*  - Find the kanban board
*  - If no states, delete board
*  - If states but no cards, delete states and the board
*  - If cards, states and board present, delete cards -> states -> board
-----------------------------------------------------------------------*/
export const deleteBoard = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;

    const board = await KanbanBoard.findById(id);

    if (!board) {
      return next(
        new ErrorHandler("The board you wish to delete does not exist", 400)
      );
    }

    const states = await Columns.find({ board: id });

    if (!states) {
      await board.deleteOne();
    } else {
      const cards = Cards.find({ board: id });
      if (!cards) {
        await states.deleteMany({ board: id });
        await board.deleteOne();
      } else {
        await cards.deleteMany({ board: id });
        await states.deleteMany({ board: id });
        await board.deleteOne();
      }
    }

    res.status(200).json({
      success: true,
      message: "The kanban board is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ============================== User access API's ===========================================
/* -----------------------------------------------------------------------
* Update the access users
-----------------------------------------------------------------------*/
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

/* -----------------------------------------------------------------------
* Remove users so that they can no longer access a board
-----------------------------------------------------------------------*/
export const deleteUserAccess = async (req, res, next) => {
  try {
    const userId = req.params.id;
  } catch (error) {
    next(error);
  }
};
