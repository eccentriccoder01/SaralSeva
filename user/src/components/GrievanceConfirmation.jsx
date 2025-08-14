import React from "react";
import { useLocation } from "react-router-dom";
import success from "./../assets/icons8-success-480.png";
import CreatePdfGrievance from "./CreatePdfGrievance";
import { Button } from "./ui/button";

const GrievanceConfirmation = () => {
  const location = useLocation();
  const { grievance } = location.state || {};
  
  const handlePdfDownload = () => {
    if (grievance) {
      const doc = CreatePdfGrievance(grievance);
      doc.save(`${grievance.grievance_registered_number}.pdf`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-orange-50/30 dark:bg-gray-900/30 p-4 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 sm:p-10 text-center rounded-2xl shadow-2xl border-t-8 border-amber-500 transition-colors duration-300">
        <img src={success} alt="Success" className="w-28 mx-auto"/>
        <h1 className="text-3xl font-extrabold text-orange-900 dark:text-orange-400 mt-4 jost">Grievance Submitted!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
          Your grievance has been successfully submitted. Your registration number is <span className="font-bold text-stone-800 dark:text-gray-100">{grievance?.grievance_registered_number}</span>.
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Please save this number for future reference. You can download a copy of your submission below.
        </p>
        <Button 
          className="px-8 mt-8 text-lg py-6 font-bold bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all"
          onClick={handlePdfDownload}
        >
          Download Grievance PDF
        </Button>
      </div>
    </div>
  );
};

export default GrievanceConfirmation;
