const logger = require("../utils/logger");
const ApiError = require("../utils/ApiError");

const authorizeMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        logger.warn("Authorization Failed: User not authenticated.");

        throw new ApiError(401, "Authentication required.");
      }

      if (!roles.includes(req.user.role)) {
        logger.warn(
          `Authorization Failed: ${req.user.email} tried to access restricted resource.`,
        );

        throw new ApiError(
          403,
          "You are not authorized to perform this action.",
        );
      }

      next();
    } catch (error) {
      logger.error(`Authorization Middleware Error: ${error.message}`);
      next(error);
    }
  };
};

module.exports = authorizeMiddleware;
