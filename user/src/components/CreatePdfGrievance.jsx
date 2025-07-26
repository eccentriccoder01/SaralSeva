import jsPDF from "jspdf";

const CreatePdfGrievance = (grievance) => {
  const doc = new jsPDF();
  let yPosition = 40; // Start Y position

  // Helper function to increment yPosition
  const incrementY = (increment = 10) => {
    yPosition += increment;
  };

  doc.text(`Grievance No: ${grievance.grievance_registered_number}`, 10, yPosition);
  incrementY(); // Move to next line
  
  doc.text("Form Details", 10, yPosition);
  incrementY(); // Move to next line
  
  doc.text(`Name: ${grievance.name}`, 10, yPosition);
  incrementY();

  doc.text(`Date of Birth: ${grievance.DOB}`, 10, yPosition);
  incrementY();

  doc.text(`Email: ${grievance.email}`, 10, yPosition);
  incrementY();

  doc.text(`Mobile: ${grievance.mobile}`, 10, yPosition);
  incrementY();

  doc.text(`Gender: ${grievance.gender}`, 10, yPosition);
  incrementY();

  doc.text(`Country: ${grievance.country}`, 10, yPosition);
  incrementY();

  doc.text(`State: ${grievance.state}`, 10, yPosition);
  incrementY();

  doc.text(`District: ${grievance.district}`, 10, yPosition);
  incrementY();

  doc.text(`Address: ${grievance.address}`, 10, yPosition);
  incrementY();

  doc.text(`Grievance Type: ${grievance.grievance_type}`, 10, yPosition);
  incrementY();

  doc.text(`Grievance Category: ${grievance.grievance_category}`, 10, yPosition);
  incrementY();

  doc.text(`Description: ${grievance.description}`, 10, yPosition);
  incrementY();

  doc.text("Document Submitted: Registration Form", 10, yPosition);
  return doc;
}

export default CreatePdfGrievance;
