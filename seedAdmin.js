require("dotenv").config();

const bcrypt = require("bcryptjs");

const database = require("./app/config/db");

const User = require("./app/models/User");

const logger = require("./app/utils/logger");

class SeedAdmin {
  async seed() {
    try {
      await database.connect();

      const adminExists = await User.findOne({
        email: process.env.ADMIN_EMAIL,
      });

      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      await User.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });

      logger.info("Admin created successfully.");

      process.exit(0);
    } catch (error) {
      logger.error(`Seed Error: ${error.message}`);
      process.exit(1);
    }
  }
}

new SeedAdmin().seed();
