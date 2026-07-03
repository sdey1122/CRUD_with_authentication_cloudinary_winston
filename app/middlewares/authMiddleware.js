const jwt = require("jsonwebtoken");

const User = require("../models/User");
const logger = require("../utils/logger");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn("Authorization token missing.");

      return res.status(401).json({
        success: false,
        message: "Access token is required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      logger.warn(`User not found. ID: ${decoded.id}`);

      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

    logger.info(`Authenticated User: ${user.email}`);

    next();
  } catch (error) {
    logger.error(`Authentication Failed: ${error.message}`);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token has expired.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token.",
      });
    }

    next(error);
  }
};

module.exports = authMiddleware;
