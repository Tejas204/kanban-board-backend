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
