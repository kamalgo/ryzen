// // // controllers/authController.js
// // const bcrypt = require("bcryptjs");
// // const crypto = require("crypto");
// // const db = require("../models");
// // const { UserMahadbt, Session, ShravaniAllColumns2 } = db;


// // exports.login = async (req, res) => {
// //   try {
// //     const { username, password } = req.body;

// //     // 1. Validate input
// //     if (!username || !password) {
// //       return res.status(400).json({ error: "username and password required" });
// //     }

// //     // 2. Find user in govt-mimic table
// //     const user = await UserMahadbt.findOne({ where: { username } });
// //     if (!user) {
// //       return res.status(401).json({ error: "Invalid username or password" });
// //     }

// //     // 3. Verify password
// //     const passwordValid =
// //       user.password_hash === password ||
// //       (await bcrypt.compare(password, user.password_hash));

// //     if (!passwordValid) {
// //       return res.status(401).json({ error: "Invalid username or password" });
// //     }

// //     // 4. Ensure record exists in shravani_allcolumns2
// //     let student = await ShravaniAllColumns2.findOne({
// //       where: { candidateName: username },
// //     });

// //     if (!student) {
// //       student = await ShravaniAllColumns2.create({ candidateName: username });
// //     }

// //     // 5. Create session with expiry (6 hrs)
// //     const sessionId = crypto.randomBytes(16).toString("hex");
// //     const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000);

// //     await Session.create({
// //       session_id: sessionId,
// //       user_id: user.user_id || null,
// //       username,
// //       state: "awaiting_gender",
// //       expires_at: expiresAt,
// //     });

// //     // 6. Generate WA link
// //     const waLink = `https://wame.pro/MahaDBT?session=${sessionId}`;

// //     return res.json({
// //       success: true,
// //       message: "Login successful",
// //       session_id: sessionId,
// //       redirectWa: waLink,
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     return res.status(500).json({ error: "Internal server error" });
// //   }
// // };



// // controllers/authController.js
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
// const { randomUUID } = require("crypto");
// const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");
// const { parsePhoneNumberFromString } = require("libphonenumber-js");
// const db = require("../models");
// const { UserMahadbt, Session, ShravaniAllColumns2 } = db;

// const GAL_API_BASE = "https://server.gallabox.com/devapi";
// const GAL_API_KEY = process.env.GAL_API_KEY;
// const GAL_API_SECRET = process.env.GAL_API_SECRET;
// const BOT_MAGIC_LINK = "https://wame.pro/MahaDBT";

// // helper to format/validate phone
// function formatPhoneE164(rawPhone, defaultCountry = "IN") {
//   const pn = parsePhoneNumberFromString(rawPhone, defaultCountry);
//   if (!pn || !pn.isValid()) return null;
//   return pn.number; // E.164, e.g. +919876543210
// }

// exports.login = async (req, res) => {
//   try {
//     const { username, password, phoneNumber } = req.body;

//     // Basic input validation
//     if (!username || !password || !phoneNumber) {
//       return res.status(400).json({ error: "username, password, and phone are required" });
//     }

//     // Validate/format phone
//     const e164Phone = formatPhoneE164(phoneNumber);
//     if (!e164Phone) {
//       return res.status(400).json({ error: "Invalid phoneNumber format (use country code or local + format)" });
//     }

//     // Find user
//     const user = await UserMahadbt.findOne({ where: { username } });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     // Password verification
//     let passwordValid = false;
//     if (user.password_hash === password) {
//       // Legacy plain text case
//       passwordValid = true;
//       const newHash = await bcrypt.hash(password, 10);
//       await user.update({ password_hash: newHash });
//     } else {
//       passwordValid = await bcrypt.compare(password, user.password_hash);
//     }

//     if (!passwordValid) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     // Ensure student row exists
//     let [student] = await ShravaniAllColumns2.findOrCreate({
//       where: { candidateName: username },
//       defaults: { candidateName: username },
//     });

//     // Create session
//     const sessionId = crypto.randomBytes(24).toString("hex");
//     const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6 hours

//     await Session.create({
//       session_id: sessionId,
//       user_id: user.user_id || null,
//       username,
//       state: "awaiting_gender",
//       expires_at: expiresAt,
//     });

//     // ✅ Send session_id to Gallabox (correct payload)
//     try {
//       const payload = {
//         name: username,
//         phone: [e164Phone],   // Gallabox expects array
//         email: [],
//         tags: [{ name: "MahaDBT" }],
//         fieldValues: {
//           session_id: sessionId,   // Custom field in Gallabox
//         },
//       };

//       console.log("Updating Gallabox contact with", payload);


//       await axios.post(`${GAL_API_BASE}/contacts/upsert`, payload, {
//         headers: {
//           apiKey: "68c26aa4b92621a96cb68642", //remove this line in production
//           apiSecret: "dd3214a20aa34c678c5470091248e540", //remove this line in production
//           // "X-Request-Id": uuidv4(),
//           "Content-Type": "application/json",
//         },
//         timeout: 5000,
//       });

//     } catch (err) {
//       console.error("Gallabox contact update failed:", err?.response?.data || err?.message || err);
//     }

//     // Set cookie
//     res.cookie("session_id", sessionId, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 6 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       message: "Login successful",
//       redirectWa: BOT_MAGIC_LINK,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { UserMahadbt, ShravaniAllColumns2 } = require("../models");
// const axios = require("axios");

// exports.login = async (req, res) => {
//   try {
//     const { username, password, phoneNumber } = req.body;

//     // 1️⃣ Find user
//     const user = await UserMahadbt.findOne({ where: { username } });
//     if (!user) return res.status(401).json({ error: "Invalid username or password" });

//     // 2️⃣ Verify password
//     const valid = await bcrypt.compare(password, user.password_hash);
//     if (!valid) return res.status(401).json({ error: "Invalid username or password" });

//     // 3️⃣ Ensure student exists
//     await ShravaniAllColumns2.findOrCreate({
//       where: { candidateName: username },
//       defaults: { candidateName: username },
//     });

//     // 4️⃣ Create JWT
//     const token = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // 5️⃣ Send JWT to Gallabox as session_id
//     const payload = {
//       name: username,
//       phone: [phoneNumber],
//       fieldValues: { session_id: token }, // store token in Gallabox
//     };
// console.log("Gallabox payload:", payload);
//     await axios.post("https://server.gallabox.com/devapi/contacts/upsert", payload, {
//       headers: {
//           apiKey: "68c26aa4b92621a96cb68642", //remove this line in production
//           apiSecret: "dd3214a20aa34c678c5470091248e540", //remove this line in production
//         "Content-Type": "application/json",
//       },
//     });

//     // 6️⃣ Send JWT to frontend too
//     res.json({
//       success: true,
//       message: "Login successful",
//       token,  // frontend will use it for upload API
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// controllers/authController.js
const bcrypt = require("bcryptjs");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const db = require("../models");
const { UserMahadbt, ShravaniAllColumns2 } = db;

// 🧩 Config
const GAL_API_BASE = "https://server.gallabox.com/devapi";
const GAL_API_KEY = process.env.GALLABOX_API_KEY;
const GAL_API_SECRET = process.env.GALLABOX_API_SECRET;
const BOT_MAGIC_LINK = "https://wame.pro/MahaDBT"; // Your bot WA link

// ✅ Helper to format/validate phone number
function formatPhoneE164(rawPhone, defaultCountry = "IN") {
  const pn = parsePhoneNumberFromString(rawPhone, defaultCountry);
  if (!pn || !pn.isValid()) return null;
  return pn.number; // e.g. +917887674130
}

exports.login = async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;

    if (!username || !password || !phoneNumber) {
      return res.status(400).json({ error: "username, password, and phone are required" });
    }

    // ✅ Validate and format phone number
    const e164Phone = formatPhoneE164(phoneNumber);
    if (!e164Phone) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // ✅ Find user
    const user = await UserMahadbt.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // ✅ Check password (bcrypt)
    let passwordValid = false;
    if (user.password_hash === password) {
      passwordValid = true;
      const newHash = await bcrypt.hash(password, 10);
      await user.update({ password_hash: newHash });
    } else {
      passwordValid = await bcrypt.compare(password, user.password_hash);
    }

    if (!passwordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // ✅ Ensure student record exists
    await ShravaniAllColumns2.findOrCreate({
      where: { userName: username },
      defaults: { userName: username },
    });

    // ✅ Create JWT instead of session
    const token = jwt.sign(
      { userName: username },
      process.env.JWT_SECRET,
      { expiresIn: "6h" } // valid for 6 hours
    );

    // ✅ Send JWT as session_id to Gallabox
    try {
      const payload = {
        name: username,
        phone: [e164Phone],
        tags: [{ name: "MahaDBT" }],
        fieldValues: {
          session_id: token, // Gallabox field for tracking session
        },
      };

      console.log("Updating Gallabox contact:", payload);

      await axios.post(`${GAL_API_BASE}/contacts/upsert`, payload, {
        headers: {
          apiKey: GAL_API_KEY,
          apiSecret: GAL_API_SECRET,
          "Content-Type": "application/json",
        },
        timeout: 5000,
      });
    } catch (err) {
      console.error("Gallabox contact update failed:", err?.response?.data || err?.message);
    }

    // ✅ Return redirect link to frontend
    return res.json({
      success: true,
      message: "Login successful",
      redirectWa: `${BOT_MAGIC_LINK}?text=Hi%20${encodeURIComponent(username)}%2C%20you%20can%20continue%20your%20session%20here.`,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
