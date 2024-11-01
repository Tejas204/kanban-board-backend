export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message ? err.message : "Iternal server error";

  return res.status(404).json({
    success: false,
    message: err.message,
  });
};
