const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const logger = require("../utils/logger");
const generateToken = require("../utils/generateToken");

class AuthService {
  async register(userData) {
    try {
      const { name, email, password, role } = userData;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        logger.warn(`Registration Failed: ${email} already exists.`);

        throw new Error("Email already registered.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      logger.info(`User Registered Successfully: ${user.email}`);

      return user;
    } catch (error) {
      logger.error(`Register Service Error: ${error.message}`);
      throw error;
    }
  }

  async login(loginData) {
    try {
      const { email, password } = loginData;

      const user = await User.findOne({ email });

      if (!user) {
        logger.warn(`Login Failed: ${email} not found.`);

        throw new Error("Invalid email or password.");
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        logger.warn(`Login Failed: Incorrect password for ${email}.`);

        throw new Error("Invalid email or password.");
      }

      const accessToken = generateToken.generateAccessToken({
        id: user._id,
        role: user.role,
      });

      const refreshToken = generateToken.generateRefreshToken({
        id: user._id,
      });

      user.refreshToken = refreshToken;

      await user.save();

      logger.info(`User Logged In Successfully: ${user.email}`);

      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error(`Login Service Error: ${error.message}`);
      throw error;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      );

      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        logger.warn("Invalid Refresh Token.");

        throw new Error("Invalid refresh token.");
      }

      const accessToken = generateToken.generateAccessToken({
        id: user._id,
        role: user.role,
      });

      logger.info(`Access Token Refreshed: ${user.email}`);

      return accessToken;
    } catch (error) {
      logger.error(`Refresh Token Error: ${error.message}`);
      throw error;
    }
  }

  async logout(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found.");
      }

      user.refreshToken = null;

      await user.save();

      logger.info(`User Logged Out Successfully: ${user.email}`);

      return;
    } catch (error) {
      logger.error(`Logout Service Error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new AuthService();
