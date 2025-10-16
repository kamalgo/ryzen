
const db = require("../models");
const AWS = require("aws-sdk");
const { ShravaniAllColumns2 } = db;

// AWS S3 Setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.updateStudent = async (req, res) => {
  try {
    const { userName } = req.user; // ✅ get userName directly from JWT
    const fields = req.body;

    const allowed = ["candidateName", "parentMobileNumber", "maritalStatus", "dob", "gender", "email"];
    const updateData = {};

    for (let key of allowed) {
      if (fields[key] !== undefined) updateData[key] = fields[key];
    }

    if (Object.keys(updateData).length === 0)
      return res.status(400).json({ success: false, error: "No valid fields provided" });

    const [updated] = await ShravaniAllColumns2.update(updateData, {
      where: { userName }, // ✅ reference userName
    });

    return res.json({
      success: true,
      message: updated > 0 ? "Student data updated" : "No record found",
      updated: updateData,
    });
  } catch (err) {
    console.error("updateStudent error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

//fucntion to upload caste certificate
exports.uploadCasteCertificate = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileName = `caste_certificates/${Date.now()}_${req.file.originalname.replace(/\s+/g, "_")}`;
    const uploadResult = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: "public-read",
    }).promise();

    // ✅ Find student by userName from JWT
    const student = await ShravaniAllColumns2.findOne({
      where: { userName: req.user.userName },
    });

    if (!student) return res.status(404).json({ error: "Student not found" });

    student.caste_certificate_url = uploadResult.Location;
    await student.save();

    return res.json({
      success: true,
      message: "Caste certificate uploaded successfully",
      fileUrl: uploadResult.Location,
    });

  } catch (err) {
    console.error("uploadCasteCertificate error:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
};

// Function to upload income certificate
exports.uploadIncomeCertificate = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const fileName = `income_certificates/${Date.now()}_${req.file.originalname.replace(/\s+/g, "_")}`;
    
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "public-read",
      })
      .promise();

    // ✅ Find student by userName from JWT
    const student = await ShravaniAllColumns2.findOne({
      where: { userName: req.user.userName },
    });

    if (!student) return res.status(404).json({ error: "Student not found" });

    // ✅ Save uploaded file URL to DB
    student.income_certificate_url = uploadResult.Location;
    await student.save();

    // ✅ Return success + redirect link
    return res.json({
      success: true,
      message: "Income certificate uploaded successfully",
      fileUrl: uploadResult.Location,
      redirectWa: `https://wa.me/91${student.parentMobileNumber}?text=Your%20Income%20Certificate%20has%20been%20uploaded%20successfully%20✅`,
    });
  } catch (err) {
    console.error("uploadIncomeCertificate error:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
};


// Function to handle WhatsApp demo form submission
exports.waDemo = async (req, res) => {
  try {
    console.log("💬 [waDemo] Called with body:", req.body);
    console.log("👤 [waDemo] Authenticated user:", req.user);

    const { demoform } = req.body;
    if (!demoform || typeof demoform !== "object") {
      console.log("⚠️ [waDemo] Invalid demoform object");
      return res.status(400).json({ error: "demoform object is required" });
    }

    // ✅ Parse only the fields you want to update
    const dataToUpdate = {
      candidateName: demoform.screen_0_TextInput_0?.trim() || null,
      parentMobileNumber: demoform.screen_0_TextInput_1?.trim() || null,
      maritalStatus: demoform.screen_0_Dropdown_2?.split("_")[1]?.trim() || null,
    };

    console.log("🧾 [waDemo] Parsed data:", dataToUpdate);

    // ✅ Remove null fields
    Object.keys(dataToUpdate).forEach(
      key => dataToUpdate[key] == null && delete dataToUpdate[key]
    );

    // ✅ Update using userName from JWT
    const [updated] = await ShravaniAllColumns2.update(dataToUpdate, {
      where: { userName: req.user.userName },
    });

    console.log("✅ [waDemo] Update result:", updated);

    return res.json({
      success: true,
      message: updated > 0 ? "Student data updated" : "No record found",
      updatedFields: dataToUpdate,
    });

  } catch (err) {
    console.error("❌ [waDemo] Error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};
