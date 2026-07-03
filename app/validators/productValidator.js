const Joi = require("joi");

class ProductValidator {
  createProductSchema() {
    return Joi.object({
      name: Joi.string().trim().min(3).max(100).required().messages({
        "string.empty": "Product name is required.",
        "string.min": "Product name must be at least 3 characters.",
        "string.max": "Product name cannot exceed 100 characters.",
        "any.required": "Product name is required.",
      }),

      description: Joi.string().trim().min(10).max(1000).required().messages({
        "string.empty": "Product description is required.",
        "string.min": "Product description must be at least 10 characters.",
        "string.max": "Product description cannot exceed 1000 characters.",
        "any.required": "Product description is required.",
      }),

      price: Joi.number().positive().precision(2).required().messages({
        "number.base": "Price must be a number.",
        "number.positive": "Price must be greater than zero.",
        "any.required": "Product price is required.",
      }),
    });
  }

  updateProductSchema() {
    return Joi.object({
      name: Joi.string().trim().min(3).max(100).optional().messages({
        "string.min": "Product name must be at least 3 characters.",
        "string.max": "Product name cannot exceed 100 characters.",
      }),

      description: Joi.string().trim().min(10).max(1000).optional().messages({
        "string.min": "Product description must be at least 10 characters.",
        "string.max": "Product description cannot exceed 1000 characters.",
      }),

      price: Joi.number().positive().precision(2).optional().messages({
        "number.base": "Price must be a number.",
        "number.positive": "Price must be greater than zero.",
      }),
    }).min(1);
  }
}

module.exports = new ProductValidator();
