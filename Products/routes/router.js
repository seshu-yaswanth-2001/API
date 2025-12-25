const express = require("express");

const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addNewProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/products-controller");

router.get("/get", getAllProducts);
router.get("/get/:id", getProductById);
router.post("/add", addNewProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
