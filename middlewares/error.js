export const errorMiddleWare = (err, req, res) => {
    return res.status(404).json({
        success: false,
        message: err.message,
    });
}