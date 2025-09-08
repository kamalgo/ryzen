// middleware/authMiddleware.js
// Verifies JWT token sent in Authorization header as "Bearer <token>"

require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN || process.env.HASH_SECRET_KEY || "replace-me-in-prod";

module.exports = function (req, res, next) {
  try {
    // Authorization: Bearer <token>
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Invalid Authorization format" });

    const token = parts[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    // attach decoded token to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
