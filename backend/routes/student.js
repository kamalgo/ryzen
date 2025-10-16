const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyJWT = require("../middleware/authMiddleware");
const {
  updateStudent,
  uploadCasteCertificate,uploadIncomeCertificate,
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

router.post(
  "/upload-income",
  verifyJWT,
  upload.single("incomeCertificate"), // 🔹 field name
  (req, res, next) => {
    console.log("🟢 /upload-income route hit");
    console.log("📂 File received:", req.file?.originalname);
    next();
  },
  uploadIncomeCertificate
);


router.post("/wa-demo", verifyJWT, (req, res, next) => {
  console.log("🟢 /wa-demo route hit");
  next();
}, waDemo);

module.exports = router;
