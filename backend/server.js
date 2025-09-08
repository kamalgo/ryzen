// server.js - entrypoint
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const sequelize = require("../backend/db"); // use Sequelize, not pool

const PORT = process.env.PORT || 4004;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();

// Use JSON body parser
app.use(express.json());

// CORS configuration - only allow your frontend origin
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// mount auth routes under /api
app.use("/api", authRoutes);

// test database connection before starting server
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
