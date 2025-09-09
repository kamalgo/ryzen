// backend/controllers/studentController.js

const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const shravani_allcolumns = require("../models/shravani_allcolumns");

// ----------------------------------------------------
// 🔹 AWS S3 Setup
// ----------------------------------------------------
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// ----------------------------------------------------
// 🔹 Helper: Verify JWT and return studentId
// ----------------------------------------------------
function verifyTokenAndGetStudentId(req) {
  // token may come from header or request body
  const token =
    req.headers["authorization"]?.split(" ")[1] || req.body.token;

  if (!token) throw new Error("No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // make sure your login JWT encodes student.id as "id"
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}

// ----------------------------------------------------
// ✅ API 1: Update Student Data (Gallabox will call this)
// Flexible but safe → only whitelisted fields can be updated
// ----------------------------------------------------
exports.updateStudent = async (req, res) => {
  try {
    const studentId = verifyTokenAndGetStudentId(req);

    // ✅ Whitelisted fields
    const allowed = [
      "candidateName",
      "parentMobileNumber",
      "maritalStatus",
      "dob",
      "gender",
      "email",
    ];

    const updateData = {};
    for (let key of allowed) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid fields provided",
      });
    }

    await shravani_allcolumns.update(updateData, {
      where: { id: studentId },
    });

    return res.json({
      success: true,
      message: "Student data updated",
      updated: updateData,
    });
  } catch (err) {
    console.error("Update error:", err.message);
    return res.status(400).json({ success: false, error: err.message });
  }
};

// ----------------------------------------------------
// ✅ API 2: Upload Caste Certificate to AWS S3
// ----------------------------------------------------
exports.uploadCasteCertificate = async (req, res) => {
  try {
    const studentId = verifyTokenAndGetStudentId(req);

    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    // 🔹 Upload file buffer to S3
    const fileContent = req.file.buffer;
    const fileName = `caste_certificates/${Date.now()}_${req.file.originalname.replace(/\s+/g, "_")}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileContent,
      ContentType: req.file.mimetype,
      ACL: "public-read", // file accessible via URL
    };

    const uploadResult = await s3.upload(params).promise();

    // 🔹 Save file URL in DB
    await shravani_allcolumns.update(
      { casteDoc: uploadResult.Location },
      { where: { id: studentId } }
    );

    return res.json({
      success: true,
      message: "Caste certificate uploaded successfully",
      fileUrl: uploadResult.Location,
      redirect: `https://wa.me/<YOUR_NUMBER>?text=Caste%20Certificate%20Uploaded%20✅`,
    });
  } catch (err) {
    console.error("Upload error:", err.message);
    return res.status(400).json({ success: false, error: err.message });
  }
};
