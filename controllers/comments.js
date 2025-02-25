import ErrorHandler from "../middlewares/error.js";
import { Cards } from "../models/cards.js";
import { Comments } from "../models/comments.js";

// Create a comment
export const createComment = async (req, res, next) => {
  try {
    const { comment, card } = req.body;

    const commentCard = await Cards.findById(card);

    if (!commentCard) {
      return next(new ErrorHandler("Card not found", 400));
    }

    const newComment = await Comments.create({
      comment: comment,
      user: req.user,
      card: card,
    });

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Fetch my comments
export const getMyComments = async (req, res, next) => {
  try {
    const myComments = await Comments.find({ user: req.user });

    if (myComments) {
      res.status(200).json({
        success: true,
        message: "Comments retrieved successfully",
        comments: myComments,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Delete my comments
export const deleteMyComment = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteComment = await Comments.findById(id);

    if (!deleteComment) {
      return next(new ErrorHandler("Invalid comment id", 400));
    } else if (!deleteComment.user.equals(req.user._id)) {
      return next(
        new ErrorHandler("Cannot delete a comment added by another user", 400)
      );
    }

    await deleteComment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
