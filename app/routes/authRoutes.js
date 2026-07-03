const express = require("express");

const authController = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

const authValidator = require("../validators/authValidator");

const router = express.Router();

router.post(
  "/register",
  validationMiddleware(authValidator.registerSchema()),
  authController.register,
);

router.post(
  "/login",
  validationMiddleware(authValidator.loginSchema()),
  authController.login,
);

router.post("/refresh-token", authController.refreshAccessToken);

router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
