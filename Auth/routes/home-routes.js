const express = require("express");
const homeMiddleWare = require("../middleware/home");
const router = express.Router();

router.get("/welcome", homeMiddleWare, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Book store!",
  });
});

module.exports = router;
