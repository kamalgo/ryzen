// scripts/test-db.js - quick connectivity test
const pool = require("../db");

(async () => {
  try {
    const [rows] = await pool.execute("SELECT 1 + 1 AS result");
    console.log("DB test success:", rows);
    process.exit(0);
  } catch (err) {
    console.error("DB test failed:", err);
    process.exit(1);
  }
})();
