const express = require("express");

const productController = require("../controllers/productController");

const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

const productValidator = require("../validators/productValidator");

const router = express.Router();

// public-routes

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

// protected-routes

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  validationMiddleware(productValidator.createProductSchema()),
  productController.createProduct,
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  validationMiddleware(productValidator.updateProductSchema()),
  productController.updateProduct,
);

router.delete("/:id", authMiddleware, productController.softDeleteProduct);

router.patch("/:id/restore", authMiddleware, productController.restoreProduct);

router.delete(
  "/:id/permanent",
  authMiddleware,
  productController.permanentDeleteProduct,
);

module.exports = router;
