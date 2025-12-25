const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book Title is required"],
    maxLength: [100, "Book title can not be greater than 100 chars"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Book Author is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Publication Year is required."],
    min: [1000, "Year must be atleast 1000"],
    max: [new Date().getFullYear(), "Year cannot be in the future date"],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", BookSchema);
