const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
} = require("../controllers/productControllers");

const router = express.Router();

// for all products
router.route("/products").get(getAllProducts);

// single product with the given id getting, updating, deleting
router.route("/product/:id").get(getProduct).delete(deleteProduct);
// .put(updateProduct)
// .delete(deleteProduct)

//for create a product
// router.route("/product/create").post(createProduct);

module.exports = router;
