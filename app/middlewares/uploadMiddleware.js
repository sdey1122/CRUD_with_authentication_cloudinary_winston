const multer = require("multer");
const logger = require("../utils/logger");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  try {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      logger.warn(`Invalid File Type: ${file.mimetype}`);

      return cb(
        new Error("Only JPG, JPEG, PNG and WEBP images are allowed."),
        false,
      );
    }

    logger.info(`Image Selected: ${file.originalname}`);

    cb(null, true);
  } catch (error) {
    logger.error(`File Filter Error: ${error.message}`);
    cb(error, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

module.exports = upload;
