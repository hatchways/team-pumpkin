const jwt = require("jsonwebtoken");
//Environment variable
require("dotenv").config();

const authentication = (req, res, next) => {
  //Get token from header
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token. Access Denied." });
  }

  //Verify token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    //payload
    req.user = decodedToken.user;
  } catch (err) {
    return res.status(401).json({ msg: "Token is invalid" });
  }
};

module.exports = authentication;
