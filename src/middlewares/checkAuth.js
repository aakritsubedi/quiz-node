const jwt = require("jsonwebtoken");
const { AUTH_FAILED } = require("../constants/errors");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "jwttoken");
    req.userData = decoded;
    next();
  } catch (err) {
    return next(AUTH_FAILED);
  }
};
