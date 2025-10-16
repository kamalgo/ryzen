// // // // middleware/authMiddleware.js
// // // // Verifies JWT token sent in Authorization header as "Bearer <token>"

// // // require("dotenv").config();
// // // const jwt = require("jsonwebtoken");

// // // const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN || process.env.HASH_SECRET_KEY || "replace-me-in-prod";

// // // module.exports = function (req, res, next) {
// // //   try {
// // //     // Authorization: Bearer <token>
// // //     const authHeader = req.headers["authorization"];
// // //     if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

// // //     const parts = authHeader.split(" ");
// // //     if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Invalid Authorization format" });

// // //     const token = parts[1];
// // //     const decoded = jwt.verify(token, JWT_SECRET);
// // //     // attach decoded token to request
// // //     req.user = decoded;
// // //     next();
// // //   } catch (err) {
// // //     console.error("authMiddleware error:", err);
// // //     return res.status(401).json({ error: "Invalid or expired token" });
// // //   }
// // // };


// // // middleware/authMiddleware.js
// // const jwt = require("jsonwebtoken");
// // require("dotenv").config();

// // const verifyToken = (req, res, next) => {
// //   const authHeader = req.headers.authorization;

// //   if (!authHeader) {
// //     return res.status(401).json({ error: "Missing token" });
// //   }

// //   // Token format: "Bearer <token>"
// //   const token = authHeader.split(" ")[1];

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     // Attach username to request for future use
// //     req.username = decoded.username;

// //     next(); // Continue to controller
// //   } catch (err) {
// //     console.error("JWT verification failed:", err.message);
// //     return res.status(401).json({ error: "Invalid or expired session" });
// //   }
// // };

// // module.exports = verifyToken;


// // backend/middleware/authMiddleware.js

// /**
//  * Middleware to verify JWT from Authorization header
//  * Adds decoded payload to req.user
//  */
// const jwt = require("jsonwebtoken");

// function verifyJWT(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader)
//     return res.status(401).json({ error: "No token provided" });

//   const token = authHeader.split(" ")[1]; // Bearer <token>
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // store payload for controllers
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// }

// module.exports = verifyJWT;


const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ userName now directly available
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = verifyJWT;

