const authService = require("../services/authService");
const logger = require("../utils/logger");

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: user,
      });
    } catch (error) {
      logger.error(`Register Controller Error: ${error.message}`);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      logger.error(`Login Controller Error: ${error.message}`);
      next(error);
    }
  }

  async refreshAccessToken(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const accessToken = await authService.refreshAccessToken(refreshToken);

      return res.status(200).json({
        success: true,
        message: "Access token generated successfully.",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      logger.error(`Refresh Token Controller Error: ${error.message}`);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      await authService.logout(req.user._id);

      return res.status(200).json({
        success: true,
        message: "Logout successful.",
      });
    } catch (error) {
      logger.error(`Logout Controller Error: ${error.message}`);
      next(error);
    }
  }
}

module.exports = new AuthController();
