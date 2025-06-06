import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// API: Get user details
export const getUserDetails = (req, res) => {
  res.status(200).json({
    success: "true",
    user: req.user,
  });
};

// API: User Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 404));
    }

    sendCookies(user, res, null, `Welcome back, ${user.name}!`, 200);
  } catch (error) {
    next(error);
  }
};

// API: Register new user
export const registerUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// API: Logout
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("session_cookie", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

//API: fetch all users
export const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users) {
      return next(new ErrorHandler("No users", 400));
    }

    res.status(200).json({
      success: true,
      users: users,
      message: "Users found",
    });
  } catch (error) {
    next(error);
  }
};

// API: Reset password
export const resetPassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);

    if (isMatch) {
      return next(
        new ErrorHandler("Old password and new password is the same", 400)
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// API: get the token
export const getToken = async (req, res, next) => {
  try {
    const token = req.cookies.session_cookie;

    if (!token) {
      return next(new ErrorHandler("The user has not logged in yet", 400));
    }

    res.json({
      success: true,
      token: true,
    });
  } catch (error) {
    next(error);
  }
};
