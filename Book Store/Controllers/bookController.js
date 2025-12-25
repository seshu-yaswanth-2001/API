const Book = require("../Models/book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});

    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of books fetched successfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Books found in collection!",
      });
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({
      status: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const selectedBook = await Book.findById(bookId);

    if (!selectedBook) {
      return res.status(404).json({
        success: false,
        message: `Book with ${selectedBook} is not found!`,
      });
    }

    res.status(200).json({
      success: true,
      body: selectedBook,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({
      message: "Something went wrong! Please try again.",
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);

    if (newBookFormData) {
      res.status(201).json({
        success: true,
        message: "New book added!",
        data: newlyCreatedBook,
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

const updateBook = async (req, res) => {
  try {
    const bookData = req.body;
    const bookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated Successfully",
      body: updatedBook,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({
      message: "Something went wrong! Please try again later",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted Success!",
      body: deletedBook,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({
      message: "Something went wrong! Please try again later.",
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
