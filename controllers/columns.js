import ErrorHandler from "../middlewares/error.js";
import { Cards } from "../models/cards.js";
import { Columns } from "../models/columns.js";

// Get all columns
export const fetchAllStates = async (req, res, next) => {
  try {
    const columns = await Columns.find({});

    res.json({
      success: true,
      columns: columns,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new state
export const createNewState = async (req, res, next) => {
  try {
    const { name, index } = req.body;

    let column = await Columns.findOne({ name });

    column = await Columns.create({
      name: name,
      user: req.user,
      index: index,
    });

    res.status(200).json({
      success: true,
      message: `${column.name} state created successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// Update the state
export const updateState = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const state = await Columns.findById(id);

    if (!state) {
      return next(new ErrorHandler("State not found", 404));
    }

    state.name = name;
    await state.save();

    res.status(204).json({
      success: true,
      message: "State updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get all states
export const getMyStates = async (req, res) => {
  try {
    let user = req.user;

    let allStates = await Columns.find({ user }).sort({ index: 1 });

    res.status(200).json({
      success: true,
      states: allStates,
    });
  } catch (error) {
    next(error);
  }
};

// Delete states and corresponding cards
// 1. Delete the cards first
// 2. Then delete the states
export const deleteState = async (req, res, next) => {
  try {
    let state = req.params.id;

    const childCards = await Cards.find({ state: state });

    if (childCards.length > 0) {
      await Cards.deleteMany({ state: state });
    }

    state = await Columns.findById(state);

    await state.deleteOne();

    res.status(200).json({
      success: true,
      message: "Cards and state deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update the indices of the states
// Receives an array of objects as input
// Updates the index of each state
export const updateStateIndices = async (req, res, next) => {
  try {
    const { stateIdIndexArray } = req.body;

    stateIdIndexArray.map(async (stateObject) => {
      let state = await Columns.findById(stateObject.state_id);

      if (!state) {
        return next(ErrorHandler("States do not exist", 400));
      }

      state.index = stateObject.index;
      await state.save();

      res.status(200).json({
        message: "State index updates successfully",
        success: true,
      });
    });
  } catch (error) {
    next(error);
  }
};
