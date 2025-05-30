import jwt from "jsonwebtoken";

export const sendCookies = (user, res, board, message, statusCode) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  console.log(token);
  const cookieObject = { token: token, selectedBoard: board };

  res
    .status(statusCode)
    .cookie("session_cookie", cookieObject, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: message,
    });
};
