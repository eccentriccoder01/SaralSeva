export function submissionStatusUpdatedEmail({ name, submissionId, oldStatus, newStatus }) {
  const subject = `Submission #${submissionId} is now ${newStatus}`;

  const html = `
    <p>Hi ${name},</p>
    <p>Your submission <strong>#${submissionId}</strong> changed from 
    <em>${oldStatus}</em> to <strong>${newStatus}</strong>.</p>
    <p>View: <a href="${process.env.BASE_URL}/submissions/${submissionId}">
    Click here</a></p>
  `;

  const text = `
Hi ${name},
Your submission #${submissionId} changed from ${oldStatus} to ${newStatus}.
View: ${process.env.BASE_URL}/submissions/${submissionId}
  `;

  return { subject, html, text };
}
