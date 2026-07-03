const jwt = require("jsonwebtoken");

class GenerateToken {
  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }
}

module.exports = new GenerateToken();
