// db.js
// Creates and exports a mysql2/promise connection pool.
// It reads env vars and supports both the "recommended" variable names and
// the older names you shared (DEVELOPMENT_DB...).

// config/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

const DB_HOST = process.env.DB_HOST || process.env.DEVELOPMENT_DB;
const DB_USER = process.env.DB_USER || process.env.DEVELOPMENT_DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD || process.env.DEVELOPMENT_DB_PASSWORD;
const DB_NAME = process.env.DB_NAME || process.env.DEVELOPMENT_DB_NAME;
const DB_PORT = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
