const adminMiddleWare = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Not Authorized",
    });
  }
  next();
};

module.exports = adminMiddleWare;
