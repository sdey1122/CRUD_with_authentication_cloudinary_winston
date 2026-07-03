const Product = require("../models/Product");

const logger = require("../utils/logger");

const cloudinaryService = require("./cloudinaryService");

class ProductService {
  async createProduct(productData, file) {
    try {
      const { name, description, price } = productData;

      if (!file) {
        throw new Error("Product image is required.");
      }

      const uploadResult = await cloudinaryService.uploadImage(file);

      const product = await Product.create({
        name,
        description,
        price,
        imageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      });

      logger.info(`Product Created: ${product.name}`);

      return product;
    } catch (error) {
      logger.error(`Create Product Error: ${error.message}`);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await Product.find({
        isDeleted: false,
      }).sort({
        createdAt: -1,
      });

      logger.info("Fetched All Products");

      return products;
    } catch (error) {
      logger.error(`Get Products Error: ${error.message}`);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!product) {
        throw new Error("Product not found.");
      }

      logger.info(`Fetched Product: ${product.name}`);

      return product;
    } catch (error) {
      logger.error(`Get Product Error: ${error.message}`);
      throw error;
    }
  }

  async updateProduct(id, productData, file) {
    try {
      const product = await Product.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!product) {
        throw new Error("Product not found.");
      }

      product.name = productData.name ?? product.name;
      product.description = productData.description ?? product.description;
      product.price = productData.price ?? product.price;

      if (file) {
        await cloudinaryService.deleteImage(product.publicId);

        const uploadResult = await cloudinaryService.uploadImage(file);

        product.imageUrl = uploadResult.secure_url;
        product.publicId = uploadResult.public_id;
      }

      await product.save();

      logger.info(`Product Updated: ${product.name}`);

      return product;
    } catch (error) {
      logger.error(`Update Product Error: ${error.message}`);
      throw error;
    }
  }

  async softDeleteProduct(id) {
    try {
      const product = await Product.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!product) {
        throw new Error("Product not found.");
      }

      product.isDeleted = true;
      product.deletedAt = new Date();

      await product.save();

      logger.info(`Soft Deleted Product: ${product.name}`);

      return;
    } catch (error) {
      logger.error(`Soft Delete Error: ${error.message}`);
      throw error;
    }
  }

  async restoreProduct(id) {
    try {
      const product = await Product.findOne({
        _id: id,
        isDeleted: true,
      });

      if (!product) {
        throw new Error("Product not found.");
      }

      product.isDeleted = false;
      product.deletedAt = null;

      await product.save();

      logger.info(`Product Restored: ${product.name}`);

      return product;
    } catch (error) {
      logger.error(`Restore Product Error: ${error.message}`);
      throw error;
    }
  }

  async permanentDeleteProduct(id) {
    try {
      const product = await Product.findOne({
        _id: id,
        isDeleted: true,
      });

      if (!product) {
        throw new Error(
          "Product must be soft deleted before permanent deletion.",
        );
      }

      await cloudinaryService.deleteImage(product.publicId);

      await Product.findByIdAndDelete(id);

      logger.info(`Product Permanently Deleted: ${product.name}`);

      return;
    } catch (error) {
      logger.error(`Permanent Delete Error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new ProductService();
