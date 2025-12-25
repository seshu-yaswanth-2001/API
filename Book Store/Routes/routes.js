const express = require("express");

const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../Controllers/bookController");

const router = express.Router();

// Books Routes
router.get("/get", getAllBooks);
router.get("/get/:id", getBookById);
router.post("/add", addNewBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
