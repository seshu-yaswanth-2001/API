const express = require("express");
const homeMiddleWare = require("../middleware/home");
const adminMiddleWare = require("../middleware/admin");
const router = express.Router();

router.get("/welcomeAdmin", homeMiddleWare, adminMiddleWare, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the admin page",
  });
});

module.exports = router;
