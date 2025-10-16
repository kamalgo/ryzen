// // // // backend/routes/student.js

// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { updateStudent, uploadCasteCertificate } = require("../controllers/studentController");

// // // // ----------------------------------------------------
// // // // 🔹 Multer memory storage (so file can go to S3)
// // // // ----------------------------------------------------
// // // const storage = multer.memoryStorage();
// // // const upload = multer({ storage });

// // // // ----------------------------------------------------
// // // // ✅ Routes
// // // // ----------------------------------------------------

// // // // Update student details (called from Gallabox bot)
// // // router.post("/update", updateStudent);
// // // // router.post("/upload-caste", uploadCasteCertificate);
// // // router.post("/upload-caste", upload.single("casteCertificate"), uploadCasteCertificate);


// // // module.exports = router;

// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const verifyToken = require("../middleware/authMiddleware");
// // const {
// //   updateStudent,
// //   uploadCasteCertificate,
// //   waDemo
// // } = require("../controllers/studentController");

// // // ----------------------------------------------------
// // // 🔹 Multer memory storage (for uploading to S3)
// // // ----------------------------------------------------
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage });

// // // ----------------------------------------------------
// // // ✅ Routes
// // // ----------------------------------------------------

// // // 1️⃣ Update student details (used by Gallabox chatbot or frontend)
// // router.post("/update", updateStudent);

// // // 2️⃣ Upload caste certificate
// // router.post("/upload-caste", upload.single("casteCertificate"), uploadCasteCertificate);

// // // 3️⃣ WhatsApp Demo Form (Gallabox form submission)
// // router.post("/wa-demo", waDemo);

// // module.exports = router;


// // backend/routes/student.js

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const verifyToken = require("../middleware/authMiddleware"); // JWT verification
// const {
//   updateStudent,
//   uploadCasteCertificate,
//   waDemo,
// } = require("../controllers/studentController");

// // ----------------------------------------------------
// // 🔹 Multer memory storage (for S3 uploads)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ----------------------------------------------------
// // ✅ Routes

// // 1️⃣ Update student details (called from Gallabox or frontend)
// // Optional: protect with JWT middleware if needed
// router.post("/update", verifyToken, updateStudent);

// // 2️⃣ Upload caste certificate
// // ✅ JWT protected, file comes as "casteCertificate" field
// router.post(
//   "/upload-caste",
//   verifyToken,
//   upload.single("casteCertificate"),
//   uploadCasteCertificate
// );

// // 3️⃣ WhatsApp demo form submission
// router.post("/wa-demo", verifyToken, waDemo);

// module.exports = router;



const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyJWT = require("../middleware/authMiddleware");
const {
  updateStudent,
  uploadCasteCertificate,
  waDemo,
} = require("../controllers/studentController");

// Multer memory storage for S3
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -------------------------
// ✅ Routes
// -------------------------


router.post("/update", verifyJWT, (req, res, next) => {
  console.log("🟢 /update route hit");
  next();
}, updateStudent);

router.post("/upload-caste", verifyJWT, upload.single("casteCertificate"), (req, res, next) => {
  console.log("🟢 /upload-caste route hit");
  console.log("📂 File received:", req.file?.originalname);
  next();
}, uploadCasteCertificate);

router.post("/wa-demo", verifyJWT, (req, res, next) => {
  console.log("🟢 /wa-demo route hit");
  next();
}, waDemo);

// // Update student details
// router.post("/update", verifyJWT, updateStudent);

// // Upload caste certificate
// router.post("/upload-caste", verifyJWT, upload.single("casteCertificate"), uploadCasteCertificate);

// // WA demo form submission
// router.post("/wa-demo", verifyJWT, waDemo);

module.exports = router;
