const streamifier = require("streamifier");

const cloudinary = require("../config/cloudinary");
const logger = require("../utils/logger");

class CloudinaryService {
  async uploadImage(file) {
    try {
      return await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
          },
          (error, result) => {
            if (error) {
              logger.error(`Cloudinary Upload Error: ${error.message}`);
              return reject(error);
            }

            logger.info("Image Uploaded Successfully.");

            resolve(result);
          },
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    } catch (error) {
      logger.error(`Upload Service Error: ${error.message}`);
      throw error;
    }
  }

  async deleteImage(publicId) {
    try {
      if (!publicId) return;

      await cloudinary.uploader.destroy(publicId);

      logger.info(`Image Deleted: ${publicId}`);
    } catch (error) {
      logger.error(`Delete Image Error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new CloudinaryService();
