const logger = require("../utils/logger");

const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        logger.warn(`Validation Failed: ${error.message}`);

        return res.status(400).json({
          success: false,
          message: "Validation failed.",
          errors: error.details.map((err) => err.message),
        });
      }

      req.body = value;

      next();
    } catch (error) {
      logger.error(`Validation Middleware Error: ${error.message}`);
      next(error);
    }
  };
};

module.exports = validationMiddleware;
