const logger = require("../utils/logger");

const errorMiddleware = (error, req, res, next) => {
  logger.error(error.message);

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
