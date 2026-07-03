const cloudinary = require("cloudinary").v2;
const logger = require("../utils/logger");

class CloudinaryConfig {
  constructor() {
    this.configure();
  }

  configure() {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      logger.info("Cloudinary Configured Successfully");
    } catch (error) {
      logger.error(`Cloudinary Configuration Failed: ${error.message}`);
    }
  }

  getInstance() {
    return cloudinary;
  }
}

module.exports = new CloudinaryConfig().getInstance();
