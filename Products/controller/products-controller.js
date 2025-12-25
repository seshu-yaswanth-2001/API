const Products = require("../models/products");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});

    if (allProducts) {
      res.status(200).json({
        success: true,
        message: "Products found!",
        data: allProducts,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong! Please try again.",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const prodId = req.params.id;
    const selectedProduct = await Products.findById(prodId);

    if (!selectedProduct) {
      return res.status(404).json({
        success: false,
        message: `Book with ${selectedProduct} is not found!`,
      });
    }

    res.status(200).json({
      success: true,
      body: selectedProduct,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({
      message: "Something went wrong! Please try again.",
    });
  }
};

const addNewProducts = async (req, res) => {
  try {
    const newFormData = req.body;
    const newlyCreatedProd = await Products.create(newFormData);

    if (newFormData) {
      res.status(201).json({
        status: true,
        message: "New Data Posted Success",
        data: newlyCreatedProd,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const newUpdatedBody = req.body;
    const updatedProd = await Products.findByIdAndUpdate(
      prodId,
      newUpdatedBody,
      {
        new: true,
      }
    );

    if (!updatedProd) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated!",
      data: updatedProd,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const deletedProd = await Products.findByIdAndDelete(prodId);

    if (!deletedProd) {
      res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted!",
      data: deletedProd,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProducts,
  updateProduct,
  deleteProduct,
};
