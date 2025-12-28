const express = require("express");
const {
  registerUser,
  getAllUsers,
  loginUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/users", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
