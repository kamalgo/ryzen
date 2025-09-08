// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserMahadbt = require("../models/users_mahadbt");

// Login controller
exports.login = async (req, res) => {
  try {
        console.log("Request body:", req.body);  // 👈 check this

    const { username, password } = req.body;
           console.log("Parsed values:", username, password); // 👈 check this

    // Check if user exists
    const user = await UserMahadbt.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare passwords
    // const isMatch = await bcrypt.compare(password, user.password_hash);
    // Instead of bcrypt.compare
const isMatch =
  user.password_hash === password ||
  (await bcrypt.compare(password, user.password_hash));
    
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
