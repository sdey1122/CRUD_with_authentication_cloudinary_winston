const productService = require("../services/productService");
const logger = require("../utils/logger");

class ProductController {
  async createProduct(req, res, next) {
    try {
      const product = await productService.createProduct(req.body, req.file);

      return res.status(201).json({
        success: true,
        message: "Product created successfully.",
        data: product,
      });
    } catch (error) {
      logger.error(`Create Product Controller Error: ${error.message}`);
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await productService.getAllProducts();

      return res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      logger.error(`Get All Products Controller Error: ${error.message}`);
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      logger.error(`Get Product Controller Error: ${error.message}`);
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body,
        req.file,
      );

      return res.status(200).json({
        success: true,
        message: "Product updated successfully.",
        data: product,
      });
    } catch (error) {
      logger.error(`Update Product Controller Error: ${error.message}`);
      next(error);
    }
  }

  async softDeleteProduct(req, res, next) {
    try {
      await productService.softDeleteProduct(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Product soft deleted successfully.",
      });
    } catch (error) {
      logger.error(`Soft Delete Controller Error: ${error.message}`);
      next(error);
    }
  }

  async restoreProduct(req, res, next) {
    try {
      const product = await productService.restoreProduct(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Product restored successfully.",
        data: product,
      });
    } catch (error) {
      logger.error(`Restore Product Controller Error: ${error.message}`);
      next(error);
    }
  }

  async permanentDeleteProduct(req, res, next) {
    try {
      await productService.permanentDeleteProduct(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Product permanently deleted successfully.",
      });
    } catch (error) {
      logger.error(`Permanent Delete Controller Error: ${error.message}`);
      next(error);
    }
  }
}

module.exports = new ProductController();
