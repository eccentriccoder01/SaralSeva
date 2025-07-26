
import jsPDF from "jspdf";
import React from "react";

const CreatePdfScheme = (scheme) => {
  const doc = new jsPDF();

  // Adjust image size and position
  const imgWidth = 50; // Desired width
  const imgHeight = 50; // Desired height
  doc.addImage(scheme.photo, "JPEG", 10, 60, imgWidth, imgHeight);

  doc.text(`Scheme Applied: ${scheme.scheme_name}`, 10, 20);
  doc.text(`Scheme Code: ${scheme.scheme_code}`, 10, 30);
  doc.text(`Registration No: ${scheme.registration_no}`, 10, 40);
  doc.text("Applicant Details", 10, 50);

  let yPosition = 120; // Starting y position for text fields

  const incrementY = (increment = 10) => {
    yPosition += increment;
  };

  doc.text(`Name: ${scheme.name}`, 10, yPosition);
  incrementY();
  doc.text(`Date of Birth: ${scheme.DOB}`, 10, yPosition);
  incrementY();
  doc.text(`Email: ${scheme.email}`, 10, yPosition);
  incrementY();
  doc.text(`Mobile: ${scheme.mobile}`, 10, yPosition);
  incrementY();
  doc.text(`Gender: ${scheme.gender}`, 10, yPosition);
  incrementY();
  doc.text(`Nationality: ${scheme.nationality}`, 10, yPosition);
  incrementY();
  doc.text(`Address: ${scheme.address}`, 10, yPosition);
  incrementY();
  doc.text(`Aadhar No: ${scheme.aadharNo}`, 10, yPosition);
  incrementY();
  doc.text(`Pan No: ${scheme.panNo}`, 10, yPosition);
  incrementY();
  doc.text(`Occupation: ${scheme.occupation}`, 10, yPosition);
  incrementY();
  doc.text(`Govt Officials: ${scheme.govt_officials}`, 10, yPosition);
  incrementY();
  doc.text(`Income: ${scheme.income}`, 10, yPosition);
  incrementY();
  doc.text(`Bank Name: ${scheme.bank_name}`, 10, yPosition);
  incrementY();
  doc.text(`Bank Branch: ${scheme.bank_branch}`, 10, yPosition);
  incrementY();
  doc.text(`Bank Account No: ${scheme.bank_account_no}`, 10, yPosition);
  incrementY();
  doc.text(`IFSC code: ${scheme.ifsc_code}`, 10, yPosition);
  incrementY(20); // Add extra space for the final text
  doc.text("Document Submitted: Aadhar Card, PAN Card, Bank Passbook", 10, yPosition);

  return doc;
}

export default CreatePdfScheme;
