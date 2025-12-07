import { sendEmail } from "../utils/email.js";
import { submissionStatusUpdatedEmail } from "../utils/emailTemplates.js";
import SubmissionModel from "../models/SubmissionModel.js";

export async function updateSubmissionStatus(req, res) {
  const { id } = req.params;
  const { status: newStatus } = req.body;

  const submission = await SubmissionModel.findById(id);
  if (!submission) return res.status(404).json({ message: "Not found" });

  const oldStatus = submission.status;
  submission.status = newStatus;
  await submission.save();

  try {
    if (submission.userEmail) {
      const email = submissionStatusUpdatedEmail({
        name: submission.userName,
        submissionId: submission.id,
        oldStatus,
        newStatus
      });

      sendEmail({
        to: submission.userEmail,
        ...email
      }).catch(err => console.error("Email send error:", err));
    }
  } catch (err) {
    console.error("Email trigger error:", err);
  }

  return res.json({ message: "Status updated", submission });
}
