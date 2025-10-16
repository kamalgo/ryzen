// // server.js - entrypoint
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./routes/auth");
// const sequelize = require("../backend/db"); // use Sequelize, not pool
// const studentRoutes = require("../backend/routes/student");

// const PORT = process.env.PORT || 4004;
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// const app = express();

// // Use JSON body parser
// app.use(express.json());

// // CORS configuration - only allow your frontend origin
// app.use(cors({
//     origin: "*", // 🚨 only for development

//   // origin: FRONTEND_URL,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));

// // Health check
// app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// // mount auth routes under /api
// app.use("/api", authRoutes);
// app.use("/api/student", studentRoutes);

// // test database connection before starting server
// sequelize.authenticate()
//   .then(() => {
//     console.log("✅ Database connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error("❌ Database connection failed:", err);
//   });
// server.js - entrypoint
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const sequelize = require("../backend/db"); // Sequelize instance
const studentRoutes = require("../backend/routes/student");
const webhookRoutes = require("../backend/routes/webhookRoutes");

const PORT = process.env.PORT || 4004;
const FRONTEND_URL = "https://2fa8ad56fddc.ngrok-free.app" || "http://localhost:5173";

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS configuration
const allowedOrigins = [
  "http://localhost:5173",             // local frontend
  FRONTEND_URL,            // from .env (e.g. ngrok / deployed frontend)
].filter(Boolean); // remove undefined

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // if you use cookies / auth headers
}));

// ✅ Explicitly handle OPTIONS requests (preflight)

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api", authRoutes);
app.use("/api/student", studentRoutes);
app.use('/api/webhook', webhookRoutes);

// DB + Server
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err);
  });
