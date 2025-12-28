const express = require("express");
const {
  getAllUsers,
  registerUsers,
  loginUser,
} = require("../controllers/User-Controller");
const router = express.Router();

router.get("/users", getAllUsers);
router.post("/register", registerUsers);
router.post("/login", loginUser);
// router.delete("/delete/:id");

module.exports = router;
