const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = user.id;
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = authenticateUser;
