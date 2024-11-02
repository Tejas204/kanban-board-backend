import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    success: "true",
    users: users,
  });
};

// Get user details
export const getUserDetails = (req, res) => {
  res.status(200).json({
    success: "true",
    user: req.user,
  });
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }

  sendCookies(user, res, `Welcome back, ${user.name}!`, 200);
};

// Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists. Please log in.", 404));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  sendCookies(user, res, "Registered successfully", 201);
};

// API: Logout
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
