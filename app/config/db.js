const mongoose = require("mongoose");
const logger = require("../utils/logger");

class Database {
  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI);

      logger.info("MongoDB Connected Successfully");
    } catch (error) {
      logger.error(`MongoDB Connection Failed : ${error.message}`);
      process.exit(1);
    }
  }
}

module.exports = new Database();
