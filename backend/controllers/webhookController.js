// controllers/webhookController.js

/**
 * Controller: saveGender
 * ----------------------------------------
 * Purpose:
 *   This controller handles saving a student's gender into the database,
 *   while also ensuring the update is tied to a valid user session.
 *
 * Workflow:
 *   1. Validate input (session_id & gender must be provided).
 *   2. Look up the session in the `sessions` table.
 *   3. Update the student's gender in `shravani_allcolumns2` table
 *      based on the session's username.
 *   4. Update the session state to track progress ("gender_saved").
 *   5. Send a success response to the client.
 *
 * Why it matters:
 *   - Ensures only valid sessions can update student records.
 *   - Keeps track of the user's progress through form-filling or chatbot flow.
 *   - Links session data with student database records for consistency.
 */

const db = require("../models");
const { UserMahadbt, Session, ShravaniAllColumns2 } = db;

exports.saveGender = async (req, res) => {
  try {
    // Extract session_id and gender from request body
    const { session_id, gender } = req.body;

    // Step 1: Validate inputs
    if (!session_id || !gender) {
      return res
        .status(400)
        .json({ error: "session_id and gender are required" });
    }

    // Step 2: Find the session in DB
    const session = await Session.findOne({ where: { session_id } });
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Step 3: Update the student's gender in `shravani_allcolumns2`
    // Matching based on session.username → candidateName column
    const [updated] = await ShravaniAllColumns2.update(
      { gender }, // new value
      { where: { candidateName: session.username } } // match condition
    );

    // Log a warning if no student row was found
    if (updated === 0) {
      console.warn(`⚠️ No student row found for username: ${session.username}`);
    }

    // Step 4: Update session state to mark progress
    await session.update({ state: "gender_saved" });

    // Step 5: Send success response
    return res.json({
      success: true,
      message: "Gender saved successfully",
    });
  } catch (err) {
    // Error handling: log and respond with 500
    console.error("saveGender error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
