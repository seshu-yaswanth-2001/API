const jwt = require("jsonwebtoken");

const homeMiddleWare = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token Provided. Please try again!",
    });
  }

  //decode this token
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedTokenInfo);

    req.userInfo = decodedTokenInfo;
    next();
  } catch (err) {
    console.log(err);
    if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpirationError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token. Please try again later!",
      });
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong! Server side issue!",
    });
  }
};

module.exports = homeMiddleWare;
