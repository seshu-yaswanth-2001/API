const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product Name is required!"],
    trim: true,
    maxLength: [100, "Product Name can not be greater than 100"],
  },
  category: {
    type: String,
    required: [true, "Product Category is required!"],
    trim: true,
    maxLength: [100, "Product Category can not be greater than 100"],
  },
  review: {
    type: String,
    required: [true, "Review is required!"],
    trim: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", ProductsSchema);
