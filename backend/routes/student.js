// backend/routes/student.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const studentController = require("../controllers/studentController");

// ----------------------------------------------------
// 🔹 Multer memory storage (so file can go to S3)
// ----------------------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ----------------------------------------------------
// ✅ Routes
// ----------------------------------------------------

// Update student details (called from Gallabox bot)
router.post("/update", studentController.updateStudent);

// Upload caste certificate (called from PWA)
router.post(
  "/upload-caste",
  upload.single("file"), // expecting "file" key in form-data
  studentController.uploadCasteCertificate
);

module.exports = router;
