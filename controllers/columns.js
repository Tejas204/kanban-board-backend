import { Columns } from "../models/columns.js";

// Get all columns
export const fetchAllStates = async (req, res) => {
  const columns = await Columns.find({});

  res.json({
    success: true,
    columns: columns,
  });
};

// Create a new state
export const createNewState = async (req, res) => {
  const { name } = req.body;

  let column = await Columns.findOne({ name });

  column = await Columns.create({
    name: name,
    user: req.user,
  });

  res.status(200).json({
    success: true,
    message: `${column.name} state created successfully`,
  });
};

// Update the state
export const updateState = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const state = await Columns.findById(id);

  if (!state) {
    return next(new Error("State not found"));
  }

  state.name = name;
  await state.save();

  res.status(204).json({
    success: true,
    message: "State updated successfully",
  });
};

// Get all states
export const getMyStates = async (req, res) => {
  let user = req.user;

  let allStates = await Columns.find({ user });

  res.status(200).json({
    success: true,
    states: allStates,
  });
};
