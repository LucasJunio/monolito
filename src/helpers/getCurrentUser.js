const jwt = require("jsonwebtoken");

const getCurrentUser = (authHeader) => {
  const parts = authHeader.split(" ");
  const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
  return decoded;
};

module.exports = getCurrentUser;
