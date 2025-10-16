// // backend/controllers/studentController.js
// //routes of this is in student.js

// const db = require("../models");
// const jwt = require("jsonwebtoken");
// const AWS = require("aws-sdk");
// const { ShravaniAllColumns2, Session } = db;
// // Now you can use ShravaniAllColumns2 and Session directly
// // ----------------------------------------------------
// // 🔹 AWS S3 Setup
// // ----------------------------------------------------
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// }); 

// // ----------------------------------------------------
// // 🔹 Helper: Verify JWT and return studentId
// // ----------------------------------------------------
// function verifyTokenAndGetStudentId(req) {
//   const token =
//     req.headers["authorization"]?.split(" ")[1] || req.body.token;

//   if (!token) throw new Error("No token provided");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded JWT:", decoded); // 👀 for debugging
//     return decoded.userId;  // ✅ your JWT has "userId", not "id"
//   } catch (err) {
//     throw new Error("Invalid or expired token");
//   }
// }


// // ----------------------------------------------------
// // ✅ API 1: Update Student Data (Gallabox will call this)
// // Flexible but safe → only whitelisted fields can be updated
// // ----------------------------------------------------
// // exports.updateStudent = async (req, res) => {
// //   try {
// //     const studentId = verifyTokenAndGetStudentId(req);

// //     // ✅ Whitelisted fields
// //     const allowed = [
// //       "candidateName",
// //       "parentMobileNumber",
// //       "maritalStatus",
// //       "dob",
// //       "gender",
// //       "email",
// //     ];

// //     const updateData = {};
// //     for (let key of allowed) {
// //       if (req.body[key] !== undefined) {
// //         updateData[key] = req.body[key];
// //       }
// //     }

// //     if (Object.keys(updateData).length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         error: "No valid fields provided",
// //       });
// //     }

// //     await ShravaniAllColumns2.update(updateData, {
// //       where: { id: studentId },
// //     });

// //     return res.json({
// //       success: true,
// //       message: "Student data updated",
// //       updated: updateData,
// //     });
// //   } catch (err) {
// //     console.error("Update error:", err.message);
// //     return res.status(400).json({ success: false, error: err.message });
// //   }
// // };
// // ✅ controllers/studentController.js

// // ✅ controllers/studentController.js
// // ✅ API: Update Student Data (via session_id)
// // ----------------------------------------------------
// exports.updateStudent = async (req, res) => {
//   try {
//     const { session_id, ...fields } = req.body;

//     // Step 1: Validate input
//     if (!session_id) {
//       return res.status(400).json({ success: false, error: "session_id is required" });
//     }

//     // Step 2: Find the session
//     const session = await Session.findOne({ where: { session_id } });
//     if (!session) {
//       return res.status(404).json({ success: false, error: "Session not found" });
//     }

//     // Step 3: Define allowed fields (whitelist)
//     const allowed = [
//       "candidateName",
//       "parentMobileNumber",
//       "maritalStatus",
//       "dob",
//       "gender",
//       "email"
//     ];

//     const updateData = {};
//     for (let key of allowed) {
//       if (fields[key] !== undefined) updateData[key] = fields[key];
//     }

//     // Step 4: Ensure at least one valid field
//     if (Object.keys(updateData).length === 0) {
//       return res.status(400).json({
//         success: false,
//         error: "No valid fields provided to update"
//       });
//     }

//     // Step 5: Update the student record (match candidateName with session.username)
//     const [updated] = await ShravaniAllColumns2.update(updateData, {
//       where: { candidateName: session.username }
//     });

//     if (updated === 0) {
//       console.warn(`⚠️ No student row found for username: ${session.username}`);
//     }

//     // Step 6: Optionally track progress
//     await session.update({ state: "student_updated" });

//     // Step 7: Respond success
//     return res.json({
//       success: true,
//       message: "Student data updated successfully",
//       updated: updateData
//     });
//   } catch (err) {
//     console.error("updateStudent error:", err);
//     return res.status(500).json({ success: false, error: "Internal server error" });
//   }
// };


// // ✅ API 2: Upload Caste Certificate to AWS S3
// // ----------------------------------------------------
// // exports.uploadCasteCertificate = async (req, res) => {
// //   try {
// //     const studentId = verifyTokenAndGetStudentId(req);

// //     if (!req.file) {
// //       return res.status(400).json({ success: false, error: "No file uploaded" });
// //     }

// //     // 🔹 Upload file buffer to S3
// //     const fileContent = req.file.buffer;
// //     const fileName = `caste_certificates/${Date.now()}_${req.file.originalname.replace(/\s+/g, "_")}`;

// //     const params = {
// //       Bucket: process.env.AWS_S3_BUCKET,
// //       Key: fileName,
// //       Body: fileContent,
// //       ContentType: req.file.mimetype,
// //       ACL: "public-read", // file accessible via URL
// //     };

// //     const uploadResult = await s3.upload(params).promise();

// //     // 🔹 Save file URL in DB
// //     // await shravani_allcolumns2.update(
// //     //   { casteDoc: uploadResult.Location },
// //     //   { where: { id: studentId } }
// //     // );
// //     await db.ShravaniAllColumns2.update(
// //   { caste_certificate_url: casteCertUrl },
// //   { where: { candidateName } } // <--- using name instead of ID
// // );

// //     return res.json({
// //       success: true,
// //       message: "Caste certificate uploaded successfully",
// //       fileUrl: uploadResult.Location,
// //       redirect: `https://wa.me/<YOUR_NUMBER>?text=Caste%20Certificate%20Uploaded%20✅`,
// //     });
// //   } catch (err) {
// //     console.error("Upload error:", err.message);
// //     return res.status(400).json({ success: false, error: err.message });
// //   }
// // };

// // exports.uploadCasteCertificate = async (req, res) => {
// //   try {
// //     // 1. Get session token from Authorization header
// //     const authHeader = req.headers.authorization;
// //     if (!authHeader) return res.status(401).json({ error: "No token provided" });

// //     const sessionId = authHeader.split(" ")[1];

// //     // 2. Find session in DB
// //     const session = await Session.findOne({ where: { session_id: sessionId } });
// //     if (!session) return res.status(401).json({ error: "Invalid or expired session" });

// //     // 3. Lookup student using session.username
// //     const student = await ShravaniAllColumns2.findOne({
// //       where: { candidateName: session.username },
// //     });
// //     if (!student) return res.status(404).json({ error: "Student not found" });

// //     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

// //     // 4. Upload file to S3
// //     const fileContent = req.file.buffer;
// //     const fileName = `caste_certificates/${Date.now()}_${req.file.originalname.replace(/\s+/g, "_")}`;
// //     const uploadResult = await s3.upload({
// //       Bucket: process.env.AWS_S3_BUCKET,
// //       Key: fileName,
// //       Body: fileContent,
// //       ContentType: req.file.mimetype,
// //       ACL: "public-read",
// //     }).promise();

// //     // 5. Save S3 URL to DB
// //     student.caste_certificate_url = uploadResult.Location;
// //     await student.save();

// //     return res.json({
// //       success: true,
// //       message: "Caste certificate uploaded successfully",
// //       fileUrl: uploadResult.Location,
// //       candidateName: student.candidateName,
// //       redirect: `https://wa.me/<YOUR_NUMBER>?text=Caste%20Certificate%20Uploaded%20✅`,
// //     });
// //   } catch (err) {
// //     console.error("Upload error:", err);
// //     return res.status(500).json({ error: "Upload failed" });
// //   }
// // };

// // API: Upload Caste Certificate
// exports.uploadCasteCertificate = async (req, res) => {
//   try {
//     console.log("Headers:", req.headers);
//     console.log("File received:", req.file);

//     // 1. Token
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ error: "No token provided" });

//     const sessionId = authHeader.split(" ")[1];

//     // 2. Find session
//     const session = await Session.findOne({ where: { session_id: sessionId } });
//     if (!session) return res.status(401).json({ error: "Invalid or expired session" });

//     // 3. Find student
//     const student = await ShravaniAllColumns2.findOne({
//       where: { candidateName: session.username },
//     });
//     if (!student) return res.status(404).json({ error: "Student not found" });

//     // 4. File check
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     // 5. Upload to S3
//     const fileContent = req.file.buffer;
//     const fileName = `caste_certificates/${Date.now()}_${req.file.originalname.replace(/\s+/g, "_")}`;
//     const uploadResult = await s3.upload({
//       Bucket: process.env.AWS_S3_BUCKET,
//       Key: fileName,
//       Body: fileContent,
//       ContentType: req.file.mimetype,
//       ACL: "public-read",
//     }).promise();

//     // 6. Save URL
//     student.caste_certificate_url = uploadResult.Location;
//     await student.save();

//     return res.json({
//       success: true,
//       message: "Caste certificate uploaded successfully",
//       fileUrl: uploadResult.Location,
//       candidateName: student.candidateName,
//       redirect: `https://wa.me/<YOUR_NUMBER>?text=Caste%20Certificate%20Uploaded%20✅`,
//     });
//   } catch (err) {
//     console.error("Upload error:", err);
//     return res.status(500).json({ error: "Upload failed" });
//   }
// };

// // ✅ WA Form Demo 1
// // Updates student profile using Gallabox WA form + session_id (JWT linked)
// exports.waDemo = async (req, res) => {
//   try {
//     const { session_id, demoform } = req.body;

//     // 🛑 Step 1: Validate inputs
//     if (!session_id) {
//       return res.status(400).json({
//         success: false,
//         error: "session_id is required",
//       });
//     }

//     if (!demoform || typeof demoform !== "object") {
//       return res.status(400).json({
//         success: false,
//         error: "demoform object is required",
//       });
//     }

//     // 🧠 Step 2: Find the session (to link form → correct student)
//     const session = await Session.findOne({ where: { session_id } });

//     if (!session) {
//       return res.status(404).json({
//         success: false,
//         error: "Session not found. Please start a new chat flow.",
//       });
//     }

//     // 🧩 Step 3: Map Gallabox form fields → Database columns
//     const dataToUpdate = {
//       candidateName: demoform.screen_0_TextInput_0?.trim() || null,
//       parentMobileNumber: demoform.screen_0_TextInput_1?.trim() || null,
//       maritalStatus: demoform.screen_0_Dropdown_2?.split("_")[1]?.trim() || null,
//     };

//     // 🧹 Step 4: Remove empty/null values (avoid overwriting valid data)
//     Object.keys(dataToUpdate).forEach(
//       (key) => dataToUpdate[key] == null && delete dataToUpdate[key]
//     );

//     // 🛠 Step 5: Update student table (using session.username)
//     const [updated] = await ShravaniAllColumns2.update(dataToUpdate, {
//       where: { candidateName: session.username },
//     });

//     // 🧾 Step 6: Update session state (optional)
//     await session.update({ state: "demo_form_updated" });

//     // 🧾 Step 7: Send response
//     return res.status(200).json({
//       success: true,
//       message:
//         updated > 0
//           ? "Student data updated successfully"
//           : "No record found for this user",
//       updatedFields: dataToUpdate,
//     });
//   } catch (error) {
//     console.error("🚨 waDemo error:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Internal server error",
//       details: error.message,
//     });
//   }
// };



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const db = require("../models");
const AWS = require("aws-sdk");
const { ShravaniAllColumns2 } = db;

// AWS S3 Setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Update student details
 * Uses JWT to identify user (req.user.userId)
 */
// exports.updateStudent = async (req, res) => {
//   try {
//     const { user } = req; // from JWT middleware
//     const fields = req.body;

//     // ✅ Whitelisted fields
//     const allowed = [
//       "candidateName",
//       "parentMobileNumber",
//       "maritalStatus",
//       "dob",
//       "gender",
//       "email",
//     ];

//     const updateData = {};
//     for (let key of allowed) {
//       if (fields[key] !== undefined) updateData[key] = fields[key];
//     }

//     if (Object.keys(updateData).length === 0)
//       return res.status(400).json({ success: false, error: "No valid fields provided" });

//     const [updated] = await ShravaniAllColumns2.update(updateData, {
//       where: { id: user.userId },
//     });

//     return res.json({
//       success: true,
//       message: updated > 0 ? "Student data updated" : "No record found",
//       updated: updateData,
//     });
//   } catch (err) {
//     console.error("updateStudent error:", err);
//     return res.status(500).json({ success: false, error: "Internal server error" });
//   }
// };

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


/**
 * Upload caste certificate to S3
 * Uses JWT to identify user
 */
// exports.uploadCasteCertificate = async (req, res) => {
//   try {
//     const { user } = req;

//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     const fileContent = req.file.buffer;
//     const fileName = `caste_certificates/${Date.now()}_${req.file.originalname.replace(/\s+/g, "_")}`;

//     const uploadResult = await s3.upload({
//       Bucket: process.env.AWS_S3_BUCKET,
//       Key: fileName,
//       Body: fileContent,
//       ContentType: req.file.mimetype,
//       ACL: "public-read",
//     }).promise();

//     // Save URL in DB
//     const student = await ShravaniAllColumns2.findByPk(user.userId);
//     if (!student) return res.status(404).json({ error: "Student not found" });

//     student.caste_certificate_url = uploadResult.Location;
//     await student.save();

//     return res.json({
//       success: true,
//       message: "Caste certificate uploaded successfully",
//       fileUrl: uploadResult.Location,
//     });
//   } catch (err) {
//     console.error("uploadCasteCertificate error:", err);
//     return res.status(500).json({ error: "Upload failed" });
//   }
// };

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




/**
 * WA demo form submission
 * Maps Gallabox form fields → student table columns
 */
// exports.waDemo = async (req, res) => {
//   try {
//     const { user } = req;
//     const { demoform } = req.body;

//     if (!demoform || typeof demoform !== "object")
//       return res.status(400).json({ error: "demoform object is required" });

//     const dataToUpdate = {
//       candidateName: demoform.screen_0_TextInput_0?.trim() || null,
//       parentMobileNumber: demoform.screen_0_TextInput_1?.trim() || null,
//       maritalStatus: demoform.screen_0_Dropdown_2?.split("_")[1]?.trim() || null,
//     };

//     Object.keys(dataToUpdate).forEach(key => dataToUpdate[key] == null && delete dataToUpdate[key]);

//     const [updated] = await ShravaniAllColumns2.update(dataToUpdate, {
//       where: { id: user.userId },
//     });

//     return res.json({
//       success: true,
//       message: updated > 0 ? "Student data updated" : "No record found",
//       updatedFields: dataToUpdate,
//     });
//   } catch (err) {
//     console.error("waDemo error:", err);
//     return res.status(500).json({ success: false, error: "Internal server error" });
//   }
// };


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
